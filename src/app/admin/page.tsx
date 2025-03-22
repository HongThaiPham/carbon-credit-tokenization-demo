"use client";
import IssueNftForm from "@/components/admin/IssueNftForm";
import UserRoleAccounts from "@/components/admin/UserRoleAccounts";
import NoAuthorize from "@/components/NoAuthorize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRwaConfig from "@/hooks/useRwaConfig";
import { NFTRole } from "@/lib/constants";
import { useWallet } from "@solana/wallet-adapter-react";
import { Plus, Users } from "lucide-react";
import React from "react";

const AdminPage = () => {
  const { publicKey } = useWallet();
  const { data } = useRwaConfig();
  if (!data || !publicKey || !data.authority.equals(publicKey))
    return <NoAuthorize />;
  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Issue NFT Roles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IssueNftForm role={NFTRole.MINTER} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <UserRoleAccounts role={NFTRole.MINTER} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
