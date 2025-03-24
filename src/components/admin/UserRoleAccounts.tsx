"use client";
import useUserRoleAccounts from "@/hooks/useUserRoleAccounts";
import { NFTRole } from "@/lib/constants";
import { getExplorerUrl } from "@/lib/utils";
import { KeyIcon, UserIcon } from "lucide-react";
import React from "react";
import UpdateCreditModal from "./UpdateCreditModal";
import CreateAtaAccountForUser from "../minter/CreateAtaAccountForUser";
type Props = {
  role: NFTRole;
  mint?: string;
};
const UserRoleAccounts: React.FC<Props> = ({ role, mint }) => {
  const { data } = useUserRoleAccounts(role, mint);
  return (
    <div>
      <div className="flex justify-between items-center p-2 bg-muted rounded-md">
        <span className="font-medium">{role}</span>
        <span className="text-muted-foreground">{data?.length} active</span>
      </div>
      <div>
        {data?.map((account) => (
          <div key={account.publicKey.toString()}>
            <div className="flex justify-between items-center p-2 text-sm">
              <a
                href={getExplorerUrl(account.account.mint.toString())}
                target="_blank"
                className="text-blue-500 flex items-center gap-1"
              >
                <KeyIcon className="size-4" />
                {account.account.mint.toString()}
              </a>
              <div className="text-muted-foreground flex items-center gap-3">
                <UserIcon className="size-4" />
                {account.account.user.toString()}
                {role === NFTRole.MINTER ? (
                  <UpdateCreditModal minter={account.account.user.toString()} />
                ) : (
                  <CreateAtaAccountForUser
                    mint={mint!}
                    to={account.account.user.toString()}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoleAccounts;
