import IssueNftForm from "@/components/admin/IssueNftForm";
import UserRoleAccounts from "@/components/admin/UserRoleAccounts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NFTRole } from "@/lib/constants";
import { Plus, Settings, Users } from "lucide-react";
import React from "react";

const AdminPage = () => {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Issue NFT Roles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IssueNftForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> Minting Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Minter Address" />
            <Input type="number" placeholder="Credit Amount" className="w-32" />
            <Button>Update</Button>
          </div>
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
            {[NFTRole.MINTER, NFTRole.CONSUMER].map((role) => (
              <UserRoleAccounts role={role} key={role} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
