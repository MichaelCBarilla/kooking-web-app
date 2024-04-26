
import './RecipeDirections.css'

import Col  from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import DirectionsList from './DirectionsList';

const RecipeDirections = ({directions}) => {

  return (
    <Row className='light-card my-4'>
      <Col>
        <Row>
          <Col>
            <h3>Directions</h3>
          </Col>
        </Row>
        <DirectionsList directions={directions} />
      </Col>
    </Row>
  );
}

RecipeDirections.propTypes = {
  directions: PropTypes.array.isRequired,
};


export default RecipeDirections;