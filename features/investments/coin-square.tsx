import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

interface CoinSquareProps {
  imageUrl: string;
  name: string;
  apy: number;
}

export function CoinSquare({ imageUrl, name, apy }: CoinSquareProps) {
  const handlePress = async (name: string) => {
    // Check if the link is supported
    const url = `https://www.metapool.app/stake?token=${name}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress(name)}
      style={styles.container}
    >
      <BlurView style={styles.blur} tint="light" intensity={30}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.apy}>{apy} %</Text>
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
