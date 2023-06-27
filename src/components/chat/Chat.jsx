import React from 'react'
import Topbar from "../topbar/Topbar";
import Conversation from '../conversation/Conversation';
import {useContext,useState,useEffect,useRef} from "react";
import {AuthContext} from "../../context/AuthContext";
import { io } from "socket.io-client";
import axios from "axios";
import Messages from '../messages/Messages';
import OnlineUsers from '../onlineusers/OnlineUsers';
//const socketserver= "//https://evartalaapbackendserver.onrender.com";


const Chat = () => {
const [conversations,setConversations]=useState([]);
const {user}=useContext(AuthContext);
const [onlineUsers, setOnlineUsers] = useState([]);
const [currentChat, setCurrentChat] = useState('');
const [arrivalMessage, setArrivalMessage] = useState('');
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const socket = useRef();
const scrollRef = useRef();

useEffect(() => {
  socket.current = io("https://evartalaapbackendserver.onrender.com");
  socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      senderId: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, []);

useEffect(() => {
  arrivalMessage &&
    currentChat?.members.includes(arrivalMessage.senderId) &&
    setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage, currentChat]);

useEffect(() => {
  socket.current.emit("addUser", user._id);
  socket.current.on("getUsers", (users) => {
    setOnlineUsers(
      user.followings.filter((f) => users.some((u) => u.userId === f))
    );
  });
}, [user]);


useEffect(()=>{
     const getConversations= async ()=>{
      try{
        const res=await axios.get("https://evartalaapbackendserver.onrender.com/chatmodel/"+ user._id);
        
        setConversations(res.data);

      }catch(err){

        console.log(err);

      }
     };
     getConversations();
},[user._id]);

useEffect(() => {
  const getMessages = async () => {
    try {
      const res = await axios.get("https://evartalaapbackendserver.onrender.com/messagemodel/"+ currentChat?._id);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  getMessages();
}, [currentChat]);



const handleSubmit = async (e) => {
  e.preventDefault();
  const message = {
    senderId: user._id,
    text: newMessage,
    chatId: currentChat._id,
  };

  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );

  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: newMessage,
  });

  try {
    const res = await axios.post("https://evartalaapbackendserver.onrender.com/messagemodel", message);
    setMessages([...messages, res.data]);
    setNewMessage("");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
    <Topbar/>

    <div className='chat'style={{display:"flex"}}>

    <div className='chatBox' style={{flex:"7.5"}}> 

<section style={{backgroundColor: "#CDC4F9",flex:"10",display:"flex"}}>
  <div className="container py-5">

    <div className="row">
      <div className="col-md-12">

        <div className="card" id="chat3" style={{borderRadius: "15px"}}>
          <div className="card-body">

            <div className="row">
              <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                <div className="p-3">

                  <div className="input-group rounded mb-3">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                      aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>

                  <div data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "400px",overflowY:"scroll"}}>
                    <ul className="list-unstyled mb-0">
                      <li className="p-2 border-bottom">
                       


<div>


{conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}

</div>




                      </li>
                      
                      
                      
                      
                      
                    </ul>
                  </div>

                </div>

              </div>

              <div className="col-md-6 col-lg-7 col-xl-8" style={{display: "flex",
  flexDirection: "column",
  justifContent: "spaceBetween",
  position: "relative"}}>



                <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                  style={{position: "relative", height: "400px",overflowY:"scroll"}}>

                  

                 
                {messages.map(m=>(
                  <div ref={scrollRef}>
                <Messages message={m} own={m.senderId===user._id}/>
                </div>
                  ))}
                

                </div>

                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3" style={{width: "40px",height: "100%"}}/>
                  <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                    placeholder="Type message"/>
                  <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                  <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                  <div className="ms-3"><button><i className="fas fa-paper-plane" onClick={handleSubmit}></i></button></div>
                </div>

              </div>
            

            </div>

          </div>
        </div>

      </div>

    </div>
   


  </div>

  <div style={{overflowY:"scroll"}}>
  
  <div className="chatbox" style={{marginRight:"100px",marginTop:"100px"}}>
          <div className="chatOnlineWrapper">
            <OnlineUsers
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
        </div>
</section>
</div>




</div>


   
    
    </>
  )
}

export default Chat