import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentNfc from "./features/payments/payment-nfc";
import { useState } from "react";
import { LocationState, Navbar } from "./components/navbar";
import { View } from "react-native";
import Investments from "./features/investments/investments";
import AddMoney from "./features/add-funds/add-money";

const queryClient = new QueryClient();

export default function App() {
  const [location, setLocation] = useState<LocationState>("charge");

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        {location === "charge" && <PaymentNfc />}
        {location === "add-balance" && <AddMoney /> }
        {location === "investments" && <Investments />}
        <Navbar selected={location} setSelected={setLocation} />
      </View>
    </QueryClientProvider>
  );
}
