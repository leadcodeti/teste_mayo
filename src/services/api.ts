import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "https://mayo-player-backend-production.up.railway.app/",
  headers: {
    Authorization: `Bearer ${cookies["mayoPLayer.token"]}`,
    "Content-Type": "application/json",
  },
});
