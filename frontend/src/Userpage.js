const Userpage = ({ username, email }) => {
  return (
    <div className="details">
      <div className="det">Username: {username}</div>
      <div className="det">Email: {email}</div>
    </div>
  );
};

export default Userpage;
