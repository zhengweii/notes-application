import React, { Component } from "react";
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { defaultFontSize, headerButtonFontSize, height, iconStyle, tertiaryColor, width } from "../styles";
import NoteLayout from "./NoteLayout";
import {
  onTitleChange,
  onDescriptionChange,
  onUpdateNotePress,
  onBackToViewNoteScreenPress
} from "../actions";

class EditNote extends Component {
  static navigationOptions = ({ navigation }) => {
    const { rightContainerStyle, headerButtonTextStyle } = styles;

    return {
      title: "Editing Note",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.state.params.onBackToViewNoteScreenPress(navigation)}>
          <Image source={require("../images/back-icon.png")} style={iconStyle} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={rightContainerStyle} onPress={() => navigation.state.params.onUpdateNotePress(navigation, navigation.state.params.noteId, navigation.state.params.title, navigation.state.params.description)}>
          <Text style={headerButtonTextStyle}>Save</Text>
        </TouchableOpacity>
      )
    }
  };

  handleBackButton = () => {
    const {
      navigation,
      onBackToViewNoteScreenPress
    } = this.props;

    onBackToViewNoteScreenPress(navigation);
    return true;
  }

  componentDidMount() {
    const {
      navigation,
      noteId,
      title,
      description,
      onUpdateNotePress,
      onBackToViewNoteScreenPress
    } = this.props;

    navigation.setParams({
      noteId,
      title,
      description,
      onUpdateNotePress,
      onBackToViewNoteScreenPress
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate(){
    const {
      navigation,
      title,
      description
    } = this.props;

    if (navigation.getParam("title", "default") !== title) navigation.setParams({ title });
    if (navigation.getParam("description", "default") !== description) navigation.setParams({ description });
  }

  render() {
    const {
      updatingNote,
      noteId,
      title,
      onTitleChange,
      description,
      onDescriptionChange,
      onUpdateNotePress
    } = this.props;

    return (
      <NoteLayout
        noteAction={updatingNote}
        title={title}
        onTitleChange={onTitleChange}
        description={description}
        onDescriptionChange={onDescriptionChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  rightContainerStyle: {
    position: "absolute",
    right: width * 0.025
  },
  headerButtonTextStyle: {
    color: tertiaryColor,
    fontSize: headerButtonFontSize
  }
});

const mapStateToProps = (props) => props.note;

export default connect(mapStateToProps, {
  onTitleChange,
  onDescriptionChange,
  onUpdateNotePress,
  onBackToViewNoteScreenPress
})(EditNote);
