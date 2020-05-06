import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { defaultFontSize, height, regularFontType, tertiaryColor, width } from "../../styles";

const Button = (props) => {
  const { buttonStyle, textStyle } = styles;
  const { buttonText, onPress, style } = props;

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: "center",
    borderRadius: 12,
    height: height * 0.06,
    width: width * 0.8
  },
  textStyle: {
    ...regularFontType,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: defaultFontSize,
    color: tertiaryColor,
    // Allows text to be aligned vertically
    flex: 1
  }
});

export default Button;
