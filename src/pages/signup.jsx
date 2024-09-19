import { useState } from "react";
import axios from "../axiosInstance.js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import bg from "@/assets/bb-bg-blurred.png";
import { useNavigate } from 'react-router-dom'; 

export default function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Community");

  const navigate = useNavigate(); 

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        username,
        password,
        userType,
      });
      console.log(response.data);
      alert("User created successfully");
      navigate('/admin'); 
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        alert(
          `Error signing up: ${
            error.response.data.error || error.response.data.message
          }`
        );
      } else if (error.request) {
        console.error("Error request data:", error.request);
        alert("Error signing up: No response from server");
      } else {
        console.error("Error message:", error.message);
        alert(`Error signing up: ${error.message}`);
      }
    }
  };

  return (
    <div className="relative flex justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <img
        src={bg}
        alt="BridgeBuilder bg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative w-full max-w-xl p-8 m-auto bg-pink-100 rounded-lg shadow-md">
        <div className="mb-8 text-center">
          <img
            src={logo}
            alt="BridgeBuilder Foundation"
            className="w-50 h-50 mx-auto text-bb-violet"
          />
        </div>
        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <Label
              htmlFor="username"
              className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded text-bb-violet" // Adjusted styles
            />
          </div>
          <div className="mb-6">
            <Label
              htmlFor="password"
              className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded text-bb-violet" 
            />
          </div>
          <div className="mb-6">
            <Label
              htmlFor="userType"
              className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
            >
              Type
            </Label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-bb-violet" 
            >
              <option
                value="community"
                className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
              >
                Community
              </option>
              <option
                value="homeCare"
                className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
              >
                Home care
              </option>
              <option
                value="superUser"
                className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
              >
                Super User
              </option>
            </select>
          </div>
          <div className="mb-6">
            <Button
              type="submit"
              className="w-1/2 h-12 px-3 mt-4 bg-bb-violet text-white hover:bg-purple-700 transition duration-300 ease-in-out text-lg mx-auto"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
