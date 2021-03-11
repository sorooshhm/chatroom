import React, { useRef, useState } from "react";
import classes from "./Components.module.css";
import BackGroundDrop from "../../BackGroundDrop";
const NewMessage = (props) => {
  const [message, setMessage] = useState("");
  const formRef = useRef();
  const imgRef = useRef();
  const [sendingImg, setSendingImg] = useState(false);
  const [img, setImg] = useState();
  const submitForm = (e) => {
    e?.preventDefault();
    props.sendMessage(message, img);
    setImg("");
    setSendingImg(false)
    setMessage("");
  };
  const uploadPhoto = (e) => {
   if(e.target.files.length == 0) return setSendingImg(false)
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <form
      className={classes.chatInput}
      action=""
      onSubmit={submitForm}
      ref={formRef}
      onKeyDown={(e) => {
        if (e.ctrlKey && e.keyCode === 13) submitForm();
      }}
      style={{ background: "#d6d6d6" }}
    >
      {sendingImg && (
        <div
          className="bg-light p-5 d-flex justify-content-center"
          style={{
            paddingTop : '8px !important',
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            overflow: "visible",
            zIndex: "9",
            flexDirection : 'column',
            minWidth : '250px'
          }}
        >
          <img
            src={img}
            style={{ maxHeight: "150px", maxWidth: "100px",display : 'block',textAlign : 'center', marginBottom : '15px'}}
          ></img>
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <button
          className={"btn w-100 mt-2 " + classes.createChatBtn}
          onClick={submitForm}
        >
          send
        </button>
        </div>
      )}
      <input type="file" className="d-none" ref={imgRef} onChange={uploadPhoto} />
      <BackGroundDrop
        open={sendingImg}
        setOpen={() => {setImg("");setSendingImg((i) => !i)}}
      />
      <div
        style={{
          overflow: "hidden",
          minWidth: "90%",
          maxWidth: "90%",
          position: "relative",
        }}
      >
        <textarea
          className="form-control p-2"
          id="exampleFormControlTextarea1"
          style={{
            minHeight: "50px",
            maxHeight: "50px",
            width: "100%",
            borderRadius: "37px",
          }}
          placeholder="message ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <a
          onClick={() => {
            imgRef.current.click();
            setSendingImg((i) => !i);
          }}
          className={classes.attachIcon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            className={"bi bi-paperclip "}
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>{" "}
        </a>
      </div>
      {/* <div className={classes.sendBtn}>
        <img src="/img/send.svg" className={classes.sendImg}></img>
      </div> */}

      <a className={classes.sendBtn} onClick={submitForm}>
        <img src="/img/send.svg" className={classes.sendImg}></img>
      </a>
    </form>
  );
};

export default NewMessage;
