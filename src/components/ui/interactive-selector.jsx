import React, { useEffect, useMemo, useState } from "react";
import { FaImage } from "react-icons/fa";

const fallback = [
  {
    title: "Maktab binosi",
    description: "Zamonaviy sharoitlarga ega maktab binosi",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "O'quv jarayoni",
    description: "Ilg'or metodikalar asosida ta'lim",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Dars jarayoni",
    description: "Faol darslar va interaktiv mashg'ulotlar",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Tadbirlar",
    description: "Maktab hayotidagi unutilmas tadbirlar",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Yutuqlar",
    description: "O'quvchilarimizning yuqori natijalari",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function InteractiveSelector({ gallery = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState([]);

  const options = useMemo(() => {
    if (gallery.length > 0) {
      return gallery.slice(0, 5).map((item, i) => ({
        title: item.title || `Lavha ${i + 1}`,
        description: item.description || "Maktabimiz hayotidan ajoyib lahzalar",
        image: item.image,
      }));
    }
    return fallback;
  }, [gallery]);

  useEffect(() => {
    setAnimated([]);
    const timers = options.map((_, i) => setTimeout(() => setAnimated((p) => [...p, i]), i * 80));
    return () => timers.forEach(clearTimeout);
  }, [options]);

  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        color: "#1e293b",
        padding: "56px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "94%", maxWidth: 1260, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <h2 style={{ margin: 0, fontSize: 42, fontWeight: 800, letterSpacing: "-0.02em", color: "#1e3b8a" }}>Maktab Fotogalereyasi</h2>
          <p style={{ marginTop: 10, fontSize: 18, color: "#475569" }}>
            Maktabimizdagi qaynoq hayot, tadbirlar va yutuqlar bilan yaqindan tanishing.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, height: 430 }}>
          {options.map((option, index) => {
            const active = index === activeIndex;
            return (
              <button
                type="button"
                key={`${option.title}-${index}`}
                onClick={() => setActiveIndex(index)}
                style={{
                  flex: active ? "7 1 0%" : "1 1 0%",
                  border: `2px solid ${active ? "#fff" : "#1f2937"}`,
                  borderRadius: 20,
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  backgroundImage: `url(${option.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxShadow: active ? "0 20px 50px rgba(0,0,0,.38)" : "0 10px 24px rgba(0,0,0,.26)",
                  opacity: animated.includes(index) ? 1 : 0,
                  transform: animated.includes(index) ? "translateX(0)" : "translateX(-40px)",
                  transition: "all .35s ease",
                  positionAnchor: "auto",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 140,
                    background: "linear-gradient(to top, rgba(0,0,0,.88), rgba(0,0,0,.3), transparent)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: 16,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 10,
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,.35)",
                      background: "rgba(0,0,0,.4)",
                      display: active ? "flex" : "none",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaImage size={14} color="#fff" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        lineHeight: 1.1,
                        opacity: active ? 1 : 0,
                        transform: active ? "translateX(0)" : "translateX(14px)",
                        transition: "all .28s ease",
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 15,
                        color: "#e2e8f0",
                        opacity: active ? 1 : 0,
                        transform: active ? "translateX(0)" : "translateX(14px)",
                        transition: "all .28s ease",
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
