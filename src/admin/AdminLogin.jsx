import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { adminLogin, isAdminLoggedIn } from "./auth";
import "./admin-login.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  if (isAdminLoggedIn()) {
    return <Navigate to="/admin-panel/news" replace />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = adminLogin(username.trim(), password);
    if (!ok) {
      setError("Login yoki parol noto'g'ri.");
      return;
    }
    const to = location.state?.from?.pathname || "/admin-panel/news";
    navigate(to, { replace: true });
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <h1>Admin Kirish</h1>
        <p>Maktab boshqaruv paneliga kirish</p>

        <label>
          <span>Login</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            autoComplete="username"
          />
        </label>

        <label>
          <span>Parol</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            autoComplete="current-password"
          />
        </label>

        {error ? <div className="admin-login-error">{error}</div> : null}

        <button type="submit">Kirish</button>
      </form>
    </div>
  );
}
