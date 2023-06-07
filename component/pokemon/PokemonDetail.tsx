import API from "@/configs/api";
import { PokemonInfoParams } from "@/configs/interface/api.interface";
import { PokemonInfoType } from "@/configs/interface/pokemon-info.interface";
import useAPI from "@/hooks/useAPI";
import { capitalized, safeObject } from "@/utils";
import { Button, Card, Modal, Skeleton, Space, Tag, message } from "antd";
import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";

function getStatColor(idx: number) {
  switch (idx + 1) {
    case 1:
      return "volcano";
    case 2:
      return "orange";
    case 3:
      return "yellow";
    case 4:
      return "blue";
    case 5:
      return "green";
    case 6:
      return "magenta";
    default:
      return "geekblue";
  }
}

type Props = {
  index: number;
  name: string;
};

export default function PokemonDetail({ index, name = "" }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const pokemonName = `${index + 1}. ${capitalized(name)}`;

  const pokemonInfo = useAPI<PokemonInfoType, PokemonInfoParams>(
    API.getPokemonInfo,
    { onError: (err) => message.error({ content: err }) }
  );

  useEffect(() => {
    if (openModal) {
      pokemonInfo.call({ name });
    }
  }, [name, openModal]);

  return (
    <>
      <Button
        type="primary"
        danger={index % 2 === 1}
        shape="round"
        size="large"
        ghost
        onClick={() => setOpenModal(true)}
      >
        {pokemonName}
      </Button>
      <Modal
        title={pokemonName}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={360}
      >
        {pokemonInfo.loading && <Skeleton active />}
        {!pokemonInfo.loading && !pokemonInfo.error && (
          <Card
            cover={
              <ImageCarousel
                width={360 - 48}
                listImage={Object.values(safeObject(pokemonInfo.data?.sprites))}
              />
            }
          >
            <Card.Meta
              title={capitalized(name)}
              description={
                <Space direction="vertical">
                  <div>
                    {"Type : "}
                    {pokemonInfo.data?.types.map((item, idx) => {
                      return (
                        <Tag key={idx} color="geekblue">
                          {capitalized(item.type.name)}
                        </Tag>
                      );
                    })}
                  </div>
                  <div>
                    {"Ability : "}
                    {pokemonInfo.data?.abilities.map((item, idx) => {
                      return (
                        <Tag key={idx} color="volcano">
                          {capitalized(item.ability.name)}
                        </Tag>
                      );
                    })}
                  </div>
                  <div>
                    {"Stat : "}
                    <br />
                    {pokemonInfo.data?.stats.map((item, idx) => {
                      return (
                        <Tag key={idx} color={getStatColor(idx)}>
                          {item.stat.name.toUpperCase()}
                          {" : "}
                          <b>{item.base_stat}</b>
                        </Tag>
                      );
                    })}
                  </div>
                </Space>
              }
            />
          </Card>
        )}
      </Modal>
    </>
  );
}
