"use client";
import NoAuthorize from "@/components/NoAuthorize";
import useRole from "@/hooks/useRole";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const ConsumerPage = () => {
  const { publicKey } = useWallet();
  const { data } = useRole("c", publicKey?.toString());

  if (!data) {
    return <NoAuthorize />;
  }

  return <div className="container mx-auto p-8 space-y-6">ConsumerPage</div>;
};

export default ConsumerPage;
