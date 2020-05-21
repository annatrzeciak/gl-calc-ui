import { api, authenticationHeader } from "./apiHost";

import jwtDecode from "jwt-decode";

import { isValid, toDate, isBefore, differenceInMilliseconds, fromUnixTime } from "date-fns";

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export function setLocalStorageTokens(tokens) {
  if (tokens.accessToken) localStorage.setItem("accessToken", tokens.accessToken);
  if (tokens.refreshToken) localStorage.setItem("refreshToken", tokens.refreshToken);
}

export function removeLocalStorageTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function decodeJWT(token) {
  return token && jwtDecode(token);
}

export function getTimeDiff(exp) {
  if (!exp) return false;
  return differenceInMilliseconds(fromUnixTime(Number(exp)), new Date());
}

export function checkTokenValidity(token) {
  try {
    if (!token) {
      return false;
    }
    let expToken = decodeJWT(token).exp;
    const expMoment = toDate(expToken * 1000);
    if (isValid(expMoment)) {
      return isBefore(new Date(), expMoment);
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function isValidAccessToken() {
  return checkTokenValidity(getAccessToken());
}

// ENDPOINTS
export async function loginInTheApplication(login, password) {
  return await api.post(`/users/login`, { email: login, password: password });
}

export async function refreshToken(refreshToken) {
  return await api.post(`/users/refresh`, { refreshToken: `Bearer ${refreshToken}` });
}

export async function getUserDetails(email) {
  return await api.post(`/users/details`, { email: email }, { headers: authenticationHeader() });
}

export async function registerUsers(data) {
  return await api.post(`/users/register`, data);
}
