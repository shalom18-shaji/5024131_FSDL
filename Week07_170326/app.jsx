import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Tasks from "./Tasks";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <h1>React Task Manager</h1>

        <nav>
          <Link to="/">Home</Link> | {" "}
          <Link to="/tasks">Tasks</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;