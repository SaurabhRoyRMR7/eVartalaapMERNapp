
import Topbar from "../topbar/Topbar";
import Feed from "../feed/Feed";
import "./home.css"
import Rightbar from "../rightbar/Rightbar";

const Home=() =>{
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
      <Feed/>
        <Rightbar/>
        
      </div>
    </>
  );
}
export default  Home



