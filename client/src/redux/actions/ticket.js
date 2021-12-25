import axios from "axios";
import {
  GET_TICKETS,
  GET_TICKET,
  LOADING,
  GET_TICKETS_FAIL,
  LOADING_RESPO,
} from "../actions/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const createTicket =
  (formData, ressourceID, notifyUser, endTicket) => async (dispatch) => {
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
        type: LOADING,
      });

      await axiosInstance.post(
        `/tickets/create/${ressourceID}`,
        formData,
        config
      );

      notifyUser("success", "Anomalie signalée");

      endTicket();
    } catch (error) {
      dispatch({
        type: GET_TICKETS_FAIL,
        payload: error.response.data.message,
      });
      notifyUser("warning", "Un probleme est apparu");
    }
  };

export const getTickets = () => async (dispatch) => {
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
      type: LOADING,
    });

    const res = await axiosInstance.get(`/tickets/get`, config);

    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TICKETS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTicketById = (ticketID) => async (dispatch) => {
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
      type: LOADING,
    });

    const res = await axiosInstance.get(
      `/tickets/getTicketById/${ticketID}`,
      config
    );

    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TICKETS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const solveTicket = (ticketID) => async (dispatch) => {
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

    await axiosInstance.get(`/tickets/solve/${ticketID}`, config);

    dispatch(getTickets());
  } catch (error) {
    dispatch({
      type: GET_TICKETS_FAIL,
      payload: error.response.data.message,
    });
  }
};
