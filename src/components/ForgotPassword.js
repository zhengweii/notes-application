import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { defaultFontSize, height, primaryColor, secondaryColor } from "../styles";
import { Button, Input, Spinner } from "./common";
import {
  onEmailChange,
  onSendPasswordResetEmailPress
} from "../actions";

class ForgotPassword extends Component {
  static navigationOptions = {
    title: "Forgot Password"
  };

  renderSendResetEmailButtonOrSpinner = () => {
    const {
      navigation,
      sendingPasswordResetEmail,
      email,
      onSendPasswordResetEmailPress
    } = this.props;

    if (sendingPasswordResetEmail) {
      return (
        <View style={{ marginTop: height * 0.04 }}>
          <Spinner />
        </View>
      );
    }

    return <Button buttonText={"Send Reset Email"} style={{ backgroundColor: primaryColor, marginTop: height * 0.04 }} onPress={() => onSendPasswordResetEmailPress(navigation, email)} />;
  }

  render() {
    const {
      email,
      onEmailChange
    } = this.props;
    const { textStyle } = styles;

    return (
      <View>
        <Text style={textStyle}>Hello there! We just need your registered email for us to email you a link to reset your password :)</Text>
        <Input placeholder={"Email"} onChangeText={onEmailChange} value={email} autoCapitalize={"none"} />
        {this.renderSendResetEmailButtonOrSpinner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: secondaryColor,
    fontSize: defaultFontSize,
    width: "80%",
    alignSelf: "center",
    marginTop: height * 0.06,
    marginBottom: height * 0.04
  }
});

const mapStateToProps = (props) => props.auth;

export default connect(mapStateToProps, {
  onEmailChange,
  onSendPasswordResetEmailPress
})(ForgotPassword);
