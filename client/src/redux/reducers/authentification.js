import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOAD_USER,
  LOGOUT,
} from "../actions/types";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  error: null,
  role: "",
  disconnected: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    // case LOADING:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    case LOAD_USER:
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        loading: false,
        role: payload.data.role,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: payload,
      };
    // case REGISTER_FAIL:
    //   localStorage.removeItem("token");
    //   return {
    //     ...state,
    //     user: null,
    //     loading: false,
    //     isAuthenticated: false,
    //     error: payload,
    //   };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
        token: null,
        role: "",
        disconnected: true,
      };
    // case LOGIN_SUCCESS:
    //   localStorage.setItem("token", payload.token);
    //   return {
    //     ...state,
    //     ...payload,
    //     loading: false,
    //     isAuthenticated: false,
    //     isAdmin: false,
    //   };
    // case LOAD_USER:
    //   return {
    //     ...state,
    //     ...payload,
    //     loading: false,
    //     isAuthenticated: true,
    //     isAdmin: true,
    //   };
    // case LOGIN_FAIL:
    //   localStorage.removeItem("token");
    //   return {
    //     ...state,
    //     user: null,
    //     loading: false,
    //     isAuthenticated: false,
    //     error: payload,
    //     isAdmin: false,
    //   };

    default:
      return state;
  }
}
