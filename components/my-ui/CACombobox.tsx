/*
Customized combo box for choosing chain or asset
*/
import * as React from "react";
import {
  Combobox,
  Stack,
  Avatar,
  Text,
  Box,
  Skeleton,
} from "@interchain-ui/react";
import { matchSorter } from "match-sorter";

export type CAOptionType = {
  label: string;
  value: string;
  iconUrl: string;
};

export function CACombobox(props: any) {
  const [selectedKey, setSelectedKey] = React.useState<React.Key>(
    props.initialOption?.value || props.options[0].value
  );
  let [filterValue, setFilterValue] = React.useState<string>(
    props.initialOption?.label || props.options[0].label
  );
  let filteredItems = React.useMemo(() => {
    const initialItems = props.options.filter(
      (v: CAOptionType) => v.label && v.value
    );

    const filtered = matchSorter<CAOptionType>(initialItems, filterValue, {
      keys: ["label", "value"],
    });
    return filtered;
  }, [props.options, filterValue]);

  const avatarUrl =
    filteredItems.find((i) => i.value === selectedKey)?.iconUrl ?? undefined;

  return (
    <Combobox
      label={props.label}
      openOnFocus={props.openOnFocus}
      styleProps={props.styleProps}
      inputValue={filterValue}
      onInputChange={(value) => {
        setFilterValue(value);

        if (!value) {
          setSelectedKey("");
          props.onSelChange?.("");
        }
      }}
      onSelectionChange={(item) => {
        if (item) {
          setSelectedKey(item);
          props.onSelChange?.(item);
        }
      }}
      inputAddonStart={
        selectedKey && avatarUrl ? (
          <Avatar
            name={selectedKey as string}
            getInitials={(name) => name[0]}
            size="xs"
            src={avatarUrl}
            fallbackMode="bg"
            attributes={{
              paddingX: "$4",
            }}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            px="$4"
          >
            <Skeleton width="24px" height="24px" borderRadius="$full" />
          </Box>
        )
      }
    >
      {filteredItems.map((v: CAOptionType) => (
        <Combobox.Item key={v.value} textValue={v.label}>
          <CAOption iconUrl={v.iconUrl} label={v.label} value={v.value} />
        </Combobox.Item>
      ))}
    </Combobox>
  );
}

type CAOptionProps = {
  label: string;
  value: string;
  iconUrl: string;
};
const CAOption = (props: CAOptionProps) => {
  return (
    <Stack
      direction="horizontal"
      space="$4"
      attributes={{ alignItems: "center" }}
    >
      <Avatar
        name={props.label}
        getInitials={(name) => name[0]}
        size="xs"
        src={props.iconUrl}
        fallbackMode="bg"
      />

      <Text fontSize="$md" fontWeight="$normal" color="$text">
        {props.label}
      </Text>
    </Stack>
  );
};
