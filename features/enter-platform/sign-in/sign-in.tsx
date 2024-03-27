import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { SimpleInput } from "@/components/simple-input";
import { PrimaryButton } from "@/components/buttons/primary-button";


export function SignInWUsername() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInPipeline = async () => {
    if (!isLoaded) return;
    console.log("Sign in");
    try {
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });

      if (completeSignIn.status !== "complete") {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        console.log("signed in successfully with username");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFF", fontSize: 30 }}>
        Sign in with your username
      </Text>
      <SimpleInput
        value={username}
        onChangeText={setUsername}
        placeholder="username"
        containerStyle={{ marginTop: 20 }}
      />
      <SimpleInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
      />
      <PrimaryButton
        title="Iniciar sesión"
        active={username !== "" && password !== ""}
        onPress={signInPipeline}
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
