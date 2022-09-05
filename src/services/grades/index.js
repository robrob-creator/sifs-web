import axios from "axios";
import baseURL from "../axios/base";
import store from "store";

export async function createGrade(body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/grade`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function getGrades(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/grade`, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
    params: { ...params },
  });

  return res;
}
