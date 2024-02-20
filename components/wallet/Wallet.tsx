import { Box, Button } from "@interchain-ui/react";
import { getChainLogo } from "@/utils";
import { useAssetStore } from "@/store/AssetStore";
import { chains } from "chain-registry";
import { Chain } from "./Chain";
import { AddAssetModal } from "../modals";
import { CACombobox } from "../my-ui/CACombobox";

export interface WalletSectionProps {}

export const WalletSection = ({}: WalletSectionProps) => {
  const selectedChain = useAssetStore((state) => state.selectedChain);
  const updateSelectedChain = useAssetStore(
    (state) => state.updateSelectedChain
  );

  const handleSelChange = (chainName: string) => {
    const curSelChian = chains.find((v) => v.chain_name === chainName) ?? null;
    if (curSelChian) {
      updateSelectedChain(curSelChian);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      py="$12"
      width="100%"
      attributes={{
        "data-part-id": "wallet-section",
      }}
    >
      <CACombobox
        openOnFocus
        styleProps={{
          width: "350px",
        }}
        options={chains.map((chain) => ({
          label: chain.pretty_name,
          value: chain.chain_name,
          iconUrl: getChainLogo(chain.chain_name) ?? "",
        }))}
        initialOption={{
          label: selectedChain.pretty_name,
          value: selectedChain.chain_name,
          iconUrl: getChainLogo(selectedChain.chain_name) ?? "",
        }}
        onSelChange={handleSelChange}
      />
      {/* <Chain
        name={selectedChain.chain_name}
        logo={getChainLogo(selectedChain.chain_name)!}
      /> */}
      <AddAssetModal selectedChain={selectedChain} />
    </Box>
  );
};
