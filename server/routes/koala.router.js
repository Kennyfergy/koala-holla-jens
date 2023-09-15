const express = require("express");
const router = express.Router();
// DB CONNECTION
const pool = require("../modules/pool");

// GET

// POST
router.post("/", (req, res) => {
    let newKoala = req.body;
    console.log ("in POST", newKoala);
    let queryText = `INSERT INTO "profile" ("name", "gender", "age", "ready_for_transfer", "notes") VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyToTransfer, newKoala.notes])
    .then((result) => {
        res.sendStatus(201);
        console.log("in POST", result);
    }).catch((error) => {
        console.log("in POST", error);
        res.sendStatus(500);
    })
    })


// PUT

// DELETE

module.exports = router;
