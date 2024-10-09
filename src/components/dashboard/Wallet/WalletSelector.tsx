"use client";

import { useDisclosure } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";

const DynamicConnectWalletDialog = dynamic(
  () => import("./ConnectWalletDialog"),
);

export function WalletSelector(walletSortingOptions: any) {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
  const { connected, wallet } = useWallet();

  const handleNotify = React.useCallback(() => {
    if (connected) {
      toast.success(`Connected to ${wallet?.adapter.name} successfully!`);
    }
  }, [connected, wallet]);

  React.useEffect(() => {
    handleNotify();
  }, [handleNotify]);

  return (
    <>
      <WalletConnectButton />
      {/* <Modal
        hideCloseButton
        backdrop="opaque"
        className="rounded-[24px] relative"
        isOpen={isOpen}
        radius="lg"
        size="md"
        onOpenChange={onOpenChange}
      >
        <DynamicConnectWalletDialog close={onClose} {...walletSortingOptions} />
      </Modal> */}
    </>
  );
}

export default WalletSelector;
