import * as types from './types';

const initState = {
  showDialog: false,
  title: '',
  message: ''
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_NOTIFY_DIALOG_VISIBLE:
      return {
        ...state,
        showDialog: action.payload.showDialog,
        title: action.payload.title,
        message: action.payload.message
      }
    default:
      return state;
  }
};

export default reducers;
