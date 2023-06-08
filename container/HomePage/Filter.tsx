import API from "@/configs/api";
import { ListAbility } from "@/configs/interface/ability.interface";
import { ListParams } from "@/configs/interface/api.interface";
import { ListEggGroup } from "@/configs/interface/egg-group.interface";
import { ListType } from "@/configs/interface/type.interface";
import useAPI from "@/hooks/useAPI";
import { capitalized } from "@/utils";
import { Input, Select, Space, message } from "antd";
import { useEffect, useState } from "react";

export enum FilterBy {
  ABILITY = "Ability",
  EGG_GROUPS = "Egg Group",
  TYPE = "Type",
}

export default function Filter({ onChangeFilter = (_obj: any) => {} }) {
  const [filterBy, setFilterBy] = useState<string | null>();
  const [listFilterData, setListFilterData] = useState<
    ListAbility | ListEggGroup | ListType | null
  >();
  const [filterData, setFilterData] = useState<string | null>();
  const [searchTxt, setSearchTxt] = useState<string>("");

  const listAbility = useAPI<ListAbility, ListParams>(API.getAllAbility, {
    onError: (err) => message.error({ content: err }),
  });

  const listEggGroup = useAPI<ListEggGroup, ListParams>(API.getAllEggGroups, {
    onError: (err) => message.error({ content: err }),
  });

  const listType = useAPI<ListType, ListParams>(API.getAllType, {
    onError: (err) => message.error({ content: err }),
  });

  useEffect(() => {
    switch (filterBy) {
      case FilterBy.ABILITY:
        listAbility.call();
        break;
      case FilterBy.EGG_GROUPS:
        listEggGroup.call();
        break;
      case FilterBy.TYPE:
        listType.call();
        break;
      default:
      // code block
    }
  }, [filterBy]);

  useEffect(() => {
    switch (filterBy) {
      case FilterBy.ABILITY:
        setListFilterData(listAbility.data);
        break;
      case FilterBy.EGG_GROUPS:
        setListFilterData(listEggGroup.data);
        break;
      case FilterBy.TYPE:
        setListFilterData(listType.data);
        break;
      default:
      // code block
    }
  }, [listAbility.data, listEggGroup.data, listType.data]);

  useEffect(() => {
    onChangeFilter({
      filterBy,
      filterData,
      searchTxt,
    });
  }, [filterBy, filterData, searchTxt]);

  return (
    <Space wrap size="middle">
      <Select
        style={{ width: 200 }}
        size="large"
        value={filterBy}
        onChange={(val) => {
          setFilterBy(val);
          setListFilterData(null);
          setFilterData(null);
        }}
        placeholder="-- Filter By --"
        allowClear
        onClear={() => setFilterBy(null)}
        options={[
          { value: FilterBy.ABILITY, label: "Ability" },
          { value: FilterBy.EGG_GROUPS, label: "Egg Group" },
          { value: FilterBy.TYPE, label: "Type" },
        ]}
      />
      {!!filterBy && (
        <Select
          size="large"
          style={{ width: 200 }}
          placeholder={`-- Choose ${filterBy} --`}
          allowClear
          value={filterData}
          onClear={() => setFilterData(null)}
          onChange={(val) => setFilterData(val)}
          options={listFilterData?.results.map((item) => {
            return { value: item.name, label: capitalized(item.name) };
          })}
        />
      )}

      <Input.Search
        size="large"
        placeholder="-- Search Pokemon --"
        allowClear
        onSearch={(val) => setSearchTxt(val)}
        style={{ width: 420 }}
      />
    </Space>
  );
}
