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
import Feed from './feed/pages/Feed';
import Recipes from './recipes/pages/Recipes';
import Recipe from './recipes/pages/Recipe';
import RecipeEdit from './recipes/pages/RecipeEdit';


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
