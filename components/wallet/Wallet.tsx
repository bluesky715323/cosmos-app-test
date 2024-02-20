import { Box, Button } from "@interchain-ui/react";
import { getChainLogo } from "@/utils";
import { useAssetStore } from "@/store/AssetStore";
import { Chain } from "./Chain";
import { AddAssetModal } from "../modals";

export interface WalletSectionProps {}

export const WalletSection = ({}: WalletSectionProps) => {
  const selectedChain = useAssetStore((state) => state.selectedChain);

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
      <Chain
        name={selectedChain.chain_name}
        logo={getChainLogo(selectedChain.chain_name)!}
      />
      <AddAssetModal selectedChain={selectedChain} />
    </Box>
  );
};
