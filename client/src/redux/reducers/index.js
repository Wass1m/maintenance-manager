import { combineReducers } from "redux";

import authentification from "./authentification";
import admin from "./admin";
import ressource from "./ressource";
import ticket from "./ticket";

export default combineReducers({
  authentification,
  admin,
  ressource,
  ticket,
});
