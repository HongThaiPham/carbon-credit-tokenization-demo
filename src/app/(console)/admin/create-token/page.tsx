"use client";
import CreatedRWATokenMintTable from "@/components/admin/CreatedRWATokenMintTable";
import CreateRwaMintForm from "@/components/minter/CreateRwaMintForm";
import NavHeader from "@/components/NavHeader";
import NoAuthorize from "@/components/NoAuthorize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRwaConfig from "@/hooks/useRwaConfig";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const AdminPage = () => {
  const { publicKey } = useWallet();
  const { data } = useRwaConfig();

  return (
    <>
      <NavHeader navs={[]} />

      {!data || !publicKey || !data.authority.equals(publicKey) ? (
        <NoAuthorize />
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="p-3 space-y-6">
            <CreateRwaMintForm />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CreatedRWATokenMintTable />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
