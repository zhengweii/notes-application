import React, { Component } from "react";
import { BackHandler, Image, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { iconStyle } from "../styles";
import { CustomModal, Spinner } from "./common";
import NoteLayout from "./NoteLayout";
import {
  onDeleteNotePress,
  onBackToHomeScreenPress
} from "../actions";

class ViewNote extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.state.params.onBackToHomeScreenPress(navigation)}>
          <Image source={require("../images/back-icon.png")} style={iconStyle} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("editNote")}>
            <Image source={require("../images/edit-icon.png")} style={[iconStyle, { marginRight: 0 }]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.state.params.showDeleteModal()}>
            <Image source={require("../images/delete-icon.png")} style={iconStyle} />
          </TouchableOpacity>
        </View>
      )
    }
  };

  state = {
    deleteModalVisible: false
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
    const { navigation, onBackToHomeScreenPress } = this.props;

    navigation.setParams({ showDeleteModal: this.showDeleteModal, onBackToHomeScreenPress });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  showDeleteModal = () => {
    this.setState({ deleteModalVisible: true });
  }

  render() {
    const { deleteModalVisible } = this.state;
    const {
      navigation,
      deletingNote,
      noteId,
      title,
      description,
      onDeleteNotePress
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <CustomModal
          modalVisible={deleteModalVisible}
          modalText={"Are you sure you want to delete this note?"}
          leftButtonText={"No"}
          onLeftButtonPress={() => this.setState({ deleteModalVisible: false })}
          rightButtonText={"Delete"}
          onRightButtonPress={() => {
            this.setState({ deleteModalVisible: false });
            onDeleteNotePress(navigation, noteId);
          }}
        />

        <NoteLayout
          editable={false}
          noteAction={deletingNote}
          title={title}
          description={description}
        />
      </View>
    );
  }
}

const mapStateToProps = (props) => props.note;

export default connect(mapStateToProps, {
  onDeleteNotePress,
  onBackToHomeScreenPress
})(ViewNote);
