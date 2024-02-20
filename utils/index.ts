import { chains, assets } from "chain-registry";
import { Asset, Chain } from "@chain-registry/types";

export function getLogo(from: Asset | Chain) {
  return from.logo_URIs?.svg || from.logo_URIs?.png || from.logo_URIs?.jpeg;
}

export function getChainLogo(name: string) {
  const chain = chains.find((chain) => chain.chain_name === name);
  return chain ? getLogo(chain) : null;
}

export function getDefaultAssets(chainName: string) {
  const chain = chains.find((chain) => chain.chain_name === chainName);
  const filteredAsset = assets.filter(
    (chain) => chain.chain_name === chainName
  )[0];
  const count = Math.floor(Math.random() * 4) + 2; // Random count between 2 and 5
  return filteredAsset?.assets?.slice(0, count) || [];
}
