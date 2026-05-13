import React, { useEffect, useMemo, useState } from "react";
import { API } from "./resources";

function initialForm(resource) {
  const base = {};
  resource.fields.forEach((f) => {
    if (["images", "gallery"].includes(f)) base[f] = "[]";
    else base[f] = "";
  });
  const raw = { ...base, ...(resource.defaults || {}) };
  const normalized = { ...raw };
  ["images", "gallery"].forEach((f) => {
    if (f in normalized) normalized[f] = JSON.stringify(normalized[f] ?? [], null, 2);
  });
  return normalized;
}

function formatDateValue(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCell(field, value) {
  if (value === null || value === undefined) return "-";
  if (["time", "start_time", "end_time", "created_at"].includes(field)) {
    return formatDateValue(value);
  }
  if (Array.isArray(value) || typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function labelize(field) {
  const map = {
    first_name: "Ism",
    last_name: "Familiya",
    profession: "Lavozim",
    image: "Rasm",
    biography: "Biografiya",
    achievements: "Yutuqlar",
    title: "Sarlavha",
    description: "Tavsif",
    time: "Sana va vaqt",
    start_time: "Boshlanish vaqti",
    end_time: "Tugash vaqti",
    category: "Kategoriya",
    images: "Rasmlar (JSON)",
    gallery: "Galereya (JSON)",
    pupils: "O'quvchilar soni",
    teachers: "Ustozlar soni",
    finishers: "Bitiruvchilar",
    classes: "Sinflar soni",
    number: "Telefon",
    about_image: "Asosiy rasm",
    full_name: "To'liq ism",
    subject: "Mavzu",
    text: "Xabar matni",
    topic: "Mavzu",
    file: "Fayl URL",
    email: "Email",
    telegram: "Telegram",
    instagram: "Instagram",
    facebook: "Facebook",
    teacher: "Ustoz ID",
    name: "Nomi",
  };
  return map[field] || field;
}

function parseValue(name, value) {
  if (["pupils", "teachers", "finishers", "classes", "category", "teacher"].includes(name)) return value === "" ? null : Number(value);
  if (["images", "gallery"].includes(name)) {
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  return value;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminResourcePage({ resource }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm(resource));
  const [viewMode, setViewMode] = useState(resource.readonly ? "list" : "create");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("desc");

  const headers = useMemo(() => ({ "Content-Type": "application/json" }), []);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `${API}/${resource.endpoint}/`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Yuklashda xato");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.results || []);
    } catch (e) {
      const baseMessage = e.message || "Xatolik";
      setError(`${baseMessage}. Backend manzilini tekshiring: ${API}/${resource.endpoint}/`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm(initialForm(resource));
    setEditingId(null);
    setQuery("");
    setPage(1);
    setViewMode(resource.readonly ? "list" : "create");
    load();
  }, [resource.key]);

  const onChange = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const onImageFileChange = async (field, file) => {
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(field, dataUrl);
    } catch {
      setError("Rasmni o'qishda xatolik bo'ldi.");
    }
  };

  const onJsonImagesFileAdd = async (field, file) => {
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      let current = [];
      try {
        current = JSON.parse(form[field] || "[]");
        if (!Array.isArray(current)) current = [];
      } catch {
        current = [];
      }

      const item = field === "images" ? { image: dataUrl, is_main: current.length === 0 } : dataUrl;
      const updated = [...current, item];
      onChange(field, JSON.stringify(updated, null, 2));
    } catch {
      setError("Rasmni qo'shishda xatolik bo'ldi.");
    }
  };

  const onEdit = (item) => {
    const next = initialForm(resource);
    resource.fields.forEach((f) => {
      const v = item[f];
      next[f] = ["images", "gallery"].includes(f) ? JSON.stringify(v || [], null, 2) : (v ?? "");
    });
    setEditingId(item.id);
    setForm(next);
    setViewMode("create");
  };

  const onReset = () => {
    setEditingId(null);
    setForm(initialForm(resource));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (resource.readonly) return;
    setSaving(true);
    setError("");
    const payload = {};
    resource.fields.forEach((f) => {
      payload[f] = parseValue(f, form[f]);
    });

    const url = editingId ? `${API}/${resource.endpoint}/${editingId}/` : `${API}/${resource.endpoint}/`;
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      onReset();
      await load();
      setViewMode("list");
    } catch (e) {
      setError(e.message || "Saqlashda xato");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Ushbu element o'chirilsinmi?")) return;
    try {
      const res = await fetch(`${API}/${resource.endpoint}/${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("O'chirishda xato");
      await load();
    } catch (e) {
      setError(e.message || "Xatolik");
    }
  };

  const filtered = items.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    const dateFields = ["time", "start_time", "end_time", "created_at"];

    if (dateFields.includes(sortField)) {
      const at = av ? new Date(av).getTime() : 0;
      const bt = bv ? new Date(bv).getTime() : 0;
      return sortDir === "asc" ? at - bt : bt - at;
    }

    const an = typeof av === "number" ? av : String(av ?? "").toLowerCase();
    const bn = typeof bv === "number" ? bv : String(bv ?? "").toLowerCase();

    if (an < bn) return sortDir === "asc" ? -1 : 1;
    if (an > bn) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-title-wrap">
          <h2>{resource.label}</h2>
          <p>{resource.endpoint}/ endpoint boshqaruvi</p>
        </div>
        <div className="toolbar">
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Qidirish" />
          <button onClick={load}>Yangilash</button>
        </div>
      </div>

      <div className="section-tabs">
        {!resource.readonly && (
          <button className={viewMode === "create" ? "section-tab active" : "section-tab"} onClick={() => setViewMode("create")}>Qo'shish</button>
        )}
        <button className={viewMode === "list" ? "section-tab active" : "section-tab"} onClick={() => setViewMode("list")}>Ro'yxat</button>
      </div>

      {error ? <div className="admin-error">{error}</div> : null}

      {!resource.readonly && viewMode === "create" && (
        <section className="admin-card">
          <h3>{editingId ? "Ma'lumotni tahrirlash" : "Yangi ma'lumot qo'shish"}</h3>
          <form onSubmit={onSubmit} className="admin-form">
            {resource.fields.map((f) => {
              const isLong = ["description", "biography", "text", "achievements"].includes(f);
              const isJson = ["images", "gallery"].includes(f);
              const isSingleImage = ["image", "about_image"].includes(f);
              const type = ["time", "start_time", "end_time"].includes(f) ? "datetime-local" : ["email"].includes(f) ? "email" : ["pupils", "teachers", "finishers", "classes", "category", "teacher"].includes(f) ? "number" : "text";
              return (
                <label key={f}>
                  <span>{labelize(f)}</span>
                  {isLong || isJson ? (
                    <>
                      <textarea rows={isJson ? 5 : 3} value={form[f] ?? ""} onChange={(e) => onChange(f, e.target.value)} />
                      {isJson && (
                        <div className="inline-tools">
                          <input type="file" accept="image/*" onChange={(e) => onJsonImagesFileAdd(f, e.target.files?.[0])} />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type={type}
                        value={isSingleImage && String(form[f] || "").startsWith("data:") ? "" : (form[f] ?? "")}
                        onChange={(e) => onChange(f, e.target.value)}
                        placeholder={isSingleImage ? "Rasm URL yoki pastdan fayl yuklang" : ""}
                      />
                      {isSingleImage && (
                        <div className="inline-tools">
                          <input type="file" accept="image/*" onChange={(e) => onImageFileChange(f, e.target.files?.[0])} />
                          {String(form[f] || "").startsWith("data:") ? <span className="file-badge">Fayldan yuklandi</span> : null}
                          {form[f] ? <img className="image-preview" src={form[f]} alt="preview" /> : null}
                        </div>
                      )}
                    </>
                  )}
                </label>
              );
            })}
            <div className="form-actions">
              <button type="submit" disabled={saving}>{saving ? "Saqlanmoqda..." : editingId ? "Yangilash" : "Qo'shish"}</button>
              <button type="button" className="secondary" onClick={onReset}>Tozalash</button>
            </div>
          </form>
        </section>
      )}

      {viewMode === "list" && (
        <section className="admin-card">
          <div className="list-top">
            <h3>Ro'yxat ({sorted.length})</h3>
            <div className="list-controls">
              <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="id">ID</option>
                {resource.fields.slice(0, 5).map((f) => <option key={f} value={f}>{labelize(f)}</option>)}
              </select>
              <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
                <option value="desc">Kamayish</option>
                <option value="asc">O'sish</option>
              </select>
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          {loading ? <p>Yuklanmoqda...</p> : (
            <>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => toggleSort("id")}>ID</th>
                      {resource.fields.slice(0, 5).map((f) => (
                        <th key={f} onClick={() => toggleSort(f)}>{labelize(f)}</th>
                      ))}
                      <th>Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        {resource.fields.slice(0, 5).map((f) => (
                          <td key={f}>
                            <div className="cell-clamp">{formatCell(f, item[f])}</div>
                          </td>
                        ))}
                        <td>
                          {!resource.readonly && <button className="table-btn" onClick={() => onEdit(item)}>Tahrirlash</button>}
                          {!resource.readonly && <button className="table-btn danger" onClick={() => onDelete(item.id)}>O'chirish</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <button disabled={safePage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Oldingi</button>
                <span>{safePage} / {totalPages}</span>
                <button disabled={safePage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Keyingi</button>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
