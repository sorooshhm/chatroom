import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { getUserDetail } from "../api/UserApi";
import UserCtx from "../context/UserContext";
import classes from "./Layout.module.css";
import Menu from "./Menu";
import ReactLoading from "react-loading";
import BackGroundDrop from "./BackGroundDrop";
class Layout extends Component {
  state = {
    user: 0,
    smMenuOpen : false
  };
  componentDidMount() {
    getUserDetail((ok, data) => {
      if (!ok) return;
      this.setState({ user: data });
    });
  }
  addChat = (data) => {
    const nu = { ...this.state.user };
    nu.chats.push(data);
    this.setState({ user: nu });
  };
  delChat = (id) => {
    const chatIndex = this.state.user.chats.findIndex((i) => i.chatId == id);
    const chats = [...this.state.user.chats];
    chats.splice(chatIndex, 1);
    console.log(chats);
    this.setState((i) => ({
      user: { ...i.user, chats },
    }));
  };
  render() {
    return !this.state.user ? (
      <div
        className={classes.App}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ReactLoading type={"spin"} color={"purple"} height={70} width={70} />
        <div className="m-2">Please wait ...</div>
      </div>
    ) : (
      <div className={classes.App}>
        <BackGroundDrop open={this.state.smMenuOpen} setOpen={()=> this.setState((i)=> ({smMenuOpen : !i.smMenuOpen}))}/>
        <UserCtx.Provider
          value={{
            user: this.state.user,
            addChat: (data) => this.addChat(data),
            delChat: (data) => this.delChat(data),
            smMenuOpen : this.state.smMenuOpen,
            setSmMenu: () => this.setState((i) => ({ smMenuOpen: !i.smMenuOpen })),
          }}
        >
          <Menu />
          <div className={classes.mainPart}>{this.props.children}</div>
        </UserCtx.Provider>
      </div>
    );
  }
}

export default Layout;
