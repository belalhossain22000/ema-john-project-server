const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());

//getting api home
app.get("/", (req, res) => {
  res.send("ema-john is running on server");
});

//connect to mongodb server db/database

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.BD_PASSWORD}@cluster0.dp3om9f.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productsCollection = client.db("emaJohnDB").collection("products");

    //custom operations start from here
    app.get("/products", async (req, res) => {
      const results = await productsCollection.find().toArray();
      res.send(results);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//listen for connections

app.listen(port, () => {
  console.log(`ema-john is listening on port ${port}`);
});
