import React, { Component } from "react";
import { BackHandler, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "@react-native-firebase/app";
import { connect } from "react-redux";

import { backgroundColor, defaultFontSize, height, secondaryColor, width } from "../styles";
import { CustomModal, Spinner } from "./common";
import {
  getNotes,
  onViewNotePress
} from "../actions";

class Home extends Component {
  state = {
    exitModalVisible: false
  };

  handleBackButton = () => {
    this.setState({ exitModalVisible: true });
    return true;
  }

  componentDidMount() {
    const { getNotes, sortKey } = this.props;

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    getNotes(sortKey);
  }

  componentWillUnmount() {
    const { removeSnapshotListener } = this.props;

    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    if (removeSnapshotListener) {
      console.log("Unsubscribed from updates");
      removeSnapshotListener();
    }
  }

  listDisplay = (note) => {
    const { navigation, onViewNotePress } = this.props;
    const { textStyle } = styles;

    return (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", borderRadius: 10, backgroundColor, marginHorizontal: "4%", marginBottom: height * 0.02, height: height * 0.06, elevation: 5 }}
        onPress={() => onViewNotePress(navigation, note)}
      >
        <Text style={textStyle}>{note.title}</Text>
      </TouchableOpacity>
    );
  }

  renderNotes = (myNotes) => {
    if (myNotes.length === 0) return <Text style={{ flex: 1, textAlign: "center", textAlignVertical: "center", color: secondaryColor }}>Oops! There are currently no saved notes :(</Text>;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: height * 0.02 }}
        data={myNotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => this.listDisplay(item)}
      />
    );
  }

  render() {
    const { exitModalVisible } = this.state;
    const { gettingNotes, myNotes } = this.props;

    if (gettingNotes) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Spinner />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {this.renderNotes(myNotes)}
        <CustomModal
          modalVisible={exitModalVisible}
          modalText={"Do you want to exit the app?"}
          leftButtonText={"No"}
          onLeftButtonPress={() => this.setState({ exitModalVisible: false })}
          rightButtonText={"Yes"}
          onRightButtonPress={() => BackHandler.exitApp()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: secondaryColor,
    fontSize: defaultFontSize,
    marginLeft: width * 0.04
  }
});

const mapStateToProps = (props) => props.note;

export default connect(mapStateToProps, {
  getNotes,
  onViewNotePress
})(Home);
