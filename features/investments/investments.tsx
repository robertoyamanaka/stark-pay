import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SimpleInput } from "@/components/simple-input";
import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { CoinSquare } from "@/components/coin-square";
import PossibleInvestments from "./possible-investments";

export default function Investments() {
  const [amount, setAmount] = useState("");
  const handle = async () => {
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

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <Text style={styles.title}>Tus inversiones</Text>
              <View style={styles.inversionesContainer}>
                <Text style={styles.subTitle}>Saldo Total</Text>
                <Text style={styles.balance}>$1,600</Text>
                <Text style={styles.apyReturn}>+ 33%</Text>
              </View>
              <View style={styles.inversionesContainer}>
                <Text style={styles.subTitleRed}>Saldo no aprovechado</Text>
                <Text style={styles.balanceRed}>$1200</Text>
              </View>
              <PossibleInvestments />
            </ScrollView>
          </TouchableWithoutFeedback>
        </>
      }
      renderItem={null} // No items to render, so we pass null
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,

    backgroundColor: "#0C0C4C",
    padding: 10,
  },
  inversionesContainer: {
    marginTop: 20,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  subTitle: { color: "#FFF", fontSize: 16 },
  balance: {
    fontSize: 50,
    color: "#FFF",
  },
  apyReturn: {
    color: "green",
    fontSize: 16,
  },

  subTitleRed: { color: "red", fontSize: 16 },
  balanceRed: {
    fontSize: 50,
    color: "red",
  },

  title: { color: "#FFF", fontSize: 32, marginTop: 30 },

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
