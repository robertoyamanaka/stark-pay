import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
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
import { usePostCobrar } from "./hooks/use-post-cobrar";
import { CoinSquareForPayment } from "./coin-square-payment";

const coins = [
  {
    id: "1",
    name: "USDC",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029",
  },
  {
    id: "2",
    name: "ETH",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
  },
  {
    id: "3",
    name: "BRR",
    logo: "https://scontent.ftgu2-3.fna.fbcdn.net/v/t39.30808-6/326712082_645842650675072_1490676584293090545_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFthy-QHKuVVPuppUsONDMR2K4Y7GlubKrYrhjsaW5sqtkGvci-fQQFb_bx9mN1joLWq9NCoyx0h6g0dIJ1oHIR&_nc_ohc=_P8dRclpwGkAX_20v_o&_nc_ht=scontent.ftgu2-3.fna&oh=00_AfB242PPZLJFi0_8hrCe9ub64H2TQmyWVktMzx_tYG7e7w&oe=65F852AD",
  },
];

export default function PaymentNfc() {
  const [amount, setAmount] = useState("");
  const { mutate: postCobrar } = usePostCobrar();
  const [selectedToken, setSelectedToken] = useState("USDC");
  const handleCobrar = async () => {
    try {
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
        console.log("NFC Tag Discovered", tag);
        if (tag.ndefMessage) {
          const payload = tag.ndefMessage[0].payload;
          const address = Ndef.text.decodePayload(payload);
          console.log("NFC Message:", address);
          if (!address) {
            console.warn("No address found");
            return;
          }
          const cobrarInput = {
            user: "0x052e5577e4126f08da297013073dfea3e98932e79088895f5c428bd28c62ae32",
            merchant:
              "0x0546501475912C61eA1862693D2f4A542050A64619bAE0492250c57dCd0E2AAa",
            amount: parseFloat(amount),
            paymentId: 1,
            coinName: selectedToken,
          };
          postCobrar(cobrarInput);
          setAmount("");
          // Do a sleep of 2 seconds
          setTimeout(() => {
            Alert.alert("Transacción exitosa");
          }, 1000);

          // tag.ndefMessage.forEach((record:any) => {
          //   let payload = Ndef.text.decodePayload(record.payload);
          //   console.log('NFC Message:', payload);
          // });
        }
        NfcManager.setAlertMessageIOS("NFC tag read successfully");
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
      // const response = await axios.post(
      //   `https://webhook.site/3d5b9295-6640-45e7-b858-d76571fb83fa`,
      //   "cobrarInput"
      // );
      // console.log("response", response);
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <CoinSquareForPayment
            imageUrl={coins[0].logo}
            name={coins[0].name}
            selected={selectedToken === coins[0].name}
            onPress={() => setSelectedToken(coins[0].name)}
          />
          <CoinSquareForPayment
            imageUrl={coins[1].logo}
            name={coins[1].name}
            selected={selectedToken === coins[1].name}
            onPress={() => setSelectedToken(coins[1].name)}
          />
          <CoinSquareForPayment
            imageUrl={coins[2].logo}
            name={coins[2].name}
            selected={selectedToken === coins[2].name}
            onPress={() => setSelectedToken(coins[2].name)}
          />
        </View>
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
    width: 130,
    height: 130,
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
