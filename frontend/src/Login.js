import { useState } from "react";
import Userpage from "./Userpage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);

  const handleClick = () => {
    console.log(email, password);

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error);
          });
        }
        return res.json();
      })
      .then((data) => {
        setLogged(true);
        setUsername(data.username);
        console.log(data);
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

      {logged && <Userpage username={username} email={email} />}
    </div>
  );
};

export default Login;
