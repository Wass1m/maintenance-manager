import axios from "axios";
import {
  GET_RESPONSABLES,
  GET_RESPONSABLES_FAIL,
  LOADING_ADMIN,
} from "../actions/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getResponsables = () => async (dispatch) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  const config = {
    header: { "content-type": "application/json" },
  };

  try {
    dispatch({
      type: LOADING_ADMIN,
    });

    const res = await axiosInstance.get("/users/admin/getResponsables", config);

    dispatch({
      type: GET_RESPONSABLES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESPONSABLES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addResponsable = (formData) => async (dispatch) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  const config = {
    header: { "content-type": "application/json" },
  };

  try {
    dispatch({
      type: LOADING_ADMIN,
    });

    await axiosInstance.post(
      "/users/admin/createResponsable",
      formData,
      config
    );

    dispatch(getResponsables());
  } catch (error) {
    dispatch({
      type: GET_RESPONSABLES_FAIL,
      payload: error.response.data.message,
    });
  }
};
