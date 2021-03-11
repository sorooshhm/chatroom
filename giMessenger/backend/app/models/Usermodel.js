const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 11,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [{ chatId: { type: String, ref: "chat" }, name : String, pic : String }],
});

schema.methods.generateUserToken = function () {
  const data = {
    id: this._id,
    username: this.username,
  };
  const token = jwt.sign(data, config.jwtKey);
  return token;
};

const Usermodel = mongoose.model("users", schema);

module.exports = Usermodel;
