import React, { useState } from 'react'
import { Input, Loader } from '../Components';
import { convertImage } from "../Helpers/ConvertImage";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Editor } from "../Components";

export const CreatePost = () => {

  const [title, setTitle] = useState(localStorage.getItem('title') || "");
  const [summary, setSummary] = useState(localStorage.getItem('summary') || "");
  const [banner, setBanner] = useState("");
  const [displayBanner, setDisplayBanner] = useState("");
  const [content, setContent] = useState(localStorage.getItem('content') || "");

  const [loading, setLoading] = useState(false);
  const data = {title, summary, banner, displayBanner, content }

  const navigate = useNavigate();

  const handleFile = async (e) => {
    setBanner(e.target.files);
    const base64 = await convertImage(e.target.files[0])
    setDisplayBanner(base64);
  }

  const baseUrl = "http://localhost:5000"

  const saveToLocal = () => {
    localStorage.setItem('title', data.title)
    localStorage.setItem('summary', data.summary)
    localStorage.setItem('banner', data.banner)
    localStorage.setItem('content', data.content)
    localStorage.setItem('displayBanner', data.displayBanner)
    toast.success("Blog Saved")
  }

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
      data.set('banner', banner[0]);
      
      e.preventDefault();
      const response = await fetch(`${baseUrl}/api/v2/blog/publish`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      })

      if(response.ok){
        toast.success("Blog Published")
        localStorage.clear();
        navigate("/")
      }else{
        toast.error("Something went wrong")
        console.log(response)
      }
      setLoading(false)
      // console.log(response)

    }catch(error){  
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

      <div className='px-3 w-full mt-2'>
        <label htmlFor="banner">
          <img src={displayBanner || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysFdX_G4jpBhsF48Jpdoil4Y7A3yNV4T6SzzXmGPySk-N9hISAB9mPcqXdTc1mMRTJEs&usqp=CAU"} alt="banner" className='w-full object-cover h-[400px]' />
        </label>
        <input id="banner" type="file" onChange={handleFile} className='hidden' autoComplete='off'/>
    </div>

    </div>

    <div className='mt-8 mb-4 z-50 min-h-[200px]'>
      <Editor content={content} setContent={setContent}/>
    </div>

    <div className='my-5'>
      <div className='flex gap-2 justify-end'>
        <button 
        type='button'
        className='bg-sky-700 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={saveToLocal}>Save</button>

        <button 
        className='bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer'
        type='submit'>{loading ? <Loader/> : "Publish"}</button>
      </div>
    </div>

      </form>
    </>
  )
}
