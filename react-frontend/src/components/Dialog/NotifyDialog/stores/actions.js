import * as types from './types';

export const closeDialog = () => ({
  type: types.TOGGLE_NOTIFY_DIALOG_VISIBLE,
  payload: {
    mode: '',
    showDialog: false,
    listData: null
  }
});

export const openDialog = (title, message) => ({
  type: types.TOGGLE_NOTIFY_DIALOG_VISIBLE,
  payload: {
    showDialog: true,
    title,
    message
  }
});
