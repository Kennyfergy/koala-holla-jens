const express = require("express");
// const koalaRouter = express.Router();
const router = express.Router();
// DB CONNECTION
const pool = require("../modules/pool");

// GET

// POST

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
