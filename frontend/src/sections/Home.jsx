import { useState, useEffect } from "react";
import { C, Anim, PhotoAvatar, PROFILE_PHOTO, PROFILE_NAME } from "../shared";

export default function Home({ dark }) {
  const tc = dark ? C.text : C.lText;
  const mc = dark ? C.muted : C.lMuted;
  const sectionBg = dark ? `linear-gradient(180deg, ${C.navy}, ${C.navyMid})` : `linear-gradient(180deg, ${C.lBg}, ${C.peace})`;
  const [typed, setTyped] = useState("");
  const roles = ["MERN-Stack Developer"," QUALITY ASSURANCE ENGINEER","AI Integrator","Open Source Builder"];
  const [ri, setRi] = useState(0);

  useEffect(() => {
    let i = 0;
    let t;
    const s = roles[ri];
    const type = () => {
      if (i <= s.length) {
        setTyped(s.slice(0, i++));
        t = setTimeout(type, 75);
      } else {
        setTimeout(() => {
          let j = s.length;
          const d = () => {
            if (j >= 0) {
              setTyped(s.slice(0, j--));
              setTimeout(d, 35);
            } else {
              setRi(r => (r + 1) % roles.length);
              i = 0;
              type();
            }
          };
          d();
        }, 2000);
      }
    };
    type();
    return () => clearTimeout(t);
  }, [ri]);

  return (
    <section id="home" style={{ minHeight:"100vh", background: sectionBg, display:"flex", alignItems:"center", justifyContent:"center", padding:"100px clamp(16px,5vw,80px) 60px", position:"relative", overflow:"hidden" }}>
      {dark && <>
        <div style={{ position:"absolute", top:"15%", right:"8%", width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle,${C.accentGlow} 0%,transparent 70%)`, pointerEvents:"none", animation:"float1 8s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"10%", left:"3%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,92,252,0.1) 0%,transparent 70%)", pointerEvents:"none", animation:"float2 10s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", top:"50%", left:"40%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,77,141,0.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
      </>}
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${dark?"rgba(103,199,255,0.08)":"rgba(103,199,255,0.14)"} 1px,transparent 1px),linear-gradient(90deg,${dark?"rgba(103,199,255,0.08)":"rgba(103,199,255,0.14)"} 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }}/>

      <div style={{ width:"100%", display:"flex", justifyContent:"center" }}>
        <div style={{ background: sectionBg, borderRadius:20, padding:"48px clamp(16px,5vw,80px)", width:"100%" }}>
          <div style={{ maxWidth:1100, width:"100%", display:"flex", alignItems:"center", gap:64, flexWrap:"wrap", justifyContent:"center", position:"relative" }}>
        <div style={{ flex:1, minWidth:300, maxWidth:600 }}>
          <Anim delay={0.05}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${C.accent}12`, border:`1px solid ${C.accent}30`, borderRadius:24, padding:"6px 18px", marginBottom:24, fontSize:13, color:C.accent, fontWeight:600 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:C.accent, display:"inline-block", animation:"pulse 1.5s infinite" }}/>
              Available for new opportunities
            </div>
          </Anim>
          <Anim delay={0.12}>
            <h1 style={{ fontSize:"clamp(38px,6.5vw,76px)", fontWeight:900, color:tc, margin:"0 0 4px", lineHeight:1.05, letterSpacing:-2 }}>
              Hi, I'm
            </h1>
            <h1 style={{ fontSize:"clamp(32px,5vw,64px)", fontWeight:900, margin:"0 0 20px", lineHeight:1.05, letterSpacing:-2, background:`linear-gradient(135deg,${C.accent},${C.purple})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Er. Dipak Mandal
            </h1>
          </Anim>
          <Anim delay={0.2}>
            <div style={{ fontSize:"clamp(18px,3vw,30px)", fontWeight:700, color:mc, marginBottom:20, fontFamily:"monospace", minHeight:40 }}>
              <span style={{ color:C.accent, marginRight:8 }}>▶</span>{typed}<span style={{ animation:"blink 1s step-end infinite", color:C.accent }}>|</span>
            </div>
          </Anim>
          <Anim delay={0.28}>
            <p style={{ fontSize:"clamp(15px,1.8vw,18px)", color:mc, lineHeight:1.8, marginBottom:36, maxWidth:520 }}>
              I build scalable MERN applications and ship AI-powered products that users love. Turning complex problems into elegant, production-grade solutions .
            </p>
          </Anim>
          <Anim delay={0.35}>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:48 }}>
              <button onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})} style={{
                background: C.accent,
                color: "#060D1F", padding:"14px 32px", borderRadius:12, border:"none",
                fontWeight:800, fontSize:15, cursor:"pointer", fontFamily:"inherit",
                transition:"background 0.2s, color 0.2s",
              }}>
                View My Work →
              </button>
              <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} style={{
                background:"transparent", color:tc, padding:"14px 32px", borderRadius:12,
                border:`2px solid ${dark?"rgba(255,255,255,0.12)":C.lBorder}`,
                fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit",
                transition:"border-color 0.2s, color 0.2s, background 0.2s",
              }}>
                Let's Talk 💬
              </button>
            </div>
          </Anim>
          <Anim delay={0.42}>
            <div style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
              {[ ["1+","Years Exp."],["10+","Projects"],["2+","Clients"],["90%","Satisfaction"] ].map(([n,l])=>(
                <div key={l}>
                  <div style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:900, color:C.accent, letterSpacing:-1 }}>{n}</div>
                  <div style={{ fontSize:12, color:mc, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </Anim>
        </div>

        <Anim delay={0.10} dir="right" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
          <PhotoAvatar size={360} dark={dark} photoUrl={PROFILE_PHOTO} alt="er. dipak mandal"/>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", maxWidth:280 }}>
            {["React","Node.js","MongoDB","DSA"].map((t,i)=>(
              <span key={t} style={{
                fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:20,
                background: dark?"rgba(255,255,255,0.06)":C.lCard,
                border:`1px solid ${[C.accent,C.purple,C.pink,C.amber][i]}44`,
                color:[C.accent,C.purple,C.pink,C.amber][i],
                animation:`float${(i%2)+1} ${4+i}s ease-in-out infinite`,
              }}>{t}</span>
            ))}
          </div>
        </Anim>
          </div>
        </div>
      </div>

    </section>
  );
}
