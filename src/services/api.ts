import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "https://app.mayoplayer.com/",
  headers: {
    Authorization: `Bearer ${cookies["mayoPLayer.token"]}`,
    "Content-Type": "application/json",
  },
});
