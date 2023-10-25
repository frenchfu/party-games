import { actions as notifyActions } from "../components/Dialog/NotifyDialog/stores";
import {  useDispatch } from 'react-redux';

export const useNotify = () => {
    const dispatch = useDispatch();
    return (title, message) => {
      return dispatch(notifyActions.openDialog(title, message))
    }
  }
