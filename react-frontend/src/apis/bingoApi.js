import axios from './https';


/**
 * doDrowLot
 */
export const drowApi = async () => {
  
    return await axios
      .post('api/bingo/drow-a-card', {})
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
 * 確認是否已賓果
 * @returns 
 */
export const checkBingoApi = async (selectedCells) => {
  
  return await axios
    .post('api/bingo/check-bingo', 
    {
      checkNums:selectedCells
    })
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
 * 取得已可點選的項目
 * @returns 
 */
export const getCanCheckedApi = async () => {
  
  return await axios
    .post('api/bingo/check-can-click', {})
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
 * 重新取得玩家資訊
 * @returns 
 */
export const doLoadPlayerApi = async () => {
  
  return await axios
    .post('api/bingo/do-load-player', {})
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




