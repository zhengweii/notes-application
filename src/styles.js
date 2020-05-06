import { Dimensions } from "react-native";

export const { height, width } = Dimensions.get("window");

// Colors
export const backgroundColor = "white";
export const primaryColor = "#F1C40F";
export const secondaryColor = "#696969";
export const tertiaryColor = "white";

// Font size
export const appNameFontSize = 40;
export const headerFontSize = 20;
export const defaultFontSize = 18;
export const headerButtonFontSize = 16;
export const subTextFontSize = 14;

// Font family for android
export const boldedFontType = { fontFamily: "sans-serif-medium" };
export const regularFontType = { fontFamily: "sans-serif" };

// Styling
export const iconStyle = {
  tintColor: tertiaryColor,
  height: width * 0.06,
  width: width * 0.06,
  marginHorizontal: width * 0.05
};
