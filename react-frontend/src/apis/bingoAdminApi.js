import axios from './https';

/**
 * 選號碼
 * @returns 
 */
export const choiceNumApi = async (num) => {
  
  return await axios
    .post('api/bingo-admin/choice-num/'+num, {})
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
    
};

/**
 * 取消號碼
 * @returns 
 */
export const cancelNumApi = async (num) => {
  
  return await axios
    .post('api/bingo-admin/cancel-num/'+num, {})
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
    
};

/**
 * 取消號碼
 * @returns 
 */
export const  doAdminReloadApi = async () => {
  
  return await axios
    .post('api/bingo-admin/do-admin-reload', {})
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
    
};

/**
 * 設定中獎線數
 * @returns 
 */
export const  doSetGetRewardConnectionNumApi = async (num) => {
  return await axios
    .post('api/bingo-admin/do-set-get-reward-connection-num/'+num, {})
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
    
};

/**
 * 設定中獎人數
 * @returns 
 */
export const  doSetMaxRewardNumApi = async (num) => {
  return await axios
    .post('api/bingo-admin/do-set-max-reward-num/'+num, {})
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
    
};

/**
 * 重啟遊戲
 * @returns 
 */
export const  doResetGameApi = async (num) => {
  return await axios
    .post('api/bingo-admin/reset-game', {})
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
    
};



