import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./components/auth/Auth";
import Home from "./components/pages/Home";
import ChatPage from "./components/pages/ChatPage";
import NewChat from "./components/pages/NewChat";
import Page404 from "./components/pages/page404";
import UserCtx from "./context/UserContext";
import axios from "axios";

const isLogin = () => {
  if (!localStorage.getItem(btoa("user"))) {
    return false;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8585/api/user/validateToken", false);
  let res;
  xhr.onload = () => {
    if (xhr.status == 200) {
      return (res = true);
    }
    res = false;
  };
  xhr.setRequestHeader(
    "x-auth-token",
    localStorage.getItem(btoa("user")) || ""
  );
  xhr.send();
  return res;
};

const PrivateRoute = ({ render, ...props }) => {
  if (!isLogin()) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} render={render}></Route>;
};
const PublicRoute = ({ component: Component, ...props }) => {
  if (isLogin()) {
    return <Redirect to="/" />;
  }
  return <Route {...props} component={Component}></Route>;
};
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/newChat" component={NewChat} />
          <PublicRoute exact path={"/login"} component={Auth}></PublicRoute>
          <PrivateRoute
            path="/"
            render={() => {
              return (
                
                  <Layout>
                    <Switch>
                      <Route
                        exact
                        path="/chats/:chatId"
                        component={ChatPage}
                      ></Route>
                      <Route exact path="/" component={Home}></Route>
                      <Route path="/" component={Page404} />
                    </Switch>
                  </Layout>
              );
            }}
          ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
