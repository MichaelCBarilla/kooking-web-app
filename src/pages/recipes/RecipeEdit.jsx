import './RecipeEdit.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import GeneralRecipeForm from '../../components/recipes/form/GeneralRecipeForm';
import IngredientForm from '../../components/recipes/form/IngredientForm';
import DirectionsForm from '../../components/recipes/form/DirectionsForm';

import { editRecipe, selectRecipes } from '../../redux/reducers/recipesSlice';

const RecipeEdit = () => {
  const recipes = useSelector(selectRecipes);
  const dispatch = useDispatch();
  const rid = useParams().rid;

  const [recipe, setRecipe] = useState(recipes.find((recipe) => recipe.id == rid));

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

  const isRecipeInvalid = () => {
    if (!recipe.title || recipe.title.trim() === '') {
      return true;
    }
    if (recipe.servings?.trim() && isNaN(recipe.servings) && recipe.servings <= 0) {
      return true;
    }
    if (recipe.caloriesPerServings?.trim() && isNaN(recipe.caloriesPerServings) && recipe.caloriesPerServings <= 0) {
      return true;
    }
    if (recipe.totalMinutes?.trim() && isNaN(recipe.totalMinutes) && recipe.totalMinutes <= 0) {
      return true;
    }
    if (recipe.ingredients.length == 0) {
      return true;
    }

    return false;
  };

  const convertAmount = (amountStr) => {
    if (amountStr.includes('/')) {
      const [numerator, denominator] = amountStr.split('/').map(Number);
      return numerator / denominator;
    } else {
      return parseFloat(amountStr);
    }
  };

  const constructRecipeModel = () => {
    const ingredientsModel = [];
    for (let ingredient of recipe.ingredients) {
      const ingredientModel = {
        ...ingredient,
      }
      if (ingredient.ingredientAmount) {
        ingredientModel.ingredientAmount = {
          amount: convertAmount(ingredient.ingredientAmount.amount),
          amountType: ingredient.ingredientAmount.amountType,
        };
      }
      ingredientsModel.push(ingredientModel);
    }
    const recipeModel = {
      ...recipe,
      servings: recipe.servings ? parseInt(recipe.servings) : undefined,
      caloriesPerServing: recipe.caloriesPerServing ? parseInt(recipe.caloriesPerServing) : undefined,
      totalMinutes: recipe.totalMinutes ? parseInt(recipe.totalMinutes) : undefined,
      rating: recipe.rating ? parseInt(recipe.rating) : undefined,
      ingredients: ingredientsModel,
    };
    return recipeModel;
  }

  const onEditRecipe = (event) => {
    event.preventDefault();

    if (isRecipeInvalid()) {
      console.log('Recipe is invalid.');
      return;
    }

    const recipeModel = constructRecipeModel();
    console.log(recipeModel);

    dispatch(editRecipe(recipeModel));
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

    // Insert the edited direction at the new position
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
