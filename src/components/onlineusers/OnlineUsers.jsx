import React,{useState,useEffect} from 'react';
import axios from 'axios';

const OnlineUsers = ({onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
 

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("https://evartalaapbackendserver.onrender.com/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `https://evartalaapbackendserver.onrender.com/chatmodel/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
  <>

  <div className='onlineusers'>

  
 
    {
      onlineFriends.map((o)=>(
        <div className='conversation'>
        <a href="#!" className="d-flex justify-content-between">
                                  <div className="d-flex flex-row">
                                    <div>
                                      <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="avatar" className="d-flex align-self-center me-3" width="60"/>
                                      <span className="badge bg-success badge-dot"></span>
                                    </div>
                                    <div className="pt-1" onClick={() => handleClick(o)}>
                                      <p className="fw-bold mb-0">{o.username}</p>
                                      <p className="small text-muted">tap to talk</p>
                                    </div>
                                  </div>
                                  <div className="pt-1">
                                    <p className="small text-muted mb-1">    Online</p>
                                    <span className="badge bg-danger rounded-pill float-end"></span>
                                  </div>
                                </a>
        
                                </div>


      ))
      



    }
 
  

</div>
  </>
  )
}

export default OnlineUsers