
import './Recipe.css'

import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RecipeSummary from '../../components/recipes/RecipeSummary';
import RecipeIngredients from '../../components/recipes/RecipeIngredients';
import RecipeDirections from '../../components/recipes/RecipeDirections';


import { selectRecipeById } from '../../redux/reducers/recipesSlice';

const Recipe = () => {
  const rid = useParams().rid;
  const recipe = useSelector(state => selectRecipeById(state, rid));
  
  return (
    <Container id='recipeContainer'>
      <RecipeSummary title={recipe.title} rid={recipe._id} imgUrl={recipe.imgUrl} creator={recipe.creator} rating={recipe.rating} description={recipe.description} ingredientsLength={recipe.ingredients.length} servings={recipe.servings} caloriesPerServing={recipe.caloriesPerServing} totalMinutes={recipe.totalMinutes}/>
      <Row>
        <Col className='me-2'>
         <RecipeDirections directions={recipe.directions}/>
        </Col>
        <Col className='ms-2' xs={4}>
          <RecipeIngredients ingredients={recipe.ingredients} />
        </Col>
      </Row>
    </Container>
  );
}

export default Recipe;