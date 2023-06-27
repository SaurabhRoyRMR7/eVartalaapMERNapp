import React,{useState,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import { NavLink} from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
const Login = () => {
  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
 //const navigate=useNavigate();
 const { isFetching, dispatch } = useContext(AuthContext);
//  const email = useRef();
//   const password = useRef();

  const handleInputChange= (e)=>{
    const{id,value}=e.target;

    
    if(id==="form3Example3cg"){
      setEmail(value);
    }
    if(id==="form3Example4cg"){
      setPassword(value);
    }
    
  };
  const handleClick = async (e) => {
    e.preventDefault();
    // const user = {
      
    //   email: email,
    //   password: password,
      
    // };

    loginCall(
      { email: email, password: password },
      dispatch
    );
    
    
    // try {
    //  const res=await axios.post("http://localhost:8800/login", user);
    //  navigate("/", {replace: true});
    //  const data=res.json();

    //  if(res.status===400 || !data){
    //   window.alert("INvalid crededntials");
    //  }
    //  else{
    //   window.alert("Logged in succesfully");
    //   navigate("/", {replace: true});
    //  }
     
    // } catch (err) {
    //   console.log(err);
    // }
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
              <h2 className="text-uppercase text-center mb-5">Login into your account</h2>

              <form >

              
                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" 

                   
                  value={email}
                  onChange={(e)=>handleInputChange(e)}
                  placeholder='email address'/>
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" 
                 value={password}
                 onChange={(e)=>handleInputChange(e)}
                  placeholder='password' />
                  
                </div>


                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleClick} disabled={isFetching}>{isFetching ? (
                      <CircularProgress  />
                    ) : (
                      "Log In"
                    )}</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Don't have an account? <NavLink to="/register"
                    className="fw-bold text-body"><u>Register here</u></NavLink></p>

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

export default Login