// * Hooks
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'

// * Axios & URLs
import axios from "axios"
import { API_URL } from '../../config'

// * Helpers
import { getToken } from '../helpers/auth'
import { removeToken } from "../helpers/auth"

// * React Bootstrap Components 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// * Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileDetail = () => {

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState([])
  const [error, setError] = useState()


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        console.log('user profile data', data)
        setUserInfo(data)

      } catch (error) {
        setError(error)
      }
    }
    getUserInfo()
  }, [])

  // * Delete Account Handler

  const handleDeleteAccount = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/users/profile/${userInfo.username}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      console.log(data)
      console.log(data.detail)
      removeToken()
      navigate('/')
      window.location.reload()
      toast.success(data.detail, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  return (
    <Container className="profile-wrapper">
      <Row>
        <h1>Profile</h1>
      </Row>
      <Row className="userDetails">
        <Row>
          <Col sm="6">
            <h3  className="fw-bold">Username</h3>
          </Col>
          <Col sm="6">
            <h3>{userInfo.username}</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <h3  className="fw-bold">Email Address</h3>
          </Col>
          <Col sm="6">
            <h3>{userInfo.email}</h3>
          </Col>
        </Row>
      </Row>
      <Row>
          <button className="deleteAccount" onClick={handleDeleteAccount}>Delete account</button>
      </Row>
    </Container>
  )
}

export default ProfileDetail

