const express = require("express");
const router = express.Router();
const koalaRouter = express.Router();
// DB CONNECTION
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
  console.log("GET request at /koala");
  const queryText = `SELECT * FROM "koala_database" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("Error in GET request", err);

      res.sendStatus(500);
    });
});

// POST

// PUT

// DELETE

module.exports = koalaRouter;
