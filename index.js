var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var multer = require("multer");

var app = express();
app.use(cors());
const upload = multer();

var CONNECTION_STRING = "mongodb+srv://admin:zgRCG5e02wk9jRnD@cluster0.vrkekyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "fripandcollect";
var database;

app.listen(5038, async () => {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    } catch (error) {
        console.error("Mongo DB Connection Failed:", error);
    }
});

app.use((req, res) => {
    req.json({message: "c'est en ligne !"});
});


// Partie Get

app.get('/api/fripandcollect/GetUsers', (request, response)=>{
    database.collection("User").find({}).toArray((error, result)=>{
        response.send(result);
    });
})


app.get('/api/fripandcollect/GetFournisseurs', (request, response)=>{
    database.collection("Fournisseur").find({}).toArray((error, result)=>{
        response.send(result);
    });
})


app.get('/api/fripandcollect/GetProduits', (request, response)=>{
    database.collection("Produit").find({}).toArray((error, result)=>{
        response.send(result);
    });
})

app.get('/api/fripandcollect/GetCommandes', (request, response)=>{
    database.collection("Commande").find({}).toArray((error, result)=>{
        response.send(result);
    });
})

app.get('/api/fripandcollect/GetAvis', (request, response)=>{
    database.collection("Avis").find({}).toArray((error, result)=>{
        response.send(result);
    });
})


// Partie Add

app.post('/api/fripandcollect/AddUsers', multer().none(), (request, response) => {
    const { username, password, email } = request.body;

    if (!username || !password) {
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


app.post('/api/fripandcollect/AddFournisseurs', multer().none(), (request, response) => {
    const { nom } = request.body;

    if (!nom) {
        response.status(400).json({ error: 'Name are required' });
        return;
    }

    database.collection("Fournisseur").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newFournisseur = {
            id: (numOfDocs + 1).toString(),
            nom: nom
        };

        database.collection("Fournisseur").insertOne(newFournisseur, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Insertion error' });
                return;
            }
            response.json("Added Successfully");
        });
    });
});


app.post('/api/fripandcollect/AddProduits', multer().none(), (request, response) => {
    const { nom, type, genre, taille, prix, etat, fournisseur, nombre } = request.body;

    if (!nom || !type || !genre || !taille || !prix || !etat || !fournisseur || !nombre) {
        response.status(400).json({ error: 'Nom, Type, Genre, Taille, Prix, Etat, Fournisseur and Nombre are required' });
        return;
    }

    database.collection("Produit").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newProduit = {
            id: (numOfDocs + 1).toString(),
            nom: nom,
            type: type,
            genre : genre,
            taille : taille,
            prix : prix,
            etat : etat,
            fournisseur : fournisseur,
            nombre : nombre
        };

        database.collection("Produit").insertOne(newProduit, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Insertion error' });
                return;
            }
            response.json("Added Successfully");
        });
    });
});


app.post('/api/fripandcollect/AddCommandes', multer().none(), (request, response) => {
    const { products, totalPrice, username } = request.body;

    if (!products || !totalPrice || !username ) {
        response.status(400).json({ error: 'Products, totalPrice, and username are required to place an order' });
        return;
    }

    database.collection("Commande").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newProduit = {
            id: (numOfDocs + 1).toString(),
            products: products,
            totalPrice: totalPrice,
            username: username
        };

        database.collection("Commande").insertOne(newProduit, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Insertion error' });
                return;
            }
            response.json("Added Successfully");
        });
    });
});


app.post('/api/fripandcollect/AddAvis', multer().none(), (request, response) => {
    const { description, etoile, username } = request.body;

    if (!description || !username || !etoile) {
        response.status(400).json({ error: 'Description, etoile and username are required to place an order' });
        return;
    }

    database.collection("Avis").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            response.status(500).json({ error: 'Database error' });
            return;
        }

        const newProduit = {
            id: (numOfDocs + 1).toString(),
            description: description,
            etoile: etoile,
            username: username,
        };

        database.collection("Avis").insertOne(newProduit, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Insertion error' });
                return;
            }
            response.json("Added Successfully");
        });
    });
});


//Partie Update

app.post('/api/fripandcollect/UpdateUsers', multer().none(), (request, response) => {
    const { username, newUsername, newPassword, newEmail } = request.body;

    if (!username) {
        response.status(400).json({ error: 'Username is required to update user' });
        return;
    }

    const updatedUser = {};

    if (newUsername) updatedUser.username = newUsername;
    if (newPassword) updatedUser.password = newPassword;
    if (newEmail) updatedUser.email = newEmail;

    if (Object.keys(updatedUser).length === 0) {
        response.status(400).json({ error: 'At least one field must be updated' });
        return;
    }

    database.collection("User").updateOne(
        { username: username },
        { $set: updatedUser },
        (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Update error' });
                return;
            }

            if (result.matchedCount === 0) {
                response.status(404).json({ error: 'User not found' });
                return;
            }

            response.json("Updated Successfully");
        }
    );
});


app.post('/api/fripandcollect/UpdateFournisseurs', upload.none(), (request, response) => {
    const { id, newName } = request.body;

    if (!id) {
        response.status(400).json({ error: 'Fournisseur ID is required to update fournisseur' });
        return;
    }

    const updatedFournisseur = {};

    if (newName) updatedFournisseur.nom = newName;

    if (Object.keys(updatedFournisseur).length === 0) {
        response.status(400).json({ error: 'At least one field must be updated' });
        return;
    }

    database.collection("Fournisseur").updateOne(
        { id: id },
        { $set: updatedFournisseur },
        (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Update error' });
                return;
            }

            if (result.matchedCount === 0) {
                response.status(404).json({ error: 'Fournisseur not found' });
                return;
            }

            response.json("Updated Successfully");
        }
    );
});


app.post('/api/fripandcollect/UpdateProduits', upload.none(), (request, response) => {
    const { id, nom, type, genre, taille, prix, etat, fournisseur, nombre } = request.body;

    if (!id) {
        response.status(400).json({ error: 'Produit ID is required to update Produit' });
        return;
    }

    const updatedFournisseur = {};

    if (nom) updatedFournisseur.nom = nom;
    if (type) updatedFournisseur.type = type;
    if (genre) updatedFournisseur.genre = genre;
    if (taille) updatedFournisseur.taille = taille;
    if (prix) updatedFournisseur.prix = prix;
    if (etat) updatedFournisseur.etat = etat;
    if (fournisseur) updatedFournisseur.fournisseur = fournisseur;
    if (nombre) updatedFournisseur.nombre = nombre;

    if (Object.keys(updatedFournisseur).length === 0) {
        response.status(400).json({ error: 'At least one field must be updated' });
        return;
    }

    database.collection("Produit").updateOne(
        { id: id },
        { $set: updatedFournisseur },
        (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Update error' });
                return;
            }

            if (result.matchedCount === 0) {
                response.status(404).json({ error: 'Produit not found' });
                return;
            }

            response.json("Updated Successfully");
        }
    );
});


// Partie Delete

app.delete('/api/fripandcollect/DeleteUsers', (request, response)=>{
    const username = request.query.username;
    database.collection("User").deleteOne({
        username
    });
    response.json("Delete Successfully");
})


app.delete('/api/fripandcollect/DeleteFournisseurs', (request, response)=>{
    database.collection("Fournisseur").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})


app.delete('/api/fripandcollect/DeleteProduits', (request, response)=>{
    database.collection("Produit").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})


app.delete('/api/fripandcollect/DeleteCommandes', (request, response)=>{
    database.collection("Commande").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})


app.delete('/api/fripandcollect/DeleteAvis', (request, response)=>{
    database.collection("Avis").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})