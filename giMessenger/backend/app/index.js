const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Api = require("./routes/Api");
const Chatmodel = require("./models/Chatmodel");
const Usermodel = require("./models/Usermodel");

class Application {
  constructor() {
    this.setUpRoutesAndMiddlewares();
    this.setupServer();
    this.setupDataBase();
  }
  setUpRoutesAndMiddlewares() {
    // middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    // routes
    app.use("/api", Api);
  }
  setupDataBase() {
    mongoose
      .connect("mongodb://localhost:27017/messenger", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((res) => {
        console.log("DB Connected");
      })
      .catch((err) => {
        console.log("Db didn't connect \n\n", err);
      });
  }
  setupServer() {
    const port = process.env.MSPORT || 8585;
    const server = app.listen(port, (err) => {
      if (err) throw err;
      console.log("App is listening to port " + port);
    });
    global.server = server;
    var io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      socket.on("create", async function (room) {
        let chat = new Chatmodel(room);
        chat = await chat.save();
        const user = await Usermodel.findById(room.creator.id);
        if (!user.chats.find((i) => i.chatId == chat._id)) {
          user.chats.push({ chatId: chat._id, name: chat.name, pic: chat.pic });
          await user.save();
        }
        socket.join(chat._id);
        socket.emit("roomCreated", chat._id);
      });
      socket.on("join", async (data) => {
        const chat = await Chatmodel.findById(data.room);
        const user = await Usermodel.findById(data.user._id);
        if (user.chats.filter((i) => i.chatId == chat._id).length == 0) {
          console.log("added");
          user.chats.push({ chatId: chat._id, name: chat.name, pic: chat.pic });
          await user.save();
          socket.emit("joinedNewGap", {
            chatId: chat._id,
            name: chat.name,
            pic: chat.pic,
          });
          console.log("joined");
          chat.messages.push({
            text: data.user.username + " has joined the chat ",
            mes: "event",
          });
          await chat.save();
          socket.join(data.room);
          io.to(data.room).emit("message", {
            text: data.user.username + " has joined the chat ",
            mes: "event",
          });
          return;
        }
        socket.join(data.room);
        socket.emit("joinedNewGap", {
          chatId: chat._id,
          name: chat.name,
          pic: chat.pic,
        });
      });
      socket.on("disconnect", (socket) => {});
      socket.on("newMessage", async (data, room) => {
        const chat = await Chatmodel.findById(room);
        chat.messages.push({
          ...data,
          time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
        await chat.save();
        io.to(room).emit("message", {
          ...data,
          time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
      });
      socket.on("delMessage", async (data, room) => {
        const chat = await Chatmodel.findById(room);
        chat.messages.id(data)?.remove();
        await chat.save();
        io.to(room).emit("updateMessage", chat.messages);
      });
      socket.on("leaveChat", async (data, room) => {
        const user = await Usermodel.findById(data.user._id);
        const chatId = data.chatId;
        const chat = await Chatmodel.findById(chatId);
        const chatIndex = user.chats.findIndex((i) => i.chatId == chatId);
        if (!chat) {
          user.chats.splice(chatIndex, 1);
          await user.save();
          return socket.emit("requestMessage", {
            success: true,
            message: "The chat successfully deleted ",
          });
        }
        if (chatIndex == -1)
          return res
            .status(404)
            .send({ success: false, message: "The chat not found !" });
        io.to(room).emit("message", {
          text: data.user.username + " has leaved the chat ",
          mes: "event",
        });
        socket.leave(room);
        chat.messages.push({
          text: data.user.username + " has leaved the chat ",
          mes: "event",
        });
        await chat.save();
        if (chat.creator.id == data.user._id) {
          await chat.remove();
          user.chats.splice(chatIndex, 1);
          await user.save();

          return socket.emit("requestMessage", {
            success: true,
            message: "The chat successfully deleted ",
          });
        }
        user.chats.splice(chatIndex, 1);
        await user.save();
        return socket.emit("requestMessage", {
          success: true,
          message: "The chat successfully deleted ",
        });
      });
    });
  }
}

module.exports = Application;
