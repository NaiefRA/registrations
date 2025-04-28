import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(username, email, password);

    if (!username || !email || !password) {
      alert("Enter all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    if (password.length < 8) {
      alert("Password must be atleast 8 characters");
      return;
    }

    fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(
              data.message || "An error occurred. Please try again."
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        setErr("");
        console.log(data);
        alert("User registered successfully");
        navigate("/login");
      })
      .catch((Err) => {
        setErr(Err.message);
        console.error(Err);
      });
  };

  return (
    <div>
      <h2>REGISTER</h2>
      <div className="container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <div className="but">
        <button onClick={handleClick}> Register Account </button>
      </div>
      {err && <div className="error">An error occured: {err}</div>}
    </div>
  );
};

export default Register;
