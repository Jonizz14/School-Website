import React from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import "./admin.css";
import AdminResourcePage from "./AdminResourcePage";
import { RESOURCES } from "./resources";
import { adminLogout } from "./auth";

function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h1>Maktab Admin</h1>
      <p>To'liq boshqaruv paneli</p>
      {RESOURCES.map((r) => (
        <NavLink key={r.key} className={({ isActive }) => isActive ? "menu-btn active" : "menu-btn"} to={`/admin-panel/${r.key}`}>
          {r.label}
        </NavLink>
      ))}
      <button
        className="menu-btn logout"
        onClick={() => {
          adminLogout();
          window.location.href = "/admin-login";
        }}
      >
        Chiqish
      </button>
    </aside>
  );
}

export default function AdminPanel() {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<Navigate to={`/admin-panel/${RESOURCES[0].key}`} replace />} />
          {RESOURCES.map((resource) => (
            <Route key={resource.key} path={`/${resource.key}`} element={<AdminResourcePage resource={resource} />} />
          ))}
          <Route path="*" element={<Navigate to={`/admin-panel/${RESOURCES[0].key}`} replace />} />
        </Routes>
      </main>
    </div>
  );
}
