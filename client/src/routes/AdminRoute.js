import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ auth: { isAuthenticated, role, loading, user } }) => {
  return user == null ? (
    <></>
  ) : isAuthenticated && !loading && role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentification,
});

export default connect(mapStateToProps)(AdminRoute);
