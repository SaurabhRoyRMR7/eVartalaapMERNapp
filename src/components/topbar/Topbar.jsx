import React from 'react';
import { NavLink} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Topbar = () => {
    const { user } = useContext(AuthContext);
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
   <>
   
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    
    <div className="container" style={{paddingRight:"50px",paddingLeft:"50px"}}>
        <NavLink className="navbar-brand text mb-1" href="/">eVartalaap</NavLink>

        
        <button className="navbar-toggler text-white" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
        </button>

        
        
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
            
               
                
                <li className="nav-item me-3 me-lg-0">
                    <NavLink className="nav-link" to="/chat">
                    <i className='fas fa-comment-dots' style={{fontDize:"36px"}}></i>
                    </NavLink>
                </li>
                <li className="nav-item me-3 me-lg-0">
                    
                <NavLink className="nav-link" to={`/profile/${user.username}`}>
                    <i className='fas fa-address-book' style={{fontDize:"36px"}}></i>
                    </NavLink>
                </li>
                
                
                
                
            </ul>
        
        
    </div>
    
</nav>

   </>
  )
}

export default Topbar