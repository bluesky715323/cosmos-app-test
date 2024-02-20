import React from "react";
import { Box, AssetList } from "@interchain-ui/react";
import { useAssetStore } from "@/store/AssetStore";
import { getLogo } from "@/utils";

interface AssetListSectionProps {}

export const AssetListSection = ({}: AssetListSectionProps) => {
  const selectedChain = useAssetStore((state) => state.selectedChain);
  const myAssets = useAssetStore((state) => state.myAssets);

  return (
    <Box maxWidth="$containerMd" marginX="auto" marginBottom="$17">
      <AssetList
        needChainSpace
        isOtherChains={false}
        list={myAssets[selectedChain.chain_name].map((v) => ({
          isOtherChains: false,
          imgSrc:
            getLogo(v) ||
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          symbol: v.symbol,
          name: v.name,
          tokenAmount: (Math.random() * (150 - 30) + 30).toFixed(2).toString(),
          tokenAmountPrice: (Math.random() * (150 - 30) + 30)
            .toFixed(2)
            .toString(),
          onDeposit: () => {
            console.log("onDeposit");
          },
          onWithdraw: () => {
            console.log("onWithdraw");
          },
        }))}
      />
    </Box>
  );
};
