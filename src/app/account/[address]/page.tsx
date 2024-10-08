"use client";

import { useParams } from "next/navigation";

import ProfilePageComponent from "@/components/ProfileComponent/ProfilePageComponent";

const ProfileUserIdPage = () => {
  const { address } = useParams();

  const stringAddress = Array.isArray(address) ? address[0] : address;

  return <ProfilePageComponent address={stringAddress} />;
};

export default ProfileUserIdPage;
