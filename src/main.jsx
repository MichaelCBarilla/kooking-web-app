import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App'
import Landing from './Landing'
import ErrorPage from './ErrorPage';
import Feed from './pages/feed/Feed';
import Recipes from './pages/recipes/Recipes';
import Recipe from './pages/recipes/Recipe';
import RecipeEdit from './pages/recipes/RecipeEdit';
import RecipeAdd from './pages/recipes/RecipeAdd';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/feed",
        element: <Feed />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/add",
        element: <RecipeAdd />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/:rid/edit",
        element: <RecipeEdit />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/:rid",
        element: <Recipe />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
