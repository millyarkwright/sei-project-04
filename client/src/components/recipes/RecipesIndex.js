import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RecipesIndex = () => {
  const [oils, setOils] = useState([])
  const [essentials, setEssentials] = useState([])
  const [keyActions, setKeyActions] = useState([])
  const [applications, setApplications] = useState([])
  const [applicationsFilter, setApplicationsFilter] = useState([])
  const [remedies, setRemedies] = useState([])
  const [remediesFilter, setRemediesFilter] = useState([])
  const [filteredOils, setFilteredOils] = useState([])
  const [activeBtn1, setActiveBtn1] = useState('All')
  const [activeBtn2, setActiveBtn2] = useState('All')
  const [activeBtn3, setActiveBtn3] = useState('All')
  const [searchValue, setSearchValue] = useState([])
  const [filters, setFilters] = useState({
    keyActions: 'All',
    applications: 'All',
    remedies: 'All',
    search: ''
  })
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/recipes/`)
        setOils(data)
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
        const { data } = await axios.get(`${API_URL}/essentialoils/keyactions`)
        console.log(data)
        let dataMapped = data.map((keys) => { return keys.name })
        dataMapped.unshift('All')
        console.log('KEYYYYYY', dataMapped)
        setKeyActions(dataMapped)
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
        console.log('mapped applications->', data.map((keys) => { return keys.name }).unshift('All'))
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
        console.log(data)
        console.log('mapped Remedies->', data.map((keys) => { return keys.name }))
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])


  const genreDummy = [
    'All',
    'Balancing',
    'Cleansing',
    'Energising',
    'Relaxing',
    'Uplifting'
  ]
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
  }


  const handleSearch1 = (event) => {
    setSearchValue(event.target.value)
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setActiveBtn1(event.target.value)

  }

  const handleSearch2 = (event) => {
    setSearchValue(event.target.value)
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setActiveBtn2(event.target.value)

  }

  const handleSearch3 = (event) => {
    setSearchValue(event.target.value)
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setActiveBtn3(event.target.value)

  }




  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    console.log('search value', regexSearch)
    console.log('saved tag', filters.tag)
    const filteredArray = oils.filter(oil => {
      // console.log('movie.tag-->', movie.tags)
      return regexSearch.test(oil.name)
        && ((oil.key_action === filters.keyActions) || filters.keyActions === 'All')
        && ((oil.applications.map((keys) => { return keys.name }).includes(filters.applications) || filters.applications === 'All'))
        && ((oil.remedies.map((keys) => { return keys.name }).includes(filters.remedies) || filters.remedies === 'All'))
    })
    console.log('filtered array', filteredArray)
    setFilteredOils(filteredArray)

  }, [oils, filters])

  return (
    <Container className="search-wrapper min-vh-100">
      {Object.keys(oils).length ?
        <>
          <div className='title-container'>
            <h1>Recipes</h1>
            <div className='search-container text-center text-end my-md-0 my-3'>
              <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
            </div>
            {/* <div className='button-container ms-5 text-start flex-column'>
              <h5>Key Actions</h5>
              {keyActions.map((item) => {
                return <button className={activeBtn1 === item ? "btn-clicked" : ""} onClick={handleSearch1} name="keyActions" value={item} > {item}</button>
              })}
            </div> */}
            <div className='button-container ms-5 text-start flex-column'>
              <h5>Applications</h5>
              {applicationsFilter.map((item) => {
                return <button className={activeBtn2 === item ? "btn-clicked" : ""} onClick={handleSearch2} name="applications" value={item} > {item}</button>
              })}
            </div>
            <div className='button-container ms-5 text-start flex-column'>
              <h5>Remedies</h5>
              {remediesFilter.map((item) => {
                return <button className={activeBtn3 === item ? "btn-clicked" : ""} onClick={handleSearch3} name="remedies" value={item} > {item}</button>
              })}
            </div>

          </div>

          <div className='list-container'>

            {filteredOils.map((oil) => {
              // (oil.name.charAt(0).toUpperCase() + oil.name.slice(1)).join(' ')
              return (
                <>
                  {/* <div className=""> */}

                    <Row className=" list-card-container">

                      <Col className=" col-8 list-text">
                        <Link to={`/recipes/${oil.id}`}>
                          <h3>{oil.name}</h3>
                        </Link>
                        <p>{oil.description}</p>
                      </Col>
                      <Col className="col-4 list-categories">
                        {/* <p>Main Ingredients:</p>
                        <p>
                          {oil.essential_oil_amount.length ?
                            oil.essential_oil_amount.map((item) => {
                              return (<Link to={`/essentials/${item.essential_oil.id}`}>
                                <span>{item.essential_oil.name}</span>
                              </Link>)
                            })
                            :
                            <></>}
                        </p> */}

                        <div className="flex-column">
                          {oil.essential_oil_amount.length ?
                            <>
                              <p >Main Ingredients:</p>
                              <div className="d-flex flex-wrap">
                                {oil.essential_oil_amount.map((item) => {
                                  return (
                                    <Link to={`/essentials/${item.essential_oil.id}`}>
                                      <span>{item.essential_oil.name}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </>
                            :
                            <></>}
                          {oil.applications.length ?
                            <>
                              <p>Applications:</p>
                              {oil.applications.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </>
                            :
                            <></>}
                          {oil.remedies.length ?
                            <>
                              <p>Remedies:</p>
                              {oil.remedies.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </>
                            :
                            <></>}
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
        <h1 className='text-center'>{error ? 'error' : 'loading'}</h1>
      }
    </Container>
  )
}


export default RecipesIndex