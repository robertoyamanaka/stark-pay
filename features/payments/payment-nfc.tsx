import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import NfcManager, {
  Ndef,
  NfcEvents,
  NfcTech,
  OnDiscoverTag,
} from "react-native-nfc-manager";
import { useState } from "react";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SimpleInput } from "@/components/simple-input";
import { Image } from "expo-image";
import { usePostCobrar } from "./use-post-cobrar";
import axios from "axios";

// type PaymentNfcRouteProps = RouteProp<RootStackParamList, "PaymentNfc">;
// type PaymentNfcProps = {
//   route: PaymentNfcRouteProps;
// };

interface NfcTag {
  id: string; // Unique identifier of the tag
  ndefMessage: Array<any>; // Array of NDEF records, adjust 'any' to be more specific if needed
  // Add other relevant properties based on your use case
}

export default function PaymentNfc() {
  const [amount, setAmount] = useState("");
  const { mutate: postCobrar } = usePostCobrar();

  const handleCobrar = async () => {
    try {
      let foundAddress = "";
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
        console.log("NFC Tag Discovered", tag);
        if (tag.ndefMessage) {
          const payload = tag.ndefMessage[0].payload;
          const address = Ndef.text.decodePayload(payload);
          console.log("NFC Message:", address);
          if (!address) {
            console.warn("No address found");
            return;}
          const cobrarInput = {
            user: foundAddress,
            merchant: "0xA1910d3ed41e63f2B664d16099FE3F337b1Aef1E",
            amount: parseFloat(amount),
            paymentId: 1,
          };
          postCobrar(cobrarInput);
          setAmount("");
          axios.post(`https://webhook.site/3d5b9295-6640-45e7-b858-d76571fb83fa`, 'perrhijos');

          // tag.ndefMessage.forEach((record:any) => {
          //   let payload = Ndef.text.decodePayload(record.payload);
          //   console.log('NFC Message:', payload);
          // });
        }
        NfcManager.setAlertMessageIOS("NFC tag read successfully");
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
      const response = await axios.post(`https://webhook.site/3d5b9295-6640-45e7-b858-d76571fb83fa`, 'cobrarInput');
      console.log('response',response);
    } catch (e) {
      console.warn("Failed to read NFC tag", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.selfiePlaceholder}
          source={require("@/assets/contactless.png")}
        />
        <Text style={styles.title}>Monto por cobrar</Text>
        <SimpleInput
          value={amount}
          onChangeText={setAmount}
          placeholder="monto"
          keyboardType="numeric"
          containerStyle={{ marginVertical: 20 }}
        />
        <PrimaryButton
          title={"Cobrar"}
          active={!!amount}
          onPress={handleCobrar}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0C0C4C",
    padding: 20,
  },
  title: { color: "#FFF", fontSize: 32 },
  selfiePlaceholder: {
    width: 136,
    height: 136,
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: { marginBottom: 15, textAlign: "center" },
});
