import axios from "axios";
import baseURL from "../axios/base";
import store from "store";

export async function login(body) {
  let res = await axios.post(`${baseURL()}/login`, body);
  console.log(res?.data?.data?.accessToken);
  store.set("accessToken", res?.data?.data?.accessToken);
  return res;
}
export async function teacherlogin(body) {
  let res = await axios.post(`${baseURL()}/teacher-login`, body);
  console.log(res?.data?.data?.accessToken);
  store.set("accessToken", res?.data?.data?.accessToken);
  return res;
}
export async function createUser(body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/user`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });

  return res;
}
export async function getUsers(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/users`, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
    params: { ...params },
  });

  return res;
}
export async function getProfile(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/profile`, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
    params: { ...params },
  });

  return res;
}
export async function updateRoles(id, body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(
    `${baseURL()}/update-role/${id}`,
    { ...body },
    {
      headers: {
        authorization: accessToken && `Bearer ${accessToken}`,
      },
    }
  );

  return res;
}
export async function updateUser(id, body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(
    `${baseURL()}/update-role/${id}`,
    { ...body },
    {
      headers: {
        authorization: accessToken && `Bearer ${accessToken}`,
      },
    }
  );

  return res;
}
