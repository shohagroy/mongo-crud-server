const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// mongodb section
const uri =
  "mongodb+srv://demo_1:Password27@Shohag27@cluster0.u2jjc2l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const itemsCollection = client.db("allItems").collection("items");
    app.post("/items", async (req, res) => {
      const item = req.body;
      const result = await itemsCollection.insertOne(item);
      console.log(result);
    });
  } finally {
  }
};

run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(port, () => {
  console.log(`server is running from port ${port}`);
});
