import React, { useState , useEffect} from 'react';

const BingoCardOne = () => {

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

  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <tbody style={{...tbody_css, backgroundColor:"blue"}} className={"bingoTbody"}>
          <tr>
            <td style={clickNumber["1"] === true ? tbody_css_red : tbody_css} onClick={() => { doClickNumber("1") }}>1</td>
            <td style={tbody_css} >2</td>
            <td style={tbody_css} >3</td>
            <td style={tbody_css} >4</td>
            <td style={tbody_css} >5</td>
          </tr>
          <tr>
            <td style={tbody_css} >6</td>
            <td style={tbody_css} >7</td>
            <td style={tbody_css} >8</td>
            <td style={tbody_css} >9</td>
            <td style={tbody_css} >10</td>
          </tr>
          <tr>
            <td style={tbody_css} >11</td>
            <td style={tbody_css} >12</td>
            <td style={tbody_css} >13</td>
            <td style={tbody_css} >14</td>
            <td style={tbody_css} >15</td>
          </tr>
          <tr>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
          </tr>
          <tr>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
          </tr>
        </tbody>
      </header>

    </div>
  );
}
export default BingoCardOne;


