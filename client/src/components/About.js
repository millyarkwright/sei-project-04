// * Bootstrap Components
import { Container, Row, Col, Card } from 'react-bootstrap'
//  * Other
import githubImg from '../images/github.png'
import linkedInImg from '../images/linkedIn.png'

const About = () => {
  return (
    <>
      <Container className="search-wrapper min-vh-100">
        <div className='header-wrapper'>

          <h1>About Us</h1>

        </div>
        <hr />
        <Row className='about-row'>
          <Col className="col-12 col-md-4 profile">
            <div>
              <h5>Fasai C.</h5>

            </div>
            <div className="profile-link">
              <a target='_blank' rel="noreferrer" href='https://github.com/fasaic'><img className="align-items-center" src={githubImg} alt="github" /></a>
              <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/fasai-c/'><img className="align-items-center" src={linkedInImg} alt="linkedIn" /></a>
            </div>
          </Col>
          <Col className="col-12 col-md-4 profile">
            <div>
              <h5>Milly Arkwright</h5>

            </div>
            <div className="profile-link">
              <a target='_blank' rel="noreferrer" href='https://github.com/millyarkwright'><img className="align-items-center" src={githubImg} alt="github" /></a>
              <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/milly-arkwright/'><img className="align-items-center" src={linkedInImg} alt="linkedIn" /></a>
            </div>
          </Col>

        </Row>
        <div className='header-wrapper'>

          {/* <h1>Credits</h1> */}

        </div>
      </Container>
    </>
  )
}

export default About