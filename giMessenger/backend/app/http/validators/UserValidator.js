const joi = require("joi");

const loginValidator = (data) => {
  const schema = joi.object({
    username: joi.string().required().min(4).max(11),
    password: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { loginValidator };
