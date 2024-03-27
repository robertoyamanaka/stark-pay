import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Navigation } from "./Navigation";

const queryClient = new QueryClient();

export default function App() {
  const publishableKey = "pk_test_bG92ZWQtZmVycmV0LTMuY2xlcmsuYWNjb3VudHMuZGV2JA"
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
