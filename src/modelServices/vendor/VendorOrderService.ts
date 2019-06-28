import Order from "../../models/Order.model";
import Product from "../../models/Product.model";
import ProductSubCategory from "../../models/ProductSubCategory.model";
import SubCategory from "../../models/SubCategory.model";
import Category from "../../models/Category.model";
import Store from "../../models/Store.model";
import StoreAddress from "../../models/StoreAddress.model";
import StoreProduct from "../../models/StoreProduct.model";
import Extra from "../../models/Extra.model";
import ProductExtra from "../../models/ProductExtra.model";
import IOrderItem from "../../interfaces/OrderItem.interface";
import IExtraOrderItem from "../../interfaces/ExtraOrderItem.interface";
import Serial from "../../services/serial";
import IUser from "../../interfaces/User.interface";
import { OrderStatus } from "../../models/EnumerableAttributes";
import { Request } from "express";

export default class VendorOrderService {
    static async generateOrder(req: Request): Promise<Order> {

        const products = req.body.products;
        products.forEach(product => product.store_id = req["user"].store_id);
        const user = req.body.user;
        const storeBuilder = await VendorOrderService.storeBuilder(products);
        const order = new Order();
        const specialNotes = req.body.specialNotes;
        if (specialNotes) {
            order.specialNotes = specialNotes;

        }
        let reference = req.body.reference;
        if (!reference) {
            reference = await Serial.generate(Order);
        }
        order.reference = reference;
        order.customer = <IUser>{
            id: user.id,
            name: user.name,
            address: {
                location: user.address.location,
                latitude: user.address.latitude,
                longitude: user.address.longitude
            },
            phone: user.phone

        };
        let status = req.body.status;
        if (!status) {
            status = OrderStatus.Pending;
        }
        order.status = status;
        order.vendors = storeBuilder["arrOfStoresWithProducts"];
        order.totalPrice = storeBuilder["totalPrice"];
        order.totalQty = storeBuilder["totalQty"];
        let createdAt = new Date();
        let updatedAt = new Date();
        if (req.body.created_at && req.body.updated_at) {
            createdAt = req.body.created_at;
            updatedAt = req.body.updated_at;
        }
        order.createdAt = createdAt;
        order.updatedAt = updatedAt;
        order.paymentMethod = req.body.payment_method;
        return order;
    }


    static async storeBuilder(requestedProducts) {
        const arrIds = requestedProducts.map(p => p.id);
        const products = await Product.whereByIds(arrIds);
        const productsSubCategory = await ProductSubCategory.filterWithIds({product_id: arrIds});
        const subCategoryIds = [...new Set(productsSubCategory.map(productSubCategory => productSubCategory.sub_category_id))];
        const subCategories = await SubCategory.whereByIds(subCategoryIds);
        const categoryIds = [...new Set(subCategories.map(sC => sC.category_id))];
        const categories = await Category.whereByIds(categoryIds);
        const store_ids = [...new Set(requestedProducts.map(p => p["store_id"]))];
        const storesResult = await Store.whereByIds(store_ids);
        const storeAddress = await StoreAddress.filterWithIds({store_id: store_ids});
        const storeProducts = await StoreProduct.filterWithIds({store_id: store_ids, product_id: arrIds});
        const arrOfStoresWithProducts = [];
        let totalPrice = 0;
        let totalQty = 0;
        const arrOfExtra = [];
        const arrOfExtraGroup = [];
        requestedProducts.forEach(r => {
            if (r.extra) {
                r.extra.forEach(e => {
                    arrOfExtra.push(e.id);
                    arrOfExtraGroup.push(e.group_id);
                });
            }
        });
        let extras = [];
        let productExtra = [];
        if (arrOfExtra.length > 0) {
            extras = await Extra.whereByIds(arrOfExtra);
            productExtra = await ProductExtra
                .filterWithIds({
                    extra_id: arrOfExtra,
                    productExtraGroup_id: arrOfExtraGroup,
                    product_id: arrIds
                });
        }

        storesResult.forEach(store => {
            const storeBuilder = <Store>store;
            const storeAddresses = storeAddress.filter(sA => sA.store_id == storeBuilder.id).map(sA => sA.builder());
            const builder = {...storeBuilder.builder(), addresses: storeAddresses};
            const storeObject = {
                ...builder,
                "products": []
            };
            let requestedExtras = requestedProducts.map(p => p.extra);
            requestedExtras = [].concat.apply([], requestedExtras);

            requestedProducts.forEach(requestProduct => {
                if (requestProduct.store_id == store.id) {
                    const selectedProduct = products.find(p => p.id == requestProduct.id);
                    const subCategory = [];
                    const selectProductSubCategory = productsSubCategory.filter(pSc => pSc.product_id == selectedProduct.id);
                    selectProductSubCategory.forEach(selected => {
                        const selectedSubCategories = subCategories.filter(sC => sC.id == selected.sub_category_id);
                        selectedSubCategories.forEach(ssC => {
                            const cate = categories.find(category => category.id == ssC.category_id);
                            if (cate) {
                                const selectedSub = subCategory.find(sC => sC.category.id == cate.id);
                                if (selectedSub) {
                                    selectedSub.category.subCategories.push({...ssC.builder()});
                                } else {
                                    const subCategoryBuilder = [];
                                    subCategoryBuilder.push({...ssC.builder()});
                                    const categoryBuilder = {
                                        category: {
                                            ...cate.builder(),
                                            subCategories: subCategoryBuilder
                                        }
                                    };
                                    subCategory.push(categoryBuilder);
                                }

                            }
                        });
                    });
                    const selectedStoreProduct = storeProducts.find(storeProduct => (storeProduct.store_id == store.id && storeProduct.product_id == selectedProduct.id));
                    const orderItem: IOrderItem = selectedProduct.builder();
                    let orderTotalPrice = selectedStoreProduct.price * parseInt(requestProduct.qty);
                    orderItem.price = selectedStoreProduct.price;
                    if (selectedStoreProduct.sale_price) {
                        orderTotalPrice = selectedStoreProduct.sale_price * parseInt(requestProduct.qty);
                        orderItem.price = selectedStoreProduct.sale_price;
                    }
                    orderItem.qty = parseInt(requestProduct.qty);
                    orderItem.totalPrice = orderTotalPrice;
                    orderItem.categories = subCategory;
                    let extraTotalPrice = 0;
                    if (requestProduct.extra) {
                        orderItem.extras = [];
                        extras.forEach(extra => {
                            const selectedExtra = requestedExtras.find(e => e.id == extra.id);
                            if (selectedExtra) {
                                const pExtra = productExtra.find(pe =>
                                    (pe.product_id == selectedProduct.id && pe.productExtraGroup_id == selectedExtra.group_id && pe.extra_id == extra.id));
                                if (pExtra) {
                                    let builder: IExtraOrderItem = extra.builder();
                                    builder = {...builder, price: pExtra.price};
                                    extraTotalPrice += pExtra.price;
                                    orderItem.extras.push(builder);
                                }

                            }
                        });
                        orderItem.extraTotalPrice = extraTotalPrice;
                        orderItem.totalPriceWithExtra = extraTotalPrice + orderTotalPrice;
                    }

                    storeObject["products"].push(orderItem);
                    totalPrice += (orderItem.totalPriceWithExtra) ? orderItem.totalPriceWithExtra : orderItem.totalPrice;
                    totalQty += parseInt(requestProduct.qty);
                }
            });
            const finalStoreProducts = storeObject["products"];
            const storeTotalPrice = finalStoreProducts.map(storeProduct => storeProduct.totalPrice).reduce((a, b) => a + b, 0);
            const storeTotalExtra = finalStoreProducts.map(storeProduct => storeProduct.extraTotalPrice).reduce((a, b) => a + b, 0);
            const storeTotalPriceWithExtra = finalStoreProducts.map(storeProduct => storeProduct.totalPriceWithExtra).reduce((a, b) => a + b, 0);
            storeObject["storeTotalPrice"] = storeTotalPrice;
            storeObject["storeTotalExtra"] = storeTotalExtra;
            storeObject["storeTotalPriceWithExtra"] = storeTotalPriceWithExtra;

            arrOfStoresWithProducts.push({
                ...storeObject
            });
        });
        return {arrOfStoresWithProducts, totalPrice, totalQty};
    }

    static vendorOrders(result, storeId) {
        // console.log(result)
        const orders = [];
        result.forEach(o => {
            const currentStore = o.vendors.filter(vendor => vendor.id == storeId);
            let products = currentStore.map(store => store.products);
            products = [].concat.apply([], products);
            const builder = {...o.builder()};
            delete builder["vendors"];
            builder["products"] = products;
            currentStore["storeTotalPrice"] = currentStore["storeTotalPrice"];
            currentStore["storeTotalExtra"] = currentStore["storeTotalExtra"];
            currentStore["storeTotalPriceWithExtra"] = currentStore["storeTotalPriceWithExtra"];

            orders.push(builder);
        });
        // console.log(orders)

        return orders;
    }

    static vendorOneOrder(result, storeId) {
        return VendorOrderService.vendorOrders(result, storeId)[0];
    }


}