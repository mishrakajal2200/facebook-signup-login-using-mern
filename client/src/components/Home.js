import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <div className="container py-12 text-blue-400 text-center font-bold text-xl">
      <h1>Welcome! To Our Facebook Signup/Login Page</h1>
      <h6>
        Click On The Button Below To View The Full Stack(MERN) Signup/Login Page
      </h6>
      <br />
      <button
        onClick={handleClick}
        className="bg-indigo-700 text-white p-3 rounded-md w-40 "
      >
        Click Here
      </button>
    </div>
  );
};

export default Home;
