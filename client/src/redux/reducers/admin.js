import {
  GET_RESPONSABLES,
  GET_RESPONSABLES_FAIL,
  LOADING_ADMIN,
  LOGOUT,
} from "../actions/types";

const initialState = {
  responsables: [],
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADING_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case GET_RESPONSABLES:
      return {
        ...state,
        loading: false,
        responsables: payload.responsables,
        error: "",
      };
    case GET_RESPONSABLES_FAIL:
      return {
        ...state,
        loading: false,
        responsables: [],
        error: payload,
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        responsables: [],
        error: "",
      };

    default:
      return state;
  }
}
