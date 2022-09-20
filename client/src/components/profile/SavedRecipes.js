//  * Hooks 
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// * Helpers 
import { getToken } from '../helpers/auth'
// * Other
import loaderImg from '../../images/loader.gif'
import bookmarkImg from '../../images/bookmark.png'
import testedImg from '../../images/tested.png'


const SavedRecipes = () => {
  const [updatedList, setUpdatedList] = useState([])
  const [user, setUser] = useState([])
  const [bookmarked, setBookmarked] = useState([])
  const [tested, setTested] = useState([])
  const [error, setError] = useState()
  const [errorMessage, setErrorMessage] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setUser(data)
        setBookmarked(data.bookmarked_recipes)
        setTested(data.tested_recipes)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [updatedList])

  const handleRemoveBookmarked = async (event) => {

    try {
      const { data } = await axios.delete(`${API_URL}/users/bookmarked/${event.target.value}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setUpdatedList([...event.target.value])
    } catch (error) {
      console.log('error', error)
      console.log('error message', error.response.data.detail)
      setError(error)
      setErrorMessage(error.response.data.detail)
    }
  }

  const handleRemoveTested = async (event) => {

    try {
      const { data } = await axios.delete(`${API_URL}/users/tested/${event.target.value}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setUpdatedList([...event.target.value])
    } catch (error) {
      console.log('error', error)
      console.log('error message', error.response.data.detail)
      setError(error)
      setErrorMessage(error.response.data.detail)
    }
  }

  return (
    <Container className="search-wrapper min-vh-100">
      <Row>
        {Object.keys(user).length > 0 ?
          <>
            <Col className="list-container col-12" md="6">
              <Row className="saved-title-container mt-2">
                <h1>Bookmarked Recipes</h1>
              </Row>
              {Object.keys(bookmarked).length > 0 ?
                <>
                  {bookmarked.map((recipe) => {

                    return (
                      <>
                        <Row className="list-card-container ">
                          <Col className="col-12 list-text px-2 pt-2 p-md-3" md="8">
                            <Link to={`/recipes/${recipe.bookmarked_recipe.id}`}>
                              <h3>{recipe.bookmarked_recipe.name}</h3>
                            </Link>
                            <p>{recipe.bookmarked_recipe.description}</p>
                          </Col>
                          <Col className="col-12 list-categories px-2 pb-2 p-md-3" md="4">
                            <Row>
                              {recipe.bookmarked_recipe.applications.length > 0 &&
                                <Col className="col-4" md="12">
                                  <p>Applications:</p>
                                  <div className="category-cards-wrapper">
                                    {recipe.bookmarked_recipe.applications.map((item) => {
                                      return (
                                        <div className="category-card">
                                          <img src={item.icon} className="category" alt="icon" />
                                          <span>{item.name}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </Col>}
                              {recipe.bookmarked_recipe.remedies.length > 0 &&
                                <Col className="col-4" md="12">
                                  <p>Remedies:</p>
                                  <div className="category-cards-wrapper">
                                    {recipe.bookmarked_recipe.remedies.map((item) => {
                                      return (
                                        <div className="category-card">
                                          <img src={item.icon} className="category" alt="icon" />
                                          <span>{item.name}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </Col>}
                            </Row>
                          </Col>
                          <Col className="button-container col-12 px-2 pb-2">
                            <button className="remove-button" onClick={handleRemoveBookmarked} value={recipe.id}>Remove</button>
                          </Col>
                        </Row>
                      </>
                    )
                  })}
                </>
                :
                <>
                
                  <Row className=' d-flex flex-column align-items-center p-2 list-card-container'>
                    <h5 className='text-center mt-2'>No Bookmarked Recipe!</h5>
                    <p>Start adding recipes to bookmark!</p>
                    <img className='w-25' src={bookmarkImg} alt="bookmark" />
                  </Row>


                </>
              }
            </Col>

            {/* TESTED */}
            <Col className="list-container col-12 mt-2" md="6">
              <Row className='saved-title-container '>
                <h1>Tested Recipes</h1>
              </Row>
              {Object.keys(tested).length > 0 ?
                <>
                  {tested.map((recipe) => {
                    return (
                      <>
                        <Row className="list-card-container ms-md-1">

                          <Col className="col-12 list-text px-2 pt-2 p-md-3" md="8">
                            <Link to={`/recipes/${recipe.tested_recipe.id}`}>
                              <h3>{recipe.tested_recipe.name}</h3>
                            </Link>
                            <p>{recipe.tested_recipe.description}</p>
                          </Col>

                          <Col className="col-12 list-categories px-2 pb-2 p-md-3" md="4">
                            <Row>

                              {recipe.tested_recipe.applications.length > 0 &&

                                <Col className="col-4" md="12">
                                  <p>Applications:</p>
                                  <div className="category-cards-wrapper">
                                    {recipe.tested_recipe.applications.map((item) => {
                                      return (
                                        <div className="category-card">
                                          <img src={item.icon} className="category" alt="icon" />
                                          <span>{item.name}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </Col>}

                              {recipe.tested_recipe.remedies.length > 0 &&

                                <Col className="col-4" md="12">
                                  <p>Remedies:</p>
                                  <div className="category-cards-wrapper">
                                    {recipe.tested_recipe.remedies.map((item) => {
                                      return (
                                        <>
                                          <div className="category-card">
                                            <img src={item.icon} className="category" alt="icon" />
                                            <span>{item.name}</span>
                                          </div>
                                        </>
                                      )
                                    })}
                                  </div>
                                </Col>}
                            </Row>
                          </Col>
                          <Col className="button-container col-12 px-2 pb-2">
                            <button className="remove-button" onClick={handleRemoveTested} value={recipe.id}>Remove</button>
                          </Col>
                        </Row>
                      </>
                    )
                  })}
                </>
                :
                <>
                  <Row className=' d-flex flex-column align-items-center p-2 list-card-container'>
                    <h5 className='text-center mt-2'>No Tested Recipe!</h5>
                    <p>Start marking recipes as tested!</p>
                    <img className='w-25' src={testedImg} alt="bookmark" />
                  </Row>
                </>
              }
            </Col>
          </>
          :
          <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
        }

      </Row>
    </Container>
  )
}

export default SavedRecipes
