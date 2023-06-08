import { API_BASE_URL } from "@/constant/env";
import axios from "axios";
import { CommonInfoParams, ListParams } from "./interface/api.interface";

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
  getPokemonInfo: ({ name = "", id = "" }: CommonInfoParams) =>
    HOST.get(`pokemon/${id || name}`),

  getAllAbility: ({ limit = 1500, offset = 0 }: ListParams) =>
    HOST.get(`ability`, {
      params: {
        limit,
        offset,
      },
    }),

  getAbilityInfo: ({ name = "", id = "" }: CommonInfoParams) =>
    HOST.get(`ability/${id || name}`),

  getAllEggGroups: ({ limit = 1500, offset = 0 }: ListParams) =>
    HOST.get(`egg-group`, {
      params: {
        limit,
        offset,
      },
    }),

  getEggGroupsInfo: ({ name = "", id = "" }: CommonInfoParams) =>
    HOST.get(`egg-group/${id || name}`),

  getAllType: ({ limit = 1500, offset = 0 }: ListParams) =>
    HOST.get(`type`, {
      params: {
        limit,
        offset,
      },
    }),

  getTypeInfo: ({ name = "", id = "" }: CommonInfoParams) =>
    HOST.get(`type/${id || name}`),
};

export default API;
