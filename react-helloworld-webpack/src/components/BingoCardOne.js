import React, { useState , useEffect} from 'react';

const BingoCardOne = ({ inputBingoCardMapData }) => {

  const tbody_css = {
    border: "5px solid black", /* 给元素添加黑色边框 */
    color: "#18b674;" // 设置文字颜色为亮色系，示例中使用橙色 */
  }
  
  const tbody_css_red = {
    border: "5px solid black",
    color: "#18b674",
    backgroundColor: "red" // 保留分号
  }


  const [ clickNumber, setClickNumber ] = useState({});
  const [ bingoCardMap, setBingoCardMap ] = useState(inputBingoCardMapData);


  const doClickNumber =  (key) => {
  
    const finalClickNumber = {...clickNumber};
    console.log(finalClickNumber);
    if(!!finalClickNumber[key]){
      finalClickNumber[key] = null;
    }else{
      finalClickNumber[key] = true;
    }
    console.log(finalClickNumber);
    setClickNumber(finalClickNumber);
  
  }

  
  useEffect(() => {

    setBingoCardMap(inputBingoCardMapData);


  }, [inputBingoCardMapData]); 

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
                      style={clickNumber[key] === true ? tbody_css_red : tbody_css}
                      name={no}
                      onClick={() => doClickNumber(key, no)}
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


