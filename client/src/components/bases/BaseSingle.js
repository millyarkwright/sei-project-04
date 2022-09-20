//  * Hooks
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// * Other
import loaderImg from '../../images/loader.gif'

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
    <div className="oil-single-wrapper">
      {Object.keys(baseOil).length ?
        <>
          {/* Header */}
          <Container className="header-wrapper">
            <Row>
              <Col className="header-text col-12" md="8">
                <div className="title-icons">
                  <div className="title-container">
                      <h1>{baseOil.name}</h1>
                      <h2>{baseOil.latin_name}</h2>
                  </div>
                </div>
                <div className="description-container mt-md-4">
                  <p>{baseOil.description}</p>
                </div>
              </Col>
              <Col className="header-image col-12" md="4">
                <img className="w-100" src={baseOil.image} alt="Base Oil"/>
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
                  {baseOil.benefits.map((benefit) => {
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
              <Col className="bio col-12" md="4">
                <div className="theOil">
                    <h4>The base oil</h4>
                    <p>{baseOil.the_base_oil}</p>
                </div>
                {baseOil.safe_usage &&
                  <div className="safeUsage">
                      <h4>Safe usage</h4>
                      <p>{baseOil.safe_usage}</p>
                  </div>
                }
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