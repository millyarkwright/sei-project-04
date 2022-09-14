import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import loaderImg from '../../images/loader.gif'
// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RecipesIndex = () => {
  const [recipes, setRecipes] = useState([])
  
  const [applicationsFilter, setApplicationsFilter] = useState([])
  const [remediesFilter, setRemediesFilter] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [filters, setFilters] = useState({
    keyActions: 'All',
    applications: 'All',
    remedies: 'All',
    search: ''
  })

  const [applicationsBtn, setApplicationsBtn] = useState('All')
  const [remediesBtn, setRemediesBtn] = useState('All')
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/recipes/`)
        setRecipes(data)
        console.log(data)
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

  const handleSearch = (event) => {

    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
  }



  const handleSearch2 = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setApplicationsBtn(event.target.value)

  }

  const handleSearch3 = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setRemediesBtn(event.target.value)

  }

  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    console.log('search value', regexSearch)
    console.log('saved tag', filters.tag)
    const filteredArray = recipes.filter(recipe => {
      // console.log('movie.tag-->', movie.tags)
      return regexSearch.test(recipe.name)
        && ((recipe.applications.map((keys) => { return keys.name }).includes(filters.applications) || filters.applications === 'All'))
        && ((recipe.remedies.map((keys) => { return keys.name }).includes(filters.remedies) || filters.remedies === 'All'))
    })
    console.log('filtered array', filteredArray)
    setFilteredRecipes(filteredArray)

  }, [recipes, filters])

  return (
    <Container className="search-wrapper min-vh-100">
      {Object.keys(recipes).length ?
        <>
          <div className='title-container'>
            <h1>Recipes</h1>
            <div className='search-container text-center text-end my-md-0 my-3'>
              <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
            </div>
            <div className='button-container ms-5 text-start flex-column'>
              <h5>Applications</h5>
              {applicationsFilter.map((item) => {
                return <button className={applicationsBtn === item ? "btn-clicked" : ""} onClick={handleSearch2} name="applications" value={item} > {item}</button>
              })}
            </div>
            <div className='button-container ms-5 text-start flex-column'>
              <h5>Remedies</h5>
              {remediesFilter.map((item) => {
                return <button className={remediesBtn === item ? "btn-clicked" : ""} onClick={handleSearch3} name="remedies" value={item} > {item}</button>
              })}
            </div>

          </div>

          <div className='list-container'>

            {filteredRecipes.map((recipe) => {
              return (
                <>
                  {/* <div className=""> */}

                    <Row className=" list-card-container">

                      <Col className=" col-8 list-text">
                        <Link to={`/recipes/${recipe.id}`}>
                          <h3>{recipe.name}</h3>
                        </Link>
                        <p>{recipe.description}</p>
                      </Col>
                      <Col className="col-4 list-categories">

                        <div className="flex-column">
                          {recipe.essential_oil_amount.length > 0 &&
                            <>
                              <p >Main Ingredients:</p>
                              <div className="d-flex flex-wrap">
                                {recipe.essential_oil_amount.map((item) => {
                                  return (
                                    <Link to={`/essentials/${item.essential_oil.id}`}>
                                      <span>{item.essential_oil.name}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </>}
                          {recipe.applications.length > 0 &&
                            <>
                              <p>Applications:</p>
                              {recipe.applications.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </>}
                          {recipe.remedies.length > 0 &&
                            <>
                              <p>Remedies:</p>
                              {recipe.remedies.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </>}
                        </div>

                      </Col>
                    </Row>
                  {/* </div> */}
                </>
              )
            })}
          </div>
        </>
        :
        <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
      }
    </Container>
  )
}


export default RecipesIndex