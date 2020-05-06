import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler";

import { backgroundColor, headerFontSize, iconStyle, primaryColor, tertiaryColor } from "./styles";
import LogIn from "./components/LogIn";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import HomeDrawer from "./components/HomeDrawer";
import HomeRightHeader from "./components/HomeRightHeader";
import CreateNote from "./components/CreateNote";
import ViewNote from "./components/ViewNote";
import EditNote from "./components/EditNote";

const Router = (props) => {
  const { isLoggedIn } = props;
  const { defaultNavigationOptions } = styles;

  const AuthenticationNavigator = createStackNavigator({
    logIn: LogIn,
    forgotPassword: ForgotPassword,
    signUp: SignUp
  }, {
    defaultNavigationOptions
  });

  const HomeDrawerNavigator = createDrawerNavigator({
    home: Home
  }, {
    contentComponent: HomeDrawer
  });

  const HomeNavigator = createStackNavigator({
    home: {
      screen: HomeDrawerNavigator,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image source={require("./images/menu-icon.png")} style={iconStyle} />
          </TouchableOpacity>
        ),
        headerRight: () => <HomeRightHeader navigation={navigation} />
      })
    },
    createNote: CreateNote,
    viewNote: ViewNote,
    editNote: EditNote
  }, {
    defaultNavigationOptions
  });

  const Router = createAppContainer(
    createSwitchNavigator({
      auth: AuthenticationNavigator,
      home: HomeNavigator
    }, {
      initialRouteName: isLoggedIn ? "home" : "auth"
    })
  );

  return <Router />;
}

const styles = {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: primaryColor },
    headerTintColor: tertiaryColor,
    headerTitleStyle: { fontSize: headerFontSize },
    headerTitleAlign: "center",
    cardStyle: { backgroundColor }
  }
};

export default Router;
