import PokemonDetail from "@/component/pokemon/PokemonDetail";
import API from "@/configs/api";
import {
  CommonInfoParams,
  ListParams,
} from "@/configs/interface/api.interface";
import { GetAllPokemon } from "@/configs/interface/list-pokemon.interface";
import useAPI from "@/hooks/useAPI";
import { Card, Divider, Skeleton, Space, message } from "antd";
import { useEffect, useState } from "react";
import Filter, { FilterBy } from "./Filter";
import { ListPokemon } from "@/configs/interface/type.interface";
import { PokemonAbilityInfo } from "@/configs/interface/ability-info.interface";
import { PokemonEggGroupInfo } from "@/configs/interface/egg-group-info.interface";
import { PokemonTypeInfo } from "@/configs/interface/type-info.interface";
import { capitalized } from "@/utils";

export default function HomePage() {
  const [filter, setFilter] = useState({
    filterBy: "",
    filterData: "",
    searchTxt: "",
  });
  const [listPokemon, setListPokemnon] = useState<ListPokemon[]>([]);
  const listAllPokemon = useAPI<GetAllPokemon, ListParams>(API.getAllPokemon, {
    onError: (err) => message.error({ content: err }),
  });
  const listPokemonByAbility = useAPI<PokemonAbilityInfo, CommonInfoParams>(
    API.getAbilityInfo,
    {
      onError: (err) => message.error({ content: err }),
    }
  );
  const listPokemonByEggGroup = useAPI<PokemonEggGroupInfo, CommonInfoParams>(
    API.getEggGroupsInfo,
    {
      onError: (err) => message.error({ content: err }),
    }
  );
  const listPokemonByType = useAPI<PokemonTypeInfo, CommonInfoParams>(
    API.getTypeInfo,
    {
      onError: (err) => message.error({ content: err }),
    }
  );

  useEffect(() => {
    listAllPokemon.call();
  }, []);

  useEffect(() => {
    if (!filter.filterBy || !filter.filterData) return;
    switch (filter.filterBy) {
      case FilterBy.ABILITY:
        listPokemonByAbility.call({ name: filter.filterData });
        break;
      case FilterBy.EGG_GROUPS:
        listPokemonByEggGroup.call({ name: filter.filterData });
        break;
      case FilterBy.TYPE:
        listPokemonByType.call({ name: filter.filterData });
        break;
      default:
    }
  }, [filter.filterBy, filter.filterData]);

  useEffect(() => {
    if (!filter.filterData && filter.filterBy) {
      setListPokemnon([]);
      return;
    }
    let mList: { name: string; url: string }[] = [];
    switch (filter.filterBy) {
      case FilterBy.ABILITY:
        mList =
          listPokemonByAbility.data?.pokemon.map((item) => {
            return item.pokemon;
          }) || [];
        break;
      case FilterBy.EGG_GROUPS:
        mList =
          listPokemonByEggGroup.data?.pokemon_species.map((item) => {
            return item;
          }) || [];
        break;
      case FilterBy.TYPE:
        mList =
          listPokemonByType.data?.pokemon.map((item) => {
            return item.pokemon;
          }) || [];
        break;
      default:
        mList =
          listAllPokemon.data?.results.map((item) => {
            return item;
          }) || [];
    }
    setListPokemnon(
      mList.filter((item) =>
        capitalized(item.name).toLowerCase().includes(filter.searchTxt)
      )
    );
  }, [
    filter.filterBy,
    filter.filterData,
    filter.searchTxt,
    listAllPokemon.data,
    listPokemonByAbility.data,
    listPokemonByEggGroup.data,
    listPokemonByType.data,
  ]);

  const isLoading = () =>
    listAllPokemon.loading ||
    listPokemonByAbility.loading ||
    listPokemonByEggGroup.loading ||
    listPokemonByType.loading;

  return (
    <Card style={{ maxWidth: 1000, margin: "auto" }}>
      <h3>Pokedex</h3>

      <Divider orientation="left" orientationMargin="0">
        Filter
      </Divider>
      <Filter onChangeFilter={setFilter} />

      <Divider>List Pokemon</Divider>
      {isLoading() && <Skeleton active />}
      {!isLoading() && (
        <Space
          size={12}
          align="center"
          wrap
          style={{ justifyContent: "space-between" }}
        >
          {listPokemon.map((item, idx) => {
            return <PokemonDetail key={idx} name={item.name} index={idx} />;
          })}
        </Space>
      )}
    </Card>
  );
}
