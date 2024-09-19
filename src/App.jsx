import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import Edit from "./pages/edit";
import Overview from "./pages/overview";
import Forms from "./pages/forms";
import Archive from "./pages/archive";
import Admin from "./pages/admin"

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:caseNo" element={<Profile />} />
        <Route path="/edit/:caseNo" element={<Edit />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/create" element={<Forms />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
