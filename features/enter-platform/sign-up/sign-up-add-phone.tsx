
import { PrimaryButton } from "@/components/buttons/primary-button";
import { PhonePicker } from "@/components/phone-picker/phone-picker";
import { View, StyleSheet, Text } from "react-native";

type SignUpAddPhoneProps = {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  callingCode: string;
  setCallingCode: (callingCode: string) => void;
  goToNext: () => void;
};

export function SignUpAddPhone({
  phoneNumber,
  setPhoneNumber,
  callingCode,
  setCallingCode,
  goToNext,
}: SignUpAddPhoneProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your number</Text>
      <PhonePicker
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        selectedCallingCode={callingCode}
        setSelectedCallingCode={setCallingCode}
      />
      <PrimaryButton
        title="Next"
        active={phoneNumber !== "" && phoneNumber.length === 10}
        onPress={goToNext}
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
