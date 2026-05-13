export const RESOURCES = [
  { key: "news", label: "Yangiliklar", endpoint: "news", fields: ["title", "description", "time", "category", "images"], defaults: { images: [{ image: "", is_main: true }] } },
  { key: "event", label: "E'lonlar", endpoint: "event", fields: ["topic", "description", "start_time", "end_time", "image"] },
  { key: "teachers", label: "Ustozlar", endpoint: "teachers", fields: ["first_name", "last_name", "profession", "image", "biography", "email", "phone"] },
  { key: "students", label: "O'quvchilar", endpoint: "students", fields: ["first_name", "last_name", "image", "biography", "achievements"] },
  { key: "principal", label: "Rahbariyat", endpoint: "principal", fields: ["first_name", "last_name", "profession", "image", "instagram", "telegram", "facebook"] },
  { key: "course", label: "To'garaklar", endpoint: "course", fields: ["title", "description", "image", "teacher"] },
  { key: "document", label: "Hujjatlar", endpoint: "document", fields: ["title", "description", "time", "image", "file", "gallery"], defaults: { gallery: [] } },
  { key: "galery", label: "Galereya", endpoint: "galery", fields: ["image"] },
  { key: "contact", label: "Murojaatlar", endpoint: "contact", fields: ["full_name", "number", "subject", "text"], readonly: true },
];

export const API = (import.meta.env.VITE_REACT_APP_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
