import Register from "./Register";
import Login from "./Login";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <Link to="/register">
            <h2>Register</h2>
          </Link>
          <Link to="/login">
            <h2>Login</h2>
          </Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
