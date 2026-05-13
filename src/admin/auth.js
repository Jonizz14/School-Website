export const ADMIN_SESSION_KEY = "school_admin_logged_in";

export function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function adminLogin(username, password) {
  const allowedUser = import.meta.env.VITE_ADMIN_USERNAME || "school_master_admin";
  const allowedPass = import.meta.env.VITE_ADMIN_PASSWORD || "Scl!2026@Strong#Panel";

  if (username === allowedUser && password === allowedPass) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
