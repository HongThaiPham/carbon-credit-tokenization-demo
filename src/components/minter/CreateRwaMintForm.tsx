"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import useInitRwaToken from "@/hooks/useInitRwaToken";

const CreateRwaMintForm = () => {
  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    symbol: "",
    isClose: false,
    hasFee: false,
    transferFeeBasisPoints: 0,
    maximumFee: 0,
  });
  const { mutateAsync } = useInitRwaToken();

  const handleCreateToken = async () => {
    try {
      await mutateAsync(tokenDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" /> Create New Token
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Token Name"
            value={tokenDetails.name}
            onChange={(e) =>
              setTokenDetails({ ...tokenDetails, name: e.target.value })
            }
          />
          <Input
            placeholder="Token Symbol"
            value={tokenDetails.symbol}
            onChange={(e) =>
              setTokenDetails({ ...tokenDetails, symbol: e.target.value })
            }
          />
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="isClose"
            checked={tokenDetails.isClose}
            onCheckedChange={(e) =>
              setTokenDetails({ ...tokenDetails, isClose: !!e.valueOf() })
            }
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="isClose"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Limit access to this token
            </label>
            <p className="text-sm text-muted-foreground">
              User must be approved to trade this token
            </p>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="hasFee"
            checked={tokenDetails.hasFee}
            onCheckedChange={(e) =>
              setTokenDetails({ ...tokenDetails, hasFee: !!e.valueOf() })
            }
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="hasFee"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Token has transfer fee
            </label>
            <p className="text-sm text-muted-foreground">
              A fee will be charged on every transfer
            </p>
          </div>
        </div>
        {tokenDetails.hasFee ? (
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Transfer fee basis points (0-10000) ~ (0-100%)"
              value={tokenDetails.transferFeeBasisPoints}
              onChange={(e) =>
                setTokenDetails({
                  ...tokenDetails,
                  transferFeeBasisPoints: Number(e.target.value),
                })
              }
            />
            <Input
              type="number"
              placeholder="Maximum fee in token base units"
              value={tokenDetails.maximumFee}
              onChange={(e) =>
                setTokenDetails({
                  ...tokenDetails,
                  maximumFee: Number(e.target.value),
                })
              }
            />
          </div>
        ) : null}
        <Button className="w-full" onClick={handleCreateToken}>
          Create Token
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateRwaMintForm;
