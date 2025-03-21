"use client";
import React, { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "../ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaProvider>
        <Toaster richColors position="bottom-right" />
        <AppThemeProvider>{children}</AppThemeProvider>
      </SolanaProvider>
    </QueryClientProvider>
  );
};
