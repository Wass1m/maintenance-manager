import axios from "axios";
import {
  REGISTER_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
} from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = (formData) => async (dispatch) => {
  const config = {
    header: { "content-type": "application/json" },
  };

  try {
    dispatch({
      type: LOADING,
    });

    const res = await axiosInstance.post("/users/register", formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  const config = {
    header: { "content-type": "application/json" },
  };

  try {
    dispatch({
      type: LOADING,
    });

    const res = await axiosInstance.post("/users/login", formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  const isToken = localStorage.getItem("token");
  if (isToken) {
    try {
      dispatch({
        type: LOADING,
      });

      const res = await axiosInstance.get("/users/me");

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
