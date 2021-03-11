import React, { useState } from "react";
import { toast } from "react-toastify";
import { UserRegister } from "../../api/UserApi";
import classes from "../Layout.module.css";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPassword] = useState("");
  const signUp = () => {
    if (!username) return toast.error("Please fill the Username filed !");
    if (!password) return toast.error("Please fill the Password field !");
    if (!repeatPass)
      return toast.error("Please fill the Repeat Password field !");
    if (repeatPass !== password)
      return toast.error("The Passwords don't match !");
    const body = {
      username,
      password,
    };
    UserRegister(body, (ok, data) => {
      if (!ok) return toast.error(data?.message);
      toast.success(data.message);
      localStorage.setItem(btoa("user"), data.token["x-auth-token"]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  };
  return (
    <div className={"col-lg-6 col-md-6 col-12 d-flex align-items-center p-5"}>
      <div
        className={
          "container  mx-auto accordion-body " + classes.loginContainer
        }
      >
        <div
          className="text-center overflow-hidden"
          style={{ fontSize: "2rem" }}
        >
          Sign Up
        </div>
        <br></br>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          </span>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            aria-label="password"
            aria-describedby="basic-addon2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          </span>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            aria-label="password"
            aria-describedby="basic-addon3"
            placeholder="Repeat Password"
            value={repeatPass}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button className={"btn w-100 " + classes.loginBtn} onClick={signUp}>
          SignUp
        </button>
        <br></br>
        <br></br>
        <div className="text-dark text-center" style={{ fontSize: ".8rem" }}>
          You've already have an account?{" "}
          <a
            onClick={props.changeTab}
            style={{ cursor: "pointer", color: "purple" }}
          >
            click to log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
