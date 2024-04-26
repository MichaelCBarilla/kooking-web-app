import './RecipeAdd.css';

import { useState } from 'react';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import GeneralRecipeEditForm from '../components/edit/GeneralRecipeEditForm';

const RecipeAdd = () => {
  const [recipe, setRecipe] = useState({});

  const onChangeGeneralRecipeForm = (valueType, newValue) => {
    const newRecipe = {
      ...recipe,
    };
    newRecipe[valueType] = newValue;
    setRecipe(() => newRecipe);
  };

  const onUpdateRecipe = (event) => {
    event.preventDefault();

    console.log(recipe);
  };

  // const onAddIngredient = (addedIngredient) => {
  //   addedIngredient.id = (Math.floor(Math.random() * (10000000 - 100 + 1)) + 100);
  //   setRecipe((prevState) => ({
  //     ...prevState,
  //     ingredients: [...prevState.ingredients, addedIngredient],
  //   }));
  // };

  // const onEditIngredient = (editedIngredient, index) => {
  //   const newIngredients = [...recipe.ingredients];
  //   newIngredients[index] = editedIngredient;

  //   setRecipe((prevState) => ({
  //     ...prevState,
  //     ingredients: newIngredients,
  //   }));
  // };

  // const onDeleteIngredient = (index) => {
  //   const newIngredients = [...recipe.ingredients];
  //   newIngredients.splice(index, 1);

  //   setRecipe((prevState) => ({
  //     ...prevState,
  //     ingredients: newIngredients,
  //   }));
  // };

  // const onAddDirection = (addedDirection) => {
  //   const newDirections = [...recipe.directions];
  //   const addedDirectionIndex = addedDirection.order - 1;

  //   addedDirection.id = (Math.floor(Math.random() * (10000000 - 100 + 1)) + 100);

  //   // Insert the edited direction at the new position
  //   newDirections.splice(addedDirectionIndex, 0, addedDirection);
    
  //   for (let i = addedDirectionIndex + 1; i < newDirections.length; i++) {
  //     newDirections[i].order++;
  //   }

  //   setRecipe((prevState) => ({
  //     ...prevState,
  //     directions: newDirections,
  //   }));
  // };

  // const onEditDirection = (editedDirection, oldIndex) => {
  //   const newDirections = [...recipe.directions];
  //   newDirections[oldIndex] = editedDirection
    
  //   const newIndex = editedDirection.order - 1;

  //   // Remove the edited direction from its original position
  //   const [movedDirection] = newDirections.splice(oldIndex, 1);
  //   // Insert the edited direction at the new position
  //   newDirections.splice(newIndex, 0, movedDirection);
    
  //   // Adjust orders of others above or below edited index
  //   if (newIndex < oldIndex) {
  //     for (let i = newIndex + 1; i < oldIndex + 1; i++) {
  //       newDirections[i].order++;
  //     }
  //   } else {
  //     for (let i = oldIndex; i < newIndex; i++) {
  //       newDirections[i].order--;
  //     }
  //   }

  //   setRecipe((prevState) => ({
  //     ...prevState,
  //     directions: newDirections,
  //   }));
  // };

  // const onDeleteDirection = (index) => {
  //   const newDirections = [...recipe.directions];
  //   newDirections.splice(index, 1);

  //   for (let i = index; i < newDirections.length; i++) {
  //     newDirections[i].order--;
  //   }

  //   setRecipe((prevState) => ({
  //     ...prevState,
  //     directions: newDirections,
  //   }));
  // };

  return (
    <Container id='recipeContainer'>
      <Row className='mt-2'>
        <Col>
          <Form>
            <GeneralRecipeEditForm
              recipe={recipe}
              onChangeGeneralRecipeForm={onChangeGeneralRecipeForm}
            />
            {/* <IngredientEditForm
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
            /> */}
            <Button
              variant='primary'
              type='submit'
              onClick={(event) => onUpdateRecipe(event)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeAdd;
