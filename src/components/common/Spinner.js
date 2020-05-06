import React from "react";
import { ActivityIndicator } from "react-native";

import { primaryColor } from "../../styles";

const Spinner = (props) => {
  const { color, size } = props;

  return (
    <ActivityIndicator
      size={size || "large"}
      color={color || primaryColor}
    />
  );
}

export default Spinner;
