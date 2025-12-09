import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { FiX, FiCopy, FiThumbsUp, FiThumbsDown, FiCheck, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { RiGeminiFill } from "react-icons/ri";
import "./Chat.css";

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

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
        if (isMobile) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }
    }, [isMobile]);

    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        const savedFeedback = localStorage.getItem("chatFeedback");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
            setShowWelcome(JSON.parse(savedMessages).length === 0);
        }
        if (savedFeedback) setFeedback(JSON.parse(savedFeedback));
    }, []);

    useEffect(() => localStorage.setItem("chatMessages", JSON.stringify(messages)), [messages]);
    useEffect(() => localStorage.setItem("chatFeedback", JSON.stringify(feedback)), [feedback]);

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

    const handleClose = () => {
        setOpen(false);
        setExpanded(false);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        if (showWelcome) setShowWelcome(false);
        if (intervalRef.current) clearInterval(intervalRef.current);

        const userMessage = { id: Date.now(), sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setLoading(true);

        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, sender: "ai", text: "O'ylamoqda..." }]);

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [
                    {
                        role: "model",
                        parts: [
                            {
                                text: `Siz Sergeli tumanidagi ixtisoslashtirilgan maktabimiz bo'yicha yordam beradigan AI siz.
                                       Bizning maktabimizda 500 dan ortiq o'quvchi, 50 dan ortiq ustozlar, 20 dan ortiq sinflar mavjud.
                                       Manzilimiz: Sergeli tumani, Nilufar MFY, Sergeli 2-mavzesi, 64A-uy.
                                       Maktabda Mock testlar, Zakovatlar va turli olimpiadalar o'tadi.Ali sport vaziri maktabizmida.
                                       Foydalanuvchiga salom aytish va maktab haqida savollariga yordam berish kerak.maktabda eng zo'r ustoz maftuna saidova matematika fani oqutuvchsi.Bu saytni Jahongir To'xtayev va Jabborov Adham yaratgan ular frontend va UI/UX qismini yozgan.`
                            }
                        ]
                    },
                    { role: "user", parts: [{ text: currentInput }] }
                ]
            });

            let botText = response.text;

            const dislikedMessages = Object.entries(feedback)
                .filter(([_, v]) => v === "dislike")
                .map(([k]) => k);

            if (dislikedMessages.some(id => botText.includes(messages.find(m => m.id == id)?.text))) {
                botText = "Siz so'ragan mavzuda avval dislike berilgan javob. Iltimos boshqa savol yozing.";
            }

            let index = 0;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastIndex = newMessages.findIndex(m => m.id === aiMessageId);
                if (lastIndex !== -1) newMessages[lastIndex].text = "";
                return newMessages;
            });

            intervalRef.current = setInterval(() => {
                index++;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.findIndex(m => m.id === aiMessageId);
                    if (lastIndex !== -1) newMessages[lastIndex].text = botText.slice(0, index);
                    return newMessages;
                });
                if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
                if (index === botText.length) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setLoading(false);
                }
            }, 20);

        } catch (err) {
            setMessages(prev => [...prev, { id: Date.now(), sender: "ai", text: "Xatolik yuz berdi." }]);
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

    function toggleChat() {
        const chat = document.querySelector('.chat-container');
        if (chat.classList.contains('expanded')) {
            chat.classList.remove('expanded');
            chat.classList.add('closing');
            setTimeout(() => chat.classList.remove('closing'), 400);
        } else {
            chat.classList.add('expanded');
        }
    }

    useEffect(() => {
        const isMac = navigator.platform.toUpperCase().includes("MAC");

        const handleShortcut = (e) => {

            if ((isMac && e.metaKey && e.key === "c") || (!isMac && e.ctrlKey && e.key === "c")) {
                e.preventDefault();
                toggleChatOpen();
            }
        };

        document.addEventListener("keydown", handleShortcut);
        return () => document.removeEventListener("keydown", handleShortcut);
    }, []);

    const toggleChatOpen = () => {
        setOpen(prev => !prev);
        setExpanded(false);
    };



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
                            <h1>STIM AI</h1>
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
                                    {m.sender === "ai" && !loading && (
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