import React, { useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import  Bootbox  from  'bootbox-react';
import { choiceNumApi, cancelNumApi, doAdminReloadApi, doResetGameApi , doSetGetRewardConnectionNumApi, doSetMaxRewardNumApi} from '../apis/bingoAdminApi'

const BingoAdminDashBoard = () => {

    const [selectedCells, setSelectedCells] = useState([]);
    const [rewardPlayers, setRewardPlayers] = useState([]);
    const [getRewardConnectionNum, setGetRewardConnectionNum] = useState(0);
    const [rewardNumMax, setRewardNumMax] = useState(0);
    const [rewardNum, setRewardNum] = useState(0);
    const [showAlert, setShowAlert] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const result = {};
    const inputArray = Array.from({ length: 25 }, (_, index) => ({
        key: index + 1,
        value: index + 1,
      }));
      inputArray.forEach(item => {
        result[item.key] = item.value.toString();
      });    
    const [cellValuesMap, setCellValuesMap] = useState(result);    
    

    useEffect(() => {

        (async () => {
            doAdminReload();
          })();

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

    const doAdminReload = async()=>{

        let response = await doAdminReloadApi();
        if (response.code === '000') {
            setSelectedCells(response.result.canCheckdNums);
            setRewardPlayers(response.result.rewardPlayers);
            setGetRewardConnectionNum(response.result.getRewardConnectionNum);
            setRewardNumMax(response.result.rewardNumMax);
            setRewardNum(response.result.rewardNum);
        }else{
            setErrMessage("更新資訊失敗");
            setShowAlert(true);
        }

    }

    // 处理单元格点击事件
    const handleCellClick = (cellValue) => {

        if (selectedCells.includes(cellValue+"")) {
            // 如果单元格已被选中，从选中单元格列表中移除
            //todo 取消 選取的東西
            (async () => {
                let response = await cancelNumApi(cellValue);
                if (response.code === '000') {
                    //donothing
                    setSelectedCells(response.result.canCheckdNums);
                }else{
                    setErrMessage("取消號碼失敗");
                    setShowAlert(true);
                }
              })();
        } else {

            //todo  選取的東西
            (async () => {
                let response = await choiceNumApi(cellValue);
                if (response.code === '000') {
                    setSelectedCells(response.result.canCheckdNums);
                }else{
                    setErrMessage("選號失敗");
                    setShowAlert(true);
                }
              })();
        }
    };

    const handleSetRewardConnectionNum = () => {
        const isConfirmed = window.confirm('您确定要重設中奖线数？');
        if (isConfirmed) {
            const newRewardConnectionNum = window.prompt('请输入新的中奖线数:');
            if (newRewardConnectionNum !== null) {
                if(isNaN(newRewardConnectionNum)){
                    alert("您輸入的不是數字");
                }else{
                    (async () => {
                        let response = await doSetGetRewardConnectionNumApi(newRewardConnectionNum);
                        if (response.code === '000') {
                            await doAdminReload();
                        }else{
                            setErrMessage("設定失敗");
                            setShowAlert(true);
                        }
                      })();
                }
            }
        }
    };
    
    const handleSetRewardNumMax = () => {
        const isConfirmed = window.confirm('您确定要重設中奖人數？');
        if (isConfirmed) {
            const newRewardNumMax = window.prompt('请输入新的最多中奖人数:');
            if (newRewardNumMax !== null) {
                if(isNaN(newRewardNumMax)){
                    alert("您輸入的不是數字");
                }else{
                    (async () => {
                        let response = await doSetMaxRewardNumApi(newRewardNumMax);
                        if (response.code === '000') {
                            await doAdminReload();
                        }else{
                            setErrMessage("設定失敗");
                            setShowAlert(true);
                        }
                      })();
                }
            }
        }
    };

    const handleResetGame = () => {
        const isConfirmed = window.confirm('您确定要重置数据吗？');
        if (isConfirmed) {
            const isConfirmedAgain = window.confirm('您确定要重置数据吗？ 再次確認');
            if(isConfirmedAgain){
                const isConfirmedAgainAgain = window.confirm('您确定要重置数据吗？ 再一次確認 不能反悔了喔');
                if(isConfirmedAgainAgain){
                    (async () => {
                        let response = await doResetGameApi();
                        if (response.code === '000') {
                            await doAdminReload();
                        }else{
                            setErrMessage("重啟遊戲失敗");
                            setShowAlert(true);
                        }
                      })();
                }
            }
        }
    };    

        return (
        <>    
            <Bootbox show={showAlert} 
				type={"alert"}  
				message={errMessage}  
				onClose={handleClose} 
			/>          
            <div style={containerStyle} className="bingo-card">
                    <h1>
                        中獎人數:{rewardNum}
                    </h1>
                {
                    rewardPlayers.map((player, index) => (
                        <h2 key={index}>
                            中獎人 編號 {player.no}, 大名 {player.name}
                        </h2>
                    ))
                }
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerCellStyle}>抽</th>
                            <th style={headerCellStyle}>中</th>
                            <th style={headerCellStyle}>的</th>
                            <th style={headerCellStyle}>號</th>
                            <th style={headerCellStyle}>碼</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <tr key={row}>
                                {[1, 2, 3, 4, 5].map((col) => {
                                    let key = 5 * (row - 1) + col
                                    const cell = cellValuesMap[key];
                                    const isCellSelected = selectedCells.includes(key+"");
                                    const cellStyleWithColor = {
                                        ...cellStyle,
                                        backgroundColor: isCellSelected ? 'red' : 'transparent',
                                    };
                                    return (
                                        <td
                                            id={key}
                                            style={cellStyleWithColor}
                                            className='bright-style'
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
                                        <button onClick={doAdminReload} className="btn-lg btn-primary w-50" >更新資料</button>{/*btn-secondary  */}
                                </div>  
                            </td>                            
                        </tr>           
                    </tbody>
                </table>
            </div>
        </>
        );
    
};

export default BingoAdminDashBoard;
