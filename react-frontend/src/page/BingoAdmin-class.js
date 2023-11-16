import React, { Component } from 'react';
import Bootbox from 'bootbox-react';
import {
  choiceNumApi,
  cancelNumApi,
  doAdminReloadApi,
  doResetGameApi,
  doSetGetRewardConnectionNumApi,
  doSetMaxRewardNumApi
} from '../apis/bingoAdminApi';

class BingoAdmin_class extends Component {
  constructor(props) {
    super(props);

    let resultMap = {};
    let inputArray = Array.from({ length: 25 }, (_, index) => ({
        key: index + 1,
        value: index + 1,
      }));
      inputArray.forEach(item => {
        resultMap[item.key] = item.value.toString();
      });    
    

    this.state = {
      selectedCells: [],
      rewardPlayers: [],
      getRewardConnectionNum: 0,
      rewardNumMax: 0,
      rewardNum: 0,
      showAlert: '',
      errMessage: '',
      result: {},
      cellValuesMap: resultMap
    };
  }

  componentDidMount() {
    this.doAdminReload();
  }

  containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  tableStyle = {
    border: '2px solid #000',
    width: '100%',
  };

  cellStyle = {
    width: '20%',
    height: '50px',
    textAlign: 'center',
    lineHeight: '50px',
    border: '1px solid #000',
    cursor: 'pointer',
  };

  headerCellStyle = {
    ...this.cellStyle,
    fontSize: '16px',
  };

  handleClose = () => {
    this.setState({ showAlert: false });
  };

  async doAdminReload() {
    let response = await doAdminReloadApi();
    if (response.code === '000') {
      this.setState({
        selectedCells: response.result.canCheckdNums,
        rewardPlayers: response.result.rewardPlayers,
        getRewardConnectionNum: response.result.getRewardConnectionNum,
        rewardNumMax: response.result.rewardNumMax,
        rewardNum: response.result.rewardNum,
      });
    } else {
      this.setState({ errMessage: '更新資訊失敗', showAlert: true });
    }
  }

  handleCellClick = (cellValue) => {
    if (this.state.selectedCells.includes(cellValue + '')) {
      (async () => {
        let response = await cancelNumApi(cellValue);
        if (response.code === '000') {
          this.setState({ selectedCells: response.result.canCheckdNums });
        } else {
          this.setState({ errMessage: '取消號碼失敗', showAlert: true });
        }
      })();
    } else {
      (async () => {
        let response = await choiceNumApi(cellValue);
        if (response.code === '000') {
          this.setState({ selectedCells: response.result.canCheckdNums });
        } else {
          this.setState({ errMessage: '選號失敗', showAlert: true });
        }
      })();
    }
  };

  handleSetRewardConnectionNum = () => {
    const isConfirmed = window.confirm('您确定要重設中奖线数？');
    if (isConfirmed) {
      const newRewardConnectionNum = window.prompt('请输入新的中奖线数:');
      if (newRewardConnectionNum !== null) {
        if (isNaN(newRewardConnectionNum)) {
          alert('您輸入的不是數字');
        } else {
          (async () => {
            let response = await doSetGetRewardConnectionNumApi(newRewardConnectionNum);
            if (response.code === '000') {
              await this.doAdminReload();
            } else {
              this.setState({ errMessage: '設定失敗', showAlert: true });
            }
          })();
        }
      }
    }
  };

  handleSetRewardNumMax = () => {
    const isConfirmed = window.confirm('您确定要重設中奖人數？');
    if (isConfirmed) {
      const newRewardNumMax = window.prompt('请输入新的最多中奖人数:');
      if (newRewardNumMax !== null) {
        if (isNaN(newRewardNumMax)) {
          alert('您輸入的不是數字');
        } else {
          (async () => {
            let response = await doSetMaxRewardNumApi(newRewardNumMax);
            if (response.code === '000') {
              await this.doAdminReload();
            } else {
              this.setState({ errMessage: '設定失敗', showAlert: true });
            }
          })();
        }
      }
    }
  };

  handleResetGame = () => {
    const isConfirmed = window.confirm('您确定要重置数据吗？');
    if (isConfirmed) {
      const isConfirmedAgain = window.confirm('您确定要重置数据吗？ 再次確認');
      if (isConfirmedAgain) {
        const isConfirmedAgainAgain = window.confirm('您确定要重置数据吗？ 再一次確認 不能反悔了喔');
        if (isConfirmedAgainAgain) {
          (async () => {
            let response = await doResetGameApi();
            if (response.code === '000') {
              await this.doAdminReload();
            } else {
              this.setState({ errMessage: '重啟遊戲失敗', showAlert: true });
            }
          })();
        }
      }
    }
  };

  render() {
    return (
      <>
        <Bootbox
          show={this.state.showAlert}
          type={'alert'}
          message={this.state.errMessage}
          onClose={this.handleClose}
        />
        <div style={this.containerStyle} className="bingo-card">
          <h1>管理介面</h1>
          <table style={this.tableStyle}>
            <thead>
              <tr>
                <th style={this.headerCellStyle}>B</th>
                <th style={this.headerCellStyle}>I</th>
                <th style={this.headerCellStyle}>N</th>
                <th style={this.headerCellStyle}>G</th>
                <th style={this.headerCellStyle}>O</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  {[1, 2, 3, 4, 5].map((col) => {
                    let key = 5 * (row - 1) + col;
                    const cell = this.state.cellValuesMap[key];
                    const isCellSelected = this.state.selectedCells.includes(key + '');
                    const cellStyleWithColor = {
                      ...this.cellStyle,
                      backgroundColor: isCellSelected ? 'red' : 'transparent',
                    };
                    return (
                      <td
                        id={key}
                        style={cellStyleWithColor}
                        onClick={() => this.handleCellClick(key)}
                        className="bright-style"
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', border: 'none' }}>
                  <div className="text-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <button onClick={this.doAdminReload} className="btn-lg btn-primary w-50">
                      更新資料
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h1>中獎人數:{this.state.rewardNum}</h1>
          {this.state.rewardPlayers.map((player, index) => (
            <div key={index}>
              <h2>
                中獎人 編號 {player.no}, 大名 {player.name}
              </h2>
            </div>
          ))}
          <br></br>
          <div className="bright-style blue-text">
            幾條線可以中獎: {this.state.getRewardConnectionNum}　
            <button onClick={this.handleSetRewardConnectionNum}>設置需要連線數</button>
          </div>
          <div className="bright-style blue-text">
            最多幾個人可以中獎: {this.state.rewardNumMax}　
            <button onClick={this.handleSetRewardNumMax}>設置可中獎人數</button>
          </div>
          <div>
            <button onClick={this.handleResetGame}>重開遊戲</button>
          </div>
        </div>
      </>
    );
  }
}

export default BingoAdmin_class;
