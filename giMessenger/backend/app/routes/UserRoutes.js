const express = require("express");
const UserController = require("../http/controllers/UserController");
const Auth = require("../http/middlewares/Auth");
const Usermodel = require("../models/Usermodel");
const router = express.Router();

router.get("/validateToken", Auth, async(req, res)=> {
    const user = await Usermodel.findById(req.user.id);
    if(!user)
        return res.status(401).send({success :false, message : "You are not a valid user "});
    return res.send("you are a valid user")    
});
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/getChatDetail/:chatId", UserController.getChatDetail);
router.get("/getUserDetail/",Auth,  UserController.getUserDetail);
router.get("/deleteChat/:chatId", Auth ,UserController.delChat)
// router.post("/newChat",Auth, UserController.addChat);
// router.get("/test", UserController.test)

module.exports = router;
