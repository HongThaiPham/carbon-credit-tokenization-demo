import { useMemo } from "react";
import * as idlRwa from "@/artifacts/idl/rwa_tokenization.json";
import * as idlHook from "@/artifacts/idl/token_transfer_hook.json";
import { Program } from "@coral-xyz/anchor";

export function useRwaProgram() {
  const program = useMemo(() => new Program(idlRwa), []);

  return program;
}

export function useTransferHookProgram() {
  const program = useMemo(() => new Program(idlHook), []);

  return program;
}
