import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SimpleInput } from "@/components/simple-input";
import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "@clerk/clerk-expo";
import NormalButton from "@/components/buttons/normal-button";

export default function AddMoney() {
  const { getToken } = useAuth();
  const [balance, setBalance] = useState(1200);
  const [amount, setAmount] = useState("");

  const handleAddMoney = async () => {
    if (await authenticate()) {
      console.log("Authenticated so adding money");
    }
  };

  const authenticate = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (hasHardware) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate",
          cancelLabel: "Cancel",
          fallbackLabel: "Use Passcode",
        });

        if (result.success) {
          console.log("Authenticated");
          setBalance(balance + parseFloat(amount));
          setAmount("");
          Alert.alert(
            "Balance de la tarjeta actualizado",
            `Nuevo balance: $${balance + parseFloat(amount)}`
          );
          return true;
        } else {
          console.log("Failed to authenticate");
          return false;
        }
      } else {
        console.log("Device does not support biometric authentication");
      }
    } catch (error) {
      console.error("An error occurred during authentication", error);
    }
  };

  

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken({ template: 'web3auth' });
      console.log("clerk token:", token);
    }
    console.log("fetching token");
    fetchToken();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <ImageBackground
          source={require("@/assets/credit-card-white.png")}
          style={styles.backgroundImage}
        >
          <Text style={styles.balance}>
            {`Balance $${balance}`}
            {parseFloat(amount) > 0 && (
              <Text style={styles.amountStyle}> + ${amount}</Text>
            )}
          </Text>
        </ImageBackground> */}

        <Text style={styles.title}>Agregar Dinero</Text>
        <SimpleInput
          value={amount}
          onChangeText={setAmount}
          placeholder="monto"
          keyboardType="numeric"
          containerStyle={{ marginVertical: 20 }}
        />
        <PrimaryButton
          title={"Agregar dinero"}
          active={!!amount}
          onPress={handleAddMoney}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  amountStyle: {
    color: "green",
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0C0C4C",
    padding: 20,
  },
  title: { color: "#FFF", fontSize: 32, marginTop: 20 },
  balance: {
    position: "absolute",
    top: 150,
    left: 30,
    fontSize: 20,
    color: "#FFF",
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    justifyContent: "space-around",
    alignItems: "center",
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
