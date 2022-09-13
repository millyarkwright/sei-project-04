/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import { Rating } from 'react-simple-star-rating'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// * HELPERS
import { userIsAuthenticated } from '../helpers/auth'

//! Components
import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  FreeMode,
} from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'

const RecipeSingle = () => {

  const navigate = useNavigate()

  // !State
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState([])
  const [formData, setFormData] = useState([])
  const [comments, setComments] = useState([])
  const [updatedComments, setUpdatedComments] = useState([])
  const [error, setError] = useState([])
  const [errorMessage, setErrorMessage] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/recipes/${recipeId}`)
        setRecipe(data)
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
        const { data } = await axios.get(`${API_URL}/recipes/${recipeId}`)
        setComments(data.reviews)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [updatedComments])


  const handleAddToBookmark = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO BOOKMARK ->`, recipeId)
      const {data} = await axios.post(
        `${API_URL}/users/bookmarked/${recipeId}`
      )
      console.log('DATA->',data)
      console.log('data.detail',data.detail)
      toast.success(data.detail, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.log(error)
      setError(error)
      setErrorMessage(error.response.data.detail)
      toast.error(error.response.data.detail, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleAddToTested = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO Tested ->`, recipeId)
      const { data } = await axios.post(
        `${API_URL}/users/tested/${recipeId}`
      )
      console.log(data)
      console.log(data.detail)
      toast.success(data.detail, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.log(error)
      setError(error)
      setErrorMessage(error.response.data.detail)
      toast.error(error.response.data.detail, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      console.log(`delete this recipe`, recipeId)
      const { data } = await axios.delete(
        `${API_URL}/recipes/${recipeId}`
      )
      toast.success(data.detail, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      navigate('/recipes')
    } catch (error) {
      console.log('error',error)
      console.log('error message',error.response.data.detail)
      setError(error)
      setErrorMessage(error.response.data.detail)
    }
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      // console.log(getToken())
      console.log('form data -->', formData)

      const res = await axios.post(
        `${API_URL}/reviews/${recipeId}`,
        formData
      )
      setFormData({ text: '', rating: '' })
      console.log('res-->', res.data.message)
      toast.error(res.data.message, {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUpdatedComments({ ...recipeId })
    } catch (error) {
      console.log('error message-->', error)
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }


  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleRating = (rating) => {
    setFormData({ ...formData, rating })
  }

  return (
    <Container className="recipe-single-wrapper min-vh-100">
      {Object.keys(recipe).length ?
        <>
          <Container className="header-wrapper">
            <Row>
            {/* <Row className="flex-column-reverse flex-md-row"> */}
              <Col className="col-12" md="6">
                <h1>{recipe.name}</h1>
              </Col>
              <Col className="col-12" md="6">
                <div className="userActions d-flex justify-content-md-end">
                    <button onClick={handleAddToBookmark}>BOOKMARK</button>
                    <button onClick={handleAddToTested}>TESTED</button>
                  { userIsAuthenticated() &&
                    <>
                      <button onClick={handleDelete}>DELETE</button>
                      <button>EDIT</button>
                    </>
                  }
                </div>
              </Col>
            </Row>
              {/* Categoies */}
              <div className="categories-container">
                {recipe.applications.map((application) => {
                  return (
                    <div key={application.name} className="category">
                      <img srm={application.icon} alt="icon"/>
                      <p>{application.name}</p>
                    </div>
                    )
                  })}
                {recipe.remedies.map((remedy) => {
                  return (
                    <div key={remedy.name}>
                      <img srm={remedy.icon} alt="icon"/>
                      <p>{remedy.name}</p>
                    </div>
                  )
                })}
              </div>
              <p>{recipe.description}</p>
          </Container>

          {/* Ingredients */}
          <Container>
            <Row>
              <Col className="col-12" md="5">
                <Row className='ingredients-container me-md-1'>
                  <h3>Ingredients</h3>
                  <p className="m-0">Makes {recipe.makes}</p>
                  {/* Base Oils */}
                  {recipe.base_oil_amount.length > 0 &&
                    <>
                      {recipe.base_oil_amount.map((item) => {
                        return (
                          <div key={item.id} className="ingredient">
                            <Link to={`/bases/${item.base_oil.id}`}>
                              <p className="fw-bold">{item.base_oil.name} oil</p>
                            </Link>
                              <p className="ms-2">{item.quantity} {item.measurement}</p>
                          </div>
                        )
                      })}
                    </>
                  }
                  {/* Other Ingredient Oils */}
                  {recipe.other_ingredient_amount.length > 0 &&
                    <>
                      {recipe.other_ingredient_amount.map((item) => {
                        return (
                          <div key={item.id} className="ingredient">
                              <p className="fw-bold">{item.other_ingredient.name}</p>
                              <p className="ms-2">{item.quantity} {item.measurement}</p>
                          </div>
                        )
                      })}
                    </>
                  }
                  {/* Essential Oils */}
                  {recipe.essential_oil_amount.length > 0 &&
                    <>
                      {recipe.essential_oil_amount.map((item) => {
                        return (
                          <div key={item.id} className="ingredient">
                            <Link to={`/essentials/${item.essential_oil.id}`}>
                              <p className="fw-bold">{item.essential_oil.name} essential oil</p>
                            </Link>
                              <p className="ms-2">{item.quantity} {item.measurement}</p>
                          </div>
                        )
                      })}
                    </>
                  }
                </Row>
              </Col>
              <Col className="col-12" md="7">
                <Row className="steps-container">
                  <h3>Steps</h3>
                  <div className="text-start">
                    {recipe.step_one !== "" ? <><p>1. {recipe.step_one}</p></> : <></>}
                    {recipe.step_two !== "" ? <><p>2. {recipe.step_two}</p></> : <></>}
                    {recipe.step_three !== "" ? <><p>3. {recipe.step_three}</p></> : <></>}
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>

          {/* COMMENTS SECTION */}
          <Row className="comment-wrapper d-flex flex-sm-row flex-column align-content-center justify-content-center">
            <div className="create-comment">
              <h3>Reviews</h3>
              <form
                className="d-flex flex-column justify-content-between"
                onSubmit={handleAddComment}
              >
                <div className="d-flex align-center rate-container">
                  <p>Rate</p>
                  {/* <label htmlFor="rate">Rate</label> */}
                  <Rating
                    name="rate"
                    onClick={handleRating}
                    transition={true}
                    size={20}
                    // showTooltip={true}
                    emptyColor="darkgrey"
                    // fillColor="yellow"
                    required
                    fillColorArray={[
                      'darkred',
                      'darkorange',
                      'gold',
                      'darkcyan',
                      'darkgreen',
                    ]}
                    // customIcons={customIcons}
                    ratingValue={formData.rating} /* Rating Props */
                  />
                </div>

                <textarea
                  name="text"
                  placeholder="What do you think about this recipe?"
                  maxLength="280"
                  onChange={handleChange}
                  required
                >
                  {formData.text}
                </textarea>
                <input type="submit" value="Add Comment" required />
                {/* <ToastContainer /> */}
              </form>
            </div>

            <div className="previous-comments">
              <Swiper
                // install Swiper modules
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Mousewheel,
                  FreeMode,
                ]}
                // spaceBetween={15}
                slidesPerView={3}
                freeMode={true}
                mousewheel={true}
                // navigation={{hideOnClick: true}}
                pagination={{ clickable: true }}
                breakpoints={{
                  375: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    scrollbar: { draggable: true },
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  920: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1081: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
              // scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log('slide change')}
              >
                {comments.map((comment) => {
                  return (
                    <SwiperSlide key={comment._id}>
                      <div className="comment-box">
                        <div>
                          <img
                            src={comment.owner.profile_image}
                            alt="profile"
                          />
                          <p>{comment.owner.username}</p>
                          <Rating
                            onClick={handleRating}
                            size={20}
                            emptyColor="darkgrey"
                            // fillColor="yellow"
                            fillColorArray={[
                              'darkred',
                              'darkorange',
                              'gold',
                              'darkcyan',
                              'darkgreen',
                            ]}
                            // customIcons={customIcons}
                            ratingValue={comment.rating}
                            allowHover={false}
                            readonly={true} /* Rating Props */
                          />
                        </div>

                        <div className='comment-display'>
                          <div className="comment-content">
                            <div className="comment-text">
                              <p>{comment.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </Row>
        </>
        :
        <h1 className='text-center'>{error ? 'error' : 'loading'}</h1>
      }

    </Container>
  )
}

export default RecipeSingle