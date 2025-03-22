"use client";
import { NFTRole } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";

const useUserRoleAccounts = (role: NFTRole) => {
  const program = useRwaProgram();
  return useQuery({
    queryKey: ["userRoleAccounts", role],
    queryFn: async () => {
      if (role === NFTRole.MINTER) {
        const accounts = await program.account.minterController.all();
        return accounts.slice(0, 10);
      } else {
        const accounts = await program.account.consumerController.all();
        return accounts.slice(0, 10);
      }
    },
  });
};

export default useUserRoleAccounts;
