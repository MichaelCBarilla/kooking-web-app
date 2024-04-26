
import './Recipe.css'

import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import RecipeSummary from '../../components/recipes/RecipeSummary';
import RecipeIngredients from '../../components/recipes/RecipeIngredients';
import RecipeDirections from '../../components/recipes/RecipeDirections';

import useRecipes from '../../hooks/useRecipes';

const Recipe = () => {
  const { recipes } = useRecipes();
  const rid = useParams().rid;
  console.log(recipes);
  const recipe = recipes.find((recipe) => recipe.id === rid);
  console.log(recipe);
  
  return (
    <Container id='recipeContainer'>
      <RecipeSummary title={recipe.title} rid={recipe.id} imgUrl={recipe.imgUrl} creator={recipe.creator} rating={recipe.rating} description={recipe.description} ingredientsLength={recipe.ingredients.length} servings={recipe.servings} caloriesPerServing={recipe.caloriesPerServing} totalMinutes={recipe.totalMinutes}/>
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