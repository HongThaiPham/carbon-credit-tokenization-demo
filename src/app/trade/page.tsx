import TradeForm from "@/components/trade/TradeForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const TradePage = () => {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="size-5" /> Trade form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TradeForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default TradePage;
