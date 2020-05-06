import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import firebase from "@react-native-firebase/app";

import { backgroundColor, defaultFontSize, height, secondaryColor, width } from "../styles";

const assignOnPressFunction = (type) => {
  switch(type) {
    case "Profile":
      return alert("To set up again");

    case "Sign Out":
      firebase.auth().signOut()
      .then((success) => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Failed to sign out");
        console.log(error);
        alert("Failed to sign out");
      });
  }
}

const HomeDrawer = () => {
  const { drawerStyle, textStyle } = styles;
  const drawerItems = ["Profile", "Sign Out"];

  return (
    <FlatList
      style={drawerStyle}
      data={drawerItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={
        ({item, index}) => {
          return (
            <TouchableOpacity onPress={() => assignOnPressFunction(item)}>
              <Text style={textStyle}>{item}</Text>
            </TouchableOpacity>
          );
        }
      }
    />
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor
  },
  textStyle: {
    color: secondaryColor,
    fontSize: defaultFontSize,
    paddingLeft: width * 0.08,
    marginTop: height * 0.025
  }
});

export default HomeDrawer;
