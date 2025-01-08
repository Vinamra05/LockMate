
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import {  Route, Routes, useNavigate } from 'react-router-dom';  // Importing Router components
import './App.css'
import Signup from './components/Signup';
import Signin from './components/Signin';
import { useEffect, useState } from 'react';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage
      console.log(token);
      if (!token) {
        // If no token, redirect to login or handle as needed
        return navigate('/signin');
      }

      try {
        const response = await fetch(import.meta.env.VITE_BASE_ADDRESS + 'verifytoken', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in headers
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        if (response.ok) {
          // Token is valid
          setIsAuthenticated(true);
          navigate("/")
        } else {
          // Invalid token, handle as needed
          console.log(data.error);
          setIsAuthenticated(false);
          localStorage.removeItem('token'); // Remove invalid token
          navigate('/signin'); // Redirect to login
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated(false);
        navigate('/signin'); // Redirect on error
      }
    }

    verifyToken();
  }, []); // Add navigate as a dependency

  
 
  return (
    <>
      <div>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Manager isAuthenticated={isAuthenticated} />} /> 
          {!isAuthenticated && <Route path="/signup" element={<Signup />} /> }
          {!isAuthenticated && <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} /> }

        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
