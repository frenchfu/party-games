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
export const checkBingoApi = async () => {
  
  return await axios
    .post('api/bingo/check-bingo', {})
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
    .post('api/bingo/check-click', {})
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



