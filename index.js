var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var multer = require("multer");

var app = express();
app.use(cors());
app.use(express.json()); // Pour gérer les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour gérer les requêtes URL-encoded
const upload = multer();

var CONNECTION_STRING = "mongodb+srv://admin:zgRCG5e02wk9jRnD@cluster0.vrkekyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "fripandcollect";
var database;

// Port dynamique pour Vercel
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log(`Mongo DB Connection Successful on port ${PORT}`);
    } catch (error) {
        console.error("Mongo DB Connection Failed:", error);
    }
});

// Partie Get

app.get('/api/fripandcollect/GetUsers', (request, response) => {
    database.collection("User").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

app.get('/api/fripandcollect/GetFournisseurs', (request, response) => {
    database.collection("Fournisseur").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

app.get('/api/fripandcollect/GetProduits', (request, response) => {
    database.collection("Produit").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

app.get('/api/fripandcollect/GetCommandes', (request, response) => {
    database.collection("Commande").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

app.get('/api/fripandcollect/GetAvis', (request, response) => {
    database.collection("Avis").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

// Partie Add

app.post('/api/fripandcollect/AddUsers', upload.none(), (request, response) => {
    const { username, password, email } = request.body;

    if (!username || !password) {
        return response.status(400).json({ error: 'Username and password are required' });
    }

    const newUser = { username, password, email };

    database.collection("User").insertOne(newUser, (err, result) => {
        if (err) {
            return response.status(500).json({ error: 'Insertion error' });
        }
        response.json("Added Successfully");
    });
});

app.post('/api/fripandcollect/AddFournisseurs', upload.none(), (request, response) => {
    const { nom } = request.body;

    if (!nom) {
        return response.status(400).json({ error: 'Name is required' });
    }

    const newFournisseur = { nom };

    database.collection("Fournisseur").insertOne(newFournisseur, (err, result) => {
        if (err) {
            return response.status(500).json({ error: 'Insertion error' });
        }
        response.json("Added Successfully");
    });
});

// Partie Update

app.post('/api/fripandcollect/UpdateUsers', upload.none(), (request, response) => {
    const { username, newUsername, newPassword, newEmail } = request.body;

    if (!username) {
        return response.status(400).json({ error: 'Username is required' });
    }

    const updatedUser = {};

    if (newUsername) updatedUser.username = newUsername;
    if (newPassword) updatedUser.password = newPassword;
    if (newEmail) updatedUser.email = newEmail;

    database.collection("User").updateOne(
        { username },
        { $set: updatedUser },
        (err, result) => {
            if (err) {
                return response.status(500).json({ error: 'Update error' });
            }
            if (result.matchedCount === 0) {
                return response.status(404).json({ error: 'User not found' });
            }
            response.json("Updated Successfully");
        }
    );
});

// Partie Delete

app.delete('/api/fripandcollect/DeleteUsers', (request, response) => {
    const username = request.query.username;
    database.collection("User").deleteOne({ username }, (err, result) => {
        if (err) {
            return response.status(500).json({ error: 'Deletion error' });
        }
        if (result.deletedCount === 0) {
            return response.status(404).json({ error: 'User not found' });
        }
        response.json("Delete Successfully");
    });
});

// Ajoutez les autres routes de la même manière...

