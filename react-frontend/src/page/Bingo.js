import React, { useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import  Bootbox  from  'bootbox-react';
import {doPostSign} from '../apis/playerApi'
import {drowApi, checkBingoApi , getCanCheckedApi} from '../apis/bingoApi'


const Bingo = () => {

    const [selectedCells, setSelectedCells] = useState([]);
    const [ hasSign, setHasSign ] = useState("N");//判斷是否已報名
    const [ mode, setMode ] = useState("sign");//模式
    const [ name, setName ] = useState("");//玩家姓名
    const [ no, setNo ] = useState("");//玩家編號
    const [showAlert, setShowAlert] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [connectionNum, setConnectionNum] = useState(0);
    const result = {};
    const inputArray = Array.from({ length: 25 }, (_, index) => ({
        key: index + 1,
        value: 25 - index,
      }));
      inputArray.forEach(item => {
        result[item.key] = item.value.toString();
      });    
    const [cellValuesMap, setCellValuesMap] = useState(result);

    //const cellValuesMap = Array.from({ length: 25 }, (_, index) => ({
     //   key: index + 1,
      //  value: 25 - index,
    //}));    



    const {
        handleSubmit
      } = useForm();    

      const handleChange = (e) => {
        const { name, value } = e.target;
        
        const stateUpdateFunctions = {
          no: setNo,
          name: setName,
        };
        
        const updateState = stateUpdateFunctions[name];
        if (updateState) {
          updateState(value);
        }

        console.log("hi1");
       

      };      

    useEffect(() => {

        //判斷是否
        if(!!sessionStorage.getItem('token')){
            setHasSign("Y");
                //draw a card
                  (async () => {
                      let response = await drowApi();
                      if (response.code === '000') {
                        setCellValuesMap(response.result.bingoCard);
                      }else{
                          setErrMessage(response.message);
                          setShowAlert(true);
                          return;
                      }
                    })();
        }else{
            


        }

      }, []);  



    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    };

    const tableStyle = {
        border: '2px solid #000',
        width: '100%',
    };

    const cellStyle = {
        width: '20%',
        height: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        border: '1px solid #000',
        cursor: 'pointer', // 鼠标指针样式为手型
    };

    const headerCellStyle = {
        ...cellStyle,
        fontSize: '16px',
    };

    const handleClose = () => {
		return setShowAlert(false);
	}


    const checkSentData = (sentData) => {
		
        if(!!!sentData.name){
            setErrMessage("請輸入大名");
        } else if (!!!sentData.no){
            setErrMessage("請輸入編號");        
        } else{
            return  true;
        }
        setShowAlert(true);
        return false;

	}

    const loginFormOnSubmit = async(data) => {
        const sentData = {
            name,
            no,
        }
        if(checkSentData(sentData)){


            sentData.mode = mode;
            let response = await doPostSign(sentData);

            if (response.code === '000') {

                sessionStorage.setItem('name', response.result.name);
                sessionStorage.setItem('no', response.result.no);
                sessionStorage.setItem('token', response.result.token);
                setHasSign("Y");

            }else{

                setErrMessage(response.message);
                setShowAlert(true);
                return;

            }
            // if (response.code === '000') {
            //     sessionStorage.setItem('account', response.result.account);
            //     sessionStorage.setItem('flashToken', response.result.flashToken);
            //     sessionStorage.setItem('jwtKey', response.result.token);
            //     sessionStorage.setItem('token', response.result.token);

            //     if(sentData.mode == 'LOT'){
            //         navigate("/irxlot/lottery-index");
            //     }else{
            //         navigate("/irxlot/admin-lot-rewards-index");
            //     }
                
            // }else{
            //     setErrMessage(response.message);
            //     setShowAlert(true);
            //     return;
            // }
        }else{
            //do nothing
        }
       

      }    


    // 处理单元格点击事件
    const handleCellClick = async (cellValue, value) => {

        //let checkCanCheckResponse = getCanCheckedApi();
       console.log(value);


        let resultSeceletedCells = null;
        if (selectedCells.includes(cellValue)) {
            // 如果单元格已被选中，从选中单元格列表中移除
            resultSeceletedCells = selectedCells.filter((value) => value !== cellValue);
            setSelectedCells(resultSeceletedCells);
        } else {
            // 否则将单元格添加到选中单元格列表中
            resultSeceletedCells = [...selectedCells, cellValue];
            setSelectedCells(resultSeceletedCells);
        }
        countConnection(resultSeceletedCells);
    };

    const countConnection = (selectedCellsInput) =>{ 

        console.log("hi");
        console.log(selectedCellsInput);
    

        const selectedGrid = Array.from({ length: 5 }, () => Array(5).fill(false));

        // 根据已选择的单元格更新 selectedGrid
        selectedCellsInput.forEach((cell) => {
            const row = Math.ceil(cell / 5) - 1;
            const col = (cell - 1) % 5;
            selectedGrid[row][col] = true;
        });
    
        // 初始化连接计数
        let connectionCount = 0;
    
        // 检查每一行
        for (let row = 0; row < 5; row++) {
            if (selectedGrid[row].every((cell) => cell)) {
                connectionCount++;
            }
        }
    
        // 检查每一列
        for (let col = 0; col < 5; col++) {
            if (selectedGrid.every((row) => row[col])) {
                connectionCount++;
            }
        }
    
        // 检查对角线
        if (selectedGrid[0][0] && selectedGrid[1][1] && selectedGrid[2][2] && selectedGrid[3][3] && selectedGrid[4][4]) {
            connectionCount++;
        }
    
        if (selectedGrid[0][4] && selectedGrid[1][3] && selectedGrid[2][2] && selectedGrid[3][1] && selectedGrid[4][0]) {
            connectionCount++;
        }
    
        console.log(connectionCount);
        setConnectionNum(connectionCount);

    };


    const checkBingo = () =>{



    }


    //需要報名
    if(hasSign == 'N'){

        return (

            <>
            <Bootbox show={showAlert} 
				type={"alert"}  
				message={errMessage}  
				onClose={handleClose} 
			/>  
            <div className="registration-form">
                <><br/><br/></>
               <h2>　報名表</h2>
               <ul className="nav nav-tabs nav-justified titnav">
                <li className="nav-item">
                        <a onClick={()=>{setMode('sign')}} data-bs-toggle="tab" aria-expanded="true" className={`nav-link ${mode === 'sign' ? 'active' : ''}`}>
                            新增帳號
                        </a>
                    </li>
                    <li className="nav-item">
                        <a onClick={()=>{setMode('load')}}  data-bs-toggle="tab" aria-expanded="true" className={`nav-link ${mode === 'load' ? 'active' : ''}`} >
                            讀取帳號
                        </a>
                    </li>
                </ul>                    
                <br/>
                <form onSubmit={handleSubmit(loginFormOnSubmit)}>   
                    <div className="form-group">
                        <label htmlFor="no" className="form-label">　　編　號:</label>
                        <input
                                type="text"
                                id="no"
                                name="no"
                                maxLength="10" // 最大长度为3位
                                pattern="\d*" // // 正则表达式验证，只允许三位数字
                                placeholder={mode=='sign'?"您的幸運數字 例:12345" : "您之前的編號"}
                                inputMode="numeric" 
                                value={no}
                                onChange={handleChange}
                            />
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">請輸入大名:</label>
                        <input type="text" id="name" name="name"  onChange={handleChange}  value={name}   placeholder={mode=='sign'?"例:王大明" : "您之前輸入的大名"}  />
                    </div>

                    <div className="text-center mt-3">
                        <button className="btn btn-primary w-50" type="submit">提交</button>
                    </div>
                </form>
            </div>

            </>

          );
          

    
    } else{

        return (
        <>    
            <div style={containerStyle} className="bingo-card">
                <h1>Bingo Card</h1>
                <h2>編號:{no}</h2>
                <h2>{name}</h2>
                <h3>已完成: {connectionNum} 條線</h3>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerCellStyle}>B</th>
                            <th style={headerCellStyle}>I</th>
                            <th style={headerCellStyle}>N</th>
                            <th style={headerCellStyle}>G</th>
                            <th style={headerCellStyle}>O</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <tr key={row}>
                                {[1, 2, 3, 4, 5].map((col) => {
                                    let key = 5 * (row - 1) + col
                                    const cell = cellValuesMap[key];
                                    const isCellSelected = selectedCells.includes(key);
                                    const cellStyleWithColor = {
                                        ...cellStyle,
                                        backgroundColor: isCellSelected ? 'red' : 'transparent',
                                    };
                                    return (
                                        <td
                                            id={key}
                                            style={cellStyleWithColor}
                                            name={cell}
                                            onClick={() => handleCellClick(key, cell)}
                                        >
                                            {cell}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}        
                        <tr>
                            <td colSpan={5} style={{textAlign:'center' , border: 'none'}}>
                                <div className="text-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                        <button onClick={checkBingo} className="btn-lg btn-primary w-50" >賓果</button>{/*btn-secondary  */}
                                </div>  
                            </td>                            
                        </tr>           
                    </tbody>
                </table>
            </div>
            
        </>
        );

    }
    
};

export default Bingo;
