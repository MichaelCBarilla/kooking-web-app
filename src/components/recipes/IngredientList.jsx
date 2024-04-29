import './IngredientList.css';

import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const IngredientList = ({
  ingredients,
  isEdit,
  onClickIngredient,
  onDeleteIngredient,
}) => {
  function decimalToFraction(decimal) {
    if (parseInt(decimal)) {
      return null;
    }
    // Function to find the greatest common divisor (GCD)
    const gcd = (a, b) => {
      if (b === 0) return a;
      return gcd(b, a % b);
    };

    // Convert the decimal to a fraction
    const tolerance = 1.0e-6;
    let numerator = decimal;
    let denominator = 1;
    let error = Math.abs(decimal - Math.round(decimal));

    while (error > tolerance) {
      numerator = Math.round(decimal * denominator);
      const divisor = gcd(numerator, denominator);
      numerator /= divisor;
      denominator /= divisor;
      error = Math.abs(decimal - numerator / denominator);
      denominator++;
    }
    console.log(`${numerator}/${denominator - 1}`);
    return `${numerator}/${denominator - 1}`;
  }

  return (
    <Row>
      <Col>
        <ListGroup className='mb-2'>
          {ingredients.map((ingredient, i) => (
            <Row key={ingredient.id}>
              <Col>
                <ListGroup.Item
                  action={isEdit}
                  onClick={
                    isEdit
                      ? (event) => onClickIngredient(event, ingredient, i)
                      : null
                  }>
                  {ingredient.name} {(decimalToFraction(ingredient.ingredientAmount?.amount) ?? ingredient.ingredientAmount?.amount) || ''}{' '}
                  {ingredient.ingredientAmount?.amountType || ''}
                </ListGroup.Item>
              </Col>
              <Col
                className='px-0'
                xs='auto'>
                {isEdit ? (
                  <Button
                    className='float-end'
                    onClick={(event) => onDeleteIngredient(event, i)}
                    variant='danger'>
                    X
                  </Button>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  isEdit: PropTypes.bool,
  onClickIngredient: PropTypes.func,
  onDeleteIngredient: PropTypes.func,
};

export default IngredientList;
