import validator from "validator";

export const isAuth = (email) => {
  return validator.isEmail(email);
};
