"use client";

import MintInfo from "@/components/minter/MintInfo";
import SelectMinterController from "@/components/minter/SelectMinterController";
import React from "react";

const MinterPage = () => {
  const [mint, setMint] = React.useState<string | null>(null);

  return (
    <div className="container mx-auto p-8 space-y-6">
      <SelectMinterController onChange={setMint} />
      {mint ? <MintInfo address={mint} /> : null}
    </div>
  );
};

export default MinterPage;
