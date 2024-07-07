import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      <div className="nav">
        {isAuthenticated && (
          <>
            <Link to="/admin" className="link">
              Admin
            </Link>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          </>
        )}
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )}
        <Link to="/user" className="link">
          User
        </Link>
      </div>
      <div className="gradient">
        {/* Gradient background instead of image */}
      </div>
    </div>
  );
}

export default Home;
