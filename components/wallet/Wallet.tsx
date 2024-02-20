import { Box } from "@interchain-ui/react";

export interface WalletSectionProps {}

export const WalletSection = ({}: WalletSectionProps) => {
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
      TODO: assets list here!
    </Box>
  );
};
