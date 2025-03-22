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
import { Loader2, SendIcon } from "lucide-react";
type Props = {
  to: string;
  role: NFTRole;
  disabled?: boolean;
};
const IssueRoleNftButton: React.FC<Props> = ({ to, disabled, role }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useIssueRoleNft(to);
  const queryClient = useQueryClient();

  const handlerIssueRoleNft = useCallback(async () => {
    await mutateAsync({ role });
    setOpen(false);
    await queryClient.invalidateQueries({
      queryKey: ["userRoleAccounts", role],
    });
  }, [mutateAsync, queryClient, role]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Issue {role} role NFT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-8">
            Are you sure you want to issue a {role} role NFT to{" "}
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
        <div className="flex items-center w-full gap-4 justify-end">
          <Button onClick={handlerIssueRoleNft}>
            {isPending ? (
              <Loader2 className="animate-spin size-3" />
            ) : (
              <SendIcon className="size-3" />
            )}
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssueRoleNftButton;
