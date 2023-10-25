import axios from './https';

// 登入
export const doPostSign= async (data) => {


  let targetUrl = data.mode == 'sign'?  '/api/player/sign': '/api/player/load';

  return await axios
    .post(targetUrl, data)
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



