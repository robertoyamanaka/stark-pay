import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBalance = () => {
  return useQuery<string, Error>({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await axios.get(
        "https://2232-190-92-22-59.ngrok-free.app/balance"
      );
      return response.data;
    },
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache time
  });
};
