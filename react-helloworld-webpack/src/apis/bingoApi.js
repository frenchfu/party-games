import axios from './https';


/**
 * doDrowLot
 */
export const drowApi = async () => {
    console.log(" process.env.REACT_APP_URL");
    console.log( process.env.REACT_APP_URL);
    return await axios
      .post('api/react-class/drow-a-card', {})
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
    .post('api/react-class/check-bingo', 
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


