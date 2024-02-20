import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { chains, assets } from "chain-registry";
import { Chain, Asset } from "@chain-registry/types";
import { getDefaultAssets } from "@/utils";

interface AssetsDictionary {
  [key: string]: Asset[];
}

type TAssetStoreState = {
  selectedChain: Chain;
  myAssets: AssetsDictionary;
  addAssetList: (asset: Asset) => void;
};

const defaultChain: Chain =
  chains.find((chain) => chain.chain_name === "osmosis") || chains[0];
const defaultAssets: AssetsDictionary = {};
defaultAssets[defaultChain.chain_name] = getDefaultAssets(
  defaultChain.chain_name
);

console.log(assets);

export const useAssetStore = create<TAssetStoreState>()(
  immer((set) => ({
    selectedChain: defaultChain,
    myAssets: defaultAssets,
    addAssetList: (asset) =>
      set((state) => {
        state.myAssets[state.selectedChain.chain_name].push(asset);
      }),
  }))
);
