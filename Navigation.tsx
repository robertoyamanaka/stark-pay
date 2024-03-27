import { View } from "react-native";
import { LocationState, Navbar } from "./components/navbar";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { PaymentNfc } from "./features/payments/components/payment-nfc";
import AddMoney from "./features/add-funds/add-money";
import Investments from "./features/investments/investments";
import { SignInWUsername } from "./features/enter-platform/sign-in/sign-in";
import { SignUpScreen } from "./features/enter-platform/sign-up/sign-up";

export type RootStackParamList = {
  Home: undefined;
  AskPayment: undefined;
  PaymentNfc: { amount: number };
};

export function Navigation() {
  const [location, setLocation] = useState<LocationState>("charge");
  const { isSignedIn } = useUser();
  console.log("isSignedIn", isSignedIn);
  
  return (
    <ClerkLoaded>
      {isSignedIn ? (
        <View style={{ flex: 1 }}>
          {location === "charge" && <PaymentNfc />}
          {location === "add-balance" && <AddMoney />}
          {location === "investments" && <Investments />}
          <Navbar selected={location} setSelected={setLocation} />
        </View>
      ) : (
        <SignInWUsername />
        // <SignUpScreen />
      )}
    </ClerkLoaded>
  );
}
