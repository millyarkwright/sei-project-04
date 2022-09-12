// * Import Hooks
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// * Import React 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { ToastContainer, toast } from 'react-toastify';

// * Import Axios
import axios from "axios"
import { API_URL } from "../../config.js"

// * Import Helpers
import { setToken } from '../helpers/auth'
import { getText } from '../helpers/auth'


const Login = () => {

  const navigate = useNavigate()

  // State
  const [loginData, setLoginData] = useState({
    username:'', 
    password:''
  })

  const [error, setError] = useState()
  
  // Execution
  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {

      const res = await axios.post(`${API_URL}/login`, loginData
      )
      getText(res.data.message)
      console.log('res-->', res.data.message)
      setError(null)
      const { token } = res.data
      localStorage.setItem('rcf-ani-token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      navigate('/')
      toast.success(res.data.message, {
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
      toast.error(error.response.data.message, {
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

  return <h1>Login</h1>
}

export default Login