import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PublicProfile = () => {
  const [created, setCreated] = useState([])
  const [publicRecipes, setPublicRecipes] = useState([])
  const [error, setError] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/${username}`)
        console.log(data)
        let publicData = data.created_recipes.filter(((item) => item.public === true))
        console.log('PUBLIC STUFF -->', publicData)
        setPublicRecipes(publicData)
        // setCreated(data.created_recipes)
        // console.log('DATAAA', data)
        // console.log('data.bookmarked -->', data.bookmarked_recipes)
        // console.log('data.tested -->', data.tested_recipes)
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
        {Object.keys(publicRecipes).length > 0 ?
          <>
          <h1>Recipes by {username}</h1>
            {publicRecipes.map((recipe) => {
              // (recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)).join(' ')
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
                        {/* {recipe.essential_recipe_amount.length ?
                    <>
                      <p >Main Ingredients:</p>
                      <div className="d-flex flex-wrap">
                        {recipe.essential_recipe_amount.map((item) => {
                          return (
                            <Link to={`/essentials/${item.essential_recipe.id}`}>
                              <span>{item.essential_recipe.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </>
                    :
                    <></>} */}
                        {recipe.applications.length ?
                          <>
                            <p>Applications:</p>
                            {recipe.applications.map((item) => {
                              return (<span>{item.name}</span>)
                            })}
                          </>
                          :
                          <></>}
                        {recipe.remedies.length ?
                          <>
                            <p>Remedies:</p>
                            {recipe.remedies.map((item) => {
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

export default PublicProfile