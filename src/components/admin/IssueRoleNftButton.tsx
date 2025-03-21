import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { addressCompact, getExplorerUrl } from "@/lib/utils";
import useIssueRoleNft from "@/hooks/useIssueRoleNft";
import { NFTRole } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  to: string;
  disabled?: boolean;
};
const IssueRoleNftButton: React.FC<Props> = ({ to, disabled }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useIssueRoleNft(to);
  const queryClient = useQueryClient();

  const handlerIssueRoleNft = useCallback(
    async (role: NFTRole) => {
      await mutateAsync({ role });
      setOpen(false);
      await queryClient.invalidateQueries({
        queryKey: ["userRoleAccounts", role],
      });
    },
    [mutateAsync, queryClient]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Issue role NFT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-8">
            Which ROLE NFT would you like to issue to{" "}
            <a
              href={getExplorerUrl(to)}
              target="_blank"
              className="text-green-500"
            >
              {addressCompact(to)}
            </a>
            ?
          </DialogTitle>
          <DialogDescription>
            This action will issue a ROLE NFT to the user.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center w-full gap-4">
          <Button onClick={() => handlerIssueRoleNft(NFTRole.MINTER)}>
            MINTER ROLE
          </Button>
          <Button onClick={() => handlerIssueRoleNft(NFTRole.CONSUMER)}>
            CONSUMER ROLE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssueRoleNftButton;
