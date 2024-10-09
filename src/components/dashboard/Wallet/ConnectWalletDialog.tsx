import { Button } from "@nextui-org/button";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";

import LogoIcon from "@/components/shared/icon/LogoIcon";

interface ConnectWalletDialogProps {}

function ConnectWalletDialog({}: ConnectWalletDialogProps) {
  const { wallets, select } = useWallet();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button fullWidth color="primary" onClick={onOpen}>
        Connect
      </Button>
      <Modal
        backdrop="opaque"
        className="rounded-[24px] relative py-8"
        isOpen={isOpen}
        radius="lg"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="overflow-auto sm:m-0 shadow-none">
          <ModalHeader className="flex flex-col gap-2 items-center">
            <LogoIcon className="h-16 w-16 shadow-lg" />
            <h6 className="text-2xl text-foreground-900">Connect to Social</h6>
          </ModalHeader>
          <ModalBody className="overflow-auto rounded-[32px]">
            {wallets.map((wallet) => (
              <WalletRow
                key={wallet.adapter.name}
                wallet={wallet}
                onConnect={() => {
                  select(wallet.adapter.name);
                  close();
                }}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

interface WalletRowProps {
  wallet: Wallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  const { select } = useWallet();

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="text-white font-medium flex flex-row items-center gap-2">
        <Image
          alt={wallet.adapter.name}
          className="mr-5 "
          height={30}
          src={wallet.adapter.icon}
          width={30}
        />
        {wallet.adapter.name}
      </div>
      <Button
        key={wallet.adapter.name}
        onClick={() => handleWalletSelect(wallet.adapter.name)}
      >
        Connect
      </Button>
    </div>
  );
}

export default ConnectWalletDialog;
