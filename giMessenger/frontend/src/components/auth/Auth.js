import React, { useState } from 'react';
import classes from "../Layout.module.css";
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [tab , setTab] =useState(0)
    return (
        <div style={{ height: "100vh" }}>
          <div className="row h-100">
            {!tab ? <Login changeTab={()=>setTab(1)}/> : <SignUp changeTab={()=>setTab(0)}/>}
            <div
              className={
                "container col-lg-6 col-md-6 col-12 d-flex  " +
                classes.rightSideLogin
              }
            >
              <img className={classes.rightPhoto} src={"/img/chatting.svg"}></img>
            </div>
          </div>
        </div>
      );
}

export default Auth;
