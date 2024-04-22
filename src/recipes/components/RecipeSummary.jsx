import './RecipeSummary.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SummaryStats from './SummaryStats';

const RecipeSummary = ({title, rid, imgUrl, creator, rating, description, ingredientsLength, servings, caloriesPerServing, totalMinutes}) => {
  return (
    <>
      <Row className='mt-2'>
        <Col className='px-0 me-2'>
          <img className='main-image' src={imgUrl} />
        </Col>
        <Col className='px-0 ms-2' id='summarySection'>
          <Row>
            <Col className='d-flex justify-content-end'>
              <Link to={`/recipes/${rid}/edit`}>
                <Button variant="warning" size='sm' className='me-2'>Edit</Button>
              </Link>
              <Link to="/destination-route">
                <Button variant="danger" size='sm'>Delete</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>{title}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Created by {creator}</p>
            </Col>
            <Col className='text-end'>
              ⭐⭐⭐⭐⭐ {rating}
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{description}</p>
            </Col>
          </Row>
          <SummaryStats ingredientsLength={ingredientsLength} servings={servings} caloriesPerServing={caloriesPerServing} totalMinutes={totalMinutes} />

        </Col>
      </Row>
    </>
  );
}

RecipeSummary.propTypes = {
  title: PropTypes.string.isRequired,
  rid: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ingredientsLength: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  caloriesPerServing: PropTypes.number.isRequired,
  totalMinutes: PropTypes.number.isRequired,
};

export default RecipeSummary;