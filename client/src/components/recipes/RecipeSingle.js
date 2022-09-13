/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const RecipeSingle = () => {
  const { recipeId } = useParams()
  const [oils, setOils] = useState([])

  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/recipes/${recipeId}`)
        setOils(data)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleAddToBookmark = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO BOOKMARK ->`, recipeId)
      const { data } = await axios.post(
        `${API_URL}/users/bookmarked/${recipeId}`
      )
    } catch {
      console.log(error)
    }
  }

  const handleAddToTested = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO Tested ->`, recipeId)
      const { data } = await axios.post(
        `${API_URL}/users/tested/${recipeId}`
      )
    } catch {
      console.log(error)
    }
  }

  return (
    <Container className="search-wrapper min-vh-100 recipe-single">
      {Object.keys(oils).length ?
        <>
          <div className='title-container text-start p-4'>
            <div>
              <h1>{oils.name}</h1>
              <p>{oils.description}</p>
            </div>
            <div>
              <button onClick={handleAddToBookmark}>ADD TO BOOKMARK</button>
              <button onClick={handleAddToTested}>ADD TO TESTED</button>

            </div>


          </div>

          <Row className='block-container'>
            <Col>
              <Row className='ingredients-container'>
                <p>Makes: <span>{oils.makes}</span></p>
                {oils.essential_oil_amount.length ?
                  <>
                    <p >Main Ingredients:</p>
                    <div className="d-flex flex-wrap">
                      {oils.essential_oil_amount.map((item) => {
                        return (
                          <Link to={`/essentials/${item.essential_oil.id}`}>
                            <span className='color-black'>{item.essential_oil.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                  :
                  <></>}
                {oils.applications.length ?
                  <>
                    <p>Applications:</p>
                    {oils.applications.map((item) => {
                      return (<span>{item.name}</span>)
                    })}
                  </>
                  :
                  <></>}
                {oils.remedies.length ?
                  <>
                    <p>Remedies:</p>
                    {oils.remedies.map((item) => {
                      return (<span>{item.name}</span>)
                    })}
                  </>
                  :
                  <></>}
              </Row>
              <Row></Row>

            </Col>
            <Col>
              <Row >
                <h3>Steps</h3>
                <div className="text-start">
                  {oils.step_one !== "" ? <><p>1. {oils.step_one}</p></> : <></>}
                  {oils.step_two !== "" ? <><p>2. {oils.step_two}</p></> : <></>}
                  {oils.step_three !== "" ? <><p>3. {oils.step_three}</p></> : <></>}

                </div>


              </Row>
              <Row></Row>

            </Col>
          </Row>
        </>
        :
        <h1 className='text-center'>{error ? 'error' : 'loading'}</h1>
      }
    </Container>
  )
}

export default RecipeSingle