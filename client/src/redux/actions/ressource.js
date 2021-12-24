import axios from "axios";
import {
  GET_RESSOURCES,
  GET_RESSOURCES_FAIL,
  LOADING_RESPO,
} from "../actions/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getRessources = () => async (dispatch) => {
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
      type: LOADING_RESPO,
    });

    const res = await axiosInstance.get(
      "/ressources/getRessourcesByRespo",
      config
    );

    dispatch({
      type: GET_RESSOURCES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESSOURCES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addRessource = (formData, endModal) => async (dispatch) => {
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
      type: LOADING_RESPO,
    });

    await axiosInstance.post("/ressources/create", formData, config);

    endModal();

    dispatch(getRessources());
  } catch (error) {
    dispatch({
      type: GET_RESSOURCES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRessource = (ressourceID) => async (dispatch) => {
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
      type: LOADING_RESPO,
    });

    await axiosInstance.delete(`/ressources/delete/${ressourceID}`, {}, config);

    dispatch(getRessources());
  } catch (error) {
    dispatch({
      type: GET_RESSOURCES_FAIL,
      payload: error.response.data.message,
    });
  }
};
