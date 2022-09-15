//  * Hooks
import { useState, useEffect } from 'react'
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
import jwt_decode from 'jwt-decode'

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
  const [googleUser, setGoogleUser] = useState({})
  //! Functions
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
    console.log('formdata',formData)
  }

  console.log('Fasai' + String(Math.floor(Math.random() * (+1000 - 1) + 1)))

  // *---------GOOGLE AUTH--------------

  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID Token: " + response.credential)
    let userObject = jwt_decode(response.credential)
    console.log(userObject.given_name + String(Math.floor(Math.random() * (+1000 - 1) + 1)))
    setGoogleUser(userObject)
    try {
      const { data } = await axios.post(`${API_URL}/users/register/`,{
        email: userObject.email,
        username: userObject.given_name + String(Math.floor(Math.random() * (+1000 - 1) + 1)),
        password: userObject.sub + 'abc?!',
        password_confirmation: userObject.sub + 'abc?!',
        profile_image: userObject.picture,
      })

      const { token } = data
      setToken(token)
      navigate('/login')
    } catch (error) {
      setErrors(error)
      console.log(error)
    }
    
  }
  useEffect(() => {
    /* global google */
    // eslint-disable-next-line no-unused-expressions
    console.log('GOOOOGLE')
    google.accounts.id.initialize({
      client_id: "315316772239-fb7t6peu1k15t6as17gi3grcpbfa3kn8.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, [])
   
// * -------------------------------------
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
        <div id="signInDiv" className="d-flex justify-content-center"></div>
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