import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
   <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-3xl font-extrabold tracking-tight">Task Flow</h1>

    <div className="space-x-6">
      <Link 
        className="text-white hover:text-blue-200 transition-colors duration-200 font-medium" 
        to="/"
      >
        Home
      </Link>
      <Link 
        className="text-white hover:text-blue-200 transition-colors duration-200 font-medium" 
        to="/register"
      >
        Sign Up
      </Link>
      <Link 
        className="text-white hover:text-blue-200 transition-colors duration-200 font-medium" 
        to="/login"
      >
        Login
      </Link>
    </div>
  </div>
</nav>


    
  )
}

export default Nav