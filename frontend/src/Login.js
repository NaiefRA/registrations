import { useState } from "react";
import Userpage from "./Userpage";

const Login = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [err, setErr] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleClick = () => {
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(
              data.message || "An error occurred. Please try again."
            );
          });
        }
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setErr("");
        setAdmin(data.admin);
        setLogged(true);
        setUsername(data.username);
        console.log(data);
      })
      .catch((err) => {
        setErr(err.message);
        console.error(err);
      });
  };

  return (
    <div>
      {!logged && <h2>LOGIN</h2>}
      {logged && <h2>Welcome</h2>}
      {!logged && (
        <>
          <div className="container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="but">
            <button onClick={handleClick}> Login </button>
          </div>
        </>
      )}
      {err && <div className="error">An error occured: {err}</div>}
      {logged && <Userpage adminM={admin} username={username} email={email} />}
    </div>
  );
};

export default Login;
