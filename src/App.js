import './App.css';
import { Container } from "react-bootstrap";
import Auth from "./components/guest/Auth/auth";
import Header from "./components/guest/Header/header";
import CourseList from "./components/guest/CourseList/courseList";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="mt-5">
           <CourseList/>
      </Container>
    </div>
  );
}

export default App;
