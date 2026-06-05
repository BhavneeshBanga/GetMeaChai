import React from 'react'

const Footer = () => {
  return (
    <footer className=" bg-violet-900 flex items-center logo  justify-center font-bold px-4 h-16">
      <p className='text-center text-white'>&copy; {new Date().getFullYear()} Get me a chai - Fund your projects with chai - All rights reserved</p>
    </footer>   
  )
}

export default Footer
