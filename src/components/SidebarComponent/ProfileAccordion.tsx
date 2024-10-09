"use client";

import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { ArrowRight01Icon } from "hugeicons-react";
import { useWallet } from "@solana/wallet-adapter-react";

import ConnectWalletDialog from "../dashboard/Wallet/ConnectWalletDialog";

import { truncateText } from "@/helpers";

export type ProfileAccordionProps = {
  address: string;
  name: string;
};

const ProfileAccordion = ({ name, address }: ProfileAccordionProps) => {
  const [isClient, setIsClient] = React.useState(false);
  const { connected, wallet, disconnect, publicKey, connecting } = useWallet();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Skeleton className="w-full h-16 rounded-2xl" />;
  }
  if (!connected) return <ConnectWalletDialog />;

  return (
    <Dropdown classNames={{ base: "w-full" }}>
      <DropdownTrigger className="cursor-pointer w-full">
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-foreground-50 border border-default/25">
          <div className="flex-shrink-0">
            <Avatar
              alt="Wallet"
              className="w-10 h-10"
              src={wallet?.adapter.icon}
            />
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h3 className="text-base font-medium text-foreground-900 truncate">
              {wallet?.adapter.name}
            </h3>
            <span className="text-xs font-medium text-foreground-500 truncate">
              {truncateText(publicKey?.toBase58()!, 10)}
            </span>
          </div>
          <div>
            <ArrowRight01Icon className="w-4 h-4 ml-auto" />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="logout" onClick={disconnect}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileAccordion;
