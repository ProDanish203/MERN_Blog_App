import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, PageNotfound, CreatePost, Blog, EditBlog } from "../Pages";

export const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/createPost' element={<CreatePost/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/edit/:id' element={<EditBlog/>}/>
        <Route path='*' element={<PageNotfound/>}/>
    </Routes>
    </>
  )
}
