
import './RecipeCard.css'

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";

const RecipeCard = ({title, imgUrl, rid, description}) => {
  const navigate = useNavigate();
  
  const onClickRecipe = (id) => {
    navigate(`/recipes/${id}`);
  }

  return (
    <Card onClick={() => onClickRecipe(rid)}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  rid: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};


export default RecipeCard;