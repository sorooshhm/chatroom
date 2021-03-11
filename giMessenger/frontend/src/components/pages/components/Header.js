import React, { useContext } from "react";
import UserCtx from "../../../context/UserContext";

const Header = (props) => {
  const menuCtx = useContext(UserCtx);
  return (
    <div
      className="w-100 text-center p-2 d-flex align-items-center"
      style={{
        position: "absolute",
        top: 0,
        background: "rgb(142 43 142)",
        color: "white",
        boxShadow: "rgb(0 0 0 / 40%) 0px 5px 8px 0px",
        zIndex : '2',
        flexDirection : 'row',
        height : '49px'
      }}
    >
        <div
          className="d-flex d-lg-none d-md-none d-sm-flex"
          style={{ flexDirection: "column", width: "20px", cursor: "pointer" }}
          onClick={() => menuCtx.setSmMenu()}
        >
          <div className="mb-1" style={{ borderTop: "2px solid black" }}></div>
          <div className="mb-1" style={{ borderTop: "2px solid black" }}></div>
          <div style={{ borderTop: "2px solid black" }}></div>
        </div>
      <span className="w-100 text-center">{props.title}</span>
    </div>
  );
};

export default Header;
