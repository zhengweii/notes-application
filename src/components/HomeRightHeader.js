import React, { Component } from "react";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { defaultFontSize, headerFontSize, height, iconStyle, primaryColor, secondaryColor, tertiaryColor, width } from "../styles";
import { sortNotes } from "../actions";

class HomeRightHeader extends Component {
  state = {
    sortOptionsModalVisible: false
  };

  renderSortOption = (sortKey, currentSortKey) => {
    const { sortNotes, myNotes } = this.props;
    const isCurrentSortKey = (sortKey === currentSortKey);
    let userFriendlySortKeyName;

    switch (sortKey) {
      case "title":
        userFriendlySortKeyName = "Title";
        break;

      case "description":
        userFriendlySortKeyName = "Description";
        break;

      case "createdAt":
        userFriendlySortKeyName = "Created At";
        break;

      case "lastEdited":
        userFriendlySortKeyName = "Last Edited";
        break;
    }

    return (
      <TouchableOpacity
        style={{ backgroundColor: isCurrentSortKey ? primaryColor : tertiaryColor, alignSelf: "baseline", borderRadius: 10, marginBottom: height * 0.04, borderWidth: 1, borderColor: primaryColor }}
        onPress={() => {
          this.setState({ sortOptionsModalVisible: false});
          sortNotes(myNotes, sortKey);
        }}
      >
        <Text style={{ color: isCurrentSortKey ? tertiaryColor : primaryColor, fontSize: defaultFontSize, paddingVertical: height * 0.005, paddingHorizontal: width * 0.02 }}>
          {userFriendlySortKeyName}
        </Text>
      </TouchableOpacity>
    );
  }

  renderModal = () => {
    const { sortOptionsModalVisible } = this.state;
    const { sortKey } = this.props;
    const sortOptions = ["title", "description", "createdAt", "lastEdited"];

    return (
      <Modal
        animationType={"slide"}
        transparent
        visible={sortOptionsModalVisible}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ sortOptionsModalVisible: false })} />

          <View style={{ backgroundColor: tertiaryColor, height: "60%", width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Text style={{ color: secondaryColor, textAlign: "center", marginVertical: height * 0.03, fontSize: headerFontSize }}>
              Sort By
            </Text>
            <FlatList
              style={{ marginLeft: width * 0.05 }}
              data={sortOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => this.renderSortOption(item, sortKey)}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => this.setState({ sortOptionsModalVisible: true })}>
          <Image source={require("../images/filter-icon.png")} style={[iconStyle, { marginRight: 0 }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("createNote")}>
          <Image source={require("../images/add-icon.png")} style={iconStyle} />
        </TouchableOpacity>

        {this.renderModal()}
      </View>
    );
  }
}

const mapStateToProps = (props) => props.note;

export default connect(mapStateToProps, {
  sortNotes
})(HomeRightHeader);
