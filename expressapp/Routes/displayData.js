const mongoose = require("mongoose");
const router = require("express").Router();

router.post("/api/data", async (req, res) => {
    try {
        const fetchedItems = global.carData;
        res.json({success: true, data: fetchedItems});
    } catch (error) {
        console.log("error occured due to fething items"+error.message)
    }
})

module.exports = router;
