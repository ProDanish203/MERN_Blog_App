import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import { format } from "date-fns";
import axios from "axios";
import { useAuth } from "../Context/UserProvider";
import { Loader } from '../Components';

export const Blog = () => {

    const params = useParams();
    const {id} = params;

    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(false)

    const baseUrl = "http://localhost:5000"
    const getBlog = async () => {
        setLoading(true);
        const {data} = await axios.get(`${baseUrl}/api/v2/blog/blog/${id}`)
        setBlog(data.blog);
        setLoading(false);
    }

    useEffect(() => {
        getBlog();
    }, [])

    const {user} = useAuth();
  return (
    <>
    {
        loading ? (
            <div className='w-full min-h-[300px] flex items-center justify-center'>
                <Loader dark={true}/>
            </div>
        ) : (
        <div className='mb-10 mt-10'>

        <h2 className='sm:text-5xl text-3xl font-semibold text-center mt-5 mb-10'>{blog?.title}</h2>

        <div className='flex items-center justify-between gap-2 my-2 mb-4'>
            <div className='flex items-center gap-2'>
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" 
                className='w-10 h-10 rounded-full'
                />
                <p>By @{blog?.author?.username} on 
                {/* <b>{format(new Date(time), ' MMM d, yyyy HH:mm')}</b> */}
                </p>
            </div>

            {
                blog?.author?._id === user?._id && (
                    <Link to={`/edit/${blog?._id}`}>
                        <button className='bg-sky-700 px-4 py-2 cursor-pointer shadow-sm rounded-md text-white'>Edit</button>
                    </Link>
                )
            }
            
        </div>

        <div>
            <img src={`http://localhost:5000/${blog?.banner}`} alt="banner" className='rounded-md w-full max-h-[500px] object-cover' />
        </div>

        <div className='sm:px-3'>
            <div className='my-4'>

                <div>
                    <p className='text-xl font-bold'>Summary:</p>
                    <p className=''>{blog?.summary}</p>
                </div>
            </div>

            <p className='text-xl font-bold'>Content:</p>
            <div dangerouslySetInnerHTML={{__html: blog.content}}
            className=''
            />

        </div>
        </div>
        )
    }
    
    </>
  )
}
