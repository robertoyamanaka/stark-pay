import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type PrimaryButtonProps = {
  title: string;
  active: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const PrimaryButton = ({
  title,
  active,
  onPress,
  containerStyle,
}: PrimaryButtonProps) => {
  const buttonStyle = active ? styles.active : styles.disabled;
  const textStyle = active ? styles.activeText : styles.disabledText;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle,containerStyle]}
      disabled={!active}
      activeOpacity={0.8} 
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    borderWidth: 2,
    width: '100%',
    height: 60, 
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 19, 
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  active: {
    borderColor: "#EC5FB2", // Navy color for the main border
    backgroundColor: "#EC5FB2", // Light blue color for the background
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeText: {
    color: "#FFFFFF", // White color for active text for better contrast
  },
  disabled: {
    borderColor: "#C95777",
    backgroundColor: "#C95777", // A solid color to represent disabled state
    opacity: 0.5,
  },
  disabledText: {
    color: "#CBCBCB", // Light color for disabled text
  },
});
