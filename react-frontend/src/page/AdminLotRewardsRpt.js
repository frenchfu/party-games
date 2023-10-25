import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminSideMenu from "../side-bar/AdminSideMenu";
import LotRewardsPrint from "../components/Content/LotRewardsPrint";


const AdminLotRewardsReset= () => {

  const styles = {
    container: {
      display: 'flex',
    },
    sidebar: {
      width: '20%',
      backgroundColor: '#111',
      color: '#818181',
      padding: '20px',
    },
    mainContent: {
      width: '80%',
      backgroundColor: '#f1f1f1',
      padding: '20px',
    },
  };


    return (
        <>
        <div style={styles.container}>
          <div style={styles.sidebar} >
           <AdminSideMenu  />
          </div>
          <div style={styles.mainContent}>
            <h2>中獎名單匯出/列印</h2>
              <LotRewardsPrint/>
          </div>
        </div>
        </>
      );
  
};
  export default AdminLotRewardsReset;