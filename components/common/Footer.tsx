import { Link, Stack, Text } from "@interchain-ui/react";

export function Footer() {
  return (
    <>
      <Stack
        direction="horizontal"
        space="$2"
        attributes={{
          justifyContent: "center",
          opacity: 0.5,
          fontSize: "$sm",
        }}
      >
        <Text>Built with</Text>
        <Link href="https://cosmology.zone/" target="_blank">
          Cosmology
        </Link>
      </Stack>
    </>
  );
}
