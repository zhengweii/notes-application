import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { backgroundColor, defaultFontSize, height, primaryColor, regularFontType, secondaryColor, width } from "../../styles";

const CustomModal = (props) => {
  const {
    modalVisible,
    modalText,
    leftButtonText,
    onLeftButtonPress,
    rightButtonText,
    onRightButtonPress
  } = props;
  const { modalContainerStyle, modalButtonTextStyle } = styles;

  return (
    <Modal
      animationType={"fade"}
      transparent
      visible={modalVisible}
    >
      <View style={modalContainerStyle}>
        <View style={{ backgroundColor, height: "20%", width: "60%", alignSelf: "center", borderRadius: 10 }}>
          <Text style={{ ...regularFontType, flex: 1, textAlign: "center", textAlignVertical: "center", color: secondaryColor, fontSize: defaultFontSize }}>
            {modalText}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-around", borderTopWidth: 1, borderColor: "lightgray" }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onLeftButtonPress}>
              <Text style={[modalButtonTextStyle, { borderRightWidth: 1 , borderColor: "lightgray" }]}>{leftButtonText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1 }} onPress={onRightButtonPress}>
              <Text style={modalButtonTextStyle}>{rightButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flex: 1,
    justifyContent: "center"
  },
  modalButtonTextStyle: {
    color: primaryColor,
    textAlign: "center",
    paddingVertical: height * 0.015
  }
});

export default CustomModal;
