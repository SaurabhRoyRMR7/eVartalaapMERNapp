import React from 'react'
import {format} from "timeago.js";
import './messages.css';
const Messages = ({message,own}) => {




  
  return (
   <>
   
            

                  <div className= {own ?"d-flex flex-row justify-content-end" : "d-flex flex-row justify-content-start"}>
                    <div>
                      <p className={own? "small p-2 me-3 mb-1 text-white rounded-3 bg-primary":"small p-2 ms-3 mb-1 rounded-3"} style={{backgroundColor: "#f5f6f7"}}>{message.text}</p>
                      <p className="small me-3 mb-3 rounded-3 text-muted">{format(message.createdAt)}</p>
                    </div>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="avatar 1" style={{width: "45px",height: "100%"}}/>
                  </div>

                 

             
   </>
  )
}

export default Messages