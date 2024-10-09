import React, { PropsWithChildren } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolonaWalletProvider,
} from "@solana/wallet-adapter-react";
import {
  UnsafeBurnerWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export const WalletProvider = ({ children }: PropsWithChildren<{}>) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
    () => [new UnsafeBurnerWalletAdapter(), new CoinbaseWalletAdapter()],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolonaWalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolonaWalletProvider>
    </ConnectionProvider>
  );
};
