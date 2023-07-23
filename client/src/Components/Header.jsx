import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/UserProvider";

export const Header = () => {

  const {user, setUser} = useAuth();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const baseUrl = "http://localhost:5000"

  const getUser = async () => {
    try{
      setLoading(true)
      const {data: {rest}} = await axios.get(`${baseUrl}/api/v1/auth/getUser`, {withCredentials: true}) 
      setUser(rest);
      setLoading(false);

    }catch(error){
      // console.log(error)
      // toast.error("Something went wrong.");
    }

  }
  useEffect(() => {
    if(user == null) getUser();
  }, [])

  const logout = async () => {
    const {data} = await axios.post(`${baseUrl}/api/v1/auth/logout`, {}, {withCredentials: true})
    setUser(null)
    localStorage.clear();
    toast.success("you've been logged out of your account")
    navigate("/");
  }

  return (
    <>
    <header className='flex items-center justify-between sm:px-5 px-3 py-2 mb-4'>
      <div className='sm:text-3xl text-2xl font-semibold cursor-pointer'>
        <Link to="/">BLoggerrr</Link>
      </div>

      <nav className='flex items-center justify-center gap-3'>
        {
          user != null ? (
            <>
            <Link to="/createPost">Create New Post</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            </>
          )
        }
        
      </nav>
    </header>
    </>
  )
}
