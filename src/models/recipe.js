import { ObjectModel, ArrayModel } from 'objectmodel';
import { nanoid } from 'nanoid';

const Ingredient = ObjectModel({ 
  id: String,
  name: String,
  amount: String,
  amountType: String,
  note: String,
}).defaultTo({
  id: nanoid(),
  name: '',
  amount: '',
  amountType: '',
  note: '',
});

const Direction = ObjectModel({
  id: String,
  order: [Number],
  directionText: String,
}).defaultTo({
  id: nanoid(),
  directionText: '',
});

const Recipe = ObjectModel({
  id: String,
  title: String,
  imgUrl: String,
  creator: String,
  rating: [Number],
  description: String,
  servings: [Number],
  caloriesPerServing: [Number],
  totalMinutes: [Number],
  ingredients: ArrayModel([Ingredient]),
  directions: ArrayModel([Direction]),
}).defaultTo({
  id: nanoid(),
  title: '',
  imgUrl: '/default-recipe.png',
  creator: '',
  description: '',
  ingredients: [],
  directions: [],
});

export { Ingredient, Direction, Recipe };