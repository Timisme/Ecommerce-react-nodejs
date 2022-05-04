const router = require("express").Router();
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const user = require("../models/user");
const { verifyToken, verifyTokenAndAutherization } = require("./verifyToken");

// UPDATE 
router.put("/:id", verifyTokenAndAutherization, (req, res) => {
    if(req.body.password) {
        req.body.password= CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SECRET_KEY
        ).toString();
    }

    try{
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body // take everything inside the request.body and set it again 
            },
            {new: true} // return an updated user
        );
        res.status(200).json(updatedUser);
    } catch(err) {
        res.status(500).json(err);
    }
})

// DELETE 
router.delete("/:id", verifyTokenAndAutherization, async (req, res) => {
    try{
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;