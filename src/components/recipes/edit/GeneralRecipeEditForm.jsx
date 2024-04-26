import { Col, Form, Row } from 'react-bootstrap';
import './GeneralRecipeEditForm.css'

import PropTypes from 'prop-types';


const GeneralRecipeEditForm = ({recipe, onChangeGeneralRecipeForm}) => {

  
  return (
    <Row className='light-card my-4'>
      <Row>
        <Col>
          <h3>General</h3>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="recipeTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={recipe.title || ''} onChange={(event) => onChangeGeneralRecipeForm('title', event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeImgUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" placeholder="Enter Image URL" value={recipe.imgUrl || ''} onChange={(event) => onChangeGeneralRecipeForm('imgUrl', event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as='textarea' style={{ height: '100px' }} type="text" placeholder="Enter a Description" value={recipe.description || ''} onChange={(event) => onChangeGeneralRecipeForm('description', event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeServings">
        <Form.Label>Servings</Form.Label>
        <Form.Control type="number" placeholder="Enter the amount of servings" value={recipe.servings || ''} onChange={(event) => onChangeGeneralRecipeForm('servings', event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeCaloriesPerServing">
        <Form.Label>Calories per Serving</Form.Label>
        <Form.Control type="number" placeholder="Enter the amount of Calories in a Serving" value={recipe.caloriesPerServing || ''} onChange={(event) => onChangeGeneralRecipeForm('caloriesPerServing', event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeTotalMinutes">
        <Form.Label>Total Minutes</Form.Label>
        <Form.Control type="number" placeholder="Enter the amount of minutes to complete the recipe" value={recipe.totalMinutes || ''} onChange={(event) => onChangeGeneralRecipeForm('totalMinutes', event.target.value)} />
      </Form.Group>
    </Row>
  );
}

GeneralRecipeEditForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  onChangeGeneralRecipeForm: PropTypes.func.isRequired,
};


export default GeneralRecipeEditForm;