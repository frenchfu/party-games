import { Outlet, Link } from "react-router-dom";

const Layout = () => {

  return (
    <>
    <link href="/party-games/assets/images/favicon.ico" rel="icon"></link>
    <link href="/party-games/assets/css/bootstrap.min.css" rel="stylesheet"></link>
    <link href="/party-games/assets/css/style.css" rel="stylesheet"></link>
    <link href="/party-games/assets/css/icons.min.css" rel="stylesheet"></link>
    <script src="/party-games/assets/js/jquery-3.6.3.min.js"></script>
    <script src="/party-games/assets/js/bootstrap.bundle.min.js"></script>
    <script src="/party-games/assets/js/style.js"></script>
      <div className={"bg"} >
        <Outlet />
      </div>
    </>
  )
};

export default Layout;