import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminSideMenu from "../side-bar/AdminSideMenu";
import LotRewards from "../components/Content/LotRewards";


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
            <div>
              <h2>獎項設定</h2>
            </div>
              <div>
                <LotRewards/>
              </div>
          </div>
        </div>
        </>
      );
  
};
  export default AdminLotRewardsReset;