//  * Hooks
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// * Axios & API
import axios from 'axios'
import { API_URL } from '../../config'

// * React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// * Helpers
import { setToken } from '../helpers/auth'

const Register = () => {
  const navigate = useNavigate()

  //! State
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
  })

  const [errors, setErrors] = useState('')

  //! Functions
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
    console.log('formdata',formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/users/register/`,formData)
      const { token } = data
      setToken(token)
      navigate('/login')
      console.log(formData)
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      // console.log('error ->', error.response.data.errors)
      // if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  return (
    <Container className="form-wrapper min-vh-100">
      <ToastContainer />
      {/* <Row> */}
      <form onSubmit={handleSubmit} className="justify-content-between">
        <h3 className="text-center">Register</h3>
        {/* Username */}
        <Row>
          <label htmlFor="username">Username</label>
          <input
            onInput={handleChange}
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            required
          />
        </Row>
        {/* Email */}
        <Row>
          <label htmlFor="email">Email</label>
          <input
            onInput={handleChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
          />
        </Row>
        {/* Password */}
        <Row>
          <label htmlFor="password">Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            required
          />
        </Row>
        {/* Confirm Password */}
        <Row>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="password_confirmation"
            value={formData.confirm}
            placeholder="Confirm Password"
            required
          />
        </Row>
        {/* Confirm Password */}
        <Row>
          <label htmlFor="profile_image">Profile Image</label>
          <input
            onInput={handleChange}
            type="text"
            name="profile_image"
            value={formData.profile_image}
            placeholder="Profile Image URL"
          />
        </Row>
        {/* Submit */}
        <input type="submit" value="Register" className="btn dark" />
        <p className="text-center mb-0 mt-3">Already signed in?</p>
        <p className="text-center mb-0">
          <Link to="/login">Login</Link>
        </p>
      </form>
      {/* </Row> */}
    </Container>
  )






}

export default Register