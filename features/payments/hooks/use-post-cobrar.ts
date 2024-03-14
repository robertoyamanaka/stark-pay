
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const BACKEND_URL = 'https://nfcbackend-three.vercel.app'; // Replace with your actual backend URL

// Define the types for your request and response, if needed
interface CobrarInput {
  user: string;
  merchant: string;
  amount: number;
  paymentId: number;
  coinName: string;
}

interface CobrarResponse {
  // Structure of your response data
}

export const usePostCobrar = () => {
  return useMutation<CobrarResponse, Error, CobrarInput>({
    mutationFn: async (cobrarData: CobrarInput) => {
      const { coinName } = cobrarData
      let url = ""
      if (coinName === "USDC") {
        url = 'https://nfcbackend-three.vercel.app/api/transferfrom'
      }
      else {
          url = 'https://2232-190-92-22-59.ngrok-free.app/send'
      }
      const response = await axios.post(url, cobrarData);
      return response.data;
    },
  });
};
