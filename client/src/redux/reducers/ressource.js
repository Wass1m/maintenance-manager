import {
  GET_RESSOURCES,
  GET_RESSOURCES_FAIL,
  LOADING_RESPO,
  LOGOUT,
} from "../actions/types";

const initialState = {
  ressources: [],
  ressource: null,
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADING_RESPO:
      return {
        ...state,
        loading: true,
      };
    case GET_RESSOURCES:
      return {
        ...state,
        loading: false,
        ressources: payload.allRessources,
        error: "",
      };
    case GET_RESSOURCES_FAIL:
      return {
        ...state,
        loading: false,
        ressources: [],
        error: payload,
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        ressources: [],
        error: "",
        ressource: null,
      };

    default:
      return state;
  }
}
