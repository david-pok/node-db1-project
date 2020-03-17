const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

// THIS
// db.select("*").from("accounts")
// IS THE SAME AS THIS
// db("accounts")

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(err => {
      res.status(500).json({ message: "ERRORD" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(acc => {
      res.status(200).json({ data: acc });
    })
    .catch(err => {
      res.status(500).json({ message: "ERRORD" });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ response: ids });
    })
    .catch(err => {
      res.status(500).json({ message: "ERRORDS" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "account updated successfully" });
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "ERRORD" });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "account deleted successfully" });
      } else {
        res.status(404).json({ message: "accouunt not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "ERRORD" });
    });
});
module.exports = router;
