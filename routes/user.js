const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("test ok");
});

router.post("/posttest", (req, res) => {
    const username = req.body.username
    res.send(username);
});

module.exports = router;