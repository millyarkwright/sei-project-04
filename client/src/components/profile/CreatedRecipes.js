import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CreatedRecipes = () => {
  const [created, setCreated] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/`)
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
  }, [])
  return (
    <Container className="search-wrapper min-vh-100">
      <div className='list-container'>
        {Object.keys(created).length ?
          <>
          <h1>Your Created Recipes</h1>
            {created.map((oil) => {
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


                      <div className="flex-column">
                        {/* {oil.essential_oil_amount.length ?
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
                    <></>} */}
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
          </>
          :

          <h1 className='text-center'>{error ? 'error' : 'loading'}</h1>
        }
      </div>
    </Container>
  )
}

export default CreatedRecipes