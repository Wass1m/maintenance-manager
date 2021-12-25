import {
  GET_TICKET,
  GET_TICKETS_FAIL,
  GET_TICKETS,
  LOADING,
  LOGOUT,
} from "../actions/types";

const initialState = {
  tickets: [],
  ticket: null,
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TICKETS:
      return {
        ...state,
        loading: false,
        tickets: payload.allTickets,
        error: "",
      };
    case GET_TICKETS_FAIL:
      return {
        ...state,
        loading: false,
        tickets: [],
        error: payload,
      };
    case GET_TICKET:
      return {
        ...state,
        loading: false,
        ticket: payload.ticket,
        error: "",
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        tickets: [],
        error: "",
        ticket: null,
      };

    default:
      return state;
  }
}
