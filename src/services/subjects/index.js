import axios from "axios";
import baseURL from "../axios/base";
import store from "store";

export async function getSubjects(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/subject`, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
    params: { ...params },
  });

  return res;
}
export async function createSubject(body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/subject`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}