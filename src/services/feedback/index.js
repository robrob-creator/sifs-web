import axios from "axios";
import baseURL from "../axios/base";
import store from "store";

export async function createMessage(body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/feedback`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function getFeedbacks(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/get-feedback`, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
    params: { ...params },
  });

  return res;
}
