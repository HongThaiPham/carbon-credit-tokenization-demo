"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SendIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedWithTransferHookInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BN, web3 } from "@coral-xyz/anchor";

const TradeForm = () => {
  const [amount, setAmount] = React.useState(0);
  const [mint, setMint] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["transfer", mint, destination, amount],
    mutationFn: async () => {
      if (!publicKey || !signTransaction || !sendTransaction) {
        return;
      }

      // const [nftMinterMintAddress] = await getProgramDerivedAddress({
      //   programAddress: fromLegacyPublicKey(program.programId),
      //   seeds: [
      //     Buffer.from("m"),
      //     addressEncoder.encode(fromLegacyPublicKey(publicKey)),
      //   ],
      // });

      // const [carbonCreditsMintAddress] = await getProgramDerivedAddress({
      //   programAddress: fromLegacyPublicKey(program.programId),
      //   seeds: [
      //     Buffer.from("cct"),
      //     addressEncoder.encode(nftMinterMintAddress),
      //   ],
      // });
      const senderAta = getAssociatedTokenAddressSync(
        new web3.PublicKey(mint),
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const receiverAta = getAssociatedTokenAddressSync(
        new web3.PublicKey(mint),
        new web3.PublicKey(destination),
        false,
        TOKEN_2022_PROGRAM_ID
      );
      // const ix = await createTransferCheckedWithTransferHookInstruction(
      //   connection,
      //   senderAta,
      //   new web3.PublicKey(mint),
      //   receiverAta,
      //   publicKey,
      //   new BN(amount),
      //   0,
      //   [],
      //   "confirmed",
      //   TOKEN_2022_PROGRAM_ID
      // );

      const createATAInstruction = createAssociatedTokenAccountInstruction(
        publicKey,
        receiverAta,
        publicKey,
        new web3.PublicKey(mint),
        TOKEN_2022_PROGRAM_ID
      );
      const recentBlockhash = await connection.getLatestBlockhash();
      const transaction = new web3.Transaction().add(createATAInstruction);
      // .add(ix);
      transaction.recentBlockhash = recentBlockhash.blockhash;
      transaction.feePayer = publicKey;
      const signature = await sendTransaction(transaction, connection);
      // await connection.confirmTransaction({
      //   signature,
      //   ...recentBlockhash,
      // });
      console.log("Signature", signature);
    },
  });
  const handler = async () => {
    await mutateAsync();
  };
  return (
    <div className="space-y-4">
      <Label>RWA token mint</Label>
      <Input
        placeholder="Token mint"
        value={mint}
        onChange={(e) => setMint(e.target.value)}
      />

      <Label>Destination</Label>
      <Input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <Label>Amount</Label>
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <div className="flex justify-end">
        <Button disabled={isPending} onClick={handler}>
          {isPending ? (
            <Loader2 className="animate-spin size-3" />
          ) : (
            <SendIcon className="size-3" />
          )}
          Mint
        </Button>
      </div>
    </div>
  );
};

export default TradeForm;
