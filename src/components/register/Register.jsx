import React, {useState} from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate,NavLink} from "react-router-dom";

const Register = () => 
{
  

  const[username,setUsername]= useState('');
  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const[confirmPassword,setConfirmPassword]= useState('');
  const navigate = useNavigate();

  const handleInputChange= (e)=>{
    const{id,value}=e.target;

    if(id==="form3Example1cg"){
      setUsername(value);
    }
    if(id==="form3Example3cg"){
      setEmail(value);
    }
    if(id==="form3Example4cg"){
      setPassword(value);
    }
    if(id==="form3Example4cdg"){
      setConfirmPassword(value);
    }
  };

  

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    
    try {
     await axios.post("https://evartalaapbackendserver.onrender.com/register", user);
     navigate("/login", {replace: true});
     
    } catch (err) {
      console.log(err);
    }
  };
      

    

  

  return (
    <>
    
    <section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div className="form-outline mb-4">
                  <input type="text" oneKeyPress="return event.charCode!=32" id="form3Example1cg" className="form-control form-control-lg" 
                 value={username}
                 onChange={(e)=>handleInputChange(e)}
                  placeholder='username '/>
                 
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" 
                  value={email}
                  onChange={(e)=>handleInputChange(e)}
                  placeholder='email address'/>
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="password" name="password" id="form3Example4cg" className="form-control form-control-lg" 
                  value={password}
                  onChange={(e)=>handleInputChange(e)}
                  placeholder='password' />
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="password" name ="confirmPassword" id="form3Example4cdg" className="form-control form-control-lg" 
                  value={confirmPassword}
                  onChange={(e)=>handleInputChange(e)}
                  placeholder='confirm password' />
                  
                </div>

               

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleClick}>Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <NavLink to="/login"
                    className="fw-bold text-body"><u>Login here</u></NavLink></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    </>
  )
}

export default Register