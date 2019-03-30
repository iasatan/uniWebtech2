const express = require('express');
const router = express.Router();
const members = require("../../members");

router.get("/", (req, res) => res.json(members));
router.get("/:id", (req, res) => {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

module.exports = router;