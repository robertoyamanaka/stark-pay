import NormalButton from "@/components/buttons/normal-button";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { View, StyleSheet, Text } from "react-native";

export function StartScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFF", fontSize: 32 }}>
        Bienvenido a Chipi Pay!
      </Text>
      <Text style={{ color: "#FFF", fontSize: 16 }}>
        Dandole a Iniciar Sesión, aceptas nuestros términos y condiciones
      </Text>
      <PrimaryButton
        title="Crear Cuenta"
        active={true}
        onPress={() => console.log("Sign up")}
        containerStyle={{ marginVertical: 20 }}
      />
      <NormalButton
        title="Iniciar Sesión"
        active={true}
        onPress={() => console.log("Sign in")}
        containerStyle={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 20,
  },
  title: { color: "#FFF", fontSize: 32 },
});
