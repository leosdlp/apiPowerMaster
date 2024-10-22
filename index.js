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

app.get('/GetSeances', (req, res)=>{
    database.collection("Seance").find({}).toArray((error, result)=>{
        res.send(result);
    });
})

app.get('/GetWeeks', (req, res)=>{
    database.collection("Week").find({}).toArray((error, result)=>{
        res.send(result);
    });
})

const users = require("./routes/users")
app.use("/users", users);

// Partie Add

app.post('/AddUsers', multer().none(), (request, response) => {
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

app.post('/AddSeances', multer().none(), (request, response) => {
    const { username,weekId,numofSeance,benchSerie,benchRep,benchPoids,benchRpe,benchType,benchBackoffSerie,benchBackoffRep,benchBackoffPoids,benchBackoffRpe,benchBackoffType,squatSerie,squatRep,squatPoids,squatRpe,squatType,squatBackoffSerie,squatBackoffRep,squatBackoffPoids,squatBackoffRpe,squatBackoffType,deadliftSerie,deadliftRep,deadliftPoids,deadliftRpe,deadliftType,deadliftBackoffSerie,deadliftBackoffRep,deadliftBackoffPoids,deadliftBackoffRpe,deadliftBackoffType,renfo,commentaire } = request.body;

    if (!username || !weekId || !numofSeance || !benchType || !benchBackoffType || !squatType || !squatBackoffType || !deadliftType || !deadliftBackoffType || !renfo) {
        response.status(400).json({ error: 'username, weekId, numofSeance, benchSerie, benchRep, benchPoids, benchRpe, benchType, benchBackoffSerie, benchBackoffRep, benchBackoffPoids, benchBackoffRpe, benchBackoffType, squatSerie, squatRep, squatPoids, squatRpe, squatType, squatBackoffSerie, squatBackoffRep, squatBackoffPoids, squatBackoffRpe, squatBackoffType, deadliftSerie, deadliftRep, deadliftPoids, deadliftRpe, deadliftType, deadliftBackoffSerie, deadliftBackoffRep, deadliftBackoffPoids, deadliftBackoffRpe, deadliftBackoffType, renfo and commentaire are required' });
        return;
    }

    database.collection("Seance").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newSeance = {
            id: numOfDocs + 1,
            username: username,
            weekId: weekId,
            numofSeance: numofSeance,
            benchSerie: benchSerie,
            benchRep: benchRep,
            benchPoids: benchPoids,
            benchRpe: benchRpe,
            benchType: benchType,
            benchBackoffSerie: benchBackoffSerie,
            benchBackoffRep: benchBackoffRep,
            benchBackoffPoids: benchBackoffPoids,
            benchBackoffRpe: benchBackoffRpe,
            benchBackoffType: benchBackoffType,
            squatSerie: squatSerie,
            squatRep: squatRep,
            squatPoids: squatPoids,
            squatRpe: squatRpe,
            squatType: squatType,
            squatBackoffSerie: squatBackoffSerie,
            squatBackoffRep: squatBackoffRep,
            squatBackoffPoids: squatBackoffPoids,
            squatBackoffRpe: squatBackoffRpe,
            squatBackoffType: squatBackoffType,
            deadliftSerie: deadliftSerie,
            deadliftRep: deadliftRep,
            deadliftPoids: deadliftBackoffPoids,
            deadliftRpe: deadliftRpe,
            deadliftType: deadliftType,
            deadliftBackoffSerie: deadliftBackoffSerie,
            deadliftBackoffRep: deadliftBackoffRep,
            deadliftBackoffPoids: deadliftBackoffPoids,
            deadliftBackoffRpe: deadliftBackoffRpe,
            deadliftBackoffType: deadliftBackoffType,
            renfo: renfo,
            commentaire: commentaire
        };

        database.collection("Seance").insertOne(newSeance, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Insertion error' });
                return;
            }
            response.json("Added Successfully");
        });
    });
});

app.post('/AddWeeks', multer().none(), (request, response) => {
    const { username,nbSeances,seanceId1,seanceId2,seanceId3,seanceId4,seanceId5,seanceId6,seanceId7,dateDebut } = request.body;

    if (!username || !nbSeances || !dateDebut) {
        response.status(400).json({ error: 'username, nbSeances and dateDebut commentaire are required' });
        return;
    }

    database.collection("Week").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newWeek = {
            id: numOfDocs + 1,
            username: username,
            nbSeances: nbSeances,
            dateDebut: dateDebut
        };

        database.collection("Week").insertOne(newWeek, (err, result) => {
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