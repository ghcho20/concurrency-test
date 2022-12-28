import { mongoClient } from "./mongoclient.js";

const DB = "test";
const COL = "concurrency";

const coll = mongoClient.db(DB).collection(COL);
let res = await coll.findOne();
const did = res._id;

for (;;) {
  res = await coll.findOne({ _id: did });
  res = await coll.updateOne(
    { _id: did },
    { $set: { updateField: (res.updateField + 1) % 10000 } },
  );
  console.log("res", res);
}

process.exit(0);
