"use server";

import supabaseServer from "@/lib/supabase.server";

export async function addNewEndpoint(url: string) {
  const { error, data } = await supabaseServer.from("credit-quota").insert({
    org_name: url,
    credit_amount: 100,
  });

  console.log("addNewEndpoint", error);
  return data;
}
