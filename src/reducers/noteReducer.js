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

const INITIAL_STATE = {
  gettingNotes: null,
  creatingNote: null,
  updatingNote: null,
  deletingNote: null,
  removeSnapshotListener: null,
  sortKey: "title",
  titleInitial: "",
  title: "",
  descriptionInitial: "",
  description: "",
  noteId: "",
  myNotes: []
};

export default (state=INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
    case ON_TITLE_CHANGE:
      return { ...state, title: payload };

    case ON_DESCRIPTION_CHANGE:
      return { ...state, description: payload };

    // Renders the spinner
    case GETTING_NOTES:
      return { ...state, gettingNotes: true };

    // Removes the spinner from view
    // Returns the notes
    case GET_NOTES_SUCCESS:
      return { ...state, myNotes: payload, gettingNotes: null };

    case GET_NOTES_FAIL:
      return { ...state, gettingNotes: null };

    case REMOVE_SNAPSHOT_LISTENER:
      return { ...state, removeSnapshotListener: payload };

    case SORT_NOTES:
      return { ...state, ...payload };

    // Renders the spinner
    case CREATING_NOTE:
      return { ...state, creatingNote: true };

    // Resets the array as the latest data will be fetched from the database
    case CREATE_NOTE_SUCCESS:
      return { ...state, creatingNote: null, myNotes: [], title: "", description: "" };

    case CREATE_NOTE_FAIL:
      return { ...state, creatingNote: null };

    case VIEWING_NOTE:
      return {
        ...state,
        titleInitial: payload.title,
        title: payload.title,
        descriptionInitial: payload.description,
        description: payload.description,
        noteId: payload.noteId
      }

    // Back from creating note
    // Back from viewing note
    case BACK_TO_HOME_SCREEN:
      return { ...state, title: "", description: "" };

    case BACK_TO_VIEW_NOTE_SCREEN:
      const { titleInitial, descriptionInitial } = state;
      return { ...state, title: titleInitial, description: descriptionInitial };

    case UPDATING_NOTE:
      return { ...state, updatingNote: true };

    case UPDATE_NOTE_SUCCESS:
    case UPDATE_NOTE_FAIL:
      return { ...state, updatingNote: null };

    case DELETING_NOTE:
      return { ...state, deletingNote: true };

    // Removes the spinner from view
    // Resets the title and description
    case DELETE_NOTE_SUCCESS:
      return { ...state, deletingNote: null, title: "", description: "" };

    default:
      return state;
  }
}
