import * as types from './types';

const  SOLUTION_STATUS="solutionStatus"
const  USERSTATUS="userStatus"
const  ORDERSTATUS="orderStatus"
const  SOLUTIONCATEGORY="solutionCategory"

const initState = {
  mode: '',
  showDialog: false,
  listData: null
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_DIALOG_VISIBLE:
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
