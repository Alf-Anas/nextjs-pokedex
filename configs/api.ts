import { API_BASE_URL } from "@/constant/env";
import axios from "axios";

export const HOST = axios.create({
  baseURL: API_BASE_URL,
});

const API = {
  getAllPokemon: ({ limit = 1500, offset = 0 }) =>
    HOST.get(`pokemon`, {
      params: {
        limit,
        offset,
      },
    }),
};

export default API;
