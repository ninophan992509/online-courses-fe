import React, { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
//import Loading from "./components/Loading/loading";

const PrivateRoute = ({ component: Component, user, role, ...rest }) => {
  const { auth } = useContext(authContext);
  const { loading } = auth;


  if (loading) {
    return (
      <Route
        {...rest}
        render={() => {
          return (
            <div
              className="flex-column-center w-100"
              style={{ height: "100vh" }}
            >
              <div className="text-loading text-center">
                <Spinner animation="border" variant="dark" />
                <div>Loading...</div>
              </div>
            </div>
          );
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user && user.type === role ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: `/auth`,
              search:`?_ref=${role}`,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
