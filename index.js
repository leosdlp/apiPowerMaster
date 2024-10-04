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

app.get('/GetUsers', (req, res)=>{
    database.collection("User").find({}).toArray((error, result)=>{
        res.send(result);
    });
})

const users = require("./routes/users")
app.use("/users", users);

// Partie Add

app.post('AddUsers', multer().none(), (request, response) => {
    const { username, password, email } = request.body;

    if (!username || !password || !email) {
        response.status(400).json({ error: 'Username and password are required' });
        return;
    }

    database.collection("User").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newUser = {
            username: username,
            password: password,
            email : email
        };

        database.collection("User").insertOne(newUser, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Insertion error' });
                return;
            }
            response.json("Added Successfully");
        });
    });
});

app.listen(port, async () => {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    } catch (error) {
        console.error("Mongo DB Connection Failed:", error);
    }
});