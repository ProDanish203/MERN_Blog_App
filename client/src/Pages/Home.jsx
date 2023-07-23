import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Card = (data) => {
  const {_id, title, summary, content, banner, createdAt, author} = data.data;
  // console.log(data)
  const baseUrl = "http://localhost:5000/"
  return (
    <>
      <div className='row gap-3 rounded-md p-2 shadow-md mb-3'>
        <div className='col-1'>
          <Link to={`/blog/${_id}`}>
            <img src={`${baseUrl}${banner}` || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysFdX_G4jpBhsF48Jpdoil4Y7A3yNV4T6SzzXmGPySk-N9hISAB9mPcqXdTc1mMRTJEs&usqp=CAU"} alt="blog" 
            className='object-contain rounded-sm w-full'
            />
          </Link>
        </div>
        <div className='col-2 sm:py-5 py-3 relative overflow-hidden'>
          <p className='text-sm mb-4'>Published by: @{author.username} on <b> 
          {format(new Date(createdAt), ' MMM d, yyyy HH:mm')}</b></p>
          <h2 className='text-2xl font-semibold mb-2'>
          <Link to={`/blog/${_id}`}>
            {title}
          </Link>
          </h2>
          <p >{summary}</p>
        </div>
      </div>
    </>
  )
}

export const Home = () => {

  const [blogs, setBlogs] = useState([])
  const baseUrl = "http://localhost:5000"
  const getData = async () => {
    try{

      const {data} = await axios.get(`${baseUrl}/api/v2/blog/blogs`)
      setBlogs(data.blogs)
    }catch(error){
      toast.error("something went wrong");
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <>
    <section className='my-3'>
    <div className='min-h-[80vh] flex flex-col justify-center'>

      <div className="flex flex-col sm:gap-6 gap-4">
        {
          blogs.length > 0 ? blogs.map((blog) => (
            <Card key={blog._id} data={blog}/>
          )) : (
            <>
            No Posts to show
            </>
          )
        }
      </div>

    </div>
    </section>
    </>
  )
}