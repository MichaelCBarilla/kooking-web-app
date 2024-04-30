import './Recipes.css';

import {Col, Row, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RecipeCard from '../../components/recipes/RecipeCard';
import { getRecipes, selectAllRecipes } from '../../redux/reducers/recipesSlice';
import { useDispatch } from 'react-redux';


const Recipes = () => {
  const recipes = useSelector(selectAllRecipes);
  const dispatch = useDispatch();
  dispatch(getRecipes())

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h2>Recipes</h2>
        </Col>
        <Col xs='auto'>
          <Link to="/recipes/add">
            <Button variant='primary'>Add Recipe</Button>
          </Link>
          
        </Col>
      </Row>
      <Row>
        {recipes.map((recipe) => (
          <Col
            className='my-2'
            key={recipe._id}
            md={3} xs={6}>
            <RecipeCard
              title={recipe.title}
              imgUrl={recipe.imgUrl}
              rid={recipe._id}
              description={recipe.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Recipes;
