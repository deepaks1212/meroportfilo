import { useState } from "react";
import { C, Anim, PROJECTS } from "../shared";

export default function Projects({ dark }) {
  const bg = dark ? C.navy : C.lBg;
  const cb = dark ? C.card : C.lCard;
  const br = dark ? C.cardBorder : C.lBorder;
  const tc = dark ? C.text : C.lText;
  const mc = dark ? C.muted : C.lMuted;
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);
  const tags = ["All","MERN","AI","MERN + AI"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  return (
    <section id="projects" style={{ background:bg, padding:"100px clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Anim>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ color:C.accent, fontWeight:700, fontSize:12, letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>Portfolio</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:tc, margin:"0 0 28px", letterSpacing:-1.5 }}>Projects</h2>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
              {tags.map(t=>(
                <button key={t} onClick={()=>setFilter(t)} style={{
                  padding:"9px 22px", borderRadius:24,
                  border:`1.5px solid ${filter===t?C.accent:br}`,
                  background: filter===t ? `${C.accent}15` : "transparent",
                  color: filter===t ? C.accent : mc,
                  cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit",
                  transition:"all 0.2s",
                  boxShadow: filter===t ? `0 0 16px ${C.accentGlow}` : "none",
                }}>{t}</button>
              ))}
            </div>
          </div>
        </Anim>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20, alignItems:"stretch" }}>
          {filtered.map((p,i) => (
            <Anim key={p.id} delay={i*0.07}>
              <div
                onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
                style={{
                  display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"stretch",
                  minHeight:440, height:"100%",
                  background:cb, border:`1px solid ${hovered===p.id?`${p.color}44`:br}`,
                  borderRadius:20, overflow:"hidden", cursor:"pointer",
                  transform: hovered===p.id ? "translateY(-10px)" : "none",
                  boxShadow: hovered===p.id ? `0 20px 60px ${p.color}20` : "none",
                  transition:"transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s, border-color 0.35s",
                }}>
                <div style={{ height:96, background:`linear-gradient(135deg,${p.color}22,${p.color}08)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:16, right:16, display:"flex", gap:6 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:p.color, background:`${p.color}18`, padding:"3px 10px", borderRadius:12 }}>{p.tag}</span>
                  </div>
                  <span style={{ fontSize:52, filter: hovered===p.id?"drop-shadow(0 0 16px "+p.color+")":"none", transition:"filter 0.3s" }}>{p.icon}</span>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${p.color},${p.color}55)` }}/>
                </div>

                <div style={{ padding:18 }}>
                  <h3 style={{ fontSize:18, fontWeight:800, color:tc, margin:"0 0 10px", letterSpacing:-0.5 }}>{p.title}</h3>
                  <p style={{ fontSize:13, color:mc, lineHeight:1.6, margin:"0 0 16px" }}>{p.desc}</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                    {p.stack.map(s=>(
                      <span key={s} style={{ fontSize:10, fontWeight:700, color:mc, background: dark?"rgba(255,255,255,0.05)":"#EEF1F8", padding:"3px 8px", borderRadius:6 }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
                    <a href="#" style={{ fontSize:12, color:mc, textDecoration:"none", fontWeight:600, display:"flex", alignItems:"center", gap:6, transition:"color 0.2s" }}
                      onMouseOver={e=>e.currentTarget.style.color=tc} onMouseOut={e=>e.currentTarget.style.color=mc}>
                      <span style={{ fontSize:14 }}>⌥</span> GitHub
                    </a>
                    <a href="#" style={{ fontSize:12, color:p.color, textDecoration:"none", fontWeight:700, display:"flex", alignItems:"center", gap:5, padding:"6px 14px", borderRadius:8, background:`${p.color}12`, border:`1px solid ${p.color}33`, transition:"all 0.2s" }}
                      onMouseOver={e=>{e.currentTarget.style.background=`${p.color}22`;e.currentTarget.style.transform="translateX(3px)";}}
                      onMouseOut={e=>{e.currentTarget.style.background=`${p.color}12`;e.currentTarget.style.transform="none";}}>
                      Live Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </section>
  );
}
