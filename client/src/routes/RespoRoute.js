import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/common/Loading";

const RespoRoute = ({
  auth: { isAuthenticated, role, loading, user, disconnected, token },
}) => {
  return token == null ? (
    <Navigate to="/" />
  ) : loading ? (
    <Loading />
  ) : user == null && disconnected == false ? (
    <Loading />
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
