// * Hooks
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

// * React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { ToastContainer, toast } from 'react-toastify';

// * Axios & API
import axios from "axios"
import { API_URL } from "../../config.js"

// * Helpers
import { setToken } from '../helpers/auth'
import { getText } from '../helpers/auth'
import jwt_decode from 'jwt-decode'

const Login = () => {

  const navigate = useNavigate()

  // State
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState()

  // Execution

  // *---------GOOGLE AUTH--------------

  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID Token: " + response.credential)
    let userObject = jwt_decode(response.credential)
    try {
      const { data } = await axios.post(`${API_URL}/users/login/`, {
        username: userObject.given_name.toLowerCase() + userObject.family_name.toLowerCase().charAt(0) + userObject.sub.slice(0, 3),
        password: userObject.sub + 'abc?!',
      })
      // Token & navigation
      const { token } = data
      setToken(token)
      getText(data.message)
      navigate('/')

      // Notification
      toast.success(data.message, {
        position: "top-left",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.detail, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

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
      { theme: "outline", size: "large" }
    )
  }, [])

  // * -------------------------------------

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
    console.log('logindata', loginData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post(`${API_URL}/users/login/`, loginData)

      getText(data.message)
      console.log('message-->', data.message)

      setError(null)

      // Token & navigation
      const { token } = data
      setToken(token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      navigate('/')

      // Notification
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.detail, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <Container className="form-wrapper min-vh-100">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="justify-content-between">
        <h3 className="text-center">Login</h3>

        {/* UserName */}
        <Row>
          <label htmlFor="username">Username</label>
          <input
            onInput={handleChange}
            type="text"
            name="username"
            placeholder="Username"
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
            placeholder="Password"
            required
          />
        </Row>
        <Row>
          {/* <label htmlFor="password">Login with Goo</label> */}
          <div id="signInDiv" className="d-flex justify-content-center"></div>
        </Row>
        {/* Submit */}

        <input type="submit" value="Login" className="btn dark" />
        <p className="text-center mb-0 mt-3">Not yet registered?</p>
        <p className="text-center mb-0">
          <Link to="/register">Register</Link>
        </p>
      </form>
    </Container>
  )
}

export default Login