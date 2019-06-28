const config = require("config");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = `mongodb://${config.get("db.host")}:${config.get("db.port")}/${config.get("db.name")}`;
export default async function () {
  return  await MongoClient.connect(url);
}
