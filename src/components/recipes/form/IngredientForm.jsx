import './IngredientForm.css';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';

import IngredientList from '../IngredientList';
import AmountLabelDropdown from './AmountLabelDropdown';
import { isIngredientInvalid } from '../../../util/recipeValidation';

const IngredientForm = ({
  ingredients,
  onAddIngredient,
  onEditIngredient,
  onDeleteIngredient,
}) => {
  const [addedIngredient, setAddedIngredient] = useState({
    name: '',
    amount: '',
    amountLabel: '',
    note: '',
  });
  const [editedIngredient, setEditedIngredient] = useState(null);
  const [editedIngredientIndex, setEditedIngredientIndex] = useState(null);

  const onClickIngredient = (event, ingredient, index) => {
    event.preventDefault();
    const clickedIngredient = {
      ...ingredient,
    };
    setEditedIngredient(clickedIngredient);
    setEditedIngredientIndex(index);
  };

  const onChangeAddIngredientForm = (valueType, newValue) => {
    let newIngredient = {
      ...addedIngredient,
    };
    newIngredient[valueType] = newValue;
    setAddedIngredient(() => newIngredient);
  };

  const onAddIngredientCallback = (event) => {
    event.preventDefault();
    if (isIngredientInvalid(addedIngredient)) {
      console.log('ingredient invalid');
      return;
    }
    onAddIngredient(addedIngredient);
    setAddedIngredient({
      name: '',
      amount: '',
      amountLabel: '',
      note: '',
    });
  };

  const onChangeEditIngredientForm = (valueType, newValue) => {
    let newIngredient = {
      ...editedIngredient,
    };
    newIngredient[valueType] = newValue;
    setEditedIngredient(() => newIngredient);
  };

  const onEditIngredientCallback = (event) => {
    event.preventDefault();
    if (isIngredientInvalid(editedIngredient)) {
      console.log('ingredient invalid');
      return;
    }
    onEditIngredient(editedIngredient, editedIngredientIndex);
    setEditedIngredientIndex(null);
    setEditedIngredient(null);
  };

  const onDeleteIngredientCallback = (event, index) => {
    event.preventDefault();
    onDeleteIngredient(index);
  };

  return (
    <Row className='light-card my-4'>
      <Row>
        <Col>
          <h3>Ingredients</h3>
        </Col>
      </Row>
      <Form.Group
        className='mb-3'
        controlId='ingredientForm'>
        <Form.Label>Add Ingredient</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type='text'
              name='name'
              placeholder='Name'
              value={addedIngredient.name || ''}
              onChange={(event) =>
                onChangeAddIngredientForm('name', event.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Control
              type='number'
              name='amount'
              placeholder='Amount'
              value={addedIngredient.amount || ''}
              onChange={(event) =>
                onChangeAddIngredientForm('amount', event.target.value)
              }
            />
          </Col>
          <Col>
            <AmountLabelDropdown
              onSelect={(value) =>
                onChangeAddIngredientForm('amountLabel', value)
              }></AmountLabelDropdown>
          </Col>
          <Col>
            <Form.Control
              type='text'
              as='textarea'
              style={{ height: '100px' }}
              name='note'
              placeholder='Note'
              value={addedIngredient.note || ''}
              onChange={(event) =>
                onChangeAddIngredientForm('note', event.target.value)
              }
            />
          </Col>
          <Col>
            <Button onClick={(event) => onAddIngredientCallback(event)}>
              Add Ingredient
            </Button>
          </Col>
        </Row>
      </Form.Group>
      <Row>
        <Col>
          {editedIngredient == null ? (
            <p>Please select an ingredient to edit</p>
          ) : (
            <Form.Group
              className='mb-3'
              controlId='ingredientForm'>
              <Form.Label>Edit Ingredient</Form.Label>
              <Form.Control
                className='mb-3'
                type='text'
                name='name'
                placeholder='Name'
                value={editedIngredient.name || ''}
                onChange={(event) =>
                  onChangeEditIngredientForm('name', event.target.value)
                }
              />
              <Form.Control
                className='mb-3'
                type='text'
                name='amount'
                placeholder='Amount'
                value={editedIngredient.amount || ''}
                onChange={(event) =>
                  onChangeEditIngredientForm('amount', event.target.value)
                }
              />
              <AmountLabelDropdown
                onSelect={(value) =>
                  onChangeAddIngredientForm('amountLabel', value)
                }></AmountLabelDropdown>
              <Form.Control
                className='mb-3'
                type='text'
                as='textarea'
                style={{ height: '100px' }}
                name='note'
                placeholder='Note'
                value={editedIngredient.note || ''}
                onChange={(event) =>
                  onChangeEditIngredientForm('note', event.target.value)
                }
              />
              <Button onClick={(event) => onEditIngredientCallback(event)}>
                Update Ingredient
              </Button>
            </Form.Group>
          )}
        </Col>
        <Col>
          <IngredientList
            ingredients={ingredients}
            isEdit={true}
            onClickIngredient={onClickIngredient}
            onDeleteIngredient={onDeleteIngredientCallback}
          />
        </Col>
      </Row>
    </Row>
  );
};

IngredientForm.propTypes = {
  ingredients: PropTypes.array.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
  onEditIngredient: PropTypes.func.isRequired,
  onDeleteIngredient: PropTypes.func.isRequired,
};

export default IngredientForm;
