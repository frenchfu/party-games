import axios from './https';

// 登入
export const doPostLogin = async (data) => {


  let targetUrl = data.mode == 'LOT'?  '/api/account/lot/login': '/api/account/admin/login';

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

export const getValidateCode = async () => {
  return await axios
    .post('/api/account/get-verify-code' )
    .then((response) => {
      if (response &&  response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err.response;
    });
};


