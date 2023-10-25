import axios from './https';


/**
 * doDrowLot
 */
export const drowApi = async (data) => {
  
    const { yr, rewardCd, itemCd } = data;

    return await axios
      .post('api/lot-drowing/drow', { yr, rewardCd, itemCd })
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
 * do LOAD Drow List result
 */
export const doGetDrowResult = async (data) => {

  const { drowSets, rewards, orgMains } = data;
  const { yr, rewardCd, itemCd } = rewards;

  return await axios
    .post('api/lot-drowing/result',  {  rewards: { yr, rewardCd, itemCd }, orgMains ,drowSets})
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