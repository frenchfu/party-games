import React from 'react';
import { Link } from "react-router-dom";

const AdminSideMenu = () => {

  const styles = {
    body: {
      fontFamily: "Lato, sans-serif",
    },
    sidenav: {
      height: "100%",
      width: "20vw",
      position: "fixed",
      zIndex: 1,
      top: 0,
      left: 0,
      backgroundColor: "#111",
      overflowX: "hidden",
      paddingTop: "20px",
    },
    sidenavLink: {
      padding: "6px 6px 6px 32px",
      textDecoration: "none",
      fontSize: "25px",
      color: "#818181",
      display: "block",
    },
    sidenavLinkHover: {
      color: "#f1f1f1",
    },
    main: {
      marginLeft: "20vw", /* Same as the width of the sidenav */
    },
    mediaQuery: {
      "@media screen and (maxHeight: 450px)": {
        sidenav: {
          paddingTop: "15px",
        },
        sidenavLink: {
          fontSize: "18px",
        },
      },
    },
  };

  return (
    <>
      <div style={styles.sidenav}>
        <div>
          <h2>管理與設定</h2>
        </div>        
        <Link to="/party-games/admin-lot-rewards-index" style={styles.sidenavLink}>獎項清單</Link>
        <Link to="/party-games/admin-lot-rewards-reset" style={styles.sidenavLink}>抽獎結果清除</Link>
        <Link to="/party-games/admin-lot-rewards-rpt" style={styles.sidenavLink}>中獎名單匯出/列印</Link>
        <Link to="/party-games/logout" style={styles.sidenavLink}>登出</Link>
      </div>
    </>
  );

};
export default AdminSideMenu;

