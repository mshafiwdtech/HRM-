import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Settings from "../pages/Settings";
import PageNotFound from "../pages/NotFound";
import Users from "../pages/Users";
import LoginPage from "../pages/Login";
import LeadDetails from "../pages/LeadDetails";
import AddUsers from "../components/users/AddUser";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      
      <Route path="/details">
        <LeadDetails />
      </Route>

      <PrivateRoute exact path="/">
        <Dashboard />
      </PrivateRoute>

      <PrivateRoute exact path="/leads">
        <Leads />
      </PrivateRoute>
      <PrivateRoute exact path="/settings">
        <Settings />
      </PrivateRoute>
      <PrivateRoute exact path="/users">
        <Users />
      </PrivateRoute>
      <PrivateRoute exact path="*">
        <PageNotFound />
      </PrivateRoute>
    </Switch>
  );
};

function PrivateRoute({ children, ...rest }) {
  const { token } = JSON.parse(localStorage?.getItem("epitomeUser")) || "";

  console.log({ token });
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AppRoutes;
