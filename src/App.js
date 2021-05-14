import "./App.css";
import { Container } from "react-bootstrap";
import Auth from "./components/guest/Auth/auth";
import Header from "./components/guest/Header/header";
import HomePage from "./components/guest/HomePage/homePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="mt-5">
        <HomePage />
      </Container>
    </div>
  );
}

export default App;
