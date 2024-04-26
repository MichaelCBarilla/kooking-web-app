import './RecipeAdd.css';

import { useState } from 'react';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import GeneralRecipeEditForm from '../../components/recipes/edit/GeneralRecipeEditForm';
import IngredientEditForm from '../../components/recipes/edit/IngredientEditForm';
import DirectionsEditForm from '../../components/recipes/edit/DirectionsEditForm';

import { Recipe } from '../../models/recipe';

import { addRecipe } from '../../redux/reducers/recipesSlice';

const RecipeAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(new Recipe());

  const onChangeGeneralRecipeForm = (valueType, newValue) => {
    const newRecipe = {
      ...recipe,
    };
    if (valueType === 'ingredientsLength' || valueType == 'servings' || valueType == 'caloriesPerServing' || valueType == 'totalMinutes') {
      newRecipe[valueType] = +newValue;
    } else {
      newRecipe[valueType] = newValue;
    }
    setRecipe(() => newRecipe);
  };

  const onAddRecipe = (event) => {
    event.preventDefault();
    dispatch(addRecipe(recipe));
    navigate(`/recipes/${recipe.id}`);
  };

  const onAddIngredient = (addedIngredient) => {
    addedIngredient.id = nanoid();
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, addedIngredient],
    }));
  };

  const onEditIngredient = (editedIngredient, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = editedIngredient;

    setRecipe((prevState) => ({
      ...prevState,
      ingredients: newIngredients,
    }));
  };

  const onDeleteIngredient = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);

    setRecipe((prevState) => ({
      ...prevState,
      ingredients: newIngredients,
    }));
  };

  const onAddDirection = (addedDirection) => {
    const newDirections = [...recipe.directions];
    const addedDirectionIndex = addedDirection.order - 1;

    addedDirection.id = nanoid();

    newDirections.splice(addedDirectionIndex, 0, addedDirection);
    
    for (let i = addedDirectionIndex + 1; i < newDirections.length; i++) {
      newDirections[i].order++;
    }

    setRecipe((prevState) => ({
      ...prevState,
      directions: newDirections,
    }));
  };

  const onEditDirection = (editedDirection, oldIndex) => {
    const newDirections = [...recipe.directions];
    newDirections[oldIndex] = editedDirection
    
    const newIndex = editedDirection.order - 1;

    // Remove the edited direction from its original position
    const [movedDirection] = newDirections.splice(oldIndex, 1);
    // Insert the edited direction at the new position
    newDirections.splice(newIndex, 0, movedDirection);
    
    // Adjust orders of others above or below edited index
    if (newIndex < oldIndex) {
      for (let i = newIndex + 1; i < oldIndex + 1; i++) {
        newDirections[i].order++;
      }
    } else {
      for (let i = oldIndex; i < newIndex; i++) {
        newDirections[i].order--;
      }
    }

    setRecipe((prevState) => ({
      ...prevState,
      directions: newDirections,
    }));
  };

  const onDeleteDirection = (index) => {
    const newDirections = [...recipe.directions];
    newDirections.splice(index, 1);

    for (let i = index; i < newDirections.length; i++) {
      newDirections[i].order--;
    }

    setRecipe((prevState) => ({
      ...prevState,
      directions: newDirections,
    }));
  };

  return (
    <Container id='recipeContainer'>
      <Row className='mt-2'>
        <Col>
          <Form>
            <GeneralRecipeEditForm
              recipe={recipe}
              onChangeGeneralRecipeForm={onChangeGeneralRecipeForm}
            />
            <IngredientEditForm
              ingredients={recipe.ingredients}
              onAddIngredient={onAddIngredient}
              onEditIngredient={onEditIngredient}
              onDeleteIngredient={onDeleteIngredient}
            />
            <DirectionsEditForm
              directions={recipe.directions}
              onAddDirection={onAddDirection}
              onEditDirection={onEditDirection}
              onDeleteDirection={onDeleteDirection}
            />
            <Button
              variant='primary'
              type='submit'
              onClick={(event) => onAddRecipe(event)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeAdd;
