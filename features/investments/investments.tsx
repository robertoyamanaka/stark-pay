import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import PossibleInvestments from "./possible-investments";
import { useGetBalance } from "./hooks/use-get-balance";

export default function Investments() {
  const { data:balance, isSuccess } = useGetBalance();
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
                <Text style={styles.subTitle}>Inversión</Text>
                <Text style={styles.balance}>${balance || "23,500"}</Text>
                <Text style={styles.apyReturn}>+ 33%</Text>
              </View>
              <View style={styles.inversionesContainer}>
                <Text style={styles.subTitleRed}>Dinero no aprovechado</Text>
                <Text style={styles.balanceRed}>$1,200</Text>
              </View>
              <View style={styles.invierteSection}>
                <Text style={styles.invierteTitle}>Invierte con Metapool</Text>
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
    paddingTop: 20,
    backgroundColor: "#0C0C4C",

  },
  inversionesContainer: {
    paddingHorizontal: 20,
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
    fontWeight: "bold",
  },

  subTitleRed: { color: "red", fontSize: 16 },
  balanceRed: {
    fontSize: 50,
    color: "red",
  },

  title: { color: "#FFF", fontSize: 32, marginTop: 30 },
  invierteSection: {
    width: "150%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#CEFF1A",
    paddingBottom: 20,
    marginTop: 20,
  },
  invierteTitle: { 
    color: "#0C2246",
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    paddingLeft: 0,
  },
  

  backgroundImage: {
    width: "100%",
    height: 200,
    justifyContent: "space-around",
    alignItems: "center",
  },

});
