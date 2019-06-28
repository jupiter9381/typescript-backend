import StoreProduct from "../../models/StoreProduct.model";
import Product from "../../models/Product.model";
import ProductSubCategory from "../../models/ProductSubCategory.model";
import SubCategory from "../../models/SubCategory.model";
import Category from "../../models/Category.model";
import ProductExtra from "../../models/ProductExtra.model";
import ProductExtraGroup from "../../models/ProductExtraGroup.model";
import Extra from "../../models/Extra.model";
import { BaseUrl } from "../../models/EnumerableAttributes";
import ResponseObj from "../../models/ResponseObj.model";

export default class ProductService {
    static async generate(req, productId) {
        const ProductStatusString = ["", "Pending", "Rejected", "Accepted"];
        const allStoreProducts = await StoreProduct.filter({
            store_id: req["user"].store_id,
            product_id: productId
        });
        let finalObj = {};
        for (const storeProductObj of allStoreProducts) {
            const productObj = <Product>await Product.findById(storeProductObj.product_id);
            const builderObj = productObj.builder();
            builderObj["price"] = storeProductObj.price;
            builderObj["status"] = (storeProductObj.status) ? ProductStatusString[storeProductObj.status] : "";
            builderObj["quantity"] = storeProductObj.quantity;
            builderObj["sale_price"] = storeProductObj.sale_price;
            const productSubCategories = await ProductSubCategory.filter({
                "product_id": storeProductObj.product_id
            });
            const temp_sub_category_arr = [];
            const categoryObjFlag = true;
            let categoryObj = {};
            for (const productSubCategory of productSubCategories) {
                const subCategory = <SubCategory>await SubCategory.findById(productSubCategory.sub_category_id);
                if (categoryObjFlag) {
                    categoryObj = <Category>await Category.findById(subCategory.category_id);
                    categoryObj = new Category(categoryObj).builder();
                }
                const subCategoryBuilder = subCategory.builder();
                delete subCategoryBuilder["category_id"];
                temp_sub_category_arr.push(subCategoryBuilder);
            }

            categoryObj["subCategories"] = temp_sub_category_arr;
            const productExtras = await ProductExtra.filter({
                "store_id": req["user"].store_id,
                "product_id": storeProductObj.product_id
            });


            const tempExtraGroupArr = [];
            const productExtraGroupArray = [];
            for (const productExtra of productExtras) {
                if (tempExtraGroupArr.indexOf(productExtra.productExtraGroup_id) == -1) {
                    tempExtraGroupArr.push(productExtra.productExtraGroup_id);
                    const tempObj = <ProductExtraGroup>await ProductExtraGroup.findById(productExtra.productExtraGroup_id);
                    productExtraGroupArray.push(tempObj.builder());
                }
            }

            const finalVariantGrouped = [];
            for (const productExtraGroup of productExtraGroupArray) {
                const productExtrasTwo = await ProductExtra.filter({
                    "store_id": req["user"].store_id,
                    "product_id": storeProductObj.product_id,
                    "productExtraGroup_id": productExtraGroup.id
                });

                const temp_extra_arr = [];
                for (const productExtraTwo of productExtrasTwo) {
                    const extra = await Extra.findById(productExtraTwo.extra_id);
                    const extraBuilder = extra.builder();
                    delete extraBuilder["sub_category_id"];
                    delete extraBuilder["id"];
                    extraBuilder["price"] = productExtraTwo.price;
                    extraBuilder["title"] = extraBuilder["name"];
                    delete extraBuilder["name"];
                    temp_extra_arr.push(extraBuilder);
                }

                finalVariantGrouped.push({
                    "title": new ProductExtraGroup(productExtraGroup).name,
                    "mode": (productExtraGroup.type == 1) ? 1 : 0,
                    "values": temp_extra_arr
                });
            }
            finalObj = {
                "id": builderObj["id"],
                "name": builderObj["name"],
                "image": builderObj["image"],
                "status": builderObj["status"],
                "price": builderObj["price"],
                "quantity": builderObj["quantity"],
                "sale_price": builderObj["sale_price"],
                "description": builderObj["description"],
                "category": categoryObj,
                "extras": finalVariantGrouped
            };
        }
        return finalObj;
    }
    //
    // static async generate(req: Request, productId) {
    //     const ProductStatusString = ["", "Pending", "Rejected", "Accepted"];
    //     const allStoreProducts = await StoreProduct.filter({
    //         store_id: req["user"].store_id,
    //         product_id: productId
    //     });
    //     let finalObj = {};
    //     for (const storeProductObj of allStoreProducts) {
    //         const productObj = <Product>await Product.findById(storeProductObj.product_id);
    //         const builderObj = productObj.builder();
    //         builderObj["price"] = storeProductObj.price;
    //         builderObj["status"] = (storeProductObj.status) ? ProductStatusString[storeProductObj.status] : "";
    //         builderObj["quantity"] = storeProductObj.quantity;
    //         builderObj["sale_price"] = storeProductObj.sale_price;
    //         const productSubCategories = await ProductSubCategory.filter({
    //             "product_id": storeProductObj.product_id
    //         });
    //         const temp_sub_category_arr = [];
    //         const categoryObjFlag = true;
    //         let categoryObj = {};
    //         for (const productSubCategory of productSubCategories) {
    //             const subCategory = <SubCategory>await SubCategory.findById(productSubCategory.sub_category_id);
    //             if (categoryObjFlag) {
    //                 categoryObj = <Category>await Category.findById(subCategory.category_id);
    //                 categoryObj = new Category(categoryObj).builder();
    //             }
    //             const subCategoryBuilder = subCategory.builder();
    //             delete subCategoryBuilder["category_id"];
    //             temp_sub_category_arr.push(subCategoryBuilder);
    //         }
    //
    //         categoryObj["subCategories"] = temp_sub_category_arr;
    //         const productExtras = await ProductExtra.filter({
    //             "store_id": req["user"].store_id,
    //             "product_id": storeProductObj.product_id
    //         });
    //
    //
    //         const tempExtraGroupArr = [];
    //         const productExtraGroupArray = [];
    //         for (const productExtra of productExtras) {
    //             if (tempExtraGroupArr.indexOf(productExtra.productExtraGroup_id) == -1) {
    //                 tempExtraGroupArr.push(productExtra.productExtraGroup_id);
    //                 const tempObj = <ProductExtraGroup>await ProductExtraGroup.findById(productExtra.productExtraGroup_id);
    //                 productExtraGroupArray.push(tempObj.builder());
    //             }
    //         }
    //
    //         const finalVariantGrouped = [];
    //         for (const productExtraGroup of productExtraGroupArray) {
    //             const productExtrasTwo = await ProductExtra.filter({
    //                 "store_id": req["user"].store_id,
    //                 "product_id": storeProductObj.product_id,
    //                 "productExtraGroup_id": productExtraGroup.id
    //             });
    //
    //             const temp_extra_arr = [];
    //             for (const productExtraTwo of productExtrasTwo) {
    //                 const extra = await Extra.findById(productExtraTwo.extra_id);
    //                 const extraBuilder = extra.builder();
    //                 delete extraBuilder["sub_category_id"];
    //                 delete extraBuilder["id"];
    //                 extraBuilder["price"] = productExtraTwo.price;
    //                 extraBuilder["title"] = extraBuilder["name"];
    //                 delete extraBuilder["name"];
    //                 temp_extra_arr.push(extraBuilder);
    //             }
    //
    //             finalVariantGrouped.push({
    //                 "title": new ProductExtraGroup(productExtraGroup).name,
    //                 "mode": (productExtraGroup.type == 1) ? 1 : 0,
    //                 "values": temp_extra_arr
    //             });
    //         }
    //         finalObj = {
    //             "id": builderObj["id"],
    //             "name": builderObj["name"],
    //             "image": BaseUrl.baseUrl + builderObj["image"],
    //             "status": builderObj["status"],
    //             "price": builderObj["price"],
    //             "quantity": builderObj["quantity"],
    //             "sale_price": builderObj["sale_price"],
    //             "description": builderObj["description"],
    //             "category": categoryObj,
    //             "extras": finalVariantGrouped
    //         };
    //     }
    //     return finalObj;
    // }
    //
    // // static vendorOneOrder(result, storeId) {
    // //     return ProductService.products(result, storeId)[0];
    // // }


}