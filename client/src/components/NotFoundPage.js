import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

const NotFoundPage = () => {
  return (
    <Container className="text-center p-3 justify-content-center">
      <h1>404 Page Not Found</h1>
      <Link to="/">
        <Button className="m-3" variant="outline-success" size="lg">Back to home</Button>
      </Link>
    </Container>
  )
}

export default NotFoundPage