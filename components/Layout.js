import Link from "next/link";
import axios from "axios";
import Router from "next/router";

const Layout = ({ children, title, auth }) => {
  const { user = {} } = auth || {};

  const logout = () => {
    if (typeof window !== "undefined") {
      window[WINDOW_USER_SCRIPT_VARIABLE] = {};
    }
    axios
      .post("/api/logout")
      .then(Router.replace("/login"))
      .catch(err => console.error(err));
  };

  return (
    <div className="root">
      <nav className="navbar">
        <span>
          Welcome, <strong>{user.name || "Guest"}</strong>
        </span>

        <div>
          <Link href="/">
            <a>Home</a>
          </Link>

          {user.email ? (
            <React.Fragment>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
              <button onClick={() => logout()}>Logout</button>
            </React.Fragment>
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </div>
      </nav>
      <h1>{title}</h1>
      {children}

      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        a {
          margin-right: 0.5em;
        }
        button {
          text-decoration: underline;
          padding: 0;
          font: inherit;
          cursor: pointer;
          border-style: none;
          color: rgb(0, 0, 238);
        }
      `}</style>
    </div>
  );
};

export default Layout;
