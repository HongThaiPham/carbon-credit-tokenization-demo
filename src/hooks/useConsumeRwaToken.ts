import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { BN, web3 } from "@coral-xyz/anchor";
import { getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

const useConsumeRwaToken = () => {
  const program = useRwaProgram();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["consumeRwaToken"],
    mutationFn: async ({ amount, mint }: { amount: number; mint: string }) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }

      const mintInfo = await getMint(
        connection,
        new web3.PublicKey(mint),
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );

      const nftMint = web3.Keypair.generate();
      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            console.info("Consuming RWA token...");
            const result = await program.methods
              .retireToken(new BN(amount * 10 ** mintInfo.decimals))
              .accounts({
                payer: publicKey,
                mint: mint,
                consumer: publicKey,
                nftMint: nftMint.publicKey,
              })
              .signers([nftMint])
              .rpc();
            await queryClient.invalidateQueries({
              queryKey: ["userTokenAccount", publicKey?.toString()],
            });
            resolve(result);
          } catch (error) {
            console.error("Error consuming RWA token:", error);
            toast.error("Error consuming RWA token");
            reject(error);
          }
        }),
        {
          pending: "Consuming RWA token...",
          success: "RWA token consumed successfully!",
          error: "Error consuming RWA token",
        }
      );
    },
  });
};

export default useConsumeRwaToken;
