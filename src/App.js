import { useContext } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Auth from "./components/guest/Auth/auth";
import Header from "./components/guest/Header/header";
import HomePage from "./components/guest/HomePage/homePage";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { authContext } from "./contexts/AuthContext";
import GuestRoute from "./routes/guestRoutes";
import NotFound from "./components/guest/NotFound/notFound";
import { useQuery } from "./services/useQuery";

const AuthRoutes = (user, role, query, location) => {
  const ref = query.get("_ref");
  if (user && role === ref) {
    if (location.state && location.state.from) {
      return <Redirect to={location.state.from.pathname} />;
    } else {
      if (role === "student") return <Redirect to={"/home"} />;
      if (role === "teacher") return <Redirect to={"/teacher"} />;
      if (role === "admin") return <Redirect to={"/admin"} />;
    }
  } else {
    if (ref !== "student" && ref !== "teacher" && ref !== "admin") {
      return <Redirect to={"/not-found"} />;
    }
    return <Auth />;
  }
};


function App(props) {
  const location = useLocation();
  const query = useQuery();
  const { auth } = useContext(authContext);
  const { user, role } = auth;

  return (
    <div className="App">
      <Header />
      <Container className="mt-3">
        <Switch>
          <Route
            path="/auth"
            render={() => AuthRoutes(user, role, query, location)}
          />

          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <GuestRoute />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
