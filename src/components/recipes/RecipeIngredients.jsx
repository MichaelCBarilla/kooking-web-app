
import './RecipeIngredients.css'

import Col  from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import IngredientList from './IngredientList';


const RecipeIngredients = ({ingredients}) => {
  return (
    <Row className='light-card my-4'>
      <Col>
        <Row>
          <Col>
            <h3>Ingredients</h3>
          </Col>
        </Row>
        <IngredientList ingredients={ingredients} />
      </Col>
    </Row>
  );
}


RecipeIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default RecipeIngredients;