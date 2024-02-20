import * as React from "react";
import { useState } from "react";
import { Chain, Asset } from "@chain-registry/types";
import { assets } from "chain-registry";
import { BasicModal, Button, Box } from "@interchain-ui/react";
import { getLogo } from "@/utils";
import { CACombobox } from "../my-ui/CACombobox";
import { useAssetStore } from "@/store/AssetStore";

interface AddAssetModalProps {
  selectedChain: Chain;
  onOk?: (asset: Asset) => void;
}

export function AddAssetModal({ selectedChain, onOk }: AddAssetModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const addAssetList = useAssetStore((state) => state.addAssetList);

  let assetOptions = React.useMemo(() => {
    const filteredAsset = assets.filter(
      (chain) => chain.chain_name === selectedChain.chain_name
    )[0];
    return filteredAsset?.assets || [];
  }, [selectedChain]);

  let curSelAsset: Asset | null = assetOptions[0] || null;
  const handleSelChange = (selectedAsset: string) => {
    curSelAsset = assetOptions.find((v) => v.name === selectedAsset) ?? null;
  };

  const handleAddAsset = () => {
    if (curSelAsset === null) return;
    addAssetList(curSelAsset);
    setIsOpen(false);
  };

  return (
    <BasicModal
      renderTrigger={(triggerProps) => (
        <Button size="sm" {...triggerProps} onClick={() => setIsOpen(true)}>
          Add Asset
        </Button>
      )}
      isOpen={isOpen}
      title="Add Asset"
      onClose={() => setIsOpen(false)}
    >
      <Box display="flex" flexDirection="column" gap="$6">
        <CACombobox
          openOnFocus
          styleProps={{
            width: "350px",
          }}
          options={assetOptions.map((asset) => ({
            label: asset.display,
            value: asset.name,
            iconUrl: getLogo(asset) ?? "",
          }))}
          onSelChange={handleSelChange}
        />
        <Button onClick={handleAddAsset}>Add</Button>
      </Box>
    </BasicModal>
  );
}
