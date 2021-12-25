import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import HomePage from "../components/common/HomePage";
import Loading from "../components/common/Loading";

const AnyRoute = ({ auth: { isAuthenticated, role, loading, user } }) => {
  return isAuthenticated &&
    !loading &&
    (role == "responsable" || role == "admin") ? (
    <HomePage />
  ) : (
    <Outlet />
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentification,
});

export default connect(mapStateToProps)(AnyRoute);
