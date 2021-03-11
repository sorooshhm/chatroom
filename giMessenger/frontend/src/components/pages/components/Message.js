import React from "react";
import jwt from "jsonwebtoken";
import classes from "./Components.module.css";

const Message = (props) => {
  const user = jwt.verify(
    localStorage.getItem(btoa("user")),
    "MessengerSorooshJsonWebToken"
  );
  return props.type !== "event" ? (
    <div
      style={{
        justifyContent: user.id == props.id ? "flex-end" : "flex-start",
        padding: "10px",
      }}
      className="mb-1 d-flex"
    >
      {user.id == props.id && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle"
          viewBox="0 0 16 16"
          style={{ transform: "translate(-8px , 100%)", cursor: "pointer" }}
          onClick={() => props.deleteMessage(props.mesId)}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      )}
      <div
        className={classes.message + " d-flex "}
        style={user.id == props.id ? { background: "#ba01ba" } : {}}
      >
        <span style={{ marginTop: "-10px", opacity: ".7" }} className="mb-1">
          {props.username}
        </span>
        {props.pic && <img src={props.pic} style={{borderRadius : '15px', marginBottom : '8px'}} className="w-100"></img>}
        <span style={{ textAlign: "left" }}>{props.message}</span>
        <div
          style={{
            opacity: ".7",
            marginBottom: "-10px",
            textAlign: user.id == props.id ? "right" : "left",
          }}
        >
          {props.time}
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        justifyContent: user.id == props.id ? "flex-end" : "flex-start",
        padding: "10px 20px 10px 20px",
        borderRadius: "20px",
      }}
      className="mb-1 d-flex justify-content-center"
    >
      <div
        className=" bg-secondary text-light"
        style={{
          opacity: ".8",
          padding: "10px 20px 10px 20px",
          borderRadius: "20px",
        }}
      >
        {props.message}
      </div>
    </div>
  );
};

export default Message;
