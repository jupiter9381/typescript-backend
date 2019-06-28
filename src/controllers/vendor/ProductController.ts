import { NextFunction, Request, Response, Router } from "express";
import { ApiController } from "../ApiController";
import Product from "../../models/Product.model";
import FileUploader from "../../services/FileUploader";
import { Auth } from "../../middleware/auth";
import ProductValidation from "../../validation/Product.validation";
import { AdminRequestTitle, BaseUrl, ProductStatus } from "../../models/EnumerableAttributes";
import ProductSubCategory from "../../models/ProductSubCategory.model";
import StoreProduct from "../../models/StoreProduct.model";
import ResponseObj from "../../models/ResponseObj.model";
import * as XLSX from "xlsx";
import ProductExtraGroup from "../../models/ProductExtraGroup.model";
import ProductExtra from "../../models/ProductExtra.model";
import Extra from "../../models/Extra.model";
import SubCategory from "../../models/SubCategory.model";
import Category from "../../models/Category.model";
import AdminRequestService from "../../modelServices/vendor/AdminRequestService";
import AdminRequest from "../../models/AdminRequest.model";
import ProductService from "../../modelServices/vendor/ProductService";


class ProductController extends ApiController {
    constructor() {
        super(new ProductValidation(), new Auth);
    }


    public async indexAdmin(req: Request, res: Response, next: NextFunction) {
        console.log("req.query.filter");
        try {
            let filterObj = undefined;
            let filterProdcutName = undefined;
            let filterProdcutDescription = undefined;
            let filterProdcutCategory = undefined;
            let filterProdcutFlag = false;
            if (ProductController.IsJsonString(req.query.filter)) {
                filterObj = JSON.parse(req.query.filter);
            }
            if (filterObj !== undefined && filterObj["name"] != undefined && filterObj.hasOwnProperty("name")) {
                filterProdcutName = filterObj["name"].toLowerCase();
            }
            if (filterObj !== undefined && filterObj["description"] != undefined && filterObj.hasOwnProperty("description")) {
                filterProdcutDescription = filterObj["description"].toLowerCase();
            }
            if (filterObj !== undefined && filterObj["category"] != undefined && filterObj.hasOwnProperty("category")) {
                filterProdcutCategory = filterObj["category"].toLowerCase();
            }

            console.log(filterProdcutCategory);
            console.log(filterProdcutName);
            console.log(filterProdcutName);
            const ProductStatusString = ["", "Pending", "Rejected", "Accepted"];

            // const store = <Store>await Store.findById(req["user"].store_id);
            // const store = new Store(storeParam);
            const allProducts = await Product.filter({
                admin: 1
                // status : ProductStatus.Accepted
            });
            const finalObj = [];
            for (const allProductsObj of allProducts) {
                const productObj = <Product>await new Product(allProductsObj);
                const builderObj = productObj.builder();
                builderObj["price"] = productObj.price;
                builderObj["status"] = (productObj.status) ? ProductStatusString[productObj.status] : "";
                const productSubCategories = await ProductSubCategory.filter({
                    "product_id": productObj.id
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
                    if (subCategory.name.toLowerCase() == filterProdcutCategory) {
                        filterProdcutFlag = true;
                    }
                    const subCategoryBuilder = subCategory.builder();
                    delete subCategoryBuilder["category_id"];
                    temp_sub_category_arr.push(subCategoryBuilder);
                }

                categoryObj["subCategories"] = temp_sub_category_arr;
                const productExtras = await ProductExtra.filter({
                    "store_id": -1,
                    "product_id": productObj.id
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
                        "store_id": -1,
                        "product_id": productObj.id,
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
                let dbProductName = builderObj["name"];

                if (dbProductName !== undefined) {
                    dbProductName = builderObj["name"].toLowerCase();
                }
                let dbProductDescription = builderObj["description"];
                if (dbProductDescription !== undefined) {
                    dbProductDescription = builderObj["description"].toLowerCase();
                }
                if (filterObj == undefined) {
                    finalObj.push({
                        "id": builderObj["id"],
                        "name": builderObj["name"],
                        "image": BaseUrl.baseUrl + builderObj["image"],
                        "status": builderObj["status"],
                        "price": builderObj["price"],
                        "qty": builderObj["quantity"],
                        "description": (builderObj["description"] == "" || builderObj["description"] == undefined) ? "" : builderObj["description"],
                        "sale_price": builderObj["sale_price"],
                        "category": categoryObj,
                        "extras": finalVariantGrouped
                    });

                } else {
                    if (dbProductName.includes(filterProdcutName) || dbProductDescription.includes(filterProdcutDescription) || filterProdcutFlag === true) {
                        finalObj.push({
                            "id": builderObj["id"],
                            "name": builderObj["name"],
                            "image": BaseUrl.baseUrl + builderObj["image"],
                            "status": builderObj["status"],
                            "price": builderObj["price"],
                            "qty": builderObj["quantity"],
                            "description": (builderObj["description"] == "" || builderObj["description"] == undefined) ? "" : builderObj["description"],
                            "sale_price": builderObj["sale_price"],
                            "category": categoryObj,
                            "extras": finalVariantGrouped
                        });
                    }
                }
            }
            const responseObj = new ResponseObj(200, "products list");
            responseObj["products"] = finalObj;
            res.status(200).json(responseObj);
        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));

        }
    }


    public async index(req: Request, res: Response, next: NextFunction) {
        // console.log("req.query.filter");
        // console.log(req.query.filter);

        try {
            let filterObj = undefined;
            let filterProdcutName = undefined;
            let filterProdcutDescription = undefined;
            let filterProdcutCategory = undefined;
            let filterProdcutFlag = false;
            if (ProductController.IsJsonString(req.query.filter)) {
                filterObj = JSON.parse(req.query.filter);
            }
            if (filterObj !== undefined && filterObj["name"] != undefined && filterObj.hasOwnProperty("name")) {
                filterProdcutName = filterObj["name"].toLowerCase();
            }
            if (filterObj !== undefined && filterObj["description"] != undefined && filterObj.hasOwnProperty("description")) {
                filterProdcutDescription = filterObj["description"].toLowerCase();
            }
            if (filterObj !== undefined && filterObj["category"] != undefined && filterObj.hasOwnProperty("category")) {
                filterProdcutCategory = filterObj["category"].toLowerCase();
            }

            // console.log(filterProdcutDescription);
            const ProductStatusString = ["", "Pending", "Rejected", "Accepted"];

            // const store = <Store>await Store.findById(req["user"].store_id);
            // const store = new Store(storeParam);
            const allStoreProducts = await StoreProduct.filter({
                store_id: req["user"].store_id,
                // status : ProductStatus.Accepted
            });
            const finalObj = [];
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
                    if (subCategory.name.toLowerCase() == filterProdcutCategory) {
                        filterProdcutFlag = true;
                    }
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


                let dbProductName = builderObj["name"];

                if (dbProductName !== undefined) {
                    dbProductName = builderObj["name"].toLowerCase();
                }
                let dbProductDescription = builderObj["description"];
                if (dbProductDescription !== undefined) {
                    dbProductDescription = builderObj["description"].toLowerCase();
                }
                if (filterObj == undefined) {
                    finalObj.push({
                        "id": builderObj["id"],
                        "name": builderObj["name"],
                        "image": builderObj["image"],
                        "status": builderObj["status"],
                        "price": builderObj["price"],
                        "qty": builderObj["quantity"],
                        "description": (builderObj["description"] == "" || builderObj["description"] == undefined) ? "" : builderObj["description"],
                        "sale_price": builderObj["sale_price"],
                        "category": categoryObj,
                        "extras": finalVariantGrouped
                    });
                } else {
                    if (dbProductName.includes(filterProdcutName) || dbProductDescription.includes(filterProdcutDescription) || filterProdcutFlag === true) {
                        finalObj.push({
                            "id": builderObj["id"],
                            "name": builderObj["name"],
                            "image": builderObj["image"],
                            "status": builderObj["status"],
                            "price": builderObj["price"],
                            "qty": builderObj["quantity"],
                            "description": (builderObj["description"] == "" || builderObj["description"] == undefined) ? "" : builderObj["description"],
                            "sale_price": builderObj["sale_price"],
                            "category": categoryObj,
                            "extras": finalVariantGrouped
                        });
                    }
                }
            }
            const responseObj = new ResponseObj(200, "products list");
            responseObj["products"] = finalObj;
            res.status(200).json(responseObj);
        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));

        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductService.generate(req, req.params.id);
            const responseObj = new ResponseObj(200, "product Data");
            responseObj["product"] = product;
            res.status(200).json(responseObj);
        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));

        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {


            ProductController.createProduct(req).then((savedProduct) => {
                // const adminRequest = <AdminRequest>await AdminRequestService.generate(req, AdminRequestTitle.CreateProduct);
                //
                // adminRequest.save().then(() => {
                //     res.status(200).json(
                //         new ResponseObj(200, "product created successfully waiting for admin approved")
                //     );
                // }, () => {
                //     res.status(400).json(new ResponseObj(400, "some thing went wrong"));
                // });
                res.status(200).json(
                    new ResponseObj(200, "product created successfully waiting for admin approved")
                );
            }, () => {
                res.status(400).json(new ResponseObj(400, "some thing went wrong"));
            });
        } catch (e) {
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));

        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {

            // ProductController.updateProduct(req).then(async (savedProduct) => {
            //     res.status(200).json(new ResponseObj(200, "product updated successfully"));
            // }, () => {
            //     res.status(400).json(new ResponseObj(400, "some thing went wrong"));
            // });
            const adminRequest = <AdminRequest>await AdminRequestService.generate(req, AdminRequestTitle.EditProduct);
            let storeProductDbObj = <StoreProduct>await StoreProduct.filter({
                "product_id": req.params.id,
                "store_id": req["user"].store_id
            });
            storeProductDbObj = storeProductDbObj[0];
            storeProductDbObj.status = ProductStatus.Pending;
            storeProductDbObj.update().then(() => {
                adminRequest.save().then(() => {
                    res.status(200).json(
                        new ResponseObj(200, "product updated successfully waiting for admin approved")
                    );
                }, () => {
                    res.status(400).json(new ResponseObj(400, "some thing went wrong"));
                });
            }, () => {
                res.status(400).json(new ResponseObj(400, "some thing went wrong"));
            });

        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));
        }
    }


    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const storeProduct = <StoreProduct>await StoreProduct.findById(id);
            storeProduct.status = 0;
            storeProduct.update().then(() => {
                res.status(200).json(new ResponseObj(200, "product deleted successfully"));
            }, () => {
                res.status(400).json(new ResponseObj(400, "some thing went wrong"));
            });
        } catch (e) {
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));

        }
    }

    public async importProduct(req: Request, res: Response, next: NextFunction) {


        try {
            const store_id = req["user"].store_id;
            const sampleFile = req["files"].excel;
            const workbook = XLSX.read(sampleFile.data);
            const sheet_name_list = workbook.SheetNames;
            const importedProductList = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            await importedProductList.forEach(async (importedProduct, index) => {
                const product = new Product();
                product.name = importedProduct["title"];
                product.price = importedProduct["price"];
                product.barcode = importedProduct["barcode"];
                product.status = ProductStatus.Pending;
                product.image = importedProduct["imageUrl"];
                product.description = importedProduct["description"];
                let savedProductId = -1;
                await product.save().then(async (savedObj) => {
                    savedProductId = await savedObj.insertId;
                    const storeProduct = new StoreProduct();
                    storeProduct.price = importedProduct["quantity"];
                    storeProduct.product_id = savedObj.insertId;
                    storeProduct.store_id = store_id;
                    storeProduct.sale_price = importedProduct["sale_price"];
                    if (importedProduct["quantity"] != undefined) {
                        storeProduct.quantity = importedProduct["quantity"];
                    }
                    storeProduct.save().then(() => {
                    }, (e) => {
                        console.log(e);
                    });
                });
                if (importedProduct["category"].includes(",")) {
                    const tempVarResult = importedProduct["category"].split(",");
                    tempVarResult.forEach(async catName => {
                        const catObject = <SubCategory>await SubCategory.filter({
                            "name": catName
                        });

                        if (catObject != undefined) {
                            const subCategory = new ProductSubCategory();

                            subCategory.product_id = savedProductId;
                            subCategory.sub_category_id = catObject.id;
                            subCategory.save().then(() => {
                            }, (e) => {
                                console.log(e);

                            });
                        }
                    });
                } else if (importedProduct["category"] != undefined && importedProduct["category"] > 0) {
                    const subCategory = new ProductSubCategory();
                    subCategory.product_id = savedProductId;
                    subCategory.sub_category_id = importedProduct["category"];
                    subCategory.save().then(() => {
                    }, (e) => {
                        console.log(e);

                    });
                }
                for (const key in importedProduct) {
                    const value = importedProduct[key];
                    if (key.includes("var-")) {
                        const tempVarResult = key.split("-");
                        // const result = key.replace("var-", "");
                        const extraGroup = new ProductExtraGroup();
                        extraGroup.type = parseInt(tempVarResult[2]);
                        extraGroup.name = tempVarResult[1];
                        let extraGroupSavedId = -1;
                        await extraGroup.save().then(async savedObj => {
                            extraGroupSavedId = savedObj.insertId;
                        });
                        if (value.includes(",")) {
                            const extraGroupArray = value.split(",");
                            extraGroupArray.forEach(async (obj, extraGroupIndex) => {
                                if (obj.includes(":")) {
                                    const splitedObj = obj.split(":");
                                    const extra = <Extra>await Extra.filter({
                                        "name": splitedObj[0]
                                    });
                                    if (extra != undefined && extra[0] != undefined && extra[0].id != undefined) {
                                        const productExtra = new ProductExtra();
                                        productExtra.store_id = store_id;
                                        productExtra.productExtraGroup_id = extraGroupSavedId;
                                        productExtra.product_id = savedProductId;
                                        productExtra.extra_id = extra[0].id;
                                        productExtra.price = splitedObj[1];
                                        productExtra.save();
                                    }
                                }
                            });
                        } else if (value.includes(":")) {
                            const extraArray = value.split(":");
                            const extra = <Extra>await Extra.filter({
                                "name": extraArray[0]
                            });
                            if (extra != undefined && extra[0] != undefined && extra[0].id != undefined) {
                                const productExtra = new ProductExtra();
                                productExtra.store_id = store_id;
                                productExtra.productExtraGroup_id = extraGroupSavedId;
                                productExtra.product_id = savedProductId;
                                productExtra.extra_id = extra[0].id;
                                productExtra.price = extraArray[1];
                                productExtra.save();
                            }
                        }
                    }
                }
            });

            res.status(200).json(new ResponseObj(200, "products imported successfully"));
        } catch (e) {
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));
        }


    }

    init() {
        super.init();
        this.router.post("/import", this.importProduct);
        this.router.get("/admin/products", this.auth.userRequired, this.indexAdmin);
    }

    public static async deleteProduct(req: Request) {

    }

    public static async createProduct(req: Request) {
        const params: Product = req.body;
        const store_id = req["user"].store_id;

        let arrOfSubCategories = req.body.sub_categories_ids;
        let productExtraGroupParam = [];
        if (req.body.hasOwnProperty("productExtraGroup") && ProductController.IsJsonString(req.body["productExtraGroup"])) {
            productExtraGroupParam = JSON.parse(req.body["productExtraGroup"]);
        }
        if (typeof arrOfSubCategories === "string") {
            arrOfSubCategories = arrOfSubCategories
                .split(",")
                .map(r => parseInt(r.replace("\"", "")));
        }
        const product = new Product(params);
        product.name = req.body.title;
        if (req.body.hasOwnProperty("description")) {
            product.description = req.body.description;
        }

        const lastId = await Product.lastModelId() + 1;
        const path = "uploads/products/" + lastId + "/";
        if (req.hasOwnProperty("files") && req["files"] !== null && req["files"] !== undefined && req["files"].hasOwnProperty("image")) {
            FileUploader.create(path, req["files"].image);
            product.image = path + req["files"].image.name;
        }
        product.status = ProductStatus.Pending;
        product.save().then((savedProduct) => {
            arrOfSubCategories.forEach(id => {
                const subCategory = new ProductSubCategory();
                subCategory.product_id = savedProduct.insertId;
                subCategory.sub_category_id = id;
                subCategory.save().then(() => {
                }, (e) => {
                    console.log(e);

                });
            });
            productExtraGroupParam.forEach(paramGroupObj => {
                const productExtraGroupObj = new ProductExtraGroup();
                productExtraGroupObj.name = paramGroupObj["name"];
                productExtraGroupObj.type = paramGroupObj["type"];
                productExtraGroupObj.save().then((savedGroup) => {
                    savedGroup.insertedId;
                    paramGroupObj["extraIds"].forEach(paramExtraId => {
                        const productExtraObj = new ProductExtra();
                        productExtraObj.product_id = savedProduct.insertId;
                        productExtraObj.extra_id = paramExtraId.id;
                        productExtraObj.price = paramExtraId.price;
                        productExtraObj.productExtraGroup_id = savedGroup.insertId;
                        productExtraObj.store_id = store_id;
                        productExtraObj.save().then(() => {
                        }, (e) => {
                            console.log(e);
                        });
                    });
                }, (e) => {
                    console.log(e);
                });
            });
            const storeProduct = new StoreProduct();
            storeProduct.price = req.body.price;
            storeProduct.sale_price = req.body.sale_price;
            if (req.body.hasOwnProperty("manageQuantity")) {
                if (req.body.manageQuantity == true) {
                    if (req.body.hasOwnProperty("quantity")) {
                        storeProduct.quantity = req.body.quantity;
                    }
                }
            }
            storeProduct.product_id = savedProduct.insertId;
            storeProduct.store_id = store_id;
            storeProduct.status = ProductStatus.Pending;
            storeProduct.sale_price = req.body.sale_price;

            storeProduct.save().then(async () => {
                const adminRequest = await AdminRequestService.generate(req, AdminRequestTitle.CreateProduct, storeProduct.product_id);
                await adminRequest.save();
                // console.log(adminRequest.builder());
            }, (e) => {
                console.log(e);
            });

        }, (e) => {
            throw e;
        });
    }

    public static async updateProduct(req: Request) {
        const params: Product = req.body;
        const product_id = req.params.id;
        const store_id = req["user"].store_id;

        let storeProductDbObj = <StoreProduct>await StoreProduct.filter({
            "product_id": product_id,
            "store_id": store_id
        });
        storeProductDbObj = storeProductDbObj[0];
        const productDbObj = <Product>await Product.findById(product_id);

        const oldProductExtraDbObj = await ProductExtra.filter({
            "product_id": product_id,
            "store_id": store_id
        });


        if (req.body.hasOwnProperty("sale_price")) {
            storeProductDbObj.sale_price = req.body.sale_price;
        }
        if (req.body.hasOwnProperty("price")) {
            storeProductDbObj.price = req.body.price;
        }

        if (req.body.hasOwnProperty("manageQuantity")) {
            if (req.body.manageQuantity == true) {
                if (req.body.hasOwnProperty("quantity")) {
                    storeProductDbObj.quantity = req.body.quantity;
                }
            }
        }
        if (req.body.hasOwnProperty("barcode")) {
            productDbObj.barcode = req.body.barcode;
        }
        if (req.body.hasOwnProperty("title")) {
            productDbObj.name = req.body.title;
        }
        if (req.body.hasOwnProperty("description")) {
            productDbObj.description = req.body.description;
        }
        storeProductDbObj.status = ProductStatus.Pending;
        productDbObj.status = ProductStatus.Pending;

        let arrOfSubCategories = req.body.sub_categories_ids;
        if (typeof arrOfSubCategories === "string") {
            arrOfSubCategories = arrOfSubCategories
                .split(",")
                .map(r => parseInt(r.replace("\"", "")));
        }
        let productExtraGroupParam = [];
        if (req.body.hasOwnProperty("productExtraGroup") && ProductController.IsJsonString(req.body["productExtraGroup"])) {
            productExtraGroupParam = JSON.parse(req.body["productExtraGroup"]);
            oldProductExtraDbObj.forEach((tempProductExtraDbObj: ProductExtra) => {
                const tempDeleteObj = new ProductExtra(tempProductExtraDbObj);
                tempDeleteObj.delete();
            });
        }
        if (req.body.hasOwnProperty("sub_categories_ids")) {
            const productSubCategories = await ProductSubCategory.filter({
                "product_id": product_id
            });
            for (const productSubCategory of productSubCategories) {
                const productSubCategoryObj = await new ProductSubCategory(productSubCategory);
                await productSubCategoryObj.delete();
            }
        }

        const path = "uploads/products/" + product_id + "/";
        if (req.hasOwnProperty("files") && req["files"] !== null && req["files"] !== undefined && req["files"].hasOwnProperty("image")) {
            FileUploader.create(path, req["files"].image);
            productDbObj.image = path + req["files"].image.name;
        }
        productDbObj.update().then((savedProduct) => {
            arrOfSubCategories.forEach(id => {
                const subCategory = new ProductSubCategory();
                subCategory.product_id = product_id;
                subCategory.sub_category_id = id;
                subCategory.save().then(() => {
                }, (e) => {
                    console.log(e);

                });
            });
            productExtraGroupParam.forEach(paramGroupObj => {
                const productExtraGroupObj = new ProductExtraGroup();
                productExtraGroupObj.name = paramGroupObj["name"];
                productExtraGroupObj.type = paramGroupObj["type"];
                productExtraGroupObj.save().then((savedGroup) => {
                    savedGroup.insertedId;
                    paramGroupObj["extraIds"].forEach(paramExtraId => {
                        const productExtraObj = new ProductExtra();
                        productExtraObj.product_id = product_id;
                        productExtraObj.extra_id = paramExtraId.id;
                        productExtraObj.price = paramExtraId.price;
                        productExtraObj.productExtraGroup_id = savedGroup.insertId;
                        productExtraObj.store_id = store_id;
                        productExtraObj.save().then(() => {
                        }, (e) => {
                            console.log(e);
                        });
                    });
                }, (e) => {
                    console.log(e);
                });
            });
            storeProductDbObj.update().then(() => {
            }, (e) => {
                console.log(e);
            });

        }, (e) => {
            throw e;
        });
    }
}

const productController = new ProductController();
export default productController.router;



