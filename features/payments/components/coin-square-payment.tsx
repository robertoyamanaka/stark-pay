import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

interface CoinSquareForPaymentProps {
  imageUrl: string;
  name: string;
  selected: boolean;
  onPress: () => void;
}

export function CoinSquareForPayment({
  imageUrl,
  name,
  selected,
  onPress,
}: CoinSquareForPaymentProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <BlurView
        style={[
          styles.blur,
        ]}
        intensity={selected ? 90 : 10}
        tint="light"
      >
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.name}>{name}</Text>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 20,
  },
  blur: {
    height: 120,
    width: 85,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    textAlign: "center",
    color: "white",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 11,
    marginTop: 12,
  },
  apy: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
});
