import { NextFunction, Request, Response } from "express";
import Store from "../../models/Store.model";
import StoreValidation from "../../validation/Store.validation";
import { ApiController } from "../ApiController";
import { Auth } from "../../middleware/auth";
import FileUploader from "../../services/FileUploader";
import StoreAddress from "../../models/StoreAddress.model";
import StoreContact from "../../models/StoreContact.model";
import WorkingHours from "../../models/WorkingHours.model";
import ContactPerson from "../../models/ContactPerson.model";
import StoreSocialData from "../../models/StoreSocialData.model";
import StoreType from "../../models/StoreType.model";
import ResponseObj from "../../models/ResponseObj.model";
import { BaseUrl } from "../../models/EnumerableAttributes";

class StoreController extends ApiController {
    constructor() {
        super(new StoreValidation(), new Auth);
        this.init();
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const StoreStatusString =  ["Pending" , "Rejected" , "Accepted" ];
        const StoreDaysString =  ["Monday" , "Tuesday", "Wednesday", "Thursday" , "Friday", "Saturday", "Sunday"];

        const storeParam = <Store> await  Store.findById(req["user"].store_id);
        const store = new Store(storeParam);
        const storeContactData = await store.StoreContact;
        const workingHoursData = await store.WorkingHours;
        const contactPersonData = await store.ContactPerson;
        const storeTypeData = await store.StoreType;
        const storeSocialDataData = await store.StoreSocialData;
        const storeAddressData = await store.StoreAddress;

        const storeContactDataFinal = (storeContactData[0]) ? new StoreContact(storeContactData[0]).builder() : {};
        const workingHoursDataFinal = (workingHoursData) ? workingHoursData : [];
        const contactPersonDataFinal = (contactPersonData[0]) ? new ContactPerson(contactPersonData[0]).builder() : {};
        const storeTypeDataFinal = (storeTypeData) ? new StoreType(storeTypeData[0]).builder() : [];
        const storeSocialDataDataFinal = (storeSocialDataData[0]) ? new StoreSocialData(storeSocialDataData[0]).builder() : {};
        const storeAddressDataFinal = (storeAddressData[0]) ? new StoreAddress(storeAddressData[0]).builder() : {};


        const workingHoursDataFinalwithoutStoreId = [];
        workingHoursDataFinal.forEach(obj => {
            const tempObj = <WorkingHours> new WorkingHours(obj).builder();
            delete tempObj["store_id"];
            delete tempObj["id"];
            tempObj["day"] = StoreDaysString[tempObj["day"]];
            workingHoursDataFinalwithoutStoreId.push(tempObj);
        });

        delete storeParam["tableName"];
        delete storeParam["filterableColumnsNames"];
        delete storeParam["columnsNames"];
        // storeSocialDataData["store_id"] = undefined;
        delete storeSocialDataDataFinal["store_id"];
        delete storeSocialDataDataFinal["id"];
        delete storeContactDataFinal["store_id"];
        delete storeContactDataFinal["id"];
        delete contactPersonDataFinal["store_id"];
        delete contactPersonDataFinal["id"];
        delete storeTypeDataFinal["store_id"];
        delete storeTypeDataFinal["id"];
        delete storeTypeDataFinal["store_id"];
        delete storeTypeDataFinal["id"];
        delete storeAddressDataFinal["store_id"];
        delete storeAddressDataFinal["id"];
        const responseObj = {
            "name": storeParam.name,
            "description": storeParam.description,
            "avatar": BaseUrl.baseUrl + storeParam.logo,
            "header": BaseUrl.baseUrl + storeParam.header,
            "status": StoreStatusString[storeParam.status],
            "contact": storeContactDataFinal,
            "workingHours": workingHoursDataFinalwithoutStoreId,
            "contactPerson": contactPersonDataFinal,
            "category": storeTypeDataFinal["name"],
            "social": storeSocialDataDataFinal,
            "address": storeAddressDataFinal
        };
        const responseObjTemp = new ResponseObj(200, "store data");
        responseObjTemp["profile"] = responseObj;
        res.status(200).json(responseObjTemp);
    }


    public async update(req: Request, res: Response, next: NextFunction) {
        const StoreDaysString =  ["monday" , "tuesday", "wednesday", "thursday" , "friday", "saturday", "sunday"];
        try {
            const storeParam = <Store> await  Store.findById(req["user"].store_id);
            const store = new Store(storeParam);

            if (req.body.hasOwnProperty("store") && StoreController.IsJsonString(req.body["store"])) {
                const reqStore = JSON.parse(req.body["store"]);
                if (reqStore.hasOwnProperty("name")) {
                    store.name = reqStore["name"];
                }
                if (reqStore.hasOwnProperty("name")) {
                    store.description = reqStore["description"];
                }
                if (reqStore.hasOwnProperty("category")) {
                    store.storeType_id = reqStore["category"];
                }
            }

            // update StoreContact
            if (req.body.hasOwnProperty("storeContact") && StoreController.IsJsonString(req.body["storeContact"])) {
                const storeContactData = await store.StoreContact;
                storeContactData.forEach(async obj => {
                    const tempStoreContact = new StoreContact(obj);
                    await tempStoreContact.delete();
                });

                const reqStoreContact = JSON.parse(req.body["storeContact"]);
                const tempStoreContact = new StoreContact(reqStoreContact);
                tempStoreContact.store_id = req["user"].store_id;
                tempStoreContact.save();
            }

// update WorkingHours
            if (req.body.hasOwnProperty("workingHours") && StoreController.IsJsonString(req.body["workingHours"])) {
                const workingHoursData = await store.WorkingHours;
                for (const obj of workingHoursData) {
                    // }
                    // await workingHoursData.forEach( obj => {
                    const tempWorkingHours = new WorkingHours(obj);
                    await tempWorkingHours.delete().then(function (savedObj) {
                    });

                }

                const reqWorkingHours = JSON.parse(req.body["workingHours"]);
                await reqWorkingHours.forEach(async obj => {
                    const lowerCaseDay = obj.day.toLowerCase();

                    const tempWorkingHours = await new WorkingHours(obj);
                    const tempDayInt = StoreDaysString.indexOf(lowerCaseDay);
                    tempWorkingHours.day = "" + tempDayInt;
                    tempWorkingHours.store_id = req["user"].store_id;
                    await tempWorkingHours.save();
                });
            }


// update ContactPerson
            if (req.body.hasOwnProperty("contactPerson") && StoreController.IsJsonString(req.body["contactPerson"])) {
                const contactPersonData = await store.ContactPerson;
                contactPersonData.forEach(async obj => {
                    const tempContactPerson = new ContactPerson(obj);
                    await tempContactPerson.delete();
                });

                const reqContactPerson = JSON.parse(req.body["contactPerson"]);
                const tempContactPerson = new ContactPerson(reqContactPerson);
                tempContactPerson.store_id = req["user"].store_id;
                tempContactPerson.save();
            }
// update StoreSocialData
            if (req.body.hasOwnProperty("storeSocialData") && StoreController.IsJsonString(req.body["storeSocialData"])) {
                const storeSocialDataData = await store.StoreSocialData;

                const tempStoreSocialData = new StoreSocialData(storeSocialDataData[0]);
                await tempStoreSocialData.delete();
                const reqStoreSocialDataObj = JSON.parse(req.body["storeSocialData"]);
                const reqStoreSocialData = new StoreSocialData(reqStoreSocialDataObj);
                reqStoreSocialData.store_id = req["user"].store_id;
                delete reqStoreSocialData.id;
                const resSocial = await reqStoreSocialData.save().then(function (savedObj) {
                    store.storeSocialData_id = savedObj.insertId;
                }, function () {
                });
            }
// update Store Address
            if (req.body.hasOwnProperty("storeAddress") && StoreController.IsJsonString(req.body["store"])) {
                const storeAddressData = await store.StoreAddress;
                const tempStoreAddress = new StoreAddress(storeAddressData[0]);
                tempStoreAddress.delete();
                const reqStoreAddressObj = JSON.parse(req.body["storeAddress"]);
                const reqStoreAddress = new StoreAddress(reqStoreAddressObj);
                reqStoreAddress.store_id = req["user"].store_id;
                delete reqStoreAddress.id;
                const resAddress = await reqStoreAddress.save().then(async function (savedObj) {
                    store.storeAddress_id = savedObj.insertId;
                });
            }
            if (req.hasOwnProperty("files") && req["files"] !== null && req["files"] !== undefined && req["files"].avatar !== undefined) {
                const pathLogo = "uploads/stores/logos/" + req["user"].store_id + "/";
                const sampleFile = req["files"].avatar;
                if (sampleFile) {
                    FileUploader.create(pathLogo, sampleFile);
                    store.header = pathLogo + sampleFile.name;
                }
            }
            if (req.hasOwnProperty("files") && req["files"] !== null && req["files"] !== undefined && req["files"].hasOwnProperty("header")) {
                const pathHeader = "uploads/stores/headers/" + req["user"].store_id + "/";
                const sampleFileHeader = req["files"].header;
                if (sampleFileHeader) {
                    FileUploader.create(pathHeader, sampleFileHeader);
                    store.header = pathHeader + sampleFileHeader.name;
                }
            }

            store.update().then(function (result) {
                res.status(200).json(new ResponseObj(200, "store updated successfully"));
            }, function () {
                res.status(400).json(new ResponseObj(400, "some thing went wrong"));
            });
        } catch (e) {
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));
        }
    }


    init() {
        this.router.get("/", this.auth.userRequired, this.show);
        this.router.put("/", this.auth.userRequired, this.validator.createValidationFor("edit"), this.validator.checkValidationResult, this.update);
    }


}

const storeController = new StoreController();
export default storeController.router;
