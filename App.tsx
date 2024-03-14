import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentNfc from "./features/payments/payment-nfc";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentNfc />
    </QueryClientProvider>
  );
}

