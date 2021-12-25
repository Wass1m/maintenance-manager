import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import RegisterUser from "./components/authentification/RegisterUser";
import HomePage from "./components/common/HomePage";
import LoginUser from "./components/authentification/LoginUser";
import { loadUser } from "./redux/actions/authentification";
import { useEffect } from "react";
import ManageResponsables from "./components/admin/manage/ManageResponsables";
import AdminRoute from "./routes/AdminRoute";
import RespoRoute from "./routes/RespoRoute";
import ManageRessources from "./components/responsable/ressources/ManageRessources";
import Ressource from "./components/responsable/ressources/Ressource";
import AllRessources from "./components/usager/AllRessources";
import SignalRessource from "./components/usager/SignalRessource";
import { ToastContainer, toast } from "react-toastify";
import ManageTickets from "./components/responsable/tickets/ManageTickets";
import Ticket from "./components/responsable/tickets/Ticket";
import PageQR from "./components/responsable/ressources/PageQR";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<HomePage />} />
              <Route path="/admin/manage" element={<ManageResponsables />} />
            </Route>
            <Route path="/responsable" element={<RespoRoute />}>
              <Route element={<HomePage />} />
              <Route
                path="/responsable/manage/ressources"
                element={<ManageRessources />}
              />
              <Route
                path="/responsable/manage/ressources/:ressourceID"
                element={<Ressource />}
              />

              <Route
                path="/responsable/manage/tickets"
                element={<ManageTickets />}
              />

              <Route
                path="/responsable/manage/tickets/:ticketID"
                element={<Ticket />}
              />

              <Route
                path="/responsable/manage/ressources/generateQR/:ressourceID"
                element={<PageQR />}
              />
            </Route>

            <Route exact path="/" element={<AllRessources />} />
            <Route
              path="/signaler/:ressourceID"
              element={<SignalRessource />}
            />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
