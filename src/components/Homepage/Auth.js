import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import '../../css//homepage/auth.css'

import { login, register } from '../../actions/auth'


export default function Auth({ login_or_register }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState(false)

  const path = location.state


  const initialState = { firstName: '', lastName: '', email: '', username: '', password: '' }
  const [formData, setFormdata] = useState(initialState)

  // const currentYear = new Date().getFullYear();


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    if (isLogin) {
      dispatch(login(formData, navigate, path))
    } else {
      dispatch(register(formData, navigate, path))
    }
  }

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value })
  }

  // const generateYearOptions = () => {
  //   const years = [];
  //   for (let i = 1950; i <= currentYear; i++) {
  //     years.push(<option key={i} value={i}>{i}</option>);
  //   }
  //   years.reverse()
  //   return years;
  // };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '60px', marginTop: '100px', marginBottom: '30px' }}>
          {isLogin ? 'Login' : 'Register'}
        </h1>
        <form onSubmit={handleSubmit}>
          {!isLogin ?
            <>
              <div>
                <input onChange={handleChange} id='firstName' className='text_input' type="text" name="firstName" placeholder='First Name' />
                <input onChange={handleChange} id='lastName' className='text_input' type="text" name="lastName" placeholder='Last Name' />
              </div>
              <div>
                <input onChange={handleChange} className='text_input' type="text" name="username" placeholder='Username' />
              </div>
            </>
            :
            ''}

          <div>
            <input onChange={handleChange} className='text_input' type="text" name="email" placeholder='Email' />
          </div>
          <div>
            <input onChange={handleChange} className='text_input' type="password" name="password" placeholder='Password' />
          </div>

          <div>
            <button className='submit_button' type='submit' >{isLogin ? 'Login' : 'Register'}</button>
          </div>
        </form>
        {isLogin ?
          <div onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }} >Don't have an account? Register</div>
          :
          <div onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>Already have an account? Login</div>
        }


      </div>

    </>
  )
}