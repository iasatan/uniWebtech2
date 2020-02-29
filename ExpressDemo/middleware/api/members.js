const express = require('express');
const router = express.Router();
const members = require("../../members");
const uuid = require("uuid");

router.get("/", (req, res) => res.json(members));
router.get("/:id", (req, res) => {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    };
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "No name or email found in request"});
    }
    members.push(newMember);
    res.json(members);
});
//update member
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        console.log(updateMember);
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                console.log(member);
                res.json({msg: "Member updated", member});
            }
        });
    } else {
        res.status(400).json({msg: "member not found with id: " + req.params.id});
    }
});


router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    console.log(found);
    if (found) {
        res.json({mgs: "member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: "member not found with id: " + req.params.id})
    }
})
module.exports = router;