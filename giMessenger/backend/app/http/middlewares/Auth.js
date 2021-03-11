const jwt = require('jsonwebtoken');
const config = require('../../configs/config');

module.exports = Auth = (req, res, next)=>{
    const token = req.headers["x-auth-token"];
    if(!token){
        return res.status(401).send("You are not a registerd user !")
    };
    try {
        const user = jwt.verify(token ,  config.jwtKey);
        req.user = user;
        return next()
    } catch (error) {
        return res.status(400).send("Your token is not valid !")
    }
}