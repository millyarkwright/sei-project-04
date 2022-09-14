import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import loaderImg from '../../images/loader.gif'


// Bootstrap Components
import Container from 'react-bootstrap/Container'
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
        {Object.keys(created).length ?
          <>
          <div className='list-container'>
          <h1>Your Created Recipes</h1>
            {created.map((recipe) => {
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
                        
                      {recipe.applications.length > 0 &&
                        <Col className="col-4" md="12">
                          <p>Applications:</p>
                          <div className="d-flex flex-wrap">
                            {recipe.applications.map((item) => {
                              return (<span>{item.name}</span>)
                            })}
                          </div>
                        </Col>}

                        {recipe.remedies.length > 0 &&
                        <Col className="col-4" md="12">
                          <p>Remedies:</p>
                          <div className="d-flex flex-wrap">
                            {recipe.remedies.map((item) => {
                              return (<span>{item.name}</span>)
                            })}
                          </div>
                        </Col>}
                    
                    </Col>
                  </Row>
                </>
              )
            })}
            </div>
          </>
          :
          <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>        }
    </Container>
  )
}

export default CreatedRecipes