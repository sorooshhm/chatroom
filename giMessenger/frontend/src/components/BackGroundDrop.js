import React from "react";

const BackGroundDrop = (props) => {
  return props.open && (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        opacity: ".65",
        top : '0',
        left : '0',
        zIndex: "8",
        background: "gray",
      }}
      onClick={()=> props.setOpen()}
    ></div>
  );
};

export default BackGroundDrop;
