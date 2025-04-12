"use client";
import ConsumeForm from "@/components/consumer/ConsumeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const ConsumerPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" /> Retire carbon credit token
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ConsumeForm />
      </CardContent>
    </Card>
  );
};

export default ConsumerPage;
