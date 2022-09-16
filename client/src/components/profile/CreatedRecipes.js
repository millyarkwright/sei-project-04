import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import loaderImg from '../../images/loader.gif'
import { getToken } from '../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatedRecipes = () => {
  const navigate = useNavigate()
  const [created, setCreated] = useState([])
  const [recipeId, setRecipeId] = useState([])
  const [updatedList, setUpdatedList] = useState([])
  const [applicationsFilter, setApplicationsFilter] = useState([])
  const [remediesFilter, setRemediesFilter] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [filters, setFilters] = useState({
    applications: 'All',
    remedies: 'All',
    search: ''
  })
  const [publicToggle, setPublicToggle] = useState({
    public: ''
  })
  const [applicationsBtn, setApplicationsBtn] = useState('All')
  const [remediesBtn, setRemediesBtn] = useState('All')
  const [error, setError] = useState([])
  const [errorMessage, setErrorMessage] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setCreated(data.created_recipes)
        console.log('DATAAA', data)
        console.log('data.bookmarked -->', data.bookmarked_recipes)
        console.log('data.tested -->', data.tested_recipes)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [updatedList])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/applications`)
        console.log(data)
        let dataMapped = data.map((keys) => { return keys.name })
        dataMapped.unshift('All')
        console.log(dataMapped)
        setApplicationsFilter(dataMapped)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/remedies`)
        let dataMapped = data.map((keys) => { return keys.name })
        dataMapped.unshift('All')
        console.log(dataMapped)
        setRemediesFilter(dataMapped)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    console.log('search value', regexSearch)
    console.log('saved tag', filters.tag)
    const filteredArray = created.filter(recipe => {
      return regexSearch.test(recipe.name)
        && ((recipe.applications.map((keys) => { return keys.name }).includes(filters.applications) || filters.applications === 'All'))
        && ((recipe.remedies.map((keys) => { return keys.name }).includes(filters.remedies) || filters.remedies === 'All'))
    })
    console.log('filtered array', filteredArray)
    setFilteredRecipes(filteredArray)

  }, [created, filters])

  const handleSearch = (event) => {

    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
  }


  const handleApplicationFilter = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setApplicationsBtn(event.target.value)
  }

  const handleRemedyFilter = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setRemediesBtn(event.target.value)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      console.log(`delete this recipe`, created.id)
      const { data } = await axios.delete(`${API_URL}/recipes/${event.target.value}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      toast.success(data.detail, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      // navigate('/recipes')
      setUpdatedList([...event.target.value])
    } catch (error) {
      console.log('error', error)
      console.log('error message', error.response.data.detail)
      setError(error)
      setErrorMessage(error.response.data.detail)
    }
  }

  useEffect(() => {
    const post = async (event) => {
      try {
        const { data } = await axios.patch(`${API_URL}/recipes/${recipeId}`, publicToggle, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        toast.success(data.detail, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        // navigate('/recipes')

        // setUpdatedList([...event.target.value])
      } catch (error) {
        console.log('error', error)
        console.log('error message', error.response.data.detail)
        setError(error)
        setErrorMessage(error.response.data.detail)
      }

    }
    post()
  }, [publicToggle, recipeId])

  const handleCheckBoxChange = (event) => {
    console.log('checkbox value', event.target.name, event.target.checked, event.target.value)
    // console.log('RECIPE PUBLIC/PRIVATE', {...recipeData, [event.target.name]: event.target.checked})
    setPublicToggle({ ...publicToggle, [event.target.name]: event.target.checked })
    setRecipeId(event.target.value)
    setUpdatedList([...event.target.name])
  }

  // const handleCheckBoxChange = (event) => {
  //   try {
  //     const { data } = await axios.patch(`${API_URL}/recipes/${event.target.value}`, {
  //       headers: { Authorization: `Bearer ${getToken()}` },
  //     })
  //     setUpdatedList([...event.target.value])
  //   } catch (error) {
  //     console.log('error', error)
  //     setError(error)
  //   }

  // console.log('checkbox value', event.target.name, event.target.checked)
  // console.log('RECIPE PUBLIC/PRIVATE', {...recipeData, [event.target.name]: event.target.checked})
  // setRecipeData({ ...recipeData, [event.target.name]: event.target.checked })
  // }
  return (
    <Container className="search-wrapper min-vh-100">
      {Object.keys(created).length ?
        <>
          {/* FILTERS */}
          <div className='title-container'>
            <h1>Your Created Recipes</h1>
            <div className='search-container text-center text-end my-md-0 my-3'>
              <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
            </div>
            <div className='button-container ms-5 text-start flex-column'>
              <h5>Applications</h5>
              {applicationsFilter.map((item) => {
                return <button className={applicationsBtn === item ? "btn-clicked" : ""} onClick={handleApplicationFilter} name="applications" value={item} > {item}</button>
              })}
            </div>
            <div className='button-container ms-5 text-start flex-column'>
              <h5>Remedies</h5>
              {remediesFilter.map((item) => {
                return <button className={remediesBtn === item ? "btn-clicked" : ""} onClick={handleRemedyFilter} name="remedies" value={item} > {item}</button>
              })}
            </div>
          </div>


          <div className='list-container'>
            {filteredRecipes.map((recipe) => {
              return (
                <>
                  <Row className=" list-card-container">
                    <Col className="col-12 list-text px-2 pt-2 p-md-3" md="8">
                      <Link to={`/recipes/${recipe.id}`}>
                        <h3>{recipe.name}</h3>
                      </Link>
                      <p>{recipe.description}</p>
                    </Col>

                    <Col className="col-12 list-categories px-2 pb-2 p-md-3" md="4">
                      <Row>
                        {recipe.applications.length > 0 &&
                          <Col className="col-5" md="6">
                            <p>Applications:</p>
                            <div className="category-cards-wrapper">
                              {recipe.applications.map((item) => {
                                return (
                                  <div className="category-card">
                                    <img src={item.icon} className="category" alt="icon"/>
                                    <span>{item.name}</span>
                                </div>
                              )
                              })}
                            </div>
                          </Col>}

                        {recipe.remedies.length > 0 &&
                          <Col className="col-7" md="6">
                            <p>Remedies:</p>
                            <div className="category-cards-wrapper">
                              {recipe.remedies.map((item) => {
                                return (
                                  <div className="category-card">
                                    <img src={item.icon} className="category" alt="icon"/>
                                    <span>{item.name}</span>
                                </div>
                              )
                              })}
                            </div>
                          </Col>}
                      </Row>
                    </Col>
                    <Col className="userActions-wrapper col-12 px-2 pb-2 pt-md-1 p-md-3">
                      <div className="button-container">
                        <Link className="edit-button" to={`/recipes/${recipe.id}/edit`}>
                          <span className="button">EDIT</span>
                        </Link>
                        <div className="delete-button">
                          <button className="button" onClick={handleDelete} value={recipe.id}>DELETE</button>
                        </div>
                      </div>
                      <div className="checkbox-container">
                        <div className="checkbox-label">
                          <label htmlFor="public">PUBLIC</label>
                        </div>
                        <div className="checkbox">
                          {/* <h1>public</h1> */}
                          {recipe.public ? <input
                            onInput={handleCheckBoxChange}
                            type="checkbox"
                            name="public"
                            value={recipe.id}
                            checked='false'
                          /> :
                          <input
                            onInput={handleCheckBoxChange}
                            type="checkbox"
                            name="public"
                            value={recipe.id}
                          />}
                        </div>
                      </div>                    
                    </Col>
                  </Row>
                </>
              )
            })}
          </div>
        </>
        :
        <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>}
    </Container>
  )
}

export default CreatedRecipes