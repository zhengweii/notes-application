import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { headerButtonFontSize, headerFontSize, height, primaryColor, secondaryColor, width } from "../../styles";

const Header = (props) => {
  const { headerText, leftButtonText, rightButtonText, onLeftPress, onRightPress, leftHeaderComponent, rightHeaderComponent } = props;
  const { headerStyle, headerTextStyle, headerButtonTextStyle, leftContainerStyle, rightContainerStyle } = styles;

  return (
    <View style={headerStyle}>
      <TouchableOpacity style={leftContainerStyle} onPress={onLeftPress}>
        <Text style={headerButtonTextStyle}>{leftButtonText}</Text>
      </TouchableOpacity>

      <View style={leftContainerStyle}>{leftHeaderComponent}</View>

      <Text style={headerTextStyle}>{headerText}</Text>

      <TouchableOpacity style={rightContainerStyle} onPress={onRightPress}>
        <Text style={headerButtonTextStyle}>{rightButtonText}</Text>
      </TouchableOpacity>

      <View style={rightContainerStyle}>{rightHeaderComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: primaryColor,
    height: height * 0.082
  },
  headerTextStyle: {
    fontSize: headerFontSize,
    color: secondaryColor,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1
  },
  headerButtonTextStyle: {
    color: secondaryColor,
    fontSize: headerButtonFontSize
  },
  leftContainerStyle: {
    position: "absolute",
    top: height * 0.025,
    left: width * 0.024,
    zIndex: 1
  },
  rightContainerStyle: {
    position: "absolute",
    top: height * 0.025,
    right: width * 0.024,
    zIndex: 1
  }
});

export default Header;
