import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePlusIcon } from "lucide-react";
import React from "react";
import MintHistoryTable from "./MintHistoryTable";

const MintHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgePlusIcon className="h-5 w-5" /> Mint transaction history
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MintHistoryTable />
      </CardContent>
    </Card>
  );
};

export default MintHistory;
