import * as types from './types';

const initState = {
  mode: '',
  showDialog: false,
  listData: null
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_MESSAGE_DIALOG_VISIBLE:
      return {
        ...state,
        mode: action.payload.mode,
        showDialog: action.payload.showDialog,
        listData: action.payload.listData
      }
    default:
      return state;
  }
};

export default reducers;
