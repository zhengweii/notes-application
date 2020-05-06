import React, { Component } from "react";
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { headerButtonFontSize, iconStyle, width, tertiaryColor } from "../styles";
import NoteLayout from "./NoteLayout";
import {
  onTitleChange,
  onDescriptionChange,
  onCreateNotePress,
  onBackToHomeScreenPress
} from "../actions";

class CreateNote extends Component {
  static navigationOptions = ({ navigation }) => {
    const { rightContainerStyle, headerButtonTextStyle } = styles;

    return {
      title: "Create Note",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.state.params.onBackToHomeScreenPress(navigation)}>
          <Image source={require("../images/back-icon.png")} style={iconStyle} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={rightContainerStyle} onPress={() => navigation.state.params.onCreateNotePress(navigation, navigation.state.params.title, navigation.state.params.description)}>
          <Text style={headerButtonTextStyle}>Create</Text>
        </TouchableOpacity>
      )
    }
  };

  handleBackButton = () => {
    const {
      navigation,
      onBackToHomeScreenPress
    } = this.props;

    onBackToHomeScreenPress(navigation);
    return true;
  }

  componentDidMount() {
    const {
      navigation,
      title,
      description,
      onCreateNotePress,
      onBackToHomeScreenPress
    } = this.props;

    navigation.setParams({
      title,
      description,
      onCreateNotePress,
      onBackToHomeScreenPress
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
      creatingNote,
      title,
      onTitleChange,
      description,
      onDescriptionChange
    } = this.props;

    return (
      <NoteLayout
        noteAction={creatingNote}
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
  onCreateNotePress,
  onBackToHomeScreenPress
})(CreateNote);
