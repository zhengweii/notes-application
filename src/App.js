import React, { Component } from "react";
import { View } from "react-native";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { backgroundColor } from "./styles";
import { Spinner } from "./components/common";
import combineReducers from "./reducers";
import Router from "./Router";

class App extends Component {
  state = {
    isLoggedIn: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in");
        // Prevents this listener from being called twice
        // Bug in API
        if (!this.state.isLoggedIn) this.setState({ isLoggedIn: true });
      }
      else {
        console.log("User is not logged in");
        this.setState({ isLoggedIn: false });
      }
    });
  }

  renderRouterOrSpinner = () => {
    const { isLoggedIn } = this.state;

    if (isLoggedIn === null) {
      return (
        <View style={{ backgroundColor, flex: 1, justifyContent: "center" }}>
          <Spinner />
        </View>
      );
    }

    return <Router isLoggedIn={isLoggedIn} />;
  }

  render() {
    const store = createStore(combineReducers, applyMiddleware(thunk));
    return <Provider style={{ flex: 1 }} store={store}>{this.renderRouterOrSpinner()}</Provider>;
  }
}

export default App;
