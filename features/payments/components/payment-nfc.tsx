import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import NfcManager, { Ndef, NfcEvents } from "react-native-nfc-manager";
import { useState } from "react";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SimpleInput } from "@/components/simple-input";
import { Image } from "expo-image";
import { usePostCobrar } from "../hooks/use-post-cobrar";
import { CoinSquareForPayment } from "./coin-square-payment";
import DropDownPicker from "react-native-dropdown-picker";
import { COINS, CoinValuesEnum } from "../constants/coins";
import { FIATS, FiatValuesEnum } from "../constants/fiats";


export function PaymentNfc() {
  const [fiatOpen, setFiatOpen] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState<FiatValuesEnum>(FiatValuesEnum.BZ)
  const [amount, setAmount] = useState("");
  const { mutate: postCobrar } = usePostCobrar();
  const [selectedToken, setSelectedToken] = useState<CoinValuesEnum>(CoinValuesEnum.USDC);

  const handleCobrar = async () => {
    console.log("Cobrando", amount, selectedToken, selectedFiat);
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
            user: address,
            merchant:
              "0x0546501475912C61eA1862693D2f4A542050A64619bAE0492250c57dCd0E2AAa",
            amount: parseFloat(amount),
            paymentId: 1,
            coinName: selectedToken,
            baseCurrency: selectedFiat,

          };
          postCobrar(cobrarInput);
          setAmount("");
          setTimeout(() => {
            Alert.alert("Transacción exitosa");
          }, 1000);
        }
        NfcManager.setAlertMessageIOS("NFC tag read successfully");
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
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
        <DropDownPicker
          open={fiatOpen}
          zIndex={100000}
          value={selectedFiat}
          items={FIATS}
          setOpen={setFiatOpen}
          setValue={setSelectedFiat}
          theme="DARK"
          placeholder={"Escoge tu moneda"}
          style={{
            backgroundColor: "transparent",
            borderColor: "white",
            borderRadius: 40,
            marginBottom: 20,
          }}
          containerStyle={{
            borderRadius: 40,
          }}
          textStyle={{
            color: "white",
          }}
          labelStyle={{
            backgroundColor: "transparent",
          }}
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
            imageUrl={COINS[0].logo}
            name={COINS[0].name}
            selected={selectedToken === COINS[0].name}
            onPress={() => setSelectedToken(COINS[0].name)}
          />
          <CoinSquareForPayment
            imageUrl={COINS[1].logo}
            name={COINS[1].name}
            selected={selectedToken === COINS[1].name}
            onPress={() => setSelectedToken(COINS[1].name)}
          />
          <CoinSquareForPayment
            imageUrl={COINS[2].logo}
            name={COINS[2].name}
            selected={selectedToken === COINS[2].name}
            onPress={() => setSelectedToken(COINS[2].name)}
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
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between", 
    backgroundColor: "#0C0C4C",
    padding: 20,
    paddingBottom: 10,
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
