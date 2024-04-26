import './RecipeSummary.css';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SummaryStats from './SummaryStats';
import { deleteRecipe } from '../../redux/reducers/recipesSlice';

const RecipeSummary = ({
  title,
  rid,
  imgUrl,
  creator,
  rating,
  description,
  ingredientsLength,
  servings,
  caloriesPerServing,
  totalMinutes,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteRecipe = () => {
    dispatch(deleteRecipe(rid));
    navigate('/recipes');
  };

  return (
    <>
      <Row className='mt-2'>
        <Col className='px-0 me-2'>
          <img
            className='main-image'
            src={imgUrl || '/default-recipe.png'}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/default-recipe.png';
            }}
          />
        </Col>
        <Col
          className='px-0 ms-2'
          id='summarySection'>
          <Row>
            <Col className='d-flex justify-content-end'>
              <Link to={`/recipes/${rid}/edit`}>
                <Button
                  variant='warning'
                  size='sm'
                  className='me-2'>
                  Edit
                </Button>
              </Link>
              <Button
                variant='danger'
                size='sm'
                onClick={onDeleteRecipe}>
                Delete
              </Button>
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
              {rating ? '⭐⭐⭐⭐⭐' : 'No rating'}
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{description}</p>
            </Col>
          </Row>
          <SummaryStats
            ingredientsLength={ingredientsLength}
            servings={servings}
            caloriesPerServing={caloriesPerServing}
            totalMinutes={totalMinutes}
          />
        </Col>
      </Row>
    </>
  );
};

RecipeSummary.propTypes = {
  title: PropTypes.string.isRequired,
  rid: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  creator: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number,
  ingredientsLength: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  caloriesPerServing: PropTypes.number.isRequired,
  totalMinutes: PropTypes.number.isRequired,
};

export default RecipeSummary;
