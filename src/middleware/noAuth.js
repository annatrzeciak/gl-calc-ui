import { isValidAccessToken } from "../store/api/auth";

export default function auth(to, from, next) {
  if (isValidAccessToken()) {
    return next({ name: "home" });
  }
  return next();
}
