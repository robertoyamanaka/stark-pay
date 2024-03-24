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
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconWrapper, selected === "charge" && styles.selected]}
        onPress={() => setSelected("charge")}
      >
        <BlurView
          style={[
            styles.iconContainer,
            selected === "charge" && styles.selected,
          ]}
          intensity={selected === "charge" ? 90 : 0}
          tint="light"
        >
          <Text style={styles.icon}>🤝</Text>
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.iconWrapper,
          selected === "add-balance" && styles.selected,
        ]}
        onPress={() => setSelected("add-balance")}
      >
        <BlurView
          style={[
            styles.iconContainer,
            selected === "add-balance" && styles.selected,
          ]}
          intensity={selected === "add-balance" ? 90 : 0}
          tint="light"
        >
          <Text style={styles.icon}>💸</Text>
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.iconWrapper,
          selected === "investments" && styles.selected,
        ]}
        onPress={() => setSelected("investments")}
      >
        <BlurView
          style={[
            styles.iconContainer,
            selected === "investments" && styles.selected,
          ]}
          intensity={selected === "investments" ? 90 : 0}
          tint="light"
        >
          <Text style={styles.icon}>📈</Text>
        </BlurView>
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
  iconWrapper: {
    borderRadius: 20, // Applied to the TouchableOpacity
    overflow: "hidden", // Ensure this is set to clip the BlurView
  },
  iconContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    fontSize: 24,
  },
  selected: {
    borderRadius: 10, // Adjust for rounded corners
  },
});
