import React from "react";

const Page404 = (props) => {
  return (
    <div className={props.className || "h-100 d-flex justify-content-center align-items-center"} style={{flexDirection : 'column'}}>
      <img src="/img/404.svg" width="340"></img>
      <br></br>
      <div className="text-center ">{props.text}</div>
    </div>
  );
};

export default Page404;
