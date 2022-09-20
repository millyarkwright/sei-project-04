//  * Hooks
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap Components
import Container from 'react-bootstrap/Container'
//  * Other
import loaderImg from '../../images/loader.gif'

const BasesIndex = () => {
  const [oils, setOils] = useState([])
  const [filteredOils, setFilteredOils] = useState([])
  const [filters, setFilters] = useState({
    search: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/baseoils/`)
        setOils(data)
        console.log(data)
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

  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    console.log('search value', regexSearch)
    console.log('saved tag', filters.tag)
    const filteredArray = oils.filter(oil => {
      return regexSearch.test(oil.name)
 
    })
    console.log('filtered array', filteredArray)
    setFilteredOils(filteredArray)

  }, [oils, filters])

  return (
    <Container className="search-wrapper min-vh-100">
      {Object.keys(oils).length ?
        <>
          <div className='title-container'>
            <h1>Base Oils</h1>
            <div className='search-container text-center text-end my-md-0 my-3'>
              <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
            </div>
          </div>
          <hr />
          <div className='grid-container'>
            {filteredOils.map((oil) => {
              return (
                <>
                  <div className="d-flex flex-column justify-content-around align-items-center">
                    <div className="card-container">
                      <Link to={`/bases/${oil.id}`}>
                        <img src={oil.image} alt="base oil" className="w-1" />
                         <p>{oil.name}</p>
                      </Link>
                    </div>                
                  </div>
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

export default BasesIndex