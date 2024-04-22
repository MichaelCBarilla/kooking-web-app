import './App.css';

import { Outlet, Link } from "react-router-dom";


const App = () => {
  return (
      <>
        <div id="sidebar">
          <div id='navCard' className='dark-card my-2'>
            <h1>kooking</h1>
            <Link to={`/feed`}>feed</Link>
            <Link to={`/recipes`}>recipes</Link>
          </div>
          <div id='activeRecipeCard' className='dark-card my-2'></div>
        </div>
        <div id="page">
          <Outlet />
        </div>
      </>
    );
}

export default App
