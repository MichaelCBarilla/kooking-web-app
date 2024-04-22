
import './CircleNumber.css'

import PropTypes from 'prop-types';


const CircleNumber = ({number}) => {
  return (
    <div className='circle-number-container'>
      <div>{number}</div>
    </div>
  );
}

CircleNumber.propTypes = {
  number: PropTypes.number.isRequired, // Adding prop type validation for 'number'
};

export default CircleNumber;