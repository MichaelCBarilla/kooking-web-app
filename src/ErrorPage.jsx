import { useRouteError } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ErrorPage.css'

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container className="error-container">
      <Row>
        <Col className="text-center">
          <h1>Oops!</h1>
        </Col >
      </Row>
      <Row>
        <Col className="text-center">
          <p>Sorry, an unexpected error has occurred.</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;