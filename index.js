var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var multer = require("multer");
const { ObjectId } = require('mongodb');

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
    const { username, password, email, role, benchPr, squatPr, deadliftPr } = request.body;

    if (!username || !password || !email || !role || !benchPr || !squatPr || !deadliftPr) {
        response.status(400).json({ error: 'Username, password, email, benchPr, squatPr and deadliftPr are required' });
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
            email: email,
            role: role,
            benchPr : benchPr,
            squatPr : squatPr,
            deadliftPr : deadliftPr
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
    const { username,nbSeances,dateDebut } = request.body;

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

// UPDATE

app.post('/UpdateWeeks', upload.none(), (request, response) => {
    const { id,username,nbSeances,dateDebut } = request.body;

    if (!id || !username || !nbSeances || !dateDebut) {
        response.status(400).json({ error: 'username, nbSeances and dateDebut are required to update Produit' });
        return;
    }

    const updatedWeek = {};

    if (username) updatedWeek.username = username;
    if (nbSeances) updatedWeek.nbSeances = nbSeances;
    if (dateDebut) updatedWeek.dateDebut = dateDebut;

    if (Object.keys(updatedWeek).length === 0) {
        response.status(400).json({ error: 'At least one field must be updated' });
        return;
    }

    database.collection("Week").updateOne(
        { _id: ObjectId(id) },
        { $set: updatedWeek },
        (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Update error' });
                return;
            }

            if (result.matchedCount === 0) {
                response.status(404).json({ error: 'Week not found' });
                return;
            }

            response.json("Updated Successfully");
        }
    );
});

app.post('/UpdateSeances', upload.none(), (request, response) => {
    const { id,username,weekId,numofSeance,benchSerie,benchRep,benchPoids,benchRpe,benchType,benchBackoffSerie,benchBackoffRep,benchBackoffPoids,benchBackoffRpe,benchBackoffType,squatSerie,squatRep,squatPoids,squatRpe,squatType,squatBackoffSerie,squatBackoffRep,squatBackoffPoids,squatBackoffRpe,squatBackoffType,deadliftSerie,deadliftRep,deadliftPoids,deadliftRpe,deadliftType,deadliftBackoffSerie,deadliftBackoffRep,deadliftBackoffPoids,deadliftBackoffRpe,deadliftBackoffType,renfo,commentaire } = request.body;

    if (!id || !username || !weekId || !numofSeance || !benchType || !benchBackoffType || !squatType || !squatBackoffType || !deadliftType || !deadliftBackoffType || !renfo) {
        response.status(400).json({ error: 'Informations are required to update Produit' });
        return;
    }

    const updatedSeance = {};

    if (username) updatedSeance.username = username;
    if (weekId) updatedSeance.weekId = weekId;
    if (numofSeance) updatedSeance.numofSeance = numofSeance;
    if (benchSerie) updatedSeance.benchSerie = benchSerie;
    if (benchRep) updatedSeance.benchRep = benchRep;
    if (benchPoids) updatedSeance.benchPoids = benchPoids;
    if (benchRpe) updatedSeance.benchRpe = benchRpe;
    if (benchType) updatedSeance.benchType = benchType;
    if (benchBackoffSerie) updatedSeance.benchBackoffSerie = benchBackoffSerie;
    if (benchBackoffRep) updatedSeance.benchBackoffRep = benchBackoffRep;
    if (benchBackoffPoids) updatedSeance.benchBackoffPoids = benchBackoffPoids;
    if (benchBackoffRpe) updatedSeance.benchBackoffRpe = benchBackoffRpe;
    if (benchBackoffType) updatedSeance.benchBackoffType = benchBackoffType;
    if (squatSerie) updatedSeance.squatSerie = squatSerie;
    if (squatRep) updatedSeance.squatRep = squatRep;
    if (squatPoids) updatedSeance.squatPoids = squatPoids;
    if (squatRpe) updatedSeance.squatRpe = squatRpe;
    if (squatType) updatedSeance.squatType = squatType;
    if (squatBackoffSerie) updatedSeance.squatBackoffSerie = squatBackoffSerie;
    if (squatBackoffRep) updatedSeance.squatBackoffRep = squatBackoffRep;
    if (squatBackoffPoids) updatedSeance.squatBackoffPoids = squatBackoffPoids;
    if (squatBackoffRpe) updatedSeance.squatBackoffRpe = squatBackoffRpe;
    if (squatBackoffType) updatedSeance.squatBackoffType = squatBackoffType;
    if (deadliftSerie) updatedSeance.deadliftSerie = deadliftSerie;
    if (deadliftRep) updatedSeance.deadliftRep = deadliftRep;
    if (deadliftPoids) updatedSeance.deadliftPoids = deadliftPoids;
    if (deadliftRpe) updatedSeance.deadliftRpe = deadliftRpe;
    if (deadliftType) updatedSeance.deadliftType = deadliftType;
    if (deadliftBackoffSerie) updatedSeance.deadliftBackoffSerie = deadliftBackoffSerie;
    if (deadliftBackoffRep) updatedSeance.deadliftBackoffRep = deadliftBackoffRep;
    if (deadliftBackoffPoids) updatedSeance.deadliftBackoffPoids = deadliftBackoffPoids;
    if (deadliftBackoffRpe) updatedSeance.deadliftBackoffRpe = deadliftBackoffRpe;
    if (deadliftBackoffType) updatedSeance.deadliftBackoffType = deadliftBackoffType;
    if (renfo) updatedSeance.renfo = renfo;
    if (commentaire) updatedSeance.commentaire = commentaire;

    if (Object.keys(updatedSeance).length === 0) {
        response.status(400).json({ error: 'At least one field must be updated' });
        return;
    }

    database.collection("Seance").updateOne(
        { _id: ObjectId(id) },
        { $set: updatedSeance },
        (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Update error' });
                return;
            }

            if (result.matchedCount === 0) {
                response.status(404).json({ error: 'Seance not found' });
                return;
            }

            response.json("Updated Successfully");
        }
    );
});

app.post('/UpdateUsers', upload.none(), (request, response) => {
    const { id,username, password, email, role, benchPr, squatPr, deadliftPr } = request.body;

    if (!id || !username || !password || !email || !role || !benchPr || !squatPr || !deadliftPr) {
        response.status(400).json({ error: 'id,username, password, email, benchPr, squatPr and deadliftPr are required to update Produit' });
        return;
    }

    const updatedUser = {};

    if (username) updatedUser.username = username;
    if (password) updatedUser.password = password;
    if (email) updatedUser.email = email;
    if (role) updatedUser.role = role;
    if (benchPr) updatedUser.benchPr = benchPr;
    if (squatPr) updatedUser.squatPr = squatPr;
    if (deadliftPr) updatedUser.deadliftPr = deadliftPr;

    if (Object.keys(updatedUser).length === 0) {
        response.status(400).json({ error: 'At least one field must be updated' });
        return;
    }

    database.collection("User").updateOne(
        { _id: ObjectId(id) },
        { $set: updatedUser },
        (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Update error' });
                return;
            }

            if (result.matchedCount === 0) {
                response.status(404).json({ error: 'Week not found' });
                return;
            }

            response.json("Updated Successfully");
        }
    );
});

// DELETE

app.delete('/DeleteSeances', (request, response) => {
    const seanceId = request.query.id;
    if (!seanceId) {
        return response.status(400).json('Missing ID');
    }
    const objectId = new ObjectId(seanceId);
    database.collection("Seance").deleteOne({ _id: objectId }, (err, result) => {
        if (err) {
            console.error('Error deleting the seance:', err);
            return response.status(500).json('Error deleting the seance');
        }
        if (result.deletedCount === 0) {
            return response.status(404).json('Seance not found');
        }
        response.json(`Delete Successfully ${seanceId}`);
    });
});

app.delete('/DeleteWeeks', (request, response) => {
    const weekId = request.query.id;
    if (!weekId) {
        return response.status(400).json('Missing ID');
    }
    const objectId = new ObjectId(weekId);
    database.collection("Week").deleteOne({ _id: objectId }, (err, result) => {
        if (err) {
            console.error('Error deleting the week:', err);
            return response.status(500).json('Error deleting the week');
        }
        if (result.deletedCount === 0) {
            return response.status(404).json('Week not found');
        }
        response.json(`Delete Successfully ${weekId}`);
    });
});

app.delete('/DeleteUsers', (request, response) => {
    const userId = request.query.id;
    if (!userId) {
        return response.status(400).json('Missing ID');
    }
    const objectId = new ObjectId(userId);
    database.collection("User").deleteOne({ _id: objectId }, (err, result) => {
        if (err) {
            console.error('Error deleting the week:', err);
            return response.status(500).json('Error deleting the week');
        }
        if (result.deletedCount === 0) {
            return response.status(404).json('Week not found');
        }
        response.json(`Delete Successfully ${userId}`);
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