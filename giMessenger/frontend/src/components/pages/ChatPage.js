import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import NewMessage from "./components/NewMessage";
import socketIOClient from "socket.io-client";
import Message from "./components/Message";
import { getChatDetail } from "../../api/UserApi";
import Page404 from "./page404";
import UserCtx from "../../context/UserContext";

const ChatPage = (props) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const userCtx = useContext(UserCtx);
  const [chat, setChat] = useState({});
  const [socket, setSocket] = useState();
  const messagesContainer = useRef();
  const delMessage = (id) => {
    socket.emit("delMessage", id, props.match.params.chatId);
  };
  useEffect(() => {
    getChatDetail(props.match.params.chatId, (ok, data) => {
      if (!ok) return setChat("no");
      setChat(data);
      setMessages(data.messages);
    });
    let mysocket = socketIOClient("http://localhost:8585");
    setSocket(mysocket);
    mysocket.emit("join", {
      room: props.match.params.chatId,
      user: userCtx.user,
    });
    mysocket.on("message", (data) => {
      setMessages((i) => [...i, data]);
    });
    mysocket.on("joinedNewGap", (data) => {
      if (userCtx.user.chats.filter((i) => i.chatId == data.chatId).length == 0)
        userCtx.addChat(data);
    });
    mysocket.on("updateMessage", (data) => {
      setMessages(data);
    });
  }, [props]);
  useEffect(() => {
    messagesContainer.current.scroll(0, messagesContainer.current.scrollHeight);
  }, [messages]);
  const sendMessage = (message, img) => {
    const body = {
      sender: {
        id: userCtx.user._id,
        username: userCtx.user.username,
      },
      text: message,
      pic: img,
    };
    socket.emit("newMessage", body, props.match.params.chatId);
  };
  return chat !== "no" ? (
    <div
      className="h-100 d-flex"
      style={{ position: "relative", background: "", flexDirection: "column" }}
    >
      <Header title={chat.name} />
      <div ref={messagesContainer} className="mb-2" style={{ flex: 1 }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {messages.map((i, index) => {
          return (
            <Message
              username={i.sender?.username}
              key={index}
              message={i.text}
              id={i.sender?.id}
              mesId={i._id}
              deleteMessage={delMessage}
              type={i.mes}
              time={i.time}
              pic={i.pic}
            />
          );
        })}
      </div>
      <NewMessage sendMessage={sendMessage} />
    </div>
  ) : (
    <Page404 text="Maybe this chat has been deleted !" />
  );
};

export default ChatPage;
