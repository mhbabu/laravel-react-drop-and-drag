import http from "../httpService";
import config from "../../config.json";

const loginEndPoint = config.apiUrl + "/user/login";
const registerEndPoint = config.apiUrl + "/user/register";
const userListEndPoint = config.apiUrl + "/auth-user/list";
const tokenKey = "user";

http.setBearerToken(getBearerToken());

export async function getUserList() {
  const { data }  = await http.get(userListEndPoint);
  return data?.data;
}

export async function login(email, password) {
  const { data }  = await http.post(loginEndPoint, { email, password });
  localStorage.setItem(tokenKey, JSON.stringify(data));
  http.setBearerToken(getBearerToken());
}

export async function register(user) {
  const {data} = await http.post(registerEndPoint, {
    name: user.name,
    email: user.email,
    password: user.password
  });

  localStorage.setItem(tokenKey, JSON.stringify(data));
  http.setBearerToken(getBearerToken());

}

export function logout() {
  http.post(config.apiUrl + "/auth-user/logout");
  localStorage.removeItem(tokenKey);
}

export function getBearerToken() {
  try {
    const { token } = JSON.parse(localStorage.getItem(tokenKey));
    return 'Bearer ' + token;
  } catch (ex) {
    return null;
  }
}

export function getCurrentUser() {
  try {
    const { user } = JSON.parse(localStorage.getItem(tokenKey));
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getBearerToken
};
