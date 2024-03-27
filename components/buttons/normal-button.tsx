import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface NormalButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const NormalButton: React.FC<NormalButtonProps> = ({
  title,
  active,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!active}
      style={[styles.button, containerStyle]}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 20,
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: "#3A3A3A",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#F2F2F2",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
});

export default NormalButton;
