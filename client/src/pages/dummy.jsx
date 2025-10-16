import React, { useReducer } from 'react'
import axios from 'axios'

// Initial state for user data and errors
const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {},
}

// Reducer to handle input changes and reset
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const Registration = () => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  const { name, email, password, confirmPassword, errors } = state

  // ✅ Validation logic
  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) newErrors.name = 'Name is required'

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format'

    // Password validation
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    // Confirm password validation
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    dispatch({ type: 'SET_ERRORS', errors: newErrors })

    return Object.keys(newErrors).length === 0 // valid if no errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return // stop if form invalid

    try {
      await axios.post('http://localhost:5000/api/v1/user/register', {
        name,
        email,
        password,
        confirmPassword,
      })

      alert('Registration successful!')
      dispatch({ type: 'RESET' })
    } catch (error) {
      console.error(error)
      alert('Registration failed!')
    }
  }

  return (
    <div className="bg-red-300 shadow-md rounded-lg p-6 max-w-sm mx-auto my-14">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })
          }
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mb-2">{errors.name}</p>
        )}

        {/* Email */}
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })
          }
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mb-2">{errors.email}</p>
        )}

        {/* Password */}
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'password',
              value: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <label className="block text-gray-700 font-bold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'confirmPassword',
              value: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mb-2">{errors.confirmPassword}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Registration
