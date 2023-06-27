import React,{useEffect,useState}from 'react';

import axios from "axios";
import './conversation.css'

const Conversation = ({conversation,currentUser}) => {

  const [user, setUser] = useState('');
  

  useEffect(() => {
    
    
    const friendId = conversation.members.find((id) => id !== currentUser._id);

    
    

    const getUser = async () => {
      try {
        const res = await axios("https://evartalaapbackendserver.onrender.com/users?userId="+ friendId);
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);





  return (
    <>
    


<div className='conversation'>
<a href="#!" className="d-flex justify-content-between">
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar" className="d-flex align-self-center me-3" width="60"/>
                              <span className="badge bg-success badge-dot"></span>
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{user.username}</p>
                              <p className="small text-muted">tap to talk</p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1"></p>
                            <span className="badge bg-danger rounded-pill float-end"></span>
                          </div>
                        </a>

                        </div>
    
    </>
  )
}

export default Conversation