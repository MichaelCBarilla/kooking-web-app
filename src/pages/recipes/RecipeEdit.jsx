import './RecipeEdit.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import GeneralRecipeForm from '../../components/recipes/form/GeneralRecipeForm';
import IngredientForm from '../../components/recipes/form/IngredientForm';
import DirectionsForm from '../../components/recipes/form/DirectionsForm';

import { editRecipe, selectRecipeById } from '../../redux/reducers/recipesSlice';

import { isRecipeInvalid } from '../../util/recipeValidation';
import { constructRecipeModel } from '../../util/recipeConstructor';

const RecipeEdit = () => {
  const dispatch = useDispatch();
  const rid = useParams().rid;
  const [recipe, setRecipe] = useState(useSelector(state => selectRecipeById(state, rid)));

  const onChangeGeneralRecipeForm = (valueType, newValue) => {
    const newRecipe = {
      ...recipe,
    };
    if (
      valueType === 'ingredientsLength' ||
      valueType == 'servings' ||
      valueType == 'caloriesPerServing' ||
      valueType == 'totalMinutes'
    ) {
      newRecipe[valueType] = +newValue;
    } else {
      newRecipe[valueType] = newValue;
    }
    setRecipe(() => newRecipe);
  };

  const onEditRecipe = (event) => {
    event.preventDefault();

    if (isRecipeInvalid(recipe)) {
      console.log('Recipe is invalid.');
      return;
    }

    const recipeModel = constructRecipeModel(recipe);
    console.log(recipeModel);

    dispatch(editRecipe(recipeModel));
  };

  const onAddIngredient = (addedIngredient) => {
    addedIngredient._id = nanoid();
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

    addedDirection._id = nanoid();

    // Insert the edited direction at the new position
    newDirections.splice(addedDirectionIndex, 0, addedDirection);

    for (let i = addedDirectionIndex + 1; i < newDirections.length; i++) {
      const newDirection = {
        ...newDirections[i],
        order: newDirections[i].order + 1,
      };
      newDirections[i] = newDirection;
    }

    setRecipe((prevState) => ({
      ...prevState,
      directions: newDirections,
    }));
  };

  const onEditDirection = (editedDirection, oldIndex) => {
    const newDirections = [...recipe.directions];
    newDirections[oldIndex] = editedDirection;

    const newIndex = editedDirection.order - 1;

    // Remove the edited direction from its original position
    const [movedDirection] = newDirections.splice(oldIndex, 1);
    // Insert the edited direction at the new position
    newDirections.splice(newIndex, 0, movedDirection);

    // Adjust orders of others above or below edited index
    if (newIndex < oldIndex) {
      for (let i = newIndex + 1; i < oldIndex + 1; i++) {
        const newDirection = {
          ...newDirections[i],
          order: newDirections[i].order + 1,
        };
        newDirections[i] = newDirection;
      }
    } else {
      for (let i = oldIndex; i < newIndex; i++) {
        const newDirection = {
          ...newDirections[i],
          order: newDirections[i].order - 1,
        };
        newDirections[i] = newDirection;
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
      const newDirection = {
        ...newDirections[i],
        order: newDirections[i].order - 1,
      };
      newDirections[i] = newDirection;
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
            <GeneralRecipeForm
              recipe={recipe}
              onChangeGeneralRecipeForm={onChangeGeneralRecipeForm}
            />
            <IngredientForm
              ingredients={recipe.ingredients}
              onAddIngredient={onAddIngredient}
              onEditIngredient={onEditIngredient}
              onDeleteIngredient={onDeleteIngredient}
            />
            <DirectionsForm
              directions={recipe.directions}
              onAddDirection={onAddDirection}
              onEditDirection={onEditDirection}
              onDeleteDirection={onDeleteDirection}
            />
            <Button
              variant='primary'
              type='submit'
              onClick={(event) => onEditRecipe(event)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeEdit;
