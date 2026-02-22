import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiX, FiCopy, FiThumbsUp, FiThumbsDown, FiCheck, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { RiGeminiFill } from "react-icons/ri";
import "./Chat.css";

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

// Log API Key status (first 4 chars only for safety)
if (!API_KEY) {
  console.warn('Google Gemini API key not found in environment variables. Please restart your dev server after adding it to .env');
} else {
  console.log('AI System: API Key detected (starts with: ' + API_KEY.substring(0, 4) + '...)');
}

export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [feedback, setFeedback] = useState({});
    const [isMobile, setIsMobile] = useState(false);
    const chatBoxRef = useRef(null);
    const intervalRef = useRef(null);
    const genAI = useRef(null);

    // Initialize AI lazily
    const getAI = () => {
        if (!genAI.current && API_KEY) {
            try {
                genAI.current = new GoogleGenerativeAI(API_KEY);
            } catch (error) {
                console.error('Failed to initialize AI:', error);
            }
        }
        return genAI.current;
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        if (!isMobile) {
            document.body.style.overflow = open ? "hidden" : "auto";
        }
    }, [open, isMobile]);

    useEffect(() => {
        if (isMobile && open) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            document.body.style.height = "100vh";
            document.documentElement.style.height = "100vh";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            document.body.style.height = "auto";
            document.documentElement.style.height = "auto";
        }
    }, [isMobile, open]);

    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        const savedFeedback = localStorage.getItem("chatFeedback");
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                setMessages(parsed);
                setShowWelcome(parsed.length === 0);
            } catch (e) {
                console.error("Error parsing saved messages", e);
            }
        }
        if (savedFeedback) {
            try {
                setFeedback(JSON.parse(savedFeedback));
            } catch (e) {
                console.error("Error parsing saved feedback", e);
            }
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        }
    }, [messages]);
    
    useEffect(() => {
        if (Object.keys(feedback).length > 0) {
            localStorage.setItem("chatFeedback", JSON.stringify(feedback));
        }
    }, [feedback]);

    useEffect(() => {
        if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    const handleOpen = () => {
        setOpen(true);
        setExpanded(false);
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const toggleChatOpen = () => {
        setOpen(prev => !prev);
        setExpanded(false);
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        
        const currentAI = getAI();
        if (!currentAI) {
            const errorMsg = "AI xizmati mavjud emas. Iltimos, API kalitni tekshiring va serverni qayta ishga tushiring.";
            setMessages(prev => [...prev, { id: `err-${Date.now()}`, sender: "ai", text: errorMsg }]);
            return;
        }

        if (showWelcome) setShowWelcome(false);
        if (intervalRef.current) clearInterval(intervalRef.current);

        const userMessage = { id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setLoading(true);

        const aiMessageId = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        try {
            const model = currentAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                systemInstruction: `Siz Sergeli tumanidagi ixtisoslashtirilgan maktabning rasmiy AI yordamchisisiz. 
                                   Javoblaringizni doimo juda samimiy, professional va foydali tarzda yozing. 
                                   Muhim joylarni ajratib ko'rsatish uchun emoji-lardan (✨, 🎓, 🏫, ✅) foydalaning.
                                   Matnni chiroyli strukturaga keltiring (paragraflarga bo'ling).

                                   Maktab haqida ma'lumotlar:
                                   - 540 ta o'quvchi va 58 ta tajribali ustozlar.
                                   - 24 ta zamonaviy jihozlangan sinflar.
                                   - Manzil: Sergeli tumani, Nilufar MFY, Sergeli 2-mavzesi, 64A-uy.
                                   - Faoliyatlar: Mock testlar, Zakovat intellektual o'yinlari, fan olimpiadalari.
                                   - Ixtisoslashuv: Aniq va tabiiy fanlar.`
            });

            const result = await model.generateContent(currentInput);
            const response = await result.response;
            let botText = response.text();

            const dislikedMessages = Object.entries(feedback)
                .filter(([_, v]) => v === "dislike")
                .map(([k]) => k);

            if (dislikedMessages.some(id => botText.includes(messages.find(m => m.id == id)?.text))) {
                botText = "Siz so'ragan mavzuda avval dislike berilgan javob. Iltimos boshqa savol yozing.";
            }

            setLoading(false);
            setMessages(prev => [...prev, { id: aiMessageId, sender: "ai", text: "" }]);

            let index = 0;
            intervalRef.current = setInterval(() => {
                index += 2; // Speed up typing slightly
                if (index >= botText.length) {
                    index = botText.length;
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.findIndex(m => m.id === aiMessageId);
                    if (lastIndex !== -1) newMessages[lastIndex].text = botText.slice(0, index);
                    return newMessages;
                });
                if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }, 15);

        } catch (err) {
            console.error('Chat API Error:', err);
            let errorMessage = "Xatolik yuz berdi.";
            
            if (err.message?.includes('API key') || err.message?.includes('PERMISSION_DENIED')) {
                errorMessage = "AI xizmati hozircha mavjud emas. API kalit noto'g'ri yoki yo'q.";
            } else if (err.message?.includes('quota') || err.message?.includes('limit')) {
                errorMessage = "AI xizmati band. Keyinroq urinib ko'ring.";
            }
            
            setMessages(prev => [...prev, { id: `err-${Date.now()}`, sender: "ai", text: errorMessage }]);
            setLoading(false);
        }
    };

    const copyMessage = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const rateMessage = (messageId, isPositive) => {
        setFeedback(prev => ({ ...prev, [messageId]: isPositive ? "like" : "dislike" }));
    };

    useEffect(() => {
        const isMac = navigator.platform.toUpperCase().includes("MAC");
        const handleShortcut = (e) => {
            if ((isMac && e.metaKey && e.key === "c") || (!isMac && e.ctrlKey && e.key === "c")) {
                if (!window.getSelection().toString()) {
                  toggleChatOpen();
                }
            }
        };
        document.addEventListener("keydown", handleShortcut);
        return () => document.removeEventListener("keydown", handleShortcut);
    }, []);

    return (
        <div className={`chat__wrapper ${open ? "chat__wrapper--open" : ""}`}>
          <div className={`chat__container ${open ? "chat__container--expanded" : ""} ${expanded ? "chat__container--full-expanded" : ""}`}>
                {!open && (
                    <button className="chat__toggle-btn" onClick={toggleChatOpen}>
                        <div className="chat__icon-wrapper">
                            <RiGeminiFill size={35} />
                        </div>
                    </button>
                )}

                {open && (
                    <>
                        <div className="chat__header">
                            <h1>Sergeli TIM AI</h1>
                            <div className="chat__header-buttons">
                                {!isMobile && (
                                    <button className="chat__expand-btn" onClick={toggleExpand} title={expanded ? "Kichiklashtirish" : "Kattalashtirish"}>
                                        {expanded ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
                                    </button>
                                 )}
                                 <button className="chat__close-btn" onClick={toggleChatOpen}>
                                    <FiX size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="chat__box" ref={chatBoxRef}>
                            {showWelcome && messages.length === 0 && (
                                <div className="chat__msg chat__msg--ai">
                                    Salom! Men sizga yordam berish uchun shu yerdaman 😊<br />
                                    Iltimos, biror savol yoki habar yozing...
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div key={m.id} className={`chat__msg chat__msg--${m.sender}`}>
                                    {m.text}
                                    {m.sender === "ai" && !loading && m.text && (
                                        <div className="chat__msg-actions">
                                            <button onClick={() => copyMessage(m.text, i)} title="Nusxa qil">
                                                {copiedIndex === i ? <FiCheck color="green" /> : <FiCopy />}
                                            </button>
                                            <button
                                                className={`chat__like-btn ${feedback[m.id] === "like" ? "chat__like-btn--active" : ""}`}
                                                onClick={() => rateMessage(m.id, true)}
                                                title="Yo'qdi"
                                            >
                                                <FiThumbsUp />
                                            </button>
                                            <button
                                                className={`chat__dislike-btn ${feedback[m.id] === "dislike" ? "chat__dislike-btn--active" : ""}`}
                                                onClick={() => rateMessage(m.id, false)}
                                                title="Yo'qmadi"
                                            >
                                                <FiThumbsDown />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {loading && (
                                <div className="chat__msg chat__msg--ai chat__msg--loading">
                                    <div className="chat__ripple-loader">
                                        <div className="cell d-0"></div>
                                        <div className="cell d-1"></div>
                                        <div className="cell d-2"></div>
                                        <div className="cell d-1"></div>
                                        <div className="cell d-2"></div>
                                        <div className="cell d-3"></div>
                                        <div className="cell d-2"></div>
                                        <div className="cell d-3"></div>
                                        <div className="cell d-4"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="chat__input">
                            <input
                                type="text"
                                placeholder="Savolingizni yozing..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button onClick={sendMessage} disabled={loading}>Yuborish</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}