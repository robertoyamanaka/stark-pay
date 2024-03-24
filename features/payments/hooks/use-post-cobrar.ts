
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FiatValuesEnum } from '../constants/fiats';
import { CoinValuesEnum } from '../constants/coins';

interface CobrarInput {
  user: string;
  merchant: string;
  amount: number;
  paymentId: number;
  coinName: CoinValuesEnum;
  baseCurrency: FiatValuesEnum
}

interface CobrarResponse {
}

export const usePostCobrar = () => {
  return useMutation<CobrarResponse, Error, CobrarInput>({
    mutationFn: async (cobrarData: CobrarInput) => {
      const { coinName,amount,baseCurrency } = cobrarData
      const convertInput = {
        amount: amount,
        baseCurrency: baseCurrency,
        cryptoCurrency: coinName
      }
      const convertedAmount = await convertFiatToCrypto(convertInput)
      let url = ""
      if (coinName === "USDC") {
        url = 'https://nfcbackend-three.vercel.app/api/transferfrom'
      }
      else {
          url = 'https://2232-190-92-22-59.ngrok-free.app/send'
      }
      cobrarData.amount = convertedAmount
      const response = await axios.post(url, cobrarData);
      return response.data;
    },
  });
};



interface ConvertInput {
  amount: number;
  baseCurrency: FiatValuesEnum;
  cryptoCurrency: "USDC" | "USDT" | "ETH";
}


const convertFiatToCrypto = async (convertInput:ConvertInput) => {
  const url = 'https://chainlink-starkpay-eth-latam.vercel.app/api/convert'
  const response = await axios.post(url, convertInput)
  return response.data
}