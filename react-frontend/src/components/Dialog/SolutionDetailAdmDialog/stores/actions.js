import * as types from './types';

export const closeDialog = () => ({
  type: types.TOGGLE_SOLUTION_DETAIL_ADM_DIALOG_VISIBLE,
  payload: {
    mode: '',
    showDialog: false,
    listData: null
  }
});

export const openDialog = (modeName, data, triggerType) => ({
  type: types.TOGGLE_SOLUTION_DETAIL_ADM_DIALOG_VISIBLE,
  payload: {
    mode: modeName,
    showDialog: true,
    listData: data,
    triggerType
  }
});
