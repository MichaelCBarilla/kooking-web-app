
import './SummaryStats.css'


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import CircleNumber from '../../shared/components/CircleNumber';



const SummaryStats = ({ingredientsLength, servings, caloriesPerServing, totalMinutes}) => {

  return (
    <Row id='summaryStatContainer'>
      <Row>
        <Col>
          <Row>
            <Col className='stat'>
              <h3>Servings</h3>
            </Col>
          </Row>
          <Row>
            <Col className='stat'>
              <CircleNumber number={servings} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className='stat'>
              <h3>Calories</h3>
            </Col>
          </Row>
          <Row>
            <Col className='stat'>
              <CircleNumber number={caloriesPerServing} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className='stat'>
              <h3>Ingredients</h3>
            </Col>
          </Row>
          <Row>
            <Col className='stat'>
              <CircleNumber number={ingredientsLength} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className='stat'>
              <h3>Total Minutes</h3>
            </Col>
          </Row>
          <Row>
            <Col className='stat'>
              <CircleNumber number={totalMinutes} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

SummaryStats.propTypes = {
  ingredientsLength: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  caloriesPerServing: PropTypes.number.isRequired,
  totalMinutes: PropTypes.number.isRequired,
};

export default SummaryStats;