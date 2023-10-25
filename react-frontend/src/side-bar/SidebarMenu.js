import React from "react";
import 'bootstarp/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstarp-icons.css';



function SideBarMenu(){

    return(
        <div className='container-fluid'>
            <div className='row'>
            <div className='bg-dark col-auto col-md-3 min-vh-100'>
                    <a className='text-decoration-none d-flex align-itemcenter'  >
                        <i className='fs-4 bi bi-speedometer'></i>
                        <span className='ms-1 fs-4' >Brand</span>
                    </a>
                    <ul class="nav nav-pills">
                        <li class="nav-item text-white fs-4">
                            <a href="#" class ="nav-line" aria-current="page">
                                <i>
                                    
                                </i>
                            </a>
                        </li>
                        <li class="nav-item text-white fs-4">
                            <a href="#" class ="nav-line" aria-current="page">LINK</a>
                        </li>
                        <li class="nav-item text-white fs-4">
                            <a href="#" class ="nav-line" aria-current="page">Disabled</a>
                        </li>
                    </ul>
            </div>
            </div>
        </div>
    )

}

export default SideBarMenu