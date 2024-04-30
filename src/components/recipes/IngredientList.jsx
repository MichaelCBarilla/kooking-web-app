import './IngredientList.css';

import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const IngredientList = ({
  ingredients,
  isEdit,
  onClickIngredient,
  onDeleteIngredient,
}) => {

  return (
    <Row>
      <Col>
        <ListGroup className='mb-2'>
          {ingredients.map((ingredient, i) => (
            <Row key={ingredient._id}>
              <Col>
                <ListGroup.Item
                  action={isEdit}
                  onClick={
                    isEdit
                      ? (event) => onClickIngredient(event, ingredient, i)
                      : null
                  }>
                  {ingredient.name} {ingredient.amount || ''}{' '}
                  {ingredient.amountLabel || ''}
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
