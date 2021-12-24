import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import React from "react";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, role, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading && !(role == "usager") ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentification,
});

export default connect(mapStateToProps)(PrivateRoute);
