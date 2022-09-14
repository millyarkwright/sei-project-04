import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import { getToken } from '../helpers/auth'

import loaderImg from '../../images/loader.gif'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const SavedRecipes = () => {
  const [bookmarked, setBookmarked] = useState([])
  const [tested, setTested] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setBookmarked(data.bookmarked_recipes)
        console.log('DATAAA', data)
        console.log('data.bookmarked -->', data.bookmarked_recipes)
        setTested(data.tested_recipes)
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
      <Row>
        {/* BOOKMARKED */}
        <Col className="list-container col-12" md="6">
          <Row className="title-container">
            <h1>Bookmarked Recipes</h1>
          </Row>
          {Object.keys(bookmarked).length > 0 ? 
            <>
            {bookmarked.map((recipe) => {
              return (
                <>
                  <Row className="list-card-container me-md-1">
                    <Col className="col-12 list-text px-2 pt-2 p-md-3" md="8">
                      <Link to={`/recipes/${recipe.id}`}>
                        <h3>{recipe.bookmarked_recipe.name}</h3>
                      </Link>
                      <p>{recipe.bookmarked_recipe.description}</p>
                    </Col>
                    <Col className="col-12 list-categories px-2 pb-2 p-md-3" md="4">
                      <Row>
                        {recipe.bookmarked_recipe.applications.length > 0 &&
                          <Col className="col-4" md="12">
                            <p>Applications:</p>
                            <div className="d-flex flex-wrap">
                              {recipe.bookmarked_recipe.applications.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </div>
                          </Col>}
                        {recipe.bookmarked_recipe.remedies.length > 0 &&
                          <Col className="col-4" md="12">
                            <p>Remedies:</p>
                            <div className="d-flex flex-wrap">
                              {recipe.bookmarked_recipe.remedies.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </div>
                          </Col>}     
                      </Row>
                    </Col>
                  </Row>
                </>
              )
            })}            
            </>
            :
            <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
          }
        </Col>

        {/* TESTED */}
        <Col className="list-container col-12" md="6">
          <Row className='title-container ms-md-1'>
            <h1>Tested Recipes</h1>
          </Row>
          {Object.keys(tested).length > 0 ?
            <>
            {tested.map((recipe) => {
              return (
                <>
                  <Row className="list-card-container ms-md-1">

                    <Col className="col-12 list-text px-2 pt-2 p-md-3" md="8">
                      <Link to={`/recipes/${recipe.id}`}>
                        <h3>{recipe.tested_recipe.name}</h3>
                      </Link>
                      <p>{recipe.tested_recipe.description}</p>
                    </Col>

                    <Col className="col-12 list-categories px-2 pb-2 p-md-3" md="4">
                      <Row>
          
                        {recipe.tested_recipe.applications.length > 0 &&

                          <Col className="col-4" md="12">
                            <p>Applications:</p>
                            <div className="d-flex flex-wrap">
                              {recipe.tested_recipe.applications.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </div>
                          </Col>}

                        {recipe.tested_recipe.remedies.length > 0 &&

                          <Col className="col-4" md="12">
                            <p>Remedies:</p>
                            <div className="d-flex flex-wrap">
                              {recipe.tested_recipe.remedies.map((item) => {
                                return (<span>{item.name}</span>)
                              })}
                            </div>
                          </Col>}     

                      </Row>
                    </Col>
                  </Row>
                </>
              )
            })}
            </>
          :
          <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default SavedRecipes


// {Object.keys(bookmarked).length ?
//   <>
//   <div className='list-container'>
//     <h1>Bookmarked Recipes</h1>
//       {bookmarked.map((recipe) => {
//         return (
//           <>
//             <Row className=" list-card-container">
//               <Col className=" col-8 list-text">
//                 <Link to={`/recipes/${recipe.id}`}>
//                   <h3>{recipe.bookmarked_recipe.name}</h3>
//                 </Link>
//                 <p>{recipe.bookmarked_recipe.description}</p>
//               </Col>
//               <Col className="col-4 list-categories">
//                 <div className="flex-column">

//                   {recipe.bookmarked_recipe.applications.length ?
//                     <>
//                       <p>Applications:</p>
//                       {recipe.bookmarked_recipe.applications.map((item) => {
//                         return (<span>{item.name}</span>)
//                       })}
//                     </>
//                     :
//                     <></>}
//                   {recipe.bookmarked_recipe.remedies.length ?
//                     <>
//                       <p>Remedies:</p>
//                       {recipe.bookmarked_recipe.remedies.map((item) => {
//                         return (<span>{item.name}</span>)
//                       })}
//                     </>
//                     :
//                     <></>}
//                 </div>
//               </Col>
//             </Row>
//           </>
//         )
//       })}
//     </div>
//   </>
//   :
//   <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
// }




