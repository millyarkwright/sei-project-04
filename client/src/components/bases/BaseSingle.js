//  * Hooks
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// * Axios & URLs
import axios from 'axios'
import { API_URL } from '../../config'

import loaderImg from '../../images/loader.gif'

// * Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Carousel from 'react-bootstrap/Carousel' --- related recipes or blend well with oils



const BaseSingle = () => {

  const { boId } = useParams()

  const [baseOil, setBaseOil] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/baseoils/${boId}/`)
        console.log('Essential Oil Single Data->', data)
        setBaseOil(data)
      } catch (error) {
        setError(error)
        console.log('error->',error)
      }
    }
    getData()
  }, [])

  return (
    <div className="base-single-wrapper text-center">
      {Object.keys(baseOil).length ?
        <>
          {/* Header */}
          <Container className="header-wrapper">
            <Row className="header-wrapper">
              <Col className="col-12">
                <h1>{baseOil.name}</h1>
              </Col>
              <Col className="col-12">
                <h2>{baseOil.latin_name}</h2>
              </Col>
            </Row>
          </Container>
          {/* Content Body */}
          <Container>
            <Row>
              <Col className="col-12" sm="6">
                <img className="boSingle-image w-100" src={baseOil.image} alt="Base Oil"/>
              </Col>
              <Col className="col-12" sm="6">
                <p>{baseOil.description}</p>
              </Col>
            </Row>
          </Container>
          {/* Benefits */}
          <Container>
            <Row>
                {/* Benefits */}
              <Col className="eoBenefits col-12" sm="6">
                <h3>What is it good for?</h3>
                {baseOil.benefits.map((benefit) => {
                  return (
                    <Col key={benefit.id}>
                      <p className="fw-bold">{benefit.title}</p>
                      <p>{benefit.description}</p>
                    </Col>
                  )
                })}
              </Col>
            </Row>
          </Container>
          {/* BIO */}
          <Container className="boBio">
            <Row className="theOil">
              <Col className="col-12" sm="4">
                <h4>The base oil</h4>
                <p>{baseOil.the_base_oil}</p>
              </Col>
            </Row>
          </Container>
        </>
          :
          <h1 className='text-center'>{error ? 'error' : <img className="w-25" src={loaderImg} alt='loader'/>}</h1>
      }
    </div>
  ) 


}

export default BaseSingle