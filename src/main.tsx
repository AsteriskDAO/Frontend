import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import DailyCheckIn from "./dailyCheckIn/DailyCheckIn.tsx";
import ProfilePage from "./profile/ProfilePage.tsx";
import Home from "./Home.tsx";
import ThankYou from "./ThankYou.tsx";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const evmNetworks = [
  {
    blockExplorerUrls: ["https://cardona-zkevm.polygonscan.com/"],
    chainId: 2442,
    chainName: "Polygon zkEVM Cardona",
    iconUrls: [
      "https://styles.redditmedia.com/t5_2qgijx/styles/communityIcon_0gpn7je434za1.jpg?format=pjpg&s=fb5e8047f06c6ddef966777413a79508b1c89a73",
    ],
    name: "Polygon zkEVM Cardona",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 2442,
    rpcUrls: ["https://rpc.cardona.zkevm-rpc.com"],
    vanityName: "Cardona",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/check-in",
        element: <DailyCheckIn />,
      },
      {
        path: "/thank-you",
        element: <ThankYou />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <RouterProvider router={router} />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  </React.StrictMode>
);
