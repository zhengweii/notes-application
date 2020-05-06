import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import firebase from "@react-native-firebase/app";
import { connect } from "react-redux";

import { appNameFontSize, boldedFontType, height, primaryColor, regularFontType, secondaryColor, subTextFontSize, width } from "../styles";
import { Button, Input, Spinner } from "./common";
import {
  onEmailChange,
  onPasswordChange,
  onLogInPress
} from "../actions";

class LogIn extends Component {
  static navigationOptions = {
    headerShown: false
  };

  renderLogInButtonOrSpinner = () => {
    const {
      loggingIn,
      email,
      password,
      onLogInPress
    } = this.props;

    if (loggingIn) return <Spinner />;
    return <Button buttonText={"Log In"} style={{ backgroundColor: primaryColor }} onPress={() => onLogInPress(email, password)} />;
  }

  render() {
    const {
      navigation,
      email,
      onEmailChange,
      password,
      onPasswordChange
    } = this.props;

    return (
      <View>
        {/* Top section */}
        <Text style={{ fontSize: appNameFontSize, color: primaryColor, alignSelf: "center", marginTop: height * 0.02 }}>Notes App</Text>

        {/* Middle section */}
        <View style={{ marginVertical: height * 0.25 }}>
          <Input placeholder={"Email"} onChangeText={onEmailChange} value={email} autoCapitalize={"none"} />
          <Input
            placeholder={"Password"}
            onChangeText={onPasswordChange}
            value={password}
            secureTextEntry={true}
            autoCapitalize={"none"}
            style={{ marginBottom: height * 0.05 }}
          />

          {this.renderLogInButtonOrSpinner()}

          <TouchableOpacity style={{ marginTop: height * 0.02 }} onPress={() => navigation.navigate("forgotPassword")}>
            <Text style={{ fontSize: subTextFontSize, color: secondaryColor, alignSelf: "center" }}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom section */}
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={{ fontSize: subTextFontSize, color: secondaryColor, marginRight: width * 0.01 }}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
            <Text style={{ fontSize: subTextFontSize, color: primaryColor }}>Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => state.auth;

export default connect(mapStateToProps, {
  onEmailChange,
  onPasswordChange,
  onLogInPress
})(LogIn);
