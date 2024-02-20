import { Divider } from "@interchain-ui/react";
import { Layout, WalletSection } from "@/components";

export default function Home() {
  return (
    <Layout>
      <WalletSection />
      <Divider mb="$16" />
    </Layout>
  );
}
