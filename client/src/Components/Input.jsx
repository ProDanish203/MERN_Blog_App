import React from 'react'

export const Input = ({id, label, type, name, value, handleChange, placeholder}) => {
  return (
    <>
    <div className='px-3 w-full'>
        <label htmlFor={id} className='text-md font-semibold'>{label}:</label>
        <input 
        id={id}
        type={type} 
        required 
        name={name}
        value={value} 
        onChange={handleChange} 
        className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
        placeholder={placeholder}
        autoComplete='off'
        />
    </div>
    </>
  )
}
