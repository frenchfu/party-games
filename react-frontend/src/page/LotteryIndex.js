import React from "react";
import { Link } from "react-router-dom";

const lotteryIndex = () => (
  <>
  <body className="index_bg">
    <div className="sign_out">
        <Link to="/party-games/logout" >
            <a  className="" title="登出">
                <i className="icon-sign-out"></i>
            </a>
        </Link>
    </div>
    <div className="lotteryall text-center">
          <div className="d-inline-flex text-center">
              <div className="lotterybtn">
                <Link to="/party-games/web-lottery" >
                        <img src="/party-games/assets/images/lotterybtn01.png" alt="" className="img-fluid"/>
                </Link>
              </div>
              <div className="lotterybtn">
                <Link to="/party-games/mobile-lottery" >
                      <img src="/party-games/assets/images/lotterybtn02.png" alt="" className="img-fluid"/>
                </Link>
              </div>
              <div className="lotterybtn">
                <Link to="/party-games/extra-lottery" >
                      <img src="/party-games/assets/images/lotterybtn03.png" alt="" className="img-fluid"/>
                </Link>
              </div>
          </div>
      </div> 
    </body>
  </>
);
  
  export default lotteryIndex;