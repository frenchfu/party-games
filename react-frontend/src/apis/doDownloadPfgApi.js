import axios from './https';

// 下載合約PDF
export const doPlListPdfDownload = async (data) => {
    return await axios
      .post(`/api/pl-list-pdf/download`, data,
       {
        headers: {'content-type': 'application/json','accept': 'application/pdf'},
        responseType: "blob"
      }
      )
      .then((response) => {
        if (response ) {
          return response;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err.response);
        return false;
      })
  }

//匯出
export const doPlListConditionDownload = async (data) => {
  return await axios
    .post(`/api/pl-list-pdf/condition-download`, data,
     {
      headers: {'content-type': 'application/json','accept': 'application/pdf'},
      responseType: "blob"
    }
    )
    .then((response) => {
      if (response ) {
        return response;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err.response);
      return false;
    })
}  