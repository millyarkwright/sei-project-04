// * Hooks
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
// * Other
import loaderImg from '../../images/loader.gif'

const EssentialsIndex = () => {
  // ! STATES
  // * ESSENTIAL OIL DATA
  const [oils, setOils] = useState([])

  // * FILTERS
  const [keyActions, setKeyActions] = useState([])
  const [applicationsFilter, setApplicationsFilter] = useState([])
  const [remediesFilter, setRemediesFilter] = useState([])
  const [filteredOils, setFilteredOils] = useState([])
  const [filters, setFilters] = useState({
    keyActions: 'All',
    applications: 'All',
    remedies: 'All',
    search: ''
  })

  // * FILTER BUTTON CLASSES
  const [keyActionsBtn, setKeyActionsBtn] = useState('All')
  const [applicationsBtn, setApplicationsBtn] = useState('All')
  const [remediesBtn, setRemediesBtn] = useState('All')
  const [error, setError] = useState('')

  // ! GET DATA
  // * ESSENTIAL OILS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/essentialoils/`)
        setOils(data)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log('ESSENTIAL OIL ERROR', error)
      }
    }
    getData()
  }, [])

  // * KEY ACTIONS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/essentialoils/keyactions/`)
        console.log(data)
        let dataMapped = data.map((keys) => { return keys.name })
        dataMapped.unshift('All')
        console.log('DATA MAPPED-->', dataMapped)
        setKeyActions(dataMapped)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  // * APPLICATIONS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/applications/`)
        console.log(data)
        setApplicationsFilter(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  // * REMEDIES
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/remedies/`)
        setRemediesFilter(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  // ! EXECUTIONS
  const handleSearch = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    setFilters(newObj)
  }


  const handleKeyActionFilter = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    setFilters(newObj)
    setKeyActionsBtn(event.target.value)

  }

  const handleApplicationFilter = (event) => {
    console.log('FILTERS', filters)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
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

  // * SEARCH
  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    console.log('search value', regexSearch)
    console.log('saved tag', filters.applications)
    console.log(oils)
    const filteredArray = oils.filter(oil => {
      return regexSearch.test(oil.name) && ((oil.key_action === filters.keyActions) || filters.keyActions === 'All')
        && ((oil.applications.map((keys) => { return keys.name }).includes(filters.applications) || filters.applications === 'All'))
        && ((oil.remedies.map((keys) => { return keys.name }).includes(filters.remedies) || filters.remedies === 'All'))
    })
    console.log('filtered array', filteredArray)
    setFilteredOils(filteredArray)

  }, [oils, filters])

  // ! JSX RETURNS
  return (
    <Container className="search-wrapper min-vh-100">
      {Object.keys(oils).length > 0 ?
        <>
          <div className='title-container'>
            <h1>Essential Oils</h1>
            <div className='search-container text-center text-end my-md-0 my-3'>
              <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
            </div>
          </div>
          <hr />
          <Row className='index-body-container'>
            <Col className="col-12 col-md-3 filter-container">
              <div className='button-container ms-3 text-start flex-column'>
                <h5>Key Actions</h5>
                {keyActions.map((item) => {
                  return <button className={keyActionsBtn === item ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleKeyActionFilter} name="keyActions" value={item} >

                    {item}</button>
                })}
              </div>
              <div className='button-container ms-3 text-start flex-column '>
                <h5>Applications</h5>
                <button className={applicationsBtn === 'All' ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleApplicationFilter} name="applications" value='All' > All</button>
                {applicationsFilter.map((item) => {
                  return <button className={applicationsBtn === item.name ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleApplicationFilter} name="applications" value={item.name} >
                    <img src={item.icon} alt={item.name} />
                    {item.name}</button>
                })}
              </div>
              <div className='button-container ms-3 text-start flex-column'>
                <h5>Remedies</h5>
                <button className={remediesBtn === 'All' ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleRemedyFilter} name="remedies" value='All' > All</button>

                {remediesFilter.map((item) => {
                  return <button className={remediesBtn === item.name ? "btn-clicked d-inline mx-1 d-md-block mx-md-0" : "d-inline d-md-block mx-1 mx-md-0"} onClick={handleRemedyFilter} name="remedies" value={item.name} >
                    <img src={item.icon} alt={item.name} />
                    {item.name}</button>
                })}
              </div>
            </Col>
            <Col className="col-12 col-md-9">
              <div className='grid-container'>

                {filteredOils.map((oil) => {
                  return (
                    <>
                      <div className="d-flex flex-column justify-content-around align-items-center">
                        <div className="card-container">
                          <Link to={`/essentials/${oil.id}`}>
                            <img src={oil.image} alt="essential oil" className="w-1" />
                            <p>{oil.name}</p>
                          </Link>

                        </div>

                      </div>
                    </>
                  )
                })}
              </div>
            </Col>
          </Row>
        </>
        :
        <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
      }
    </Container>
  )
}

export default EssentialsIndex



