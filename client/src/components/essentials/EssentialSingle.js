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



const EssentialSingle = () => {

  const { eoId } = useParams()

  const [essentialOil, setEssentialOil] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/essentialoils/${eoId}/`)
        console.log('Essential Oil Single Data->', data)
        setEssentialOil(data)
      } catch (error) {
        setError(error)
        console.log('error->',error)
      }
    }
    getData()
  }, [])

  return (
    <div className="essential-single-wrapper text-center">
      {Object.keys(essentialOil).length ?
        <>
          {/* Header */}
          <Container className="header-wrapper">
            <Row className="header-wrapper">
              <Col className="col-12">
                <h1>{essentialOil.name}</h1>
              </Col>
              <Col className="col-12">
                <h2>{essentialOil.latin_name}</h2>
              </Col>
            </Row>
          </Container>
          {/* Categories */}
          <Container>
            <Row className="categories">
              {essentialOil.applications.map((application) => {
                return (
                  <Col key={application.name}>
                    <img srm={application.icon} alt="icon"/>
                    <p>{application.name}</p>
                  </Col>
                  )
                })}
              {essentialOil.remedies.map((remedy) => {
                return (
                  <Col key={remedy.name}>
                    <img srm={remedy.icon} alt="icon"/>
                    <p>{remedy.name}</p>
                  </Col>
                )
              })}
            </Row>
          </Container>
          {/* Blends */}
          <Container className="blends-wrapper">
            {essentialOil.blends_well_with.map((blend) => {
              return (
                <div key={blend}>
                  <p>{blend}</p>
                </div>
              )
            })}
          </Container>
          {/* Content Body */}
          <Container>
            <Row>
              <Col className="col-12" sm="6">
                <img className="eoSingle-image w-100" src={essentialOil.image} alt="Essential Oil"/>
              </Col>
              <Col className="col-12" sm="6">
                <p>{essentialOil.description_long}</p>
                <Row className="extractionMethod">
                  <Col className="col-6 fw-bold">
                    <p>Method of extraction:</p>
                  </Col>
                  <Col className="col-6">
                    <p>{essentialOil.method_of_extraction}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          {/* Benefits & Uses */}
          <Container>
            <Row>
                {/* Benefits */}
              <Col className="eoBenefits col-12" sm="6">
                <h3>What is it good for?</h3>
                {essentialOil.benefits.map((benefit) => {
                  return (
                    <Col key={benefit.id}>
                      <p className="fw-bold">{benefit.title}</p>
                      <p>{benefit.description}</p>
                    </Col>
                  )
                })}
              </Col>
            {/* Uses */}
              <Col className="eoUses col-12" sm="6">
                <h3>Best Uses</h3>
                {essentialOil.uses.map((use) => {
                  return (
                    <Col key={use.id}>
                      <p className="fw-bold">{use.title}</p>
                      <p>{use.description}</p>
                    </Col>
                  )
                })}
              </Col>
            </Row>
          </Container>
          {/* BIO */}
          <Container className="eoBio">
            <Row className="thePlant">
              <Col className="col-12" sm="4">
                <h4>The plant</h4>
                <p>{essentialOil.the_plant}</p>
              </Col>
            </Row>
            <Row className="theOil">
              <Col className="col-12" sm="4">
                <h4>The essential oil</h4>
                <p>{essentialOil.the_essential_oil}</p>
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

export default EssentialSingle



