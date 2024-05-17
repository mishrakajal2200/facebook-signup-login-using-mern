// SignupForm.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For gender radio inputs
    if (name === "gender") {
      setFormData({ ...formData, gender: value });
    } else if (name === "custom") {
      // Handle "Custom" gender option
      setFormData({ ...formData, gender: "custom" });
    } else {
      // For other inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Log form data before sending
    console.log("Form Data:", formData);
    // // Map day, month, and year strings to numerical values
    // const day = parseInt(formData.dob_day, 10);

    // const monthMap = {
    //   January: 0,
    //   February: 1,
    //   March: 2,
    //   April: 3,
    //   May: 4,
    //   June: 5,
    //   July: 6,
    //   August: 7,
    //   September: 8,
    //   October: 9,
    //   November: 10,
    //   December: 11,
    // };
    // const month = monthMap[formData.dob_month];
    // const year = parseInt(formData.dob_year, 10);

    // const {
    //   name,
    //   surname,
    //   email,
    //   password,
    //   dob_day,
    //   dob_month,
    //   dob_year,
    //   gender,
    // } = formData;

    const { dob_day, dob_month, dob_year, ...restFormData } = formData;

    // Map day, month, and year strings to numerical values
    // const day = parseInt(dob_day, 10);
    // const month = months.indexOf(dob_month);
    // const year = parseInt(dob_year, 10);
    // Construct dob field
    const dob = new Date(
      dob_year,
      new Date(Date.parse(dob_month + " 1, 2000")).getMonth(),
      dob_day
    );

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ...formData,
          // dob_day: day,
          // dob_month: month,
          // dob_year: year,
          ...restFormData,
          dob,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to sign up");
      }

      const data = await response.json();
      setSuccessMessage(data.message);

      navigate("/login");
      setError("");
    } catch (error) {
      console.log("Error signing up:", error.message);
      setError(error.message); // Set error message received from backend
      setSuccessMessage("");
    }
  };
  return (
    <div className=" min-h-screen flex flex-col justify-center bg-gray-50 pb-8  px-8  sm:px-6 lg:px-16 ">
      <div className="w-64 mx-auto">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png"
          alt=""
          srcset=""
        />
      </div>
      <div className="mx-auto text-xl py-2">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>

      <form
        onSubmit={handleCreateAccount}
        action=""
        className="bg-white grid gap-1 w-96 shadow-lg mx-auto text-center rounded-lg border-gray-800 px-8 py-2"
      >
        <div className="mb-3">
          <h1 className="text-3xl font-bold">Create a new account</h1>
          <p>it's quick and easy</p>
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              placeholder="First Name"
              type="text"
              onChange={handleChange}
              value={formData.name}
              name="name"
              id="name"
              autoComplete="name"
              required
              className="mt-6 p-2 border border-gray-300 block w-full rounded-md"
            />
          </div>
          <div>
            <input
              placeholder="Surname"
              type="text"
              name="surname"
              onChange={handleChange}
              value={formData.surname}
              id="surname"
              autoComplete="surname"
              required
              className="mt-6 p-2 border border-gray-300 block w-full rounded-md"
            />
          </div>
        </div>
        <div>
          <input
            placeholder="Enter Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            id="email"
            autoComplete="email"
            required
            className="mt-2 p-2 border border-gray-300 block w-full rounded-md"
          />
        </div>
        <div>
          <input
            placeholder="New password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            id="password"
            autoComplete="password"
            required
            className="mt-2 p-2 border border-gray-300 block w-full rounded-md"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Date of birth */}
          <div>
            <p>Date of birth?</p>
            <select
              id="dob_day"
              name="dob_day"
              onChange={handleChange}
              value={formData.dob_day}
              className=" focus:ring-indigo-500 focus:border-indigo-500 w-full block shadow-sm sm:text-sm border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="">9</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Month Dropdown */}
          <div>
            <select
              id="dob_month"
              name="dob_month"
              onChange={handleChange}
              value={formData.dob_month}
              className="mt-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
            >
              <option value="">may</option>
              {Object.values(months).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div>
            <select
              id="dob_year"
              name="dob_year"
              className="mt-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-2 rounded-md"
              required
              onChange={handleChange}
              value={formData.dob_year}
            >
              <option value="">2024</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-left">Gender?</p>
        <div className="gender flex gap-3 justify-space-between mt-3 text-left">
          <div>
            <span className=" p-2 px-5 border border-gray-300 block w-full rounded-md shadow-sm sm:text-sm">
              Female
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={formData.gender === "female"}
              />
            </span>
          </div>

          <div>
            <span className="p-2 px-5 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md">
              Male
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                onChange={handleChange}
                checked={formData.gender === "male"}
              />
            </span>
          </div>

          <div>
            <span className="p-2 px-5 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md">
              Custom
              <input
                type="radio"
                id="custom"
                name="gender"
                value="custom"
                onChange={handleChange}
                checked={formData.gender === "custom"}
              />
            </span>
          </div>
        </div>
        <p className="text-left text-sm tracking-tight leading-tight">
          People who use our service may have uploaded your contact information
          to Facebook.{" "}
          <span className="text-blue-800 hover:underline">Learn more</span>
        </p>
        <br />
        <p className="text-left text-sm tracking-tight leading-tight">
          By clicking Sign Up, you agreeto our{" "}
          <span className="text-blue-800 hover:underline">Terms</span>,
          <span className="text-blue-800 hover:underline">Privacy Policy</span>
          and{" "}
          <span className="text-blue-800 hover:underline">Cookies Policy</span>
          ,you may receive SMS notifications from us and can opt out at any time
        </p>
        <div className="grid justify-center">
          <button
            type="submit"
            className="py-2 px-16 mt-12 w-full border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </div>
        <div className="login-link text-blue-600 mt-4">
          <Link to="/login"> Already have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
