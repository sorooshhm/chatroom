import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import classes from "./components/Components.module.css";
import socketIOClient from "socket.io-client";
import jwt from "jsonwebtoken";

const NewChat = (props) => {
  const imgFile = useRef();
  const [img, setImg] = useState("");
  const [socket, setSocket] = useState();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      const decodeUser = jwt.verify(
        localStorage.getItem(btoa("user")),
        "MessengerSorooshJsonWebToken"
      );
      setUser(decodeUser);
      let mysocket = socketIOClient("http://localhost:8585");
      setSocket(mysocket);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const uploadPhoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const createChat = () => {
    if (name.length > 11) {
      return toast.error("The name field has to be at most 11 charachters");
    }
    if (name.length < 4) {
      return toast.error("The name field has to be at least 4 charachters");
    }
    const body = {
      name,
      creator: { username: user.username, id: user.id },
      pic: img,
    };
    socket.emit("create", body);
    socket.on("roomCreated", (data) => {
      props.history.push("/chats/" + data);
    });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 "
      style={{ height: "100vh" }}
    >
      <div
        className="bg-light p-5"
        style={{
          borderRadius: "10px",
          boxShadow: "rgb(0 0 0 / 40%) 0px 12px 8px 0px",
          position: "relative",
          overflow: "visible",
        }}
      >
        <img
          src={img || "/img/noPhoto.png"}
          className={classes.newChatImg}
          onClick={() => imgFile.current.click()}
        ></img>
        <input
          type="file"
          className="d-none"
          ref={imgFile}
          onChange={(e) => uploadPhoto(e)}
        ></input>
        <br></br>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </span>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <button
          onClick={createChat}
          className={"btn w-100 mt-2 " + classes.createChatBtn}
        >
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default NewChat;
