const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 11,
    required: true,
  },
  pic: String,
  creator: {
    username: String,
    id: String,
  },
  messages: [
    {
      sender: {
        username: String,
        id: String,
      },
      text: {
        type: String,
      },
      mes: { type: String },
      time : {type : String , require : true},
      pic : {type : String}
    },
  ],
});

const Chatmodel = mongoose.model("chats", schema);

module.exports = Chatmodel;
