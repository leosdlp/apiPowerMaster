var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var multer = require("multer");

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();

var CONNECTION_STRING = "mongodb+srv://admin:zgRCG5e02wk9jRnD@cluster0.vrkekyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "fripandcollect";
var database;
const port = process.env.PORT || 5000;

// Partie Get

app.get('/', async (req, res) => {
    res.json({"message": "ça marche bien !"});
});

const users = require("./routes/users")
app.use("/users", users)

app.listen(port, async () => {
    console.log("Serveur est en ligne !")
    try {
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    } catch (error) {
        console.error("Mongo DB Connection Failed:", error);
    }
});