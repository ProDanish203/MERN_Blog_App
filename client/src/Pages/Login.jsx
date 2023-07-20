import React, { useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import { Loader } from "../Components";
import { toast } from "react-toastify";
import axios from "axios";

export const Login = () => {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")

    const [loading, setLoading] = useState(false);

    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate();

    const baseUrl = "http://localhost:5000"
    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            setLoading(true)
            const {data} = await axios.post(`${baseUrl}/api/v1/auth/login`, {
                username,
                password: pass
            })

            if(data.success){
                toast.success("Login Success")
                localStorage.setItem('token', data.token)
                navigate("/home");
            }
            setLoading(false)
        }  
        catch(error){
            toast.error(error.response.data.message)
            setLoading(false);
        }
    }

  return (
    <>
    <div className="form-container flex flex-col gap-5 items-center justify-center mt-3 min-h-[80vh] h-full w-full">

    <form 
    onSubmit={handleLogin}
    className='px-3 py-4 bg-purple max-w-[350px] rounded-md bg-white w-full flex flex-col gap-3 items-center justify-center shadow-2xl '
    >
        <h2 className='font-bold text-3xl mb-3'>Login</h2>

        <div className='px-3 w-full'>
            <label htmlFor="username" className='text-md font-semibold'>Username:</label>
            <input 
            id='username'
            type="text" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
            placeholder='Username'
            autoComplete='off'
            />
        </div>

        <div className='px-3 w-full'>
            <label htmlFor="password" className='text-md font-semibold'>Password:</label>

            <div className='px-4 py-2 flex items-center justify-center border-2 border-[#999] focus:border-[#333] rounded-md'>
            <input 
            id='password'
            type={`${showPass ? "text" : "password"}`} 
            required 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            className='w-full border-none outline-none'
            placeholder='Enter Password'
            autoComplete='off'
            />
            <i className={`fas fa-${showPass ? 'eye-slash' : 'eye'} cursor-pointer text-xl hover:text-purple-700`} 
            onClick={() => setShowPass(prev => !prev)}
            ></i>
            </div>
        </div>

        <div className='px-3 w-full mt-4'>
            <button className='w-full bg-purple-700 text-white text-xl py-2 rounded-md'>{loading ? <Loader dark={false}/> : "Login"}</button>
        </div>

        <p className='text-md self-start pl-3 mt-2'>Don't have an account? <Link to="/signup" className='text-purple-500 cursor-pointer'>Signup now</Link></p>

    </form>
    </div>
    </>
  )
}
