import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { defaultFontSize, secondaryColor, width } from "../../styles";

const Input = (props) => {
  const { textInputStyle } = styles;
  const { autoCapitalize, editable, maxLength, multiline, onChangeText, placeholder, secureTextEntry, style, value } = props;

  return (
    <TextInput
      autoCapitalize={autoCapitalize}
      editable={editable}
      maxLength={maxLength}
      multiline={multiline}
      placeholder={placeholder}
      placeholderTextColor={secondaryColor}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[textInputStyle, style]}
    />
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: defaultFontSize,
    color: secondaryColor,
    borderBottomWidth: 2,
    borderBottomColor: secondaryColor,
    width: width * 0.8,
    alignSelf: "center"
  }
});

export { Input };
