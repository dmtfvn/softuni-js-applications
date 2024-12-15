import { getUserData } from "../utils.js";

export function validateUser() {
  return function (ctx, next) {
    const userData = getUserData();

    ctx.userData = userData;

    next();
  }
}