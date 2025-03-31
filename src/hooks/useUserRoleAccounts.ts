"use client";
import { NFTRole } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { web3 } from "@coral-xyz/anchor";

const useUserRoleAccounts = (role: NFTRole, mint?: string) => {
  const program = useRwaProgram();
  return useQuery({
    queryKey: ["userRoleAccounts", role],
    queryFn: async () => {
      if (role === NFTRole.MINTER) {
        const accounts = await program.account.minterController.all();
        return accounts;
      } else {
        if (!mint) return [];
        const accounts = await program.account.consumerController.all([
          {
            memcmp: {
              offset: 8,
              bytes: new web3.PublicKey(mint).toBase58(),
              encoding: "base58",
            },
          },
        ]);
        return accounts;
      }
    },
  });
};

export default useUserRoleAccounts;
