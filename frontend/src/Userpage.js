import { useEffect, useState } from "react";

const Userpage = ({ adminM, username, email }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [users, setUsers] = useState([]);
  const admin = adminM ? adminM : false;
  useEffect(() => {
    if (admin) {
      fetch(`http://localhost:4000/admin`)
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
          setUsers(data);
        });
    }
  }, []);

  return (
    <div className="details">
      {!admin && (
        <div>
          <div className="det">Username: {username}</div>
          <div className="det">Email: {email}</div>
        </div>
      )}

      {admin && users && (
        <div className="user-list">
          {users.map((user, i) => {
            return (
              <div className="user-container" key={i}>
                <div className="det">Username: {user.username}</div>
                <div className="det">Email: {user.email}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Userpage;
