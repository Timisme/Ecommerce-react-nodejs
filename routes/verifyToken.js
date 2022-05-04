const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, user) => {
                if (err) res.status(401).json("token is not valid");
                req.user = user;
                next(); // leave the function and go to routers
            }
        )
    } else {
        return res.status(401).json("You are not authenticated")
    }
};

const verifyTokenAndAutherization = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAutherization };