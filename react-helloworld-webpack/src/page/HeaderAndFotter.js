import { Outlet, Link } from "react-router-dom";

const HeaderAndFotter = () => {

  return (
    <>
        <header>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
            </ul>
        </nav>
        </header>      
            <Outlet />
        <footer>
        <div>
            <p>&copy; 2023 Your Company</p>
        </div>
        </footer>      
    </>
  )
};
export default HeaderAndFotter;