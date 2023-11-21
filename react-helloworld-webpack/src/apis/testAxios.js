import axios from './https';


/**
 * test401
 */
export const test401 = async () => {
    console.log(" process.env.REACT_APP_URL");
    console.log( process.env.REACT_APP_URL);
    return await axios
      .post('api/react-class/test-401', {})
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
 * test402
 */
export const test402 = async () => {
  console.log(" process.env.REACT_APP_URL");
  console.log( process.env.REACT_APP_URL);
  return await axios
    .post('api/react-class/test-402', {})
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
 * getToken
 */
export const getToken = async () => {
  console.log(" process.env.REACT_APP_URL");
  console.log( process.env.REACT_APP_URL);
  return await axios
    .post('api/react-class/get-token', {})
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
