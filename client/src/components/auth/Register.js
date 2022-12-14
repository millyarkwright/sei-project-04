//  * Hooks
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// * Axios & API
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// * React
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

  const [errors, setErrors] = useState({
    username: [],
    email: [],
    password: [],
    password_confirmation: []
  })

  //! Functions
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
    console.log('formdata',formData)
  }


  // *---------GOOGLE AUTH--------------

  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID Token: " + response.credential)
    let userObject = jwt_decode(response.credential)
    try {
      const { data } = await axios.post(`${API_URL}/users/register/`,{
        email: userObject.email,
        username: userObject.given_name.toLowerCase() + userObject.family_name.toLowerCase().charAt(0) + userObject.sub.slice(0,3),
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
      // toast.success(data.message, {
      //   position: "top-left",
      //   autoClose: 1200,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
      console.log(formData)
    } catch (error) {
        console.log('ERROR', error)
        // if (error.response.data.detail) setErrors(error.response.data.detail)
        console.log('DETAIL --->', error.response.data.detail)
        if ('username' in error.response.data.detail) {
          console.log('USERNAME KEY FOUND')
        }
        // if (error.response.data.detail.username) {

        if ('username' in error.response.data.detail) {
          toast.error(error.response.data.detail.username[0], {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } 
        if ('email' in error.response.data.detail) {
          toast.error(error.response.data.detail.email[0], {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        if ('password' in error.response.data.detail) {
          toast.error(error.response.data.detail.password[0], {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } 
        if ('password_confirmation' in error.response.data.detail) {
          toast.error(error.response.data.detail.password_confirmation[0], {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        if ('non_field_errors' in error.response.data.detail) {
          for(let i=0; i < error.response.data.detail.non_field_errors.length; i++) {
            toast.error(error.response.data.detail.non_field_errors[i], {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        }
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