"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHistory } from "../../_actions/history.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonWapper from "@/components/SkeletonWapper";
import NetworkExplorerLink from "@/components/NetworkExplorerLink";

const MintHistoryTable = () => {
  const { data, isPending } = useQuery({
    queryKey: ["mintHistory"],
    queryFn: getHistory,
  });
  return (
    <SkeletonWapper isLoading={isPending}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tx ID</TableHead>
            <TableHead>Token Mint</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                {item.mint ? (
                  <NetworkExplorerLink addressOrTx={item.mint} />
                ) : null}
              </TableCell>
              <TableCell>
                {item.token_account ? (
                  <NetworkExplorerLink addressOrTx={item.token_account} />
                ) : null}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SkeletonWapper>
  );
};

export default MintHistoryTable;
