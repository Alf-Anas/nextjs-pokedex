import API from "@/configs/api";
import { GetAllPokemon, ListParams } from "@/configs/api.interface";
import useAPI from "@/hooks/useAPI";
import { capitalized, safeArray } from "@/utils";
import { Button, Card, Image, Skeleton, Space } from "antd";
import { useEffect } from "react";

export default function HomePage() {
  const listPokemon = useAPI<GetAllPokemon, ListParams>(API.getAllPokemon);

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
          return (
            <Button
              key={idx}
              type="primary"
              danger={idx % 2 === 1}
              shape="round"
              size="large"
              ghost
            >
              {idx + 1}. {capitalized(item.name)}
            </Button>
          );
        })}
      </Space>
    </Card>
  );
}
