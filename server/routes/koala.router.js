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
    let queryText = `INSERT INTO "profile" ("name", "gender", "age", "notes") VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.notes])
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
    const ready_for_transfer = req.body.ready_to_transfer;
    
    const queryText = `UPDATE "profile" SET "ready_for_transfer" = true WHERE "id" = $1;`;
    pool.query(queryText, [id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log("Error in UPDATING profile table", err);
        res.sendStatus(500);
      });
  });

// DELETE
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log(`DELETE route in /profile/ with id of`, id);
    const queryText = `DELETE FROM "profile" WHERE "id" = $1;`;
  
    pool
      .query(queryText, [id])
      .then(() => res.sendStatus(204)) //204 no content
      .catch((err) => {
        console.log("Error in DELETING from profile table", err);
        res.sendStatus(500);
      });
  });
module.exports = router;
