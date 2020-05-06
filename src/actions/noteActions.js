import firebase from "@react-native-firebase/app";

import {
  ON_TITLE_CHANGE,
  ON_DESCRIPTION_CHANGE,
  GETTING_NOTES,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  REMOVE_SNAPSHOT_LISTENER,
  SORT_NOTES,
  CREATING_NOTE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
  VIEWING_NOTE,
  BACK_TO_HOME_SCREEN,
  BACK_TO_VIEW_NOTE_SCREEN,
  UPDATING_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAIL,
  DELETING_NOTE,
  DELETE_NOTE_SUCCESS
} from "../constants";

export const onTitleChange = (title) => {
  return {
    type: ON_TITLE_CHANGE,
    payload: title
  };
}

export const onDescriptionChange = (description) => {
  return {
    type: ON_DESCRIPTION_CHANGE,
    payload: description
  };
}

// Helper function
const compareValues = (key, order="ascending") => {
  return (a, b) => {
    let comparison = 0;
    switch(key) {
      case "title":
      case "description":
        const x = a[key].toLowerCase();
        const y = b[key].toLowerCase();
        if (x > y) comparison = 1;
        else if (x < y) comparison = -1;
        break;

      case "createdAt":
      case "lastEdited":
        let secondsForA = a[key].seconds + a[key].nanoseconds / 1000000000;
        let secondsForB = b[key].seconds + b[key].nanoseconds / 1000000000;

        if (secondsForA > secondsForB) comparison = -1;
        else if (secondsForA < secondsForB) comparison = 1;
    }

    return order === "descending" ? comparison * -1 : comparison;
  }
}

export const getNotes = (sortKey) => {
  return (dispatch) => {
    dispatch({ type: GETTING_NOTES });

    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    const listener = db.collection("notes").doc(uid).collection("myNotes").onSnapshot((docSnapshot) => {
      console.log("Snapshot listener");
      const myNotes = [];
      docSnapshot.forEach((doc) => {
        myNotes.push({
          ...doc.data(),
          noteId: doc.id
        });
      });

      // Sort the notes first
      myNotes.sort(compareValues(sortKey));
      dispatch({
        type: GET_NOTES_SUCCESS,
        payload: myNotes
      });
    }, (error) => {
      console.log("Failed to get notes");
      console.log(error);
      dispatch({ type: GET_NOTES_FAIL });
    });

    dispatch({
      type: REMOVE_SNAPSHOT_LISTENER,
      payload: listener
    });
  }
}

export const sortNotes = (myNotes, sortKey) => {
  return (dispatch) => {
    myNotes.sort(compareValues(sortKey));
    dispatch({
      type: SORT_NOTES,
      payload: {
        myNotes,
        sortKey
      }
    });
  }
}

export const onCreateNotePress = (navigation, title, description) => {
  return (dispatch) => {
    if (!title) return alert("Note title is required");

    dispatch({ type: CREATING_NOTE });

    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    db.collection("notes").doc(uid).collection("myNotes").add({
      title,
      description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastEdited: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Successfully added note");
      dispatch({ type: CREATE_NOTE_SUCCESS });
      navigation.goBack();
    })
    .catch((error) => {
      console.log("Failed to add note");
      console.log(error);
      alert("Failed to add note");
      dispatch({ type: CREATE_NOTE_FAIL });
    });
  }
}

export const onBackToHomeScreenPress = (navigation) => {
  navigation.goBack();
  return ({ type: BACK_TO_HOME_SCREEN });
}

export const onViewNotePress = (navigation, currentNote) => {
  return (dispatch) => {
    dispatch({
      type: VIEWING_NOTE,
      payload: { ...currentNote }
    });

    navigation.navigate("viewNote");
  }
}

export const onBackToViewNoteScreenPress = (navigation) => {
  navigation.goBack();
  return ({ type: BACK_TO_VIEW_NOTE_SCREEN });
}

export const onUpdateNotePress = (navigation, noteId, title, description) => {
  return (dispatch) => {
    if (!title) return alert("Note title is required");

    dispatch({ type: UPDATING_NOTE });

    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    db.collection("notes").doc(uid).collection("myNotes").doc(noteId).update({
      title,
      description,
      lastEdited: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Successfully updated note");
      navigation.goBack();
      dispatch({ type: UPDATE_NOTE_SUCCESS });
    })
    .catch((error) => {
      console.log("Failed to update note");
      console.log(error);
      alert("Failed to update note");
      dispatch({ type: UPDATE_NOTE_FAIL });
    });
  }
}

export const onDeleteNotePress = (navigation, noteId) => {
  return (dispatch) => {
    dispatch({ type: DELETING_NOTE });

    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    db.collection("notes").doc(uid).collection("myNotes").doc(noteId).delete()
    .then(() => {
      console.log("Successfully deleted note");
      navigation.goBack();
      dispatch({ type: DELETE_NOTE_SUCCESS });
    })
    .catch((error) => {
      console.log("Failed to delete note");
      console.log(error);
      alert("Failed to delete note. Please try again!");
    });
  }
}
