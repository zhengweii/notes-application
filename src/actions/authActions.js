import firebase from "@react-native-firebase/app";

import { formatDateHelper } from "../utils";

import {
  ON_EMAIL_CHANGE,
  ON_PASSWORD_CHANGE,
  LOGGING_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SENDING_PASSWORD_RESET_EMAIL,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  SEND_PASSWORD_RESET_EMAIL_FAIL,
  ON_FIRST_NAME_CHANGE,
  ON_LAST_NAME_CHANGE,
  SIGNING_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
} from "../constants";

export const onEmailChange = (email) => {
  return {
    type: ON_EMAIL_CHANGE,
    payload: email
  };
}

export const onPasswordChange = (password) => {
  return {
    type: ON_PASSWORD_CHANGE,
    payload: password
  };
}

export const onLogInPress = (email, password) => {
  return (dispatch) => {
    if (!email) return alert("Please enter your email");
    if (!password) return alert("Please enter your password");

    dispatch({ type: LOGGING_IN });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
      console.log("Logged in successfully");
      dispatch({ type: LOG_IN_SUCCESS });
    })
    .catch((error) => {
      console.log("Failed to log in");
      console.log(error);
      alert(error);
      dispatch({ type: LOG_IN_FAIL });
    });
  }
}

export const onSendPasswordResetEmailPress = (navigation, email) => {
  return (dispatch) => {
    if (!email) return alert("Please enter your email");

    dispatch({ type: SENDING_PASSWORD_RESET_EMAIL });

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log("Successfully sent password reset email");
      alert("Successfully sent password reset email. Please check your email to reset your password");
      navigation.goBack();
      dispatch({ type: SEND_PASSWORD_RESET_EMAIL_SUCCESS });
    })
    .catch((error) => {
      console.log("Failed to send password reset email");
      console.log(error);
      alert(error);
      dispatch({ type: SEND_PASSWORD_RESET_EMAIL_FAIL });
    });
  }
}

export const onFirstNameChange = (firstName) => {
  return {
    type: ON_FIRST_NAME_CHANGE,
    payload: firstName
  };
}

export const onLastNameChange = (lastName) => {
  return {
    type: ON_LAST_NAME_CHANGE,
    payload: lastName
  };
}

export const onSignUpPress = (firstName, lastName, email, password) => {
  return (dispatch) => {
    if (!firstName) return alert("Please enter your first name");
    if (!lastName) return alert("Please enter your last name");
    if (!email) return alert("Please enter your email");
    if (!password) return alert("Please enter your password");

    dispatch({ type: SIGNING_UP });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((success) => {
      console.log("Successfully signed up");
      const db = firebase.firestore();
      const uid = firebase.auth().currentUser.uid;

      db.collection("users").doc(uid).set({
        firstName,
        lastName,
        email,
        signUpDate: formatDateHelper(new Date())
      })
      .then((success) => {
        console.log("Added new user details successfully");
      })
      .catch((error) => {
        console.log("Failed to add new user details");
        console.log(error);
      });

      dispatch({ type: SIGN_UP_SUCCESS });
    })
    .catch((error) => {
      console.log("Failed to sign up");
      console.log(error);
      alert(error);
      dispatch({ type: SIGN_UP_FAIL });
    });
  }
}
