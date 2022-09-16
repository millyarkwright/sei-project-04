// * Hooks
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// * Axois & URL
import axios from 'axios'
import { API_URL } from '../config'

// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Carousel from 'react-bootstrap/Carousel'
import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  FreeMode,
  Autoplay,
} from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'

import loaderImg from '../images/loader.gif'


const HomePage = () => {

  // * ESSENTIAL OIL DATA
  const [essentialOils, setEssentialOils] = useState([])
  const [baseOils, setBaseOils] = useState([])
  const [error, setError] = useState('')

  // ! GET DATA
  // * ESSENTIAL OILS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/essentialoils/`)
        setEssentialOils(data)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log('ESSENTIAL OIL ERROR', error)
      }
    }
    getData()
  }, [])

  // * BASE OILS

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/baseoils/`)
        setBaseOils(data)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])



  return (
    <>
      <div className="hero-container">
        <div className="hero-overlay">
          <h1>aromatics</h1>
          <p>Discover the therapeutic properties of essential oils, the best ways to use them, and create your own recipes.</p>
        </div>
      </div>
      <Container className="home-wrapper min-vh-100">

        <div className="home-essentials">
          <div className="essentials-text">
            <h2>Essential Oils</h2>
            <div className="home-text-wrapper">
            <p>Essential oils contain the essence of nature. They are natural extracts from the seeds, stems, roots, flowers, bark and other parts of the plant. Used today in aromatherapy and fragrances, they have a long history in natural healing. The oils harness a plant's therapeutic properties to restore balance to the mind, body and spirit.  </p>
            <p>Discover the unique properties of over 40 essential oils, each profile details a plant's orogin and properties, the oil's appearance and aroma, and suggests some of the best ways to use each essential oil. </p>
            </div>
          </div>
          <Row>
            <div className="oil-swipe">
              <Swiper
                // install Swiper modules
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Mousewheel,
                  FreeMode,
                  Autoplay
                ]}
                autoplay={{
                  // delay: 1500,
                  disableOnInteraction: false
                }}
                slidesPerView={3}
                freeMode={true}
                mousewheel={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  375: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    scrollbar: { draggable: true },
                    autoplay: {
                      delay: 1500,
                    },
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    autoplay: {
                      delay: 2000,
                    },
                  },
                  920: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                    autoplay: {
                      delay: 3000,
                    },
                  },
                  1081: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                    autoplay: {
                      delay: 3500,
                    },
                  },
                }}
              >
                {essentialOils.map((oil) => {
                  return (
                    <SwiperSlide key={oil._id}>
                      <div className="oil-box">
                        <Link to={`/essentials/${oil.id}`}>
                          <img src={oil.image} alt="oil img" />
                          <p>{oil.name}</p>
                        </Link>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </Row>
        </div>

        <div className="home-essentials">
          <div className="bases-text">

            <h2>Base Oils</h2>
            <div className="home-text-wrapper">
              <p>Base, or carrier, oils are used to dilute and disperse concentrated oils, which can otherwise cause irritation, sensitization, redness, burning other reactions if applied directly. Derived from vegetable, nut, or seed sources, or made by macerating a herb in a plant oil, base oils have their own benefits. </p>
            </div>
          </div>
          <Row>
            <div className="oil-swipe">
              <Swiper
                // install Swiper modules
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Mousewheel,
                  FreeMode,
                  Autoplay
                ]}
                autoplay={{
                  // delay: 1500,
                  disableOnInteraction: false
                }}
                slidesPerView={3}
                freeMode={true}
                mousewheel={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  375: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    scrollbar: { draggable: true },
                    autoplay: {
                      delay: 1500,
                    },
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    autoplay: {
                      delay: 2000,
                    },
                  },
                  920: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                    autoplay: {
                      delay: 3000,
                    },
                  },
                  1081: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                    autoplay: {
                      delay: 3500,
                    },
                  },
                }}
              >
                {baseOils.map((oil) => {
                  return (
                    <SwiperSlide key={oil._id}>
                      <div className="oil-box">
                        <Link to={`/bases/${oil.id}`}>
                          <img src={oil.image} alt="oil img" />
                          <p>{oil.name}</p>
                        </Link>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default HomePage


// const [index, setIndex] = useState(0)

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // }

// * Carousel Test
// {Object.keys(essentialOils).length > 0 ?
//   <Carousel className="carousel" activeIndex={index} onSelect={handleSelect}>
//     {essentialOils.map((oil) => {
//       return (
//       <Carousel.Item>
//         <img className="d-block w-100" src={oil.image} alt="First slide"/>
//         <Carousel.Caption>
//           <h3>{oil.name}</h3>
//         </Carousel.Caption>
//       </Carousel.Item>
//       )
//     })}
//   </Carousel>
//   :
// <h1 className='text-center'>{error ? <p>error</p> : <img className="w-25" src={loaderImg} alt='loader' />}</h1>
