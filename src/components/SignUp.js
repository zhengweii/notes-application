import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { height, primaryColor } from "../styles";
import { Button, Input, Spinner } from "./common";
import {
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onSignUpPress
} from "../actions";

class SignUp extends Component {
  static navigationOptions = {
    title: "Sign Up"
  };

  renderSignUpButtonOrSpinner = () => {
    const {
      signingUp,
      firstName,
      lastName,
      email,
      password,
      onSignUpPress
    } = this.props;

    if (signingUp) return <Spinner />;
    return <Button buttonText={"Sign Up"} style={{ backgroundColor: primaryColor }} onPress={() => onSignUpPress(firstName, lastName, email, password)} />;
  }

  render() {
    const {
      firstName,
      onFirstNameChange,
      lastName,
      onLastNameChange,
      email,
      onEmailChange,
      password,
      onPasswordChange
    } = this.props;

    return (
      <View>
        <View style={{ marginTop: height * 0.12, marginBottom: height * 0.05 }}>
          <Input placeholder={"First Name"} onChangeText={onFirstNameChange} value={firstName} />
          <Input placeholder={"Last Name"} onChangeText={onLastNameChange} value={lastName} />
          <Input placeholder={"Email"} onChangeText={onEmailChange} value={email} autoCapitalize={"none"} />
          <Input placeholder={"Password"} onChangeText={onPasswordChange} value={password} secureTextEntry={true} autoCapitalize={"none"} />
        </View>

        {this.renderSignUpButtonOrSpinner()}
      </View>
    );
  }
}

const mapStateToProps = (props) => props.auth;

export default connect(mapStateToProps, {
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onSignUpPress
})(SignUp);
