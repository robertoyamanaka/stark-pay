import { BlurView } from "expo-blur";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type LocationState = "charge" | "investments" | "add-balance";

interface NavbarProps {
  selected: LocationState;
  setSelected: (location: LocationState) => void;
}

export function Navbar({ selected, setSelected }: NavbarProps) {
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => setSelected("charge")}>
        <View
          style={[
            styles.iconContainer,
            selected === "charge" && styles.selected,
          ]}
        >
          <Text style={styles.icon}>🤝</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelected("add-balance")}>
        <View
          style={[
            styles.iconContainer,
            selected === "add-balance" && styles.selected,
          ]}
        >
          <Text style={styles.icon}>💸</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelected("investments")}>
        <View
          style={[
            styles.iconContainer,
            selected === "investments" && styles.selected,
          ]}
        >
          <Text style={styles.icon}>📈</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    paddingBottom: 20,
    backgroundColor: "#0C0C4C",
    textAlign: "center",
    overflow: "hidden",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    fontSize: 24,
  },
  selected: {
    borderRadius: 10, // Adjust for rounded corners
    backgroundColor: "#DA7E83", // Background color for selected item
  },
});
