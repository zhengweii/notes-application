import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Header, Input, Spinner } from "./common";
import { height } from "../styles";

const NoteLayout = (props) => {
  const {
    noteAction,
    editable,
    title,
    onTitleChange,
    description,
    onDescriptionChange,
  } = props;
  const { titleInputStyle, descriptionInputStyle } = styles;
  let newtitleInputStyle, newDescriptionInputStyle;

  if (title) newtitleInputStyle = { ...titleInputStyle, opacity: 1 };
  if (description) newDescriptionInputStyle = { ...descriptionInputStyle, opacity: 1 };

  if (noteAction) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Input
        editable={editable}
        maxLength={50}
        placeholder={"Untitled..."}
        value={title}
        onChangeText={onTitleChange}
        style={title ? newtitleInputStyle : titleInputStyle}
      />

      <Input
        editable={editable}
        multiline={true}
        placeholder={"Write your note here..."}
        value={description}
        onChangeText={onDescriptionChange}
        style={description ? newDescriptionInputStyle : descriptionInputStyle}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleInputStyle: {
    borderBottomWidth: 0,
    marginTop: height * 0.04,
    opacity: 0.5,
    width: "90%"
  },
  descriptionInputStyle: {
    borderBottomWidth: 0,
    opacity: 0.5,
    width: "90%"
  }
});

export default NoteLayout;
