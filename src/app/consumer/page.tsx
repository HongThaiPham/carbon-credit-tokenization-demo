"use client";
import ConsumeForm from "@/components/consumer/ConsumeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const ConsumerPage = () => {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Comsume RWA Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConsumeForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerPage;
