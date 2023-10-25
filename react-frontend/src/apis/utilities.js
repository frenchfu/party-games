
// 跳轉、提示、及錯誤處理

export const tip = (message) => {
  console.error(message);
}

export const parseParams = (params) => {
  let queryString = ''
  if (!params) {
    return queryString;
  }

  if (Array.isArray(params)) {
    return queryString;
  }
  const collectQueryString = [];
  Object.keys(params).forEach((key) => {
    if (key === 'page') {
      // 判斷: 搜尋條件改變時，分頁要從第1頁開始
      if (JSON.stringify(params.filters) === JSON.stringify(params.cacheFilters)) {
        collectQueryString.push(`page=${params[key] - 1 < 0 ? 0 : params[key] - 1}`);
      } else {
        collectQueryString.push(`page=${0}`);
      }
    } else if (key === 'filters') { // 取得filters中的每一筆資料
      if (params.filters && Object.keys(params.filters)) {
        Object.keys(params.filters).forEach(filterKey => {
          if (filterKey === 'rangePickerInterval') {
            if (params.filters[filterKey] &&  params.filters[filterKey].length > 0) {
              const momentToString = params.filters[filterKey].map(item => {
                return item.format('YYYY/MM/DD HH:mm:ss')
              })
              collectQueryString.push(`${filterKey}=${momentToString}`);
            }
          }
          // 檢核filters是否有值，並trim查詢資料
          else if (params.filters[filterKey] !== null && params.filters[filterKey] !== undefined && params.filters[filterKey] !== '')
            collectQueryString.push(`${filterKey}=${params.filters[filterKey].trim()}`);          
        })
      }
    } else if (key === 'cacheFilters') {
      // skip
    }
    else {
      collectQueryString.push(`${key}=${params[key]}`);
    }
  });
  return collectQueryString.length > 0 ? `?${collectQueryString.join("&")}` : '';
}

//iso String to Date
export const isoStringToDate = (isoDate) => {
  let b = isoDate.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], "00"));
}

//取得相差月數
export const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}