import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
    <header className='flex items-center justify-between sm:px-5 px-3 py-2 mb-4'>
      <div className='sm:text-3xl text-2xl font-semibold cursor-pointer'>
        <Link to="/">BLoggerrr</Link>
      </div>

      <nav className='flex items-center justify-center gap-2'>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
    </>
  )
}
