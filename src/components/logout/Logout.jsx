import React from 'react'
import Topbar from '../topbar/Topbar';

const Logout = () => {

    const logoutHandler = ()=>{
        localStorage.removeItem("user");
        window.location.reload();
    }

  return (
    <>
    <Topbar/>

<button type="button" className="btn btn-primary" style={{marginLeft:"50%",marginTop:"20%"}} onClick={logoutHandler}>Click to Logout</button>


    
    </>
  )
}

export default Logout