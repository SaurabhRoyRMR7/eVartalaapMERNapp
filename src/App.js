import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Chat from "./components/chat/Chat"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


 import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      

      <Routes>

        <Route  path="/"element={user ? <Home /> : <Register />}/>
        <Route path="/profile/:username"  element={<Profile />}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
        <Route path="/logout" element={user ? <Logout /> : <Login />}/>

        <Route path="/chat"element={<Chat />}/>
         <Route path="/logout" element={<Login />}/>

      </Routes>
    </Router>
  );
}

export default App;