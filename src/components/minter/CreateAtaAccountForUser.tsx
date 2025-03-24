"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";
type Props = {
  mint: string;
  to: string;
};
const CreateAtaAccountForUser: React.FC<Props> = ({ mint, to }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const handler = async () => {
    if (!publicKey) {
      return;
    }
    const mintPublicKey = new web3.PublicKey(mint);
    const toPublicKey = new web3.PublicKey(to);
    const ata = getAssociatedTokenAddressSync(
      mintPublicKey,
      toPublicKey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    const transaction = new web3.Transaction();
    transaction.add(
      createAssociatedTokenAccountInstruction(
        publicKey,
        ata,
        toPublicKey,
        mintPublicKey,
        TOKEN_2022_PROGRAM_ID
      )
    );
    const recentBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;
    transaction.feePayer = publicKey;

    const signature = await sendTransaction(transaction, connection);

    const tx = await connection.confirmTransaction({
      signature,
      ...recentBlockhash,
    });

    console.log(tx);
  };
  return <Button onClick={handler}>Create ATA Account</Button>;
};

export default CreateAtaAccountForUser;
