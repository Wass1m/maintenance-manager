import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/common/Loading";

const AdminRoute = ({
  auth: { isAuthenticated, role, loading, user, token },
}) => {
  return token == null ? (
    <Navigate to="/" />
  ) : loading ? (
    <Loading />
  ) : user == null ? (
    <Loading />
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
