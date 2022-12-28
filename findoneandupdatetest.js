import { mongoClient } from "./mongoclient.js";

const DB = "test";
const COL = "concurrency";

const coll = mongoClient.db(DB).collection(COL);
let res = await coll.findOne();
const did = res._id;

for (;;) {
  res = await coll.findOneAndUpdate(
    { _id: did },
    [
      {
        $set: { updateField: { $mod: [{ $sum: ["$updateField", 1] }, 10000] } },
      },
    ],
    { returnNewDocument: true },
  );
  console.log("res", res);
}

process.exit(0);
