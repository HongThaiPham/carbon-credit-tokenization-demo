"use client";
import CreateRwaMintForm from "@/components/minter/CreateRwaMintForm";
import MintInfo from "@/components/minter/MintInfo";
import NoAuthorize from "@/components/NoAuthorize";
import useRole from "@/hooks/useRole";
import useRwaTokenInitialized from "@/hooks/useRwaTokenInitialized";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const MinterPage = () => {
  const { publicKey } = useWallet();
  const { data: isAuth } = useRole("m", publicKey?.toString());
  const { data: mintAddress } = useRwaTokenInitialized(publicKey?.toString());

  if (!isAuth) {
    return <NoAuthorize />;
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      {!mintAddress ? (
        <CreateRwaMintForm />
      ) : (
        <MintInfo address={mintAddress} />
      )}
    </div>
  );
};

export default MinterPage;
