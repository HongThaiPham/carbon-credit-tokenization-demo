import supabaseServer from "@/lib/supabase.server";
import { useMutation } from "@tanstack/react-query";

const useAddNewEndpoint = () => {
  return useMutation({
    mutationKey: ["addNewEndpoint"],
    mutationFn: async (payload: {
      url: string;
      apiKey: string;
      accountId: string;
    }) => {
      const { error, data } = await supabaseServer.from("endpoints").insert({
        url: payload.url,
        apiKey: payload.apiKey,
        accountId: payload.accountId,
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export default useAddNewEndpoint;
