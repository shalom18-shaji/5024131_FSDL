import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Students from "./students";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Student Manager</h1>

        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/students">Students</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;