"use server";
import supabaseServer from "@/lib/supabase.server";

export async function getHistory() {
  return supabaseServer
    .from("mint-transactions")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function insertHistory(
  tx: string,
  mint: string,
  account: string,
  amount: string
) {
  return supabaseServer
    .from("mint-transactions")
    .insert({ id: tx, mint, token_account: account, amount })
    .select("*");
}
