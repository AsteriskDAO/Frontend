import { http, createConfig } from "wagmi";
import { polygonZkEvmCardona } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [polygonZkEvmCardona],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [polygonZkEvmCardona.id]: http(
      `https://polygonzkevm-cardona.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}