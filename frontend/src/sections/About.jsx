import { useState } from "react";
import { C, Anim, PhotoAvatar, PROFILE_NAME, PROFILE_TITLE, PROFILE_PHOTO, RESUME_LINK, RESUME_FILE_NAME, SKILLS, EXPERIENCE } from "../shared";

export default function About({ dark }) {
  const bg = dark ? C.navyMid : "#F7FAFF";
  const cb = dark ? C.card : C.lCard;
  const br = dark ? C.cardBorder : C.lBorder;
  const tc = dark ? C.text : C.lText;
  const mc = dark ? C.muted : C.lMuted;
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section id="about" style={{ background:bg, padding:"100px clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Anim>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ color:C.accent, fontWeight:700, fontSize:12, letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>About Me</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:tc, margin:0, letterSpacing:-1.5 }}>The Person Behind The Code</h2>
          </div>
        </Anim>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:48, alignItems:"start" }} className="two-col">
          <Anim dir="left">
            <div style={{ background:cb, border:`1px solid ${br}`, borderRadius:20, padding:32, display:"flex", flexDirection:"column", gap:24 }}>
              <div style={{ display:"flex", gap:20, alignItems:"center" }}>
                <PhotoAvatar size={90} dark={dark} photoUrl={PROFILE_PHOTO} alt={PROFILE_NAME}/>
                <div>
                  <h3 style={{ fontSize:22, fontWeight:800, color:tc, margin:"0 0 4px" }}>{PROFILE_NAME}</h3>
                  <div style={{ fontSize:14, color:C.accent, fontWeight:600, marginBottom:6 }}>{PROFILE_TITLE}</div>
                  <div style={{ display:"flex", gap:6 }}>
                    {["MERN","AI","TypeScript"].map(t=>(
                      <span key={t} style={{ fontSize:11, padding:"2px 9px", borderRadius:10, background:`${C.accent}15`, color:C.accent, fontWeight:600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p style={{ fontSize:15, color:mc, lineHeight:1.8, margin:0 }}>
                I'm a senior full-stack engineer who loves turning complex problems into elegant solutions. My sweet spot is the intersection of great UX and smart backend architecture.
              </p>
              <p style={{ fontSize:15, color:mc, lineHeight:1.8, margin:0 }}>
                Lately I've been deeply into AI integrations — building RAG pipelines, embedding-based search, and AI agents that genuinely help users get things done faster.
              </p>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[ ["📍","Location","Tilathi-koiladi,Nepal"], ["🌐","Remote","Available Worldwide"], ["⚡","Response","Within 24 hours"], ["💼","Status","Open to Work"] ].map(([icon,label,val])=>(
                  <div key={label} style={{ background: dark?"rgba(255,255,255,0.03)":C.lBg, borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
                    <div style={{ fontSize:11, color:mc, marginBottom:2, fontWeight:500 }}>{label}</div>
                    <div style={{ fontSize:13, color:tc, fontWeight:600 }}>{val}</div>
                  </div>
                ))}
              </div>

              <a
                href={RESUME_LINK}
                download={RESUME_FILE_NAME}
                aria-label="Download resume PDF"
                style={{
                  display:"inline-flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,
                  color:"#060D1F",
                  padding:"12px 24px",
                  borderRadius:10,
                  border:"none",
                  fontWeight:800,
                  fontSize:14,
                  cursor:"pointer",
                  fontFamily:"inherit",
                  textDecoration:"none",
                  transition:"transform 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                📄 Download Resume PDF
              </a>
            </div>
          </Anim>

          <Anim dir="right" delay={0.1}>
            <div style={{ background:cb, border:`1px solid ${br}`, borderRadius:20, overflow:"hidden" }}>
              <div style={{ display:"flex", borderBottom:`1px solid ${br}` }}>
                {["skills","experience"].map(t=>(
                  <button key={t} onClick={()=>setActiveTab(t)} style={{
                    flex:1, padding:"16px", border:"none", background: activeTab===t ? `${C.accent}12` : "transparent",
                    borderBottom: activeTab===t ? `2px solid ${C.accent}` : "2px solid transparent",
                    color: activeTab===t ? C.accent : mc,
                    fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                    textTransform:"capitalize", transition:"all 0.2s",
                  }}>{t === "skills" ? "🛠 Skills" : "💼 Experience"}</button>
                ))}
              </div>

              <div style={{ padding:28 }}>
                {activeTab === "skills" ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    {SKILLS.map((s,i) => (
                      <Anim key={i} delay={i*0.04}>
                        <div>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                            <span style={{ fontSize:13, fontWeight:600, color:tc, display:"flex", alignItems:"center", gap:6 }}>
                              <span style={{ width:8, height:8, borderRadius:"50%", background:s.color, display:"inline-block" }}/>
                              {s.name}
                            </span>
                            <span style={{ fontSize:11, color:s.color, fontWeight:700 }}>{s.level}%</span>
                          </div>
                          <div style={{ height:6, borderRadius:3, background: dark?"rgba(255,255,255,0.06)":"#E2E8F4", overflow:"hidden" }}>
                            <div style={{ height:"100%", width:`${s.level}%`, borderRadius:3, background:`linear-gradient(90deg,${s.color},${s.color}cc)`, transition:"width 1.4s cubic-bezier(.22,1,.36,1)" }}/>
                          </div>
                          <div style={{ fontSize:10, color:mc, marginTop:3, fontWeight:500 }}>{s.cat}</div>
                        </div>
                      </Anim>
                    ))}
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                    {EXPERIENCE.map((e,i) => (
                      <Anim key={i} delay={i*0.1}>
                        <div style={{ display:"flex", gap:16 }}>
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
                            <div style={{ width:14, height:14, borderRadius:"50%", background:e.color, border:`3px solid ${dark?C.navyMid:C.lBg}`, flexShrink:0, boxShadow:`0 0 10px ${e.color}66` }}/>
                            {i<EXPERIENCE.length-1 && <div style={{ width:2, flex:1, background:`linear-gradient(to bottom,${e.color}66,transparent)`, marginTop:4 }}/>} 
                          </div>
                          <div style={{ paddingBottom:i<EXPERIENCE.length-1?20:0 }}>
                            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:4, marginBottom:2 }}>
                              <span style={{ fontWeight:700, color:tc, fontSize:15 }}>{e.role}</span>
                              <span style={{ fontSize:11, color:e.color, fontWeight:600, background:`${e.color}15`, padding:"2px 9px", borderRadius:10 }}>{e.period}</span>
                            </div>
                            <div style={{ fontSize:13, color:e.color, marginBottom:6, fontWeight:600 }}>{e.company}</div>
                            <p style={{ fontSize:13, color:mc, margin:0, lineHeight:1.65 }}>{e.desc}</p>
                          </div>
                        </div>
                      </Anim>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Anim>
        </div>
      </div>
    </section>
  );
}
