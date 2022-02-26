import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Add from "./Add";
import Home from "./Home";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";

function App() {
  return (
    <div
      className="app"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Router basename="/conflict-map">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/add" element={<Add />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
