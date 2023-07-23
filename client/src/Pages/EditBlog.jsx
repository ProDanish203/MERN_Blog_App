import React, { useEffect, useState } from 'react'
import { Input, Loader } from '../Components';
import { convertImage } from "../Helpers/ConvertImage";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from "../Components";
import axios from "axios";

export const EditBlog = () => {

    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const baseUrl = "http://localhost:5000"

    const getData = async () => {
        setLoading(true);
        const {data} = await axios.get(`${baseUrl}/api/v2/blog/blog/${id}`)
        setTitle(data.blog.title);
        setSummary(data.blog.summary);
        setContent(data.blog.content);

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    const publish = async (e) => {
        
        if(!title) return toast.error("Title is required")
        if(!summary) return toast.error("Summary is required")
        if(!content) return toast.error("Blog content is required")
        
        try{
        setLoading(true);
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/v2/blog/edit/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });

        if(response.ok){
            toast.success("Blog Updated")
            localStorage.clear();
            navigate(`/blog/${id}`);
        }else{
            console.log(response)
            toast.error("Something went wrong")
        }
        setLoading(false)

        }catch(error){  
            console.log(error);
            toast.error("Something went wrong")
            setLoading(false)
        }
    }

  return (
    <>
    <form onSubmit={publish} className='mt-10'>

    <div className='flex flex-col justify-center gap-3'>
        <Input id="title" label="Blog Title" type="text" name="title" value={title} handleChange={(e) => setTitle(e.target.value)} placeholder="Enter Title"/>
        <Input id="summary" label="Blog Summary" type="text" name="summary" value={summary} handleChange={(e) => setSummary(e.target.value)} placeholder="Enter Title"/>
    </div>

    <div className='mt-8 mb-4 z-50 min-h-[200px]'>
        <Editor content={content} setContent={setContent}/>
    </div>

    <div className='my-5'>
        <div className='flex gap-2 justify-end'>
            <button 
            className='bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer'
            type='submit'>{loading ? <Loader/> : "Update Blog"}</button>
        </div>
    </div>

    </form>
    </>
  )
}
