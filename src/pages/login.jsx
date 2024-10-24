import axios from '../axiosInstance.js'; 
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import defaultBg from "@/assets/bb-bg-blurred.png";
import { Notification } from '@/components/ui/Notification';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(defaultBg);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get('/api/get-background');
        setBackgroundImage(response.data.backgroundImage || defaultBg); 
      } catch (error) {
        console.error('Error fetching background image:', error);
        setBackgroundImage(defaultBg);
      }
    };

    fetchBackgroundImage();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      const { token } = response.data;

      sessionStorage.setItem('token', token);
      console.log("Token:", token); 
      console.log('Login successful', response.data);
      
      sessionStorage.setItem('fromLogin', 'true');

      // Navigate to overview page
      navigate('/overview');
    } catch (error) {
      console.error('Error logging in', error.response.data);
      // Handle error (e.g., show error message)
      if (error.response && error.response.status === 404) {
        alert('User not found');
      } else if (error.response && error.response.status === 401) {
        alert('Invalid password');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    setNotificationMessage("Please contact the super user to get an account");
    setShowNotification(true);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="relative flex justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <img
        src={backgroundImage}
        alt="BridgeBuilder bg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative w-full max-w-xl p-8 m-auto bg-pink-100 rounded-lg shadow-md">
        <div className="mb-8 text-center">
          <img
            src={logo}
            alt="BridgeBuilder logo"
            className="w-50 h-50 mx-auto text-bb-violet"
          />
        </div>
        <div className="mb-6">
          <Label
            className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
            htmlFor="username"
          >
            Username
          </Label>
          <Input
            className="w-full px-4 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label
            className="block mb-2 text-lg font-bold text-kanit text-bb-violet dark:text-purple-500"
            htmlFor="password"
          >
            Password
          </Label>
          <Input
            className="w-full px-4 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Button
            className="w-1/2 h-12 px-3 mt-4 bg-bb-violet text-white hover:bg-purple-700 transition duration-300 ease-in-out text-lg mx-auto"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 font-bold">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              onClick={handleSignUpClick}
              className="text-purple-600 hover:text-bb-violet"
            >
              Sign up
            </a>
          </p>
        </div>
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={handleNotificationClose}
          />
        )}
      </div>
    </div>
  );
}