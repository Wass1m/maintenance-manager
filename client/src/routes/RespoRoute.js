import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RespoRoute = ({ auth: { isAuthenticated, role, loading, user } }) => {
  return user == null ? (
    <></>
  ) : isAuthenticated && !loading && role == "responsable" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentification,
});

export default connect(mapStateToProps)(RespoRoute);
