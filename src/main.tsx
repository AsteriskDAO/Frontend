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
