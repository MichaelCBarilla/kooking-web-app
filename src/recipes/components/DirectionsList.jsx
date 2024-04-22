import './DirectionsList.css';

import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DirectionsList = ({
  directions,
  isEdit,
  onClickDirection,
  onDeleteDirection,
}) => {
  return (
    <Row>
      <Col>
        <ListGroup
          className='mb-2'>
          {directions.map((direction, i) => (
            <Row key={direction.id}>
              <Col>
                <ListGroup.Item
                  action={isEdit}
                  onClick={
                    isEdit
                      ? (event) => onClickDirection(event, direction, i)
                      : null
                  }>
                  {direction.order}. {direction.directionText}
                </ListGroup.Item>
              </Col>
              <Col
                className='px-0'
                xs='auto'>
                {isEdit ? (
                  <Button
                    className='float-end'
                    onClick={(event) => onDeleteDirection(event, i)}
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

DirectionsList.propTypes = {
  directions: PropTypes.array.isRequired,
  isEdit: PropTypes.bool,
  onClickDirection: PropTypes.func,
  onDeleteDirection: PropTypes.func,
};

export default DirectionsList;
