"use server";
import supabaseServer from "@/lib/supabase.server";

export async function getHistory() {
  const { data, error } = await supabaseServer
    .from("mint-transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching history:", error);
    return [];
  }
  return data;
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
