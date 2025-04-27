import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
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
    </div>
  );
};

export default Register;
