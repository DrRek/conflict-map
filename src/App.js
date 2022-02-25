import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Add from "./Add";
import Home from "./Home";

function App() {
  return (
    <div className="app">
      <Router basename="/conflict-map">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/add" element={<Add />} />
        </Routes>
      </Router>
      <div>{"test"}</div>
    </div>
  );
}

export default App;
