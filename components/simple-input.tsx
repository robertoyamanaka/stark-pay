import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface SimpleInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  maxLength?: number;
  placeholderTextColor?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

export function SimpleInput({
  placeholder,
  value,
  onChangeText,
  containerStyle,
  maxLength = 50,
  placeholderTextColor = "#A1A1A4",
  keyboardType = "default",
}: SimpleInputProps) {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={[styles.container, containerStyle]}>
        <TextInput
          value={value} // Directly use the `value` prop for the TextInput
          onChangeText={onChangeText} // Directly pass the `onChangeText` handler
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#CBCBCB",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    color: "#F2F2F2",
    fontSize: 14,
    // fontFamily: "Plus Jakarta Sans",
    fontWeight: "600",
    lineHeight: 18,
  },
});
