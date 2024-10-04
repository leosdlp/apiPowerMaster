const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id : id
    })
});


module.exports = router;