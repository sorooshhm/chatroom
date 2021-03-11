const _ = require("lodash");
const Usermodel = require("../../models/Usermodel");
const { loginValidator } = require("../validators/UserValidator");
const bcrypt = require("bcrypt");
const Chatmodel = require("../../models/Chatmodel");
const mongoose = require("mongoose");
class Controller {
  test(rea, res) {
    res.send(global.server);
  }
  async login(req, res) {
    const body = _.pick(req.body, ["username", "password"]);
    const { error } = loginValidator(body);
    if (error)
      return res.status(400).send({ success: false, message: error.message });
    const user = await Usermodel.findOne({ username: body.username });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "No user found with this username and password",
      });
    let checkPass = bcrypt.compareSync(body.password, user.password);
    if (!checkPass)
      return res.status(404).send({
        success: false,
        message: "No user found with this username and password",
      });
    const token = user.generateUserToken();
    return res
      .header("Access-Control-Expose-Headers", "x-auth-token")
      .header("x-auth-token", token)
      .send({ success: true, message: "successfully logged in" });
  }
  async register(req, res) {
    const body = _.pick(req.body, ["username", "password"]);
    const { error } = loginValidator(body);
    if (error)
      return res.status(400).send({ success: false, message: error.message });
    let user = await Usermodel.findOne({ username: body.username });
    if (user)
      return res.status(400).send({
        success: false,
        message: "This is user has been registered",
      });
    user = new Usermodel(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
    await user.save();
    const token = user.generateUserToken();
    return res
      .header("Access-Control-Expose-Headers", "x-auth-token")
      .header("x-auth-token", token)
      .send({ success: true, message: "successfully registered" });
  }
  async addChat(req, res) {
    const body = _.pick(req.body, ["name"]);
    body.creator = { id: req.user.id, username: req.user.username };
    const chat = new Chatmodel(body);
    await chat.save();

    return res.send(chat._id);
  }
  async getChatDetail(req, res) {
    const id = req.params.chatId;
    if (!mongoose.isValidObjectId(id))
      return res
        .status(404)
        .send({ success: false, message: "The chat not found !" });

    const chat = await Chatmodel.findById(id);
    if (!chat) {
      return res
        .status(404)
        .send({ success: false, message: "The chat not found !" });
    }
    return res.send(chat);
  }
  async getUserDetail(req, res) {
    const id = req.user.id;
    const user = await Usermodel.findById(id);
    return res.send(user);
  }
  async delChat(req, res) {
    const chatId = req.params.chatId;
    const chat = await Chatmodel.findById(chatId);
    const chatIndex = user.chats.findIndex((i) => i.chatId == chatId);
    if (chatIndex == -1)
      return res
        .status(404)
        .send({ success: false, message: "The chat not found !" });
    if (chat.creator.id == req.user.id) {
      await chat.remove();
      user.chats.splice(chatIndex, 1);
      await user.save();
      return res.send({
        success: true,
        message: "The chat successfully deleted ",
      });
    }
    const user = await Usermodel.findById(req.user.id);
    user.chats.splice(chatIndex, 1);
    await user.save();
    return res.send({
      success: true,
      message: "The chat successfully deleted ",
    });
  }
}

module.exports = new Controller();
