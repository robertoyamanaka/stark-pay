import { PrimaryButton } from "@/components/buttons/primary-button";
import { SimpleInput } from "@/components/simple-input";
import { StyleSheet, View, Text, Alert } from "react-native";

type Props = {
  username: string;
  setUsername: (value: string) => void;
  goToNextSection: () => void;
};
export default function SignUpAddUsername({
  username,
  setUsername,
  goToNextSection,
}: Props) {
  // const { refetch } = useFindUserByUsername(username);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu username</Text>
      <SimpleInput
        value={username}
        onChangeText={setUsername}
        placeholder="username"
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
      />
      <PrimaryButton
        title="Next"
        active={username !== ""}
        onPress={async () => {
          goToNextSection();
        }}
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
function useFindUserByUsername(username: string): { refetch: any; } {
  throw new Error("Function not implemented.");
}

