import './IngredientList.css';

import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const IngredientList = ({
  ingredients,
  isEdit,
  onClickIngredient,
  onDeleteIngredient,
}) => {
  const getAmountType = (ingredient) => {
    if (
      Object.prototype.hasOwnProperty.call(ingredient, 'amount') &&
      Object.prototype.hasOwnProperty.call(ingredient, 'amountType')
    ) {
      return ingredient.amount > 1
        ? `${ingredient.amountType}s`
        : ingredient.amountType;
    } else {
      return '';
    }
  };

  const getAmount = (ingredient) => {
    if (Object.prototype.hasOwnProperty.call(ingredient, 'amount')) {
      return ingredient.amount;
    } else {
      return '';
    }
  };

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
                  {ingredient.name} {getAmount(ingredient)}{' '}
                  {getAmountType(ingredient)}
                </ListGroup.Item>
              </Col>
              <Col className='px-0' xs='auto'>
                {isEdit ? <Button className='float-end' onClick={(event) => onDeleteIngredient(event, i)} variant='danger'>X</Button> : ''}
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
