import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "./contexts/AuthContext";
//import Loading from "./components/Loading/loading";

const PrivateRoute = ({ component: Component, condition, ...rest }) => {
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
              style={{ height: "100vh", background: "#fff" }}
            >
              <div className="text-loading">
                <Spinner animation="border" variant="dark" />
                Loading...
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
        condition ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: `/auth?ref=${condition.role}`,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
