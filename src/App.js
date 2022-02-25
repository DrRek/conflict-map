import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
