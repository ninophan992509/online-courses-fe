import { useContext, useReducer } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Auth from "./components/guest/Auth/auth";
import Header from "./components/guest/Header/header";
import Footer from "./components/guest/Footer/footer";
import Profile from "./components/student/Profile/profile";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { authContext } from "./contexts/AuthContext";
import GuestRoute from "./routes/guestRoutes";
import NotFound from "./components/guest/NotFound/notFound";
import { useQuery } from "./services/useQuery";
import { appContext } from "./contexts/AppContext";
import reducer from "./reducers";

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

const initialState = {
  carts:[]
}

function App(props) {
  const location = useLocation();
  const query = useQuery();
  const { auth } = useContext(authContext);
  const { user, role } = auth;

  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <appContext.Provider value={{store, dispatch}} >
        <Header />
        <Container className="mt-3">
          <Switch>
            <Route
              path="/auth"
              render={() => AuthRoutes(user, role, query, location)}
            />
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <GuestRoute />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </appContext.Provider>
    </div>
  );
}

export default App;
