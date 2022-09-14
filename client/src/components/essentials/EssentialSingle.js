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
    <Container className="oil-single-wrapper min-vh-100">
      {Object.keys(essentialOil).length ?
        <>
          {/* Header */}
          <Container className="header-wrapper">
            <Row>
              <Col className="header-text col-12" md="8">
                <div className="title-icons">
                  <div className="title-container">
                      <h1>{essentialOil.name}</h1>
                      <h2>{essentialOil.latin_name}</h2>
                  </div>
                  {/* Categories */}
                  <div className="categories-container">
                    {essentialOil.applications.map((application) => {
                      return (
                        <div key={application.name}>
                          <img srm={application.icon} alt="icon"/>
                          <p>{application.name}</p>
                        </div>
                        )
                      })}
                    {essentialOil.remedies.map((remedy) => {
                      return (
                        <div key={remedy.name}>
                          <img srm={remedy.icon} alt="icon"/>
                          <p>{remedy.name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="description-container mt-md-4">
                  <p>{essentialOil.description_long}</p>
                  <p><span className="fw-bold">Method of extraction: </span>{essentialOil.method_of_extraction}</p>
                </div>
              </Col>
              <Col className="header-image col-12" md="4">
                <img className="w-100" src={essentialOil.image} alt="Essential Oil"/>
              </Col>
            </Row>
          </Container>


          {/* Content Body */}
          <Container>
            <Row>
              {/* Benefits  */}
              <Col className="benefits-wrapper col-12" md="8">
                <h3>What is it good for?</h3>
                <Row className="benefits-container">
                  {essentialOil.benefits.map((benefit) => {
                    return (
                      <Col key={benefit.id} className="col-12" md="6">
                        <p className="fw-bold">{benefit.title}</p>
                        <p>{benefit.description}</p>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
              {/* BIO */}
              <Col className="bio col-12 mt-3 mt-md-0" md="4">
                <div className="thePlant">
                    <h4>The plant</h4>
                    <p>{essentialOil.the_plant}</p>
                </div>
                <div className="theOil">
                    <h4>The essential oil</h4>
                    <p>{essentialOil.the_essential_oil}</p>
                </div>
                <div className="safeUsage">
                    <h4>Safe usage</h4>
                    <p>{essentialOil.safe_usage}</p>
                </div>
              </Col>
            </Row>
          </Container>

            {/* Uses */}
          <Container className="eoUses-wrapper">
            <h3>Best Uses</h3>
              <Row className="eoUses-container">
                {essentialOil.uses.map((use) => {
                  return (
                    <Col key={use.id} className="col-12" md="6">
                      <p className="fw-bold">{use.title}</p>
                      <p>{use.description}</p>
                    </Col>
                  )
                })}
              </Row>
          </Container>
          {/* Blends */}
          <Container className="blends-wrapper">
            {essentialOil.blends_well_with.map((blend) => {
              return (
                <div key={blend.id}>
                  <Link to={`/essentials/${blend.id}`}>
                    <img className="eoSingle-image w-100" src={blend.image} alt="Essential Oil"/>
                    <p>{blend.name}</p>
                  </Link>
                </div>
              )
            })}
          </Container>
        </>
          :
          <h1 className='text-center'>{error ? 'error' : <img className="w-25" src={loaderImg} alt='loader'/>}</h1>
      }
    </Container>
  ) 
}

export default EssentialSingle



