
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SimpleInput } from "@/components/simple-input";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

type VerifyCodePhoneProps = {
  callingCode: string;
  phoneNumber: string;
  completeSignIn: (code: string) => void;
};

export function SignUpVerifyCodePhone({
  callingCode,
  phoneNumber,
  completeSignIn,
}: VerifyCodePhoneProps) {
  const [code, setCode] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your code</Text>
      <Text style={styles.subtitle}>{`${callingCode}${phoneNumber}`}</Text>
      <SimpleInput
        value={code}
        onChangeText={setCode}
        placeholder="Code..."
        keyboardType="numeric"
        containerStyle={{ marginTop: 20 }}
      />
      <PrimaryButton
        title="Verify"
        active={code !== "" && code.length === 6}
        onPress={() => completeSignIn(code)}
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 20,
  },
  title: { color: "#FFF", fontSize: 32 },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    // fontFamily: 'Plus Jakarta Sans',
    fontWeight: "600",
    lineHeight: 24, // The lineHeight in React Native should be greater than the fontSize for better readability
  },
});
