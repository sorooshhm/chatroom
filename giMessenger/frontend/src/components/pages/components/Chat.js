import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Components.module.css";
import swal from "sweetalert";
import UserCtx from "../../../context/UserContext";
import { delChat } from "../../../api/UserApi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

const Chat = (props) => {
  const linkItem = useRef();
  const userCtx = useContext(UserCtx);
  const history = useHistory();
  const [socket, setSocket] = useState();
  useEffect(() => {
    let mysocket = socketIOClient("http://localhost:8585");
    setSocket(mysocket);
    mysocket.on("requestMessage", (data) => {
      toast.success(data.message);
    });
  }, []);
  const deleteChat = () => {
    swal({
      text: `Do you want to delete ${props.name} chat ?? `,
      icon: "warning",
      buttons: {
        cancel: "No",
        catch: {
          text: "Yes",
          value: true,
        },
      },
    }).then((res) => {
      if (res) {
        userCtx.delChat(props.id);
        socket.emit(
          "leaveChat",
          { chatId: props.id, user: userCtx.user },
          props.id
        );
        history.push("/");
      }
    });
  };
  return (
    <div
      ref={linkItem}
      className={(props.showName ? "p-3 " : "p-1 ") + classes.ChatGroup}
    >
      <div className={classes.overLay} style={{ zIndex: "1" }}></div>
      <div
        className="d-flex align-items-center w-100"
        style={{ zIndex: "100" }}
      >
        <Link to={`/chats/${props.id}`}>
          <img
            src={props.pic}
            width="50"
            height="50"
            style={{ borderRadius: "50%" }}
          ></img>
        </Link>
        {props.showName && (
          <div
            style={{ marginLeft: "10px", flex: 1 }}
            className="test text-dark d-flex justify-content-between align-items-center"
          >
            {props.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              className={"bi bi-x-circle " + classes.delIcon}
              viewBox="0 0 16 16"
              onClick={deleteChat}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
