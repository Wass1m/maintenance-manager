import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentification";

const Header = ({ auth, logoutUser }) => {
  const logOut = () => {
    logoutUser();
    navigate("/");
  };

  let navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src={`${logo}`} alt="" className="logo-image" />
        </Link>
        {/* <h1 className="inicio-text">Inicio Project</h1> */}
      </div>
      {auth.isAuthenticated && auth.user != null ? (
        <div className="welcome-name">
          <h1>{auth.user.firstName + " " + auth.user.lastName} </h1>
        </div>
      ) : (
        <></>
      )}

      <div className="menu">
        <ul className="header-menu">
          {!auth.isAuthenticated ? (
            <>
              <Link to="/login">
                <li> Identifiez-Vous </li>
              </Link>
              <Link to="/register">
                <li> Creer un compte </li>
              </Link>
            </>
          ) : (
            <>
              {" "}
              {auth.role == "admin" ? (
                <Link to="/admin/manage">
                  <li> Gerer les responsables </li>
                </Link>
              ) : auth.role == "responsable" ? (
                <>
                  <Link to="/responsable/manage/tickets">
                    <li className="ticket-li"> Gerer les tickets </li>
                  </Link>
                  <Link to="/responsable/manage/ressources">
                    <li> Gerer les ressources </li>
                  </Link>
                </>
              ) : (
                <> </>
              )}
              <a className="logout" onClick={() => logOut()}>
                Logout
              </a>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentification,
});

export default connect(mapStateToProps, { logoutUser })(Header);
