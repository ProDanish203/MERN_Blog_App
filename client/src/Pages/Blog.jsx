import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from "date-fns";
import axios from "axios";

export const Blog = () => {

    const params = useParams();
    const {id} = params;

    const [blog, setBlog] = useState([])

    const baseUrl = "http://localhost:5000"
    const getBlog = async () => {
        const {data} = await axios.get(`${baseUrl}/api/v2/blog/blog/${id}`)
        setBlog(data.blog);
    }

    useEffect(() => {
        getBlog();
    }, [])
    
    const data = {
        banner: `http://localhost:5000/${blog[0]?.banner}`,
        title: blog[0]?.title,
        summary: blog[0]?.summary,
        content: blog[0]?.content,
        author: blog[0]?.author,
        createdAt: blog[0]?.createdAt
    }

    const time = data?.createdAt
    console.log(time)
  return (
    <>
    <div className='mb-10 mt-10'>

    <h2 className='sm:text-5xl text-3xl font-semibold text-center mt-5 mb-10'>{data?.title}</h2>

    <div className='flex items-center gap-2 my-2 mb-4'>
        <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" 
        className='w-10 h-10 rounded-full'
        />
        <p>By @{data?.author?.username} on 
        <b>{format(new Date(time), ' MMM d, yyyy HH:mm')}</b>
        </p>
    </div>

    <div>
        <img src={data?.banner} alt="banner" className='rounded-md w-full max-h-[500px] object-cover' />
    </div>

    <div className='sm:px-3'>
        <div className='my-4'>

            <div>
                <p className='text-xl font-bold'>Summary:</p>
                <p className=''>{data?.summary}</p>
            </div>
        </div>

        <p className='text-xl font-bold'>Content:</p>
        <div dangerouslySetInnerHTML={{__html: data.content}}
        className=''
        />

    </div>
    </div>
    </>
  )
}
