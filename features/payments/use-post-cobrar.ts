
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const BACKEND_URL = 'https://nfcbackend-three.vercel.app'; // Replace with your actual backend URL

// Define the types for your request and response, if needed
interface CobrarInput {
  user: string;
  merchant: string;
  amount: number;
  paymentId: number;
}

interface CobrarResponse {
  // Structure of your response data
}

export const usePostCobrar = () => {
  return useMutation<CobrarResponse, Error, CobrarInput>({
    mutationFn: async (CobrarData: CobrarInput) => {
      const response = await axios.post(`${BACKEND_URL}/api/Cobrarfrom`, CobrarData);
      return response.data;
    },
  });
};
