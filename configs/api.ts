import { API_BASE_URL } from "@/constant/env";
import axios from "axios";
import { ListParams, PokemonInfoParams } from "./interface/api.interface";

export const HOST = axios.create({
  baseURL: API_BASE_URL,
});

const API = {
  getAllPokemon: ({ limit = 1500, offset = 0 }: ListParams) =>
    HOST.get(`pokemon`, {
      params: {
        limit,
        offset,
      },
    }),
  getPokemonInfo: ({ name = "", id = "" }: PokemonInfoParams) =>
    HOST.get(`pokemon/${id || name}`),
};

export default API;
