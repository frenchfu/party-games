import React, { useState , useEffect} from 'react';

const BingoCardOne = ({ inputBingoCardMapData, clickNumber, setClickNumber }) => {

  const tbody_css = {
    border: "5px solid black", /* 给元素添加黑色边框 */
    color: "#18b674;" // 设置文字颜色为亮色系，示例中使用橙色 */
  }
  
  const tbody_css_red = {
    border: "5px solid black",
    color: "#18b674",
    backgroundColor: "red" // 保留分号
  }

  const [ bingoCardMap, setBingoCardMap ] = useState(inputBingoCardMapData);


  const doClickNumber =  (key) => {
    setClickNumber(key);
  }

  
  useEffect(() => {

    setBingoCardMap(inputBingoCardMapData);

  }, [inputBingoCardMapData,clickNumber]); 

  return (
    <>
    <div className='box' >
     <tbody style={{...tbody_css, backgroundColor:"blue"}} className={"bingoTbody"}>
        {[1, 2, 3, 4, 5].map((row) => (
           <tr key={row}>
           {[1, 2, 3, 4, 5].map((col) => {
              let key = 5 * (row - 1) + col
              console.log(bingoCardMap);
              let no = bingoCardMap[key];
              console.log(key+":"+no);
                return (
                  <td
                      id={key}
                      style={clickNumber[no] === true ? tbody_css_red : tbody_css}
                      name={no}
                      onClick={() => doClickNumber(no, key)}
                      className='bright-style bright-blue-border'
                  >
                      {no}
                  </td>
              );
           })}
            </tr>
        ))}
        </tbody>
    </div>        
    </>
    
  );
}
export default BingoCardOne;


