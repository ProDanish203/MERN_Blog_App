import React from 'react'

const Card = () => {
  return (
    <>
      <div className='row gap-3 rounded-md p-2 shadow-md mb-3'>
        <div className='col-1'>
          <img src="https://media.moddb.com/images/downloads/1/66/65217/Random_car_8.jpg" alt="blog" 
          className='object-contain rounded-sm w-full'
          />
        </div>
        <div className='col-2 sm:py-5 py-3'>
          <p className='text-sm mb-4'>Published by: @author on 14-07-2023</p>
          <h2 className='text-2xl font-semibold mb-2'>Title goes here</h2>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque adipisci quia atque? Et, ad corrupti harum labore, modi similique rerum nostrum sint ipsum architecto alias adipisci mollitia excepturi perferendis minus.</p>
        </div>
      </div>
    </>
  )
}

export const Home = () => {
  return (
    <>
    <section className='my-3'>
    <div className='min-h-[80vh] flex flex-col justify-center'>

      <div className="flex flex-col sm:gap-6 gap-4">
        <Card/>
        <Card/>
        <Card/>
      </div>

    </div>
    </section>
    </>
  )
}