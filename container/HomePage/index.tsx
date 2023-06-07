import PokemonDetail from "@/component/pokemon/PokemonDetail";
import API from "@/configs/api";
import { ListParams } from "@/configs/interface/api.interface";
import { GetAllPokemon } from "@/configs/interface/list-pokemon.interface";
import useAPI from "@/hooks/useAPI";
import { Card, Skeleton, Space, message } from "antd";
import { useEffect } from "react";

export default function HomePage() {
  const listPokemon = useAPI<GetAllPokemon, ListParams>(API.getAllPokemon, {
    onError: (err) => message.error({ content: err }),
  });

  useEffect(() => {
    listPokemon.call();
  }, []);

  return (
    <Card style={{ maxWidth: 1000, margin: "auto" }}>
      <h3>Pokedex</h3>

      {listPokemon.loading && <Skeleton active />}
      <Space
        size={12}
        align="center"
        wrap
        style={{ justifyContent: "space-between" }}
      >
        {listPokemon.data?.results.map((item, idx) => {
          return <PokemonDetail key={idx} name={item.name} index={idx} />;
        })}
      </Space>
    </Card>
  );
}
