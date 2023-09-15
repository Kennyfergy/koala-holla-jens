const express = require("express");

// const koalaRouter = express.Router();

const router = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
  console.log("GET request at /koala");
  const queryText = `SELECT * FROM "profile" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error in GET request", err);

      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
    let newKoala = req.body;
    console.log ("in POST", newKoala);
    let queryText = `INSERT INTO "profile" ("name", "gender", "age", "ready_for_transfer", "notes") VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_for_transfer, newKoala.notes])
    .then((result) => {
        res.sendStatus(201);
        console.log("in POST", result);
    }).catch((error) => {
        console.log("in POST", error);
        res.sendStatus(500);
    })
    })


// PUT
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const ready_to_transfer = req.body.ready_to_transfer;
    
    const queryText = `UPDATE "profile" SET "ready_to_transfer" = $1 WHERE "id" = $2;`;
  
    pool.query(queryText, [ready_to_transfer, id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log("Error in UPDATING profile table", err);
        res.sendStatus(500);
      });
  });
// DELETE

module.exports = router;