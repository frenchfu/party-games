import axios from './https';


export const doGetReardsList = async (data = {}) => {

  return await axios
    .post("/api/admin/rewards/list", data)
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

export const doSaveRewards = async (data = {}) => {

  return await axios
    .post("/api/admin-reward/save", data)
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

export const doReSetRewards = async (data = {}) => {

  return await axios
    .post("/api/admin-reward/reset", data)
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




