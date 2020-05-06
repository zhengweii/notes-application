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

const INITIAL_STATE = {
  loggingIn: null,
  sendingPasswordResetEmail: null,
  signingUp: null,
  email: "",
  password: "",
  firstName: "",
  lastName: ""
};

export default (state=INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
    case ON_EMAIL_CHANGE:
      return { ...state, email: payload };

    case ON_PASSWORD_CHANGE:
      return { ...state, password: payload };

    // Renders the spinner
    case LOGGING_IN:
      return { ...state, loggingIn: true };

    // Removes the spinner from view and resets the state
    case LOG_IN_SUCCESS:
      return { ...INITIAL_STATE };

    case LOG_IN_FAIL:
      return { ...state, loggingIn: null };

    case SENDING_PASSWORD_RESET_EMAIL:
      return { ...state, sendingPasswordResetEmail: true };

    case SEND_PASSWORD_RESET_EMAIL_SUCCESS:
    case SEND_PASSWORD_RESET_EMAIL_FAIL:
      return { ...state, sendingPasswordResetEmail: null };

    case ON_FIRST_NAME_CHANGE:
      return { ...state, firstName: payload };

    case ON_LAST_NAME_CHANGE:
      return { ...state, lastName: payload };

    case SIGNING_UP:
      return { ...state, signingUp: true };

    case SIGN_UP_SUCCESS:
      return { ...INITIAL_STATE };

    case SIGN_UP_FAIL:
      return { ...state, signingUp: null };

    default:
      return state;
  }
}
