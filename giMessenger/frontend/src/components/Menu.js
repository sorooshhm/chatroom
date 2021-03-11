import React, { useContext, useEffect, useState } from "react";
import classes from "./Layout.module.css";
import Chat from "./pages/components/Chat";
import { Link } from "react-router-dom";
import UserCtx from "../context/UserContext";

const Menu = () => {
  const [open, setOpen] = useState(true);
  const userCtx = useContext(UserCtx);
  useEffect(() => {}, []);
  return (
    <>
      <div
        className={classes.leftMenu}
        style={{
          width: !open ? "60px" : "22%",
          minWidth: !open ? "unset" : "200px",
          boxShadow: "1px 5px 5px 1px rgb(0 0 0 / 40%)",
          
        }}
      >
        <div
          className="d-flex p-2 align-items-center"
          style={{ backgroundColor: "#800080ab", height : '49px' }}
        >
          <div
            className="d-none d-sm-none d-lg-flex d-md-flex"
            style={{
              flexDirection: "column",
              width: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpen((i) => !i)}
          >
            <div
              className="mb-1"
              style={{ borderTop: "2px solid white" }}
            ></div>
            <div
              className="mb-1"
              style={{ borderTop: "2px solid white" }}
            ></div>
            <div style={{ borderTop: "2px solid white" }}></div>
          </div>
          {open && (
            <div
              className="text-light d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.3rem", marginLeft: "10px", flex: 1 }}
            >
              <Link to="/">
                <span className="m-1">{userCtx.user.username}</span>
              </Link>
              <Link to="/newChat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </Link>
            </div>
          )}
        </div>
        <hr></hr>
        {userCtx.user.chats.map((chat, index) => {
          return (
            <Chat
              key={chat._id || index}
              name={chat.name}
              id={chat.chatId}
              showName={open}
              pic={chat.pic || "/img/noPhoto.png"}
            />
          );
        })}
      </div>
      <div
        className={"d-flex d-lg-none d-md-none d-sm-flex " + classes.smMenu}
        style={{
          left: userCtx.smMenuOpen ? "0" : "-100%",
          flexDirection: "column",
        }}
      >
        <div className="d-flex p-2 align-items-center">
          <div
            className="d-none d-sm-none d-lg-flex d-md-flex"
            style={{
              flexDirection: "column",
              width: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpen((i) => !i)}
          >
            <div
              className="mb-1"
              style={{ borderTop: "2px solid black" }}
            ></div>
            <div
              className="mb-1"
              style={{ borderTop: "2px solid black" }}
            ></div>
            <div style={{ borderTop: "2px solid black" }}></div>
          </div>
          {open && (
            <div
              className="text-light d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.3rem", marginLeft: "10px", flex: 1 }}
            >
              <Link to="/">
                <span>{userCtx.user.username}</span>
              </Link>
              <Link to="/newChat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </Link>
            </div>
          )}
        </div>
        <hr></hr>
        {userCtx.user.chats.map((chat, index) => {
          return (
            <Chat
              key={chat._id || index}
              name={chat.name}
              id={chat.chatId}
              showName={open}
              pic={chat.pic || "/img/noPhoto.png"}
            />
          );
        })}
      </div>
    </>
  );
};

export default Menu;
