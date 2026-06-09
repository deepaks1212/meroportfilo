import { useState } from "react";
import { C, Anim, SERVICES } from "../shared";

export default function Services({ dark }) {
  const bg = dark ? C.navyMid : "#F2F6FF";
  const cb = dark ? C.card : C.lCard;
  const br = dark ? C.cardBorder : C.lBorder;
  const tc = dark ? C.text : C.lText;
  const mc = dark ? C.muted : C.lMuted;
  const [hov, setHov] = useState(null);

  return (
    <section id="services" style={{ background:bg, padding:"100px clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Anim>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ color:C.accent, fontWeight:700, fontSize:12, letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>Services</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:tc, margin:"0 0 16px", letterSpacing:-1.5 }}>What I Can Build For You</h2>
            <p style={{ fontSize:16, color:mc, maxWidth:500, margin:"0 auto" }}>From idea to production — I handle the full stack so you can focus on your business.</p>
          </div>
        </Anim>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gridAutoRows:"1fr", gap:24, alignItems:"stretch" }}>
          {SERVICES.map((s,i) => (
            <Anim key={i} delay={i*0.08}>
              <div
                onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
                style={{
                  display:"flex", flexDirection:"column", justifyContent:"space-between",
                  height:"100%",
                  background:cb, border:`1px solid ${hov===i?`${s.color}44`:br}`,
                  borderRadius:20, padding:"32px 28px",
                  transform: hov===i ? "translateY(-8px)" : "none",
                  boxShadow: hov===i ? `0 16px 48px ${s.color}18` : "none",
                  transition:"all 0.35s cubic-bezier(.22,1,.36,1)",
                  position:"relative", overflow:"hidden",
                }}>
                <div style={{ position:"absolute", top:0, right:0, width:100, height:100, borderRadius:"50%", background:`${s.color}08`, transform:`translate(20%,-20%)`, transition:"transform 0.4s", ...(hov===i?{transform:"translate(0,0) scale(1.5)"}:{}) }}/>
                <div style={{ fontSize:40, marginBottom:20 }}>{s.icon}</div>
                <h3 style={{ fontSize:18, fontWeight:800, color:tc, margin:"0 0 10px", letterSpacing:-0.3 }}>{s.title}</h3>
                <p style={{ fontSize:13.5, color:mc, lineHeight:1.65, margin:"0 0 20px" }}>{s.desc}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.price}</span>
                  <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} style={{
                    background:`${s.color}15`, border:`1px solid ${s.color}33`,
                    color:s.color, padding:"7px 14px", borderRadius:8, cursor:"pointer",
                    fontSize:12, fontWeight:700, fontFamily:"inherit", transition:"all 0.2s",
                  }}
                    onMouseOver={e=>e.currentTarget.style.background=`${s.color}28`}
                    onMouseOut={e=>e.currentTarget.style.background=`${s.color}15`}>
                    Get Started →
                  </button>
                </div>
              </div>
            </Anim>
          ))}
        </div>

        <Anim delay={0.2} style={{ marginTop:72 }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <h3 style={{ fontSize:24, fontWeight:800, color:tc, letterSpacing:-0.5 }}>How We Work Together</h3>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:24 }}>
            {[ ["01","Discovery","We discuss your goals, audience, and requirements in detail.",C.accent], ["02","Planning","I create a technical plan, timeline, and project roadmap.",C.purple], ["03","Build","Iterative development with regular updates and demos.",C.pink], ["04","Launch","Deploy, test, and ship. Ongoing support available.",C.amber] ].map(([n,t,d,col])=>(
              <div key={n} style={{ background:cb, border:`1px solid ${br}`, borderRadius:16, padding:24, textAlign:"center" }}>
                <div style={{ fontSize:32, fontWeight:900, color:col, opacity:0.25, marginBottom:8, fontFamily:"monospace" }}>{n}</div>
                <div style={{ fontSize:16, fontWeight:700, color:tc, marginBottom:8 }}>{t}</div>
                <p style={{ fontSize:13, color:mc, margin:0, lineHeight:1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </Anim>
      </div>
    </section>
  );
}
