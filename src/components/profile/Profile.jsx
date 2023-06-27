


import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
//import { AuthContext } from "../../context/AuthContext";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
 
  const [user, setUser] = useState({});
  const username = useParams().username;
  //const [file,setFile]=useState(null);
 // const { user: currentUser } = useContext(AuthContext);
  //const userkaId=currentUser._id;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://evartalaapbackendserver.onrender.com/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

//   const handleFileChange =(e)=>{
//     console.log(e.target.files[0])
// setFile(e.target.files[0])
//   };

//   const handleSubmit =(e)=>{
// e.preventDefault();

// const formData=new FormData();
// formData.append('profilePicture',file);
// const fileName = Date.now() + file.name;
//       formData.append("name", fileName);
// formData.append('userkaId',userkaId);
// axios.post("http://localhost:8800/uploadprofile", formData).then((response)=>{
//   console.log(response.data.message);
// }).catch((error)=>{
//   console.log(error);
// });
//   };

  return (
    <>
      <Topbar />
      <div className="profile">
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? "https://evartalaapbackendserver.onrender.com/images/" + user.coverPicture
                    :  "https://evartalaapbackendserver.onrender.com/images/person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? "https://evartalaapbackendserver.onrender.com/images/" + user.profilePicture
                    : "https://evartalaapbackendserver.onrender.com/images/person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
            
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
