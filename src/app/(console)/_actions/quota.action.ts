"use server";
import { RwaTokenization } from "@/artifacts/types/rwa_tokenization";
import supabaseServer from "@/lib/supabase.server";
import { AnchorProvider, BN, Program, web3 } from "@coral-xyz/anchor";
import * as idlRwa from "@/artifacts/idl/rwa_tokenization.json";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export async function updateQuota(id: string, value: number) {
  return supabaseServer
    .from("credit-quota")
    .update({ credit_amount: value })
    .eq("id", id);
}

export async function updateQuotaOnchain(
  receiver: string,
  mint: string,
  amount: number
) {
  const connection = new web3.Connection(
    process.env.NEXT_PUBLIC_RPC_URL as string,
    "confirmed"
  );
  const admin = web3.Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(process.env.ADMIN_PRIVATE_KEY as string))
  );
  const wallet = new NodeWallet(admin);

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "processed",
  });
  const program = new Program<RwaTokenization>(idlRwa, provider);

  const result = await program.methods
    .updateQuotaCredit(new BN(amount))
    .accounts({
      receiver,
      authority: admin.publicKey,
      permissionedMint: mint,
    })
    .rpc();

  console.log("Quota updated successfully", result);

  return result;
}
