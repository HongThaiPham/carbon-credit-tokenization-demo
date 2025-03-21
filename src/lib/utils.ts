import { isAddress } from "@solana/kit";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addressCompact = (address: string, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const getExplorerUrl = (
  addressOrTx: string,
  network: string = "devnet"
) => {
  const path = isAddress(addressOrTx) ? "address" : "tx";
  if (network === "devnet") {
    return `https://explorer.solana.com/${path}/${addressOrTx}?cluster=devnet`;
  }
  return `https://explorer.solana.com/${path}/${addressOrTx}`;
};
