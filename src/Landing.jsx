import './App.css';

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Landing = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/feed");
  });

  return (
    <>
      <h1>Landing Page</h1>
    </>
  );
}

export default Landing
