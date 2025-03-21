import { NFTRole } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";

type UseIssueRoleNftParams = {
  role: NFTRole;
};
const useIssueRoleNft = (to: string) => {
  return useMutation({
    mutationKey: ["issueRoleNft", to],
    mutationFn: async ({ role }: UseIssueRoleNftParams) => {
      alert(`Issuing ${role} role NFT to ${to}`);
    },
  });
};

export default useIssueRoleNft;
