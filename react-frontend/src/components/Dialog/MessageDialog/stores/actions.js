import * as types from './types';

export const closeDialog = () => ({
  type: types.TOGGLE_MESSAGE_DIALOG_VISIBLE,
  payload: {
    mode: '',
    showDialog: false,
    listData: null
  }
});

export const openDialog = (modeName, data) => ({
  type: types.TOGGLE_MESSAGE_DIALOG_VISIBLE,
  payload: {
    mode: modeName,
    showDialog: true,
    listData: data
  }
});
