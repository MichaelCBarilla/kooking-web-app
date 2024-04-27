import './DirectionsForm.css';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DirectionsList from '../DirectionsList';

const DirectionsForm = ({ directions, onAddDirection, onEditDirection, onDeleteDirection }) => {
  const [addedDirection, setAddedDirection] = useState({
    order: '',
    directionText: '',
  });
  const [editedDirection, setEditedDirection] = useState(null);
  const [editedDirectionIndex, setEditedDirectionIndex] = useState(null);

  const onClickDirection = (event, direction, index) => {
    event.preventDefault();
    setEditedDirection(direction);
    setEditedDirectionIndex(index)
  };

  const onChangeAddDirectionForm = (valueType, newValue) => {
    const newDirection = {
      ...addedDirection,
    };
    newDirection[valueType] = newValue;
    setAddedDirection(() => newDirection);
  };

  const onAddDirectionCallback = (event) => {
    event.preventDefault();

    const orderAsNumber = parseFloat(addedDirection.order);
    if (!isNaN(orderAsNumber) && orderAsNumber >= 1 && orderAsNumber <= directions.length + 1) {
        onAddDirection({...addedDirection, order: orderAsNumber});
        setAddedDirection({ id: '', order: '', directionText: '' });
    } else {
      console.log('Invalid order');
    }


  };

  const onChangeEditDirectionForm = (valueType, newValue) => {
    const newDirection = {
      ...editedDirection,
    };
    newDirection[valueType] = newValue;
    setEditedDirection(() => newDirection);
  };

  const onEditDirectionCallback = (event) => {
    event.preventDefault();
    
    const orderAsNumber = parseFloat(editedDirection.order);
    if (!isNaN(orderAsNumber) && orderAsNumber >= 1 && orderAsNumber <= directions.length) {
        onEditDirection({...editedDirection, order: orderAsNumber}, editedDirectionIndex);
        setEditedDirectionIndex(null);
        setEditedDirection(null);
    } else {
      console.log('Invalid order');
    }
  };

  const onDeleteDirectionCallback = (event, index) => {
    event.preventDefault();
    onDeleteDirection(index);
  };

  return (
    <Row className='light-card my-4'>
      <Row>
        <Col>
          <h3>Directions</h3>
        </Col>
      </Row>
      <Form.Group
        className='mb-3'
        controlId='directionForm'>
        <Form.Label>Add Direction</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type='text'
              name='directionText'
              placeholder='Direction'
              value={addedDirection.directionText || ''}
              onChange={(event) =>
                onChangeAddDirectionForm('directionText', event.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Control
              type='number'
              name='order'
              min={1}
              max={directions.length + 1}
              placeholder='Order'
              value={addedDirection.order || ''}
              onChange={(event) =>
                onChangeAddDirectionForm('order', event.target.value)
              }
            />
          </Col>
          <Col>
            <Button
              onClick={(event) =>
                onAddDirectionCallback(event, addedDirection)
              }>
              Add Direction
            </Button>
          </Col>
        </Row>
      </Form.Group>
      <Row>
        <Col>
          {editedDirection == null ? (
            <p>Please select an direction to edit</p>
          ) : (
            <Form.Group
              className='mb-3'
              controlId='directionForm'>
              <Form.Label>Edit Direction</Form.Label>
              <Form.Control
                className='mb-3'
                type='text'
                name='directionText'
                placeholder='Direction'
                value={editedDirection.directionText || ''}
                onChange={(event) =>
                  onChangeEditDirectionForm('directionText', event.target.value)
                }
              />
              <Form.Control
                className='mb-3'
                type='number'
                name='order'
                min={1}
                max={directions.length}
                placeholder='order'
                value={editedDirection.order || ''}
                onChange={(event) =>
                  onChangeEditDirectionForm('order', event.target.value)
                }
              />
              <Button
                onClick={(event) => onEditDirectionCallback(event)}>
                Update Direction
              </Button>
            </Form.Group>
          )}
        </Col>
        <Col>
          <DirectionsList
            directions={directions}
            isEdit={true}
            onClickDirection={onClickDirection}
            onDeleteDirection={onDeleteDirectionCallback}
          />
        </Col>
      </Row>
    </Row>
  );
};

DirectionsForm.propTypes = {
  directions: PropTypes.array.isRequired,
  onAddDirection: PropTypes.func.isRequired,
  onEditDirection: PropTypes.func.isRequired,
  onDeleteDirection: PropTypes.func.isRequired,
};

export default DirectionsForm;
