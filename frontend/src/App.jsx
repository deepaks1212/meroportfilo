import { useState, useEffect, useRef } from "react";
import { C, NAV_LINKS, SERVICES, FAQ, PROFILE_NAME, PROFILE_TITLE } from "./shared";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Contact from "./sections/Contact";

// ─── AI Chat ─────────────────────────────────────────────────────────
function AIChat({ dark }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role:"assistant", text:`Hi! 👋 I'm ${PROFILE_NAME}'s AI assistant. Ask me anything about his skills, projects, or availability!` }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const bg = dark ? C.card : C.lCard;
  const border = dark ? C.cardBorder : C.lBorder;
  const tc = dark ? C.text : C.lText;
  const mc = dark ? C.muted : C.lMuted;
  const ib = dark ? C.navyLight : "#EEF2FB";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim(); setInput(""); setLoading(true);
    setMsgs(m => [...m, { role:"user", text:userMsg }]);
    const match = FAQ.find(f => f.q.toLowerCase().split(" ").some(w => userMsg.toLowerCase().includes(w)));
    try {
      const history = msgs.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are a helpful AI assistant for ${PROFILE_NAME}'s software developer portfolio. ${PROFILE_NAME.split(" ")[0]} is a senior full-stack MERN developer with 6+ years experience specializing in React, Node.js, MongoDB, Express, TypeScript, AWS, and OpenAI APIs. Projects include ShopFlow (e-commerce+AI), TaskMind (project mgmt), DocuSense (AI docs). He's available for freelance. Be concise, friendly, professional. Focus on portfolio topics.`,
          messages:[...history, { role:"user", content:userMsg }],
        }),
      });
      const data = await res.json();
      setMsgs(m => [...m, { role:"assistant", text: data.content?.[0]?.text || (match?.a ?? `I'm not sure — try asking about ${PROFILE_NAME.split(" ")[0]}'s skills or projects!`) }]);
    } catch {
      setMsgs(m => [...m, { role:"assistant", text: match?.a ?? `Couldn't connect — try asking about ${PROFILE_NAME.split(" ")[0]}'s skills, projects, or availability!` }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(o => !o)} aria-label="AI Chat" style={{
        position:"fixed", bottom:28, right:28, zIndex:1000,
        width:60, height:60, borderRadius:"50%",
        background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,
        border:"none", cursor:"pointer", fontSize:26,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:`0 4px 24px ${C.accentGlow}, 0 0 0 0 ${C.accent}`,
        transition:"transform 0.25s, box-shadow 0.25s",
        animation: open ? "none" : "chatPulse 2.5s ease-in-out infinite",
      }}
        onMouseOver={e => e.currentTarget.style.transform="scale(1.12)"}
        onMouseOut={e => e.currentTarget.style.transform="scale(1)"}>
        {open ? "✕" : "🤖"}
      </button>

      <div style={{
        position:"fixed", bottom:102, right:28, zIndex:999,
        width:360, borderRadius:20,
        background: bg, border:`1px solid ${border}`,
        boxShadow:"0 20px 60px rgba(0,0,0,0.35)",
        display:"flex", flexDirection:"column", overflow:"hidden",
        maxHeight: open ? 500 : 0,
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        transition:"max-height 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s, transform 0.3s",
        pointerEvents: open ? "all" : "none",
      }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${border}`, background:`linear-gradient(135deg,${C.accent}18,${C.purple}0d)`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent},${C.accentDark})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🤖</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:tc }}>{PROFILE_NAME.split(" ")[0]}'s AI Assistant</div>
              <div style={{ fontSize:11, color:C.accent, display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:C.accent, display:"inline-block", animation:"pulse 1.5s ease-in-out infinite" }}/>
                Online now
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"14px", display:"flex", flexDirection:"column", gap:10, minHeight:0, maxHeight:300 }}>
          {msgs.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{
                maxWidth:"82%", padding:"9px 14px",
                borderRadius: m.role==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: m.role==="user" ? `linear-gradient(135deg,${C.accent},${C.accentDark})` : ib,
                color: m.role==="user" ? "#060D1F" : tc,
                fontSize:13, lineHeight:1.55, fontWeight: m.role==="user" ? 500 : 400,
              }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", gap:5, padding:"10px 14px", background:ib, borderRadius:"16px 16px 16px 4px", width:"fit-content" }}>
              {[0,1,2].map(i => <span key={i} style={{ width:7, height:7, borderRadius:"50%", background:mc, display:"block", animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        <div style={{ padding:"0 10px 8px", display:"flex", gap:6, flexWrap:"wrap", flexShrink:0 }}>
          {["Tech stack?","Available?","AI projects?","Hourly rate?"].map(q => (
            <button key={q} onClick={() => setInput(q)} style={{ fontSize:11, padding:"4px 11px", borderRadius:20, background:ib, border:`1px solid ${border}`, color:mc, cursor:"pointer", transition:"all 0.15s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.color=C.accent; }}
              onMouseOut={e => { e.currentTarget.style.borderColor=border; e.currentTarget.style.color=mc; }}>{q}</button>
          ))}
        </div>
        <div style={{ padding:"0 12px 14px", display:"flex", gap:8, flexShrink:0 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Ask me anything…"
            style={{ flex:1, padding:"10px 14px", borderRadius:12, background:ib, border:`1px solid ${border}`, color:tc, fontSize:13, outline:"none", transition:"border-color 0.2s" }}
            onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=border}/>
          <button onClick={send} disabled={loading} style={{
            padding:"10px 15px", borderRadius:12, background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,
            border:"none", color:"#060D1F", cursor:"pointer", fontSize:16, fontWeight:700,
            transition:"transform 0.15s",
          }}
            onMouseOver={e=>e.currentTarget.style.transform="scale(1.05)"}
            onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>↑</button>
        </div>
      </div>
    </>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────
function Nav({ dark, setDark, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    setMOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };
  const tc = dark ? C.text : C.lText;
  const navBg = dark
    ? (scrolled ? "rgba(6,13,31,0.92)" : "transparent")
    : (scrolled ? "rgba(242,246,255,0.92)" : "transparent");

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:900,
      height:68, padding:"0 clamp(16px,4vw,48px)",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background: navBg,
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? `1px solid ${dark?"rgba(0,255,209,0.08)":"rgba(0,0,0,0.05)"}` : "none",
      transition:"background 0.35s, border 0.35s",
    }}>
      <button onClick={()=>scrollTo("home")} style={{ fontWeight:900, fontSize:22, color:C.accent, background:"none", border:"none", cursor:"pointer", letterSpacing:-0.5, fontFamily:"inherit" }}>
        {`<${PROFILE_NAME.split(" ")[0]} />`}
      </button>

      {/* Desktop links */}
      <div style={{ display:"flex", gap:8, alignItems:"center" }} className="desk-nav">
        {NAV_LINKS.map(l => {
          const isActive = active === l.toLowerCase();
          return (
            <button key={l} onClick={()=>scrollTo(l.toLowerCase())} style={{
              background: isActive ? `${C.accent}15` : "none",
              border: isActive ? `1px solid ${C.accent}33` : "1px solid transparent",
              borderRadius:8, padding:"7px 16px", cursor:"pointer", fontFamily:"inherit",
              color: isActive ? C.accent : tc, fontSize:14, fontWeight: isActive ? 600 : 500,
              transition:"all 0.2s",
            }}
              onMouseOver={e => { if (!isActive) { e.currentTarget.style.color=C.accent; e.currentTarget.style.background=`${C.accent}0a`; }}}
              onMouseOut={e => { if (!isActive) { e.currentTarget.style.color=tc; e.currentTarget.style.background="none"; }}}>
              {l}
            </button>
          );
        })}
        <button onClick={()=>setDark(d=>!d)} style={{
          marginLeft:8, background: dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.06)",
          border:`1px solid ${dark?"rgba(255,255,255,0.12)":C.lBorder}`,
          borderRadius:10, padding:"7px 12px", cursor:"pointer", color:tc,
          fontSize:13, fontWeight:500, fontFamily:"inherit", transition:"all 0.2s",
        }}>{dark ? "☀" : "☾"}</button>
      </div>

      {/* Mobile */}
      <button onClick={()=>setMOpen(o=>!o)} className="ham" style={{ display:"none", background:"none", border:"none", color:tc, fontSize:26, cursor:"pointer" }}>
        {mOpen ? "✕" : "☰"}
      </button>
      {mOpen && (
        <div style={{
          position:"absolute", top:68, left:0, right:0, zIndex:800,
          background: dark ? C.navyMid : C.lBg,
          borderBottom:`1px solid ${dark?C.cardBorder:C.lBorder}`,
          padding:"16px 24px", display:"flex", flexDirection:"column", gap:4,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={()=>scrollTo(l.toLowerCase())} style={{
              textAlign:"left", background:"none", border:"none", padding:"12px 8px",
              color: active===l.toLowerCase() ? C.accent : tc,
              fontSize:16, fontWeight:600, cursor:"pointer", fontFamily:"inherit",
              borderBottom:`1px solid ${dark?"rgba(255,255,255,0.05)":C.lBorder}`,
            }}>{l}</button>
          ))}
          <button onClick={()=>{setDark(d=>!d);setMOpen(false);}} style={{ marginTop:12, background:`${C.accent}15`, border:`1px solid ${C.accent}33`, borderRadius:8, padding:"10px", color:C.accent, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>
            {dark ? "☀ Switch to Light" : "☾ Switch to Dark"}
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────
function Footer({ dark }) {
  const tc = dark ? C.text : "#E8EDF8";
  const mc = dark ? C.muted : "rgba(255,255,255,0.45)";
  return (
    <footer style={{ background:"#060D1F", padding:"56px clamp(16px,5vw,80px) 32px", borderTop:`1px solid rgba(0,255,209,0.08)` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:48, marginBottom:48 }} className="three-col">
          <div>
            <div style={{ fontWeight:900, fontSize:26, color:C.accent, marginBottom:14, letterSpacing:-0.5 }}>{`<${PROFILE_NAME.split(" ")[0]} />`}</div>
            <p style={{ fontSize:14, color:mc, lineHeight:1.8, maxWidth:280, margin:"0 0 20px" }}>
              Senior Full-Stack Engineer & AI enthusiast building the next generation of web applications.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              {["GitHub","LinkedIn","Twitter","Email"].map(s=>(
                <a key={s} href="#" style={{ width:36, height:36, borderRadius:8, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", color:mc, textDecoration:"none", fontSize:14, fontWeight:600, transition:"all 0.2s" }}
                  onMouseOver={e=>{e.currentTarget.style.background=`${C.accent}18`;e.currentTarget.style.color=C.accent;e.currentTarget.style.borderColor=`${C.accent}33`;}}
                  onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color=mc;e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:13, color:mc, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, marginBottom:16 }}>Navigation</div>
            {NAV_LINKS.map(l=>(
              <button key={l} onClick={()=>document.getElementById(l.toLowerCase())?.scrollIntoView({behavior:"smooth"})} style={{ display:"block", background:"none", border:"none", color:mc, fontSize:14, padding:"5px 0", cursor:"pointer", fontFamily:"inherit", transition:"color 0.2s", textAlign:"left" }}
                onMouseOver={e=>e.currentTarget.style.color=C.accent} onMouseOut={e=>e.currentTarget.style.color=mc}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize:13, color:mc, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, marginBottom:16 }}>Services</div>
            {SERVICES.map(s=>(
              <div key={s.title} style={{ fontSize:14, color:mc, padding:"5px 0" }}>{s.title}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:mc, margin:0 }}>© {new Date().getFullYear()} {PROFILE_NAME} · Built with React + Node.js + MongoDB + ❤️</p>
          <p style={{ fontSize:12, color:mc, margin:0 }}>Designed & developed by {PROFILE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(()=>setLoaded(true), 300); }, []);

  useEffect(() => {
    const fn = () => {
      const sections = ["home","about","projects","services","contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif", background: dark?C.navy:C.lBg, minHeight:"100vh",
      opacity: loaded?1:0, transition:"opacity 0.5s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${dark?C.navy:"#EEF2F8"};}
        ::-webkit-scrollbar-thumb{background:${C.accent}55;border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:${C.accent}99;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.9)}}
        @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
        @keyframes bounce2{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
        @keyframes bounceIn{0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        @keyframes chatPulse{0%,100%{box-shadow:0 4px 24px rgba(0,255,209,0.15),0 0 0 0 rgba(0,255,209,0.4)}70%{box-shadow:0 4px 24px rgba(0,255,209,0.15),0 0 0 12px rgba(0,255,209,0)}}
        @media(max-width:900px){
          .two-col{grid-template-columns:1fr !important;}
          .three-col{grid-template-columns:1fr 1fr !important;}
        }
        @media(max-width:640px){
          .desk-nav{display:none !important;}
          .ham{display:block !important;}
          .three-col{grid-template-columns:1fr !important;}
        }
      `}</style>

      <Nav dark={dark} setDark={setDark} active={active}/>
      <Home dark={dark}/>
      <About dark={dark}/>
      <Projects dark={dark}/>
      <Services dark={dark}/>
      <Contact dark={dark}/>
      <Footer dark={dark}/>
      <AIChat dark={dark}/>
    </div>
  );
}
