import Home from "./pages/Home/Home"
import { Routes , Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from "./firebase";



function App() {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        alert("logged In");
        navigate("/");
      } else {
        alert("logged Out");
        navigate("/login");
      }
    })
  },[])

  return (
    <>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/player/:id" element={<Player />} />
      </Routes>
      
    </>
  )
}

export default App
