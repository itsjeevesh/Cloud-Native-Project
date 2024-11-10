import { apiHeaders } from "../constants/index";
import axios from "axios";
import Cookies from "js-cookie";

export const getUser = async () => {
  try {
    // Sending a GET request to the API to fetch user data
    const userResponse = await axios.get(
      `http://localhost:5000/api/auth/user`,
      apiHeaders
    );

    // Returning the user data from the response
    return userResponse.data;
  } catch (error) {
    // Handling errors
    if (error.response) {
      if (error.response.data.message === "Token not found") {
        return null;
      }
      // If the error has a response, throw the error message from the response
      throw new Error(error.response?.data?.message);
    } else {
      // If the error does not have a response, throw a generic error message
      throw new Error(
        "An error occurred while fetching user data. Please try again later."
      );
    }
  }
};

export const loginUser = async (data) => {
  try {
    // Sending a POST request to the API with the user data
    const loginResponse = await axios.post(
      `http://localhost:5000/api/auth/login`,
      data,
      apiHeaders
    );

    // Setting a cookie with the token received from the response
    Cookies.set("token", loginResponse.data.token, { expires: 1 });
  } catch (error) {
    // Handling errors
    if (error.response) {
      // If the error has a response, throw the error message from the response
      throw new Error(error.response?.data?.message);
    } else {
      // If the error does not have a response, throw a generic error message
      throw new Error(
        "An error occurred while logging in. Please try again later."
      );
    }
  }
};

export const logoutUser = () => {
  try {
    Cookies.remove("token");
    console.log("removed");
  } catch (err) {
    console.log(err);
  }
};

export const getUserData = async () => {
  try {
    const userDataResponse = await axios.get(
      `http://localhost:5000/api/app/userData/get`,
      apiHeaders
    );

    return userDataResponse.data;
  } catch (error) {
    if (error.response) {
      // If the error has a response, throw the error message from the response
      throw new Error(error.response?.data?.message);
    } else {
      // If the error does not have a response, throw a generic error message
      throw new Error(
        "An error occurred while logging in. Please try again later."
      );
    }
  }
};
