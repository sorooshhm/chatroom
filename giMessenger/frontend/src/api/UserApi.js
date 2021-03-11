let ApiInstance = require("./ApiInstance");
ApiInstance = ApiInstance.default;
export const UserLogin = (data, cb) => {
  ApiInstance.post("/user/login", data)
    .then((res) => {
      const data = { ...res.data, token: res.headers };
      cb(true, data);
    })
    .catch((err) => {
      console.log(err);
      cb(false, err);
    });
};
export const UserRegister = (data, cb) => {
  ApiInstance.post("/user/register", data)
    .then((res) => {
      const data = { ...res.data, token: res.headers };
      cb(true, data);
    })
    .catch((err) => {
      console.log(err);
      cb(false, err?.response?.data);
    });
};
export const getChatDetail = (data, cb) => {
  ApiInstance.get("/user/getChatDetail/" + data)
    .then((res) => {
      const data = { ...res.data };
      cb(true, data);
    })
    .catch((err) => {
      cb(false, err.response.data);
    });
};
export const getUserDetail = ( cb) => {
  ApiInstance.get("/user/getUserDetail/")
    .then((res) => {
      const data = { ...res.data };
      cb(true, data);
    })
    .catch((err) => {
      cb(false, err.response.data);
    });
};
export const delChat = ( id,cb) => {
  ApiInstance.get("/user/deleteChat/"+id)
    .then((res) => {
      const data = { ...res.data };
      cb(true, data);
    })
    .catch((err) => {
      cb(false, err.response.data);
    });
};
