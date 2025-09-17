import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserRequests from "./pages/UserRequests.jsx";
import ManageRequests from "./pages/ManageRequests.jsx";
import PetCareGuide from "./pages/PetCareGuide.jsx";
import MyChats from "./pages/MyChats.jsx";
import MiniChatbot from "./pages/MiniChatbot.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/my-requests/" element={<UserRequests />} />
        <Route path="/manage-requests/" element={<ManageRequests />} />
        <Route path="/pet-care" element={<PetCareGuide />} />
        <Route path="/myChats" element={<MyChats />} />
        <Route path="/chatBot" element={<MiniChatbot />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
