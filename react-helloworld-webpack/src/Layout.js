import { Outlet, Link } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Outlet />
        </header>
      </div>
    </>
  )
};
export default Layout;