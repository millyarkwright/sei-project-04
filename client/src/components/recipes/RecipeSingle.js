/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import { Rating } from 'react-simple-star-rating'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
  const { recipeId } = useParams()
  const [oils, setOils] = useState([])
  const [formData, setFormData] = useState([])
  const [comments, setComments] = useState([])
  const [updatedComments, setUpdatedComments] = useState([])
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
      // const { data } = await axios.post(
      //   `${API_URL}/users/bookmarked/${recipeId}`
      // )
      const res = await axios.post(
        `${API_URL}/users/bookmarked/${recipeId}`
      )
      console.log(res.data.message)
      toast.error(res.data.message, {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error)
      toast.error(error.data.message, {
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

  const handleAddToTested = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO Tested ->`, recipeId)
      const { data } = await axios.post(
        `${API_URL}/users/tested/${recipeId}`
      )
    } catch (error) {
      console.log(error)
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
      // console.log('form data -->', formData)
      // setMovie(res.data)
      setFormData({ text: '', rating: '' })
      // setMessage(res.data.message)
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
      // window.location.reload()
      // console.log('reloaded')
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
    <Container className="search-wrapper min-vh-100 recipe-single">
      {Object.keys(oils).length ?
        <>
          <div className='title-container text-start p-4'>
            <div>
              <h1>{oils.name}</h1>
              {/* Categoies */}
              <div className="categories-container">
                {oils.applications.map((application) => {
                  return (
                    <div key={application.name} className="category">
                      <img srm={application.icon} alt="icon"/>
                      <p>{application.name}</p>
                    </div>
                    )
                  })}
                {oils.remedies.map((remedy) => {
                  return (
                    <div key={remedy.name}>
                      <img srm={remedy.icon} alt="icon"/>
                      <p>{remedy.name}</p>
                    </div>
                  )
                })}
              </div>
              <p>{oils.description}</p>
            </div>
            <div>
              <button onClick={handleAddToBookmark}>ADD TO BOOKMARK</button>
              <button onClick={handleAddToTested}>ADD TO TESTED</button>
            </div>
          </div>


          {/* Ingredients */}
          <Row className='block-container'>
            <Col className="col-12" md="6">
              <div className='ingredients-container'>
                <h3>Ingredients</h3>
                <p className="m-0">Makes {oils.makes}</p>
                {/* Base Oils */}
                {oils.base_oil_amount.length &&
                  <>
                    {oils.base_oil_amount.map((item) => {
                      return (
                        <div className="ingredient">
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
                {oils.other_ingredient_amount.length &&
                  <>
                    {oils.other_ingredient_amount.map((item) => {
                      return (
                        <div className="ingredient">
                            <p className="fw-bold">{item.other_ingredient.name}</p>
                            <p className="ms-2">{item.quantity} {item.measurement}</p>
                        </div>
                      )
                    })}
                  </>
                }
                {/* Essential Oils */}
                {oils.essential_oil_amount.length &&
                  <>
                    {oils.essential_oil_amount.map((item) => {
                      return (
                        <div className="ingredient">
                          <Link to={`/essentials/${item.essential_oil.id}`}>
                            <p className="fw-bold">{item.essential_oil.name} essential oil</p>
                          </Link>
                            <p className="ms-2">{item.quantity} {item.measurement}</p>
                        </div>
                      )
                    })}
                  </>
                }
              </div>
            </Col>
            <Col className="col-12" md="6">
              <div className="steps">
                <h3>Steps</h3>
                <div className="text-start">
                  {oils.step_one !== "" ? <><p>1. {oils.step_one}</p></> : <></>}
                  {oils.step_two !== "" ? <><p>2. {oils.step_two}</p></> : <></>}
                  {oils.step_three !== "" ? <><p>3. {oils.step_three}</p></> : <></>}
                </div>
              </div>
            </Col>
          </Row>
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