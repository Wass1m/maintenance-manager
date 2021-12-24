import { combineReducers } from "redux";

import authentification from "./authentification";
import admin from "./admin";
import ressource from "./ressource";

export default combineReducers({
  authentification,
  admin,
  ressource,
});
