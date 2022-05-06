const express = require("express");
const app = express();
const cors = require("cors");

const assert = require("assert");

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL =
  "mongodb+srv://vaishu:vaishu@cluster0.qskmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const aggregate = mongodb;
let options = { origin: "*" };
app.use(cors(options));
app.use(express.json());

app.post("/userpost", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("mydb");
    let b = await db.collection("aroopa").insertOne(req.body);
    await connection.close();
    res.json({ message: "user-added" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/userput/:id", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("mydb");
    let objId = mongodb.ObjectId(req.params.id);
    let a = await db
      .collection("aroopa")
      .findOneAndUpdate({ _id: objId }, { $set: req.body });
    await connection.close();
    res.json({ message: "data-updated" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/userall", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("mydb");
    let b = await db.collection("aroopa").find({}).toArray();
    await connection.close();
    res.json(b);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/userdelete/:id", async function (req, res) {
    try {
      let connection = await mongoClient.connect(URL);
      let db = connection.db("mydb");
      let objId = mongodb.ObjectId(req.params.id);
      let a = await db.collection("aroopa").findOneAndDelete({ _id: objId });
      await connection.close();
      res.json({message:"Data deleted"});
    } catch (error) {
      console.log(error);
    }
  });
  
  

app.listen(process.env.PORT || 3000);
