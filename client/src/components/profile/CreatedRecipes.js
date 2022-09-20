// * Hooks 
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// * Axois & URL
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// * Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// * Helpers 
import { getToken } from '../helpers/auth'
// * Other
import loaderImg from '../../images/loader.gif'

const CreatedRecipes = () => {
  // const navigate = useNavigate()
  const [created, setCreated] = useState([])
  const [user, setUser] = useState([])
  const [recipeId, setRecipeId] = useState([])
  const [updateList, setUpdateList] = useState()
  const [applicationsFilter, setApplicationsFilter] = useState([])
  const [remediesFilter, setRemediesFilter] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [filters, setFilters] = useState({
    applications: 'All',
    remedies: 'All',
    search: ''
  })
  const [publicToggle, setPublicToggle] = useState({})
  const [applicationsBtn, setApplicationsBtn] = useState('All')
  const [remediesBtn, setRemediesBtn] = useState('All')
  const [error, setError] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setUser(data)
        let sortedData = data.created_recipes.sort(function(a,b){return b.public-a.public})
        // sortedData = sortedData.sort(function(a,b) { return a.name.localeCompare(b.name)})
        setCreated(sortedData)
      } catch (error) {
        setError(error)
        console.log('USER PROFILE ERROR--->', error)
      }
    }
    getData()
  }, [updateList])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/applications/`)

        setApplicationsFilter(data)
        let dataMapped = data.map((keys) => { return keys.name })
        dataMapped.unshift('All')
      } catch (error) {
        setError(error)
        console.log('APPLICATIONS ERROR-->', error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/remedies/`)
        setRemediesFilter(data)
        let dataMapped = data.map((keys) => { return keys.name })
        dataMapped.unshift('All')
      } catch (error) {
        setError(error)
        console.log('REMEDIES ERROR -->', error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    const filteredArray = created.filter(recipe => {
      return regexSearch.test(recipe.name)
        && ((recipe.applications.map((keys) => { return keys.name }).includes(filters.applications) || filters.applications === 'All'))
        && ((recipe.remedies.map((keys) => { return keys.name }).includes(filters.remedies) || filters.remedies === 'All'))
    })
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
      const { data } = await axios.delete(`${API_URL}/recipes/${event.target.value}/`, {
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
      setUpdateList([...event.target.value])
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
        const { data } = await axios.patch(`${API_URL}/recipes/${recipeId}/`, publicToggle, {
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
        setUpdateList(publicToggle)
      } catch (error) {
        console.log('error', error)
        // console.log('error message', error.response.data.detail)
        setError(error)
        // setErrorMessage(error.response.data.detail)
      }

    }
    post()
  }, [publicToggle])

  const handleCheckBoxChange = (event) => {
    console.log('checkbox value ---->', event.target.name, event.target.checked, event.target.value)
    setPublicToggle({ [event.target.name]: event.target.checked })
    setRecipeId(event.target.value)
  }

  return (
    <Container className="search-wrapper min-vh-100">
      {Object.keys(user).length > 0 ?
        <>
          {/* FILTERS */}
          <div className='title-container'>
            <h1>Your Created Recipes</h1>
            <div className='search-container text-center text-end my-md-0 my-3'>
              <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
            </div>
          </div>
          <hr />
          <Row className='index-body-container'>
            <Col className="col-12 col-md-3 filter-container">
              <div className='button-container ms-3 text-start flex-column'>
                <h5>Applications</h5>
                <button className={applicationsBtn === 'All' ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleApplicationFilter} name="applications" value='All' > All</button>
                {applicationsFilter.map((item) => {
                  return <button key={item.id} className={applicationsBtn === item.name ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleApplicationFilter} name="applications" value={item.name} >
                    <img src={item.icon} alt={item.name} />
                    {item.name}</button>
                })}
              </div>
              <div className=' button-container ms-3 text-start flex-column'>
                <h5>Remedies</h5>
                {remediesFilter.map((item) => {
                  return <button key={item.id} className={remediesBtn === item.name ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleRemedyFilter} name="remedies" value={item.name} >
                    <img src={item.icon} alt={item.name} />
                    {item.name}</button>
                })}
              </div>
            </Col>
            <Col className="col-12 col-md-9">

              <div className='list-container'>
                {Object.keys(created).length > 0 ?
                  <>
                    {filteredRecipes.map((recipe) => {
                      return (
                        <>
                          <Row className=" list-card-container" key={recipe.id}>
                            <Col className="col-12 list-text px-2 pt-2 p-md-3" md="8">
                              <Link to={`/recipes/${recipe.id}`}>
                                <h3>{recipe.name}</h3>
                              </Link>
                              <p>{recipe.description}</p>
                            </Col>

                            <Col className="col-12 list-categories px-2 pb-2 p-md-3" md="4" >
                              <Row>
                                {recipe.applications.length > 0 &&
                                  <Col className="col-5" md="6">
                                    <p>Applications:</p>
                                    <div className="category-cards-wrapper">
                                      {recipe.applications.map((item) => {
                                        return (
                                          <div className="category-card" key={item.name}>
                                            <img src={item.icon} className="category" alt="icon" />
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
                                          <div className="category-card" key={item.name}>
                                            <img src={item.icon} className="category" alt="icon" />
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
                                <Link className="" to={`/recipes/${recipe.id}/edit`}>
                                  <button className="edit-button">EDIT</button>
                                </Link>
                                <div className="">
                                  <button className="edit-button" onClick={handleDelete} value={recipe.id}>DELETE</button>
                                </div>
                                <div className="checkbox-container edit-button">
                                <div className="checkbox-label">
                                  <label htmlFor="public">PUBLIC</label>
                                </div>
                                <div className="checkbox">
                                  <input
                                    onInput={handleCheckBoxChange}
                                    type="checkbox"
                                    name="public"
                                    value={recipe.id}
                                    defaultChecked={recipe.public}
                                    key={Math.random()}
                                  />
                                </div>
                              </div>
                              </div>
                            </Col>
                          </Row>
                        </>
                      )
                    })}
                  </>
                  :
                  <>
                    <h4 className='fst-italic'>Start creating your own recipe now!</h4>
                    <Link to='/createrecipe'>
                      <button className='mt-2 btn'>Create Recipe</button>
                    </Link>
                  </>
                }

              </div>

            </Col>

          </Row>

        </>
        :
        <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>}
    </Container>
  )
}

export default CreatedRecipes