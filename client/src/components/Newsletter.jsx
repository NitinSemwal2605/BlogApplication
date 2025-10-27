import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-6 my-32 px-6'>
      <h1 className='text-2xl md:text-4xl font-semibold text-gray-800'>
        Never Miss a Blog!
      </h1>
      <p className='text-xs md:text-xl text-gray-500/80'>
        Subscribe to get the latest blogs, new tech, and exclusive news.
      </p>
      
      <form className='flex items-center justify-center max-w-2xl w-full space-x-3'>
        <input 
          type="email" 
          className='border border-gray-300 rounded-md h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-opacity-50 w-full md:w-80' 
          placeholder='Enter your email id' 
          required
        />
        <button 
          type='submit' 
          className='h-12 text-white bg-primary/80 hover:bg-primary/90 transition-all cursor-pointer rounded-md px-8'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter;
