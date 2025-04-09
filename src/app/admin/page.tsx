"use client";
import CreatedRWATokenMintTable from "@/components/admin/CreatedRWATokenMintTable";
import CreateRwaMintForm from "@/components/minter/CreateRwaMintForm";
import NoAuthorize from "@/components/NoAuthorize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRwaConfig from "@/hooks/useRwaConfig";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const AdminPage = () => {
  const { publicKey } = useWallet();
  const { data } = useRwaConfig();
  if (!data || !publicKey || !data.authority.equals(publicKey))
    return <NoAuthorize />;
  return (
    <div className="container mx-auto p-8 space-y-6">
      <CreateRwaMintForm />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreatedRWATokenMintTable />
          {/* <IssueNftForm role={NFTRole.MINTER} /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
