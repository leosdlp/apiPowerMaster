const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    database.collection("User").find({}).toArray((error, result)=>{
        response.send(result);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id : id
    })
});


module.exports = router;