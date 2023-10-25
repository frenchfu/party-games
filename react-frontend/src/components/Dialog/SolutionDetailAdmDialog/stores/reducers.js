import * as types from './types';

const initState = {
  mode: '',
  showDialog: false,
  listData: null,
  triggerType: ''
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_SOLUTION_DETAIL_ADM_DIALOG_VISIBLE:
      return {
        ...state,
        mode: action.payload.mode,
        showDialog: action.payload.showDialog,
        listData: action.payload.listData,
        triggerType: action.payload.triggerType,
      }
    default:
      return state;
  }
};

export default reducers;
