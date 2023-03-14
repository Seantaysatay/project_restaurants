// SETUP EXPRESS
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());

// connect to the Mongo DB
async function connect() {
    const mongo_url = process.env.MONGO_URI;
    let client = await MongoClient.connect(mongo_url, {
        "useUnifiedTopology": true
    })
    let db = client.db("project_restaurants");
    console.log("database connected");
    return db;
}


// // ROUTES

async function main() {
    let db = await connect();

    app.get('/restaurants', async (req, res) => {
        let restaurants = await db.collection('restaurants').find().toArray();
        res.json(restaurants)
    })

    app.get('/reviews', async (req, res) => {
        let reviews = await db.collection('reviews').find().toArray();
        res.json(reviews)
    })

}

main();

// START SERVER

app.listen(3000, () => {
    console.log("server has started")
})
