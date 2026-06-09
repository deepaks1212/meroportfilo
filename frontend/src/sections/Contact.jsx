import { useState } from "react";
import { C, Anim } from "../shared";

export default function Contact({ dark }) {
  const bg = dark ? C.navy : "#F7FAFF";
  const cb = dark ? C.card : C.lCard;
  const br = dark ? C.cardBorder : C.lBorder;
  const tc = dark ? C.text : C.lText;
  const mc = dark ? C.muted : C.lMuted;
  const ib = dark ? C.navyLight : "#EEF2FB";

  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [aiReply, setAiReply] = useState("");
  const [serverError, setServerError] = useState("");
  const API_URL = "http://localhost:5000/api/contact";

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setServerError(""); setStatus("loading");
    try {
      const res = await fetch(API_URL, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name:form.name.trim(), email:form.email.trim(), subject:form.subject.trim()||"Portfolio Contact", message:form.message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          const fe = {};
          data.errors.forEach(({ field, message }) => { fe[field] = message; });
          setErrors(fe); setStatus("idle"); return;
        }
        throw new Error(data.message || "Server error");
      }
      setAiReply(data.data?.aiReply || `Hi ${form.name}, thanks for reaching out! I'll get back to you soon. — Dipak`);
      setStatus("success");
    } catch (err) {
      setServerError(err.message === "Failed to fetch"
        ? "Backend not reachable. Make sure your Express server is running on port 5000."
        : err.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const iStyle = (f) => ({
    width:"100%", padding:"12px 16px", borderRadius:10, boxSizing:"border-box",
    background:ib, border:`1.5px solid ${errors[f]?"#FF4D8D":br}`,
    color:tc, fontSize:14, outline:"none", fontFamily:"inherit",
    transition:"border-color 0.2s",
  });

  const contactRowStyle = {
    display:"flex",
    gap:14,
    alignItems:"stretch",
    padding:"14px 0",
    borderBottom:`1px solid ${br}`,
    minHeight:64,
  };

  const contactTextStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    width:"100%",
    minWidth:0,
  };

  const contactLinkStyle = {
    fontSize:13,
    color:tc,
    fontWeight:500,
    marginTop:2,
    textDecoration:"underline",
    textDecorationColor:`${tc}60`,
    textDecorationThickness:1.5,
    textUnderlineOffset:3,
    cursor:"pointer",
    transition:"color 0.2s, text-decoration-color 0.2s",
    width:"100%",
    minWidth:0,
  };

  return (
    <section id="contact" style={{ background:bg, padding:"100px clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Anim>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ color:C.accent, fontWeight:700, fontSize:12, letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>Contact</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:tc, margin:"0 0 16px", letterSpacing:-1.5 }}>Let's Build Something</h2>
            <p style={{ fontSize:16, color:mc, maxWidth:460, margin:"0 auto" }}>Have a project in mind? Drop me a message and I'll get back within 24 hours.</p>
          </div>
        </Anim>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:40, alignItems:"start" }} className="two-col">
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <Anim dir="left">
              <div style={{ background:cb, border:`1px solid ${br}`, borderRadius:20, padding:28 }}>
                <h3 style={{ fontSize:18, fontWeight:800, color:tc, margin:"0 0 20px" }}>Contact Info</h3>
                {[ ["📧","Email","mandaldipak94345@gmail.com","mandaldipak94345@gmail.com"], ["💼","LinkedIn","https://www.linkedin.com/in/deepak-mandal-b183b0280/","deepak_mandal"], ["🐙","GitHub","https://github.com/deepaks1212","deepaks1212"], ["📍","Location","SF, CA · Remote OK","Tilathi-koiladi,Saptari,Nepal"] ].map(([icon,label,val,display])=>{
                  const isEmail = label === "Email";
                  const isLink = label === "LinkedIn" || label === "GitHub";
                  const href = isEmail ? `mailto:${val}` : val;
                  return (
                    <div key={label} style={{ ...contactRowStyle, alignItems:"center" }}>
                      <span style={{ fontSize:20, width:28, textAlign:"center" }}>{icon}</span>
                      <div style={contactTextStyle}>
                        <div style={{ fontSize:11, color:mc, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>{label}</div>
                        {isEmail || isLink ? (
                          <a href={href} target={isLink ? "_blank" : undefined} rel={isLink ? "noopener noreferrer" : undefined} style={contactLinkStyle} onMouseEnter={e=>{e.target.style.color=C.accent; e.target.style.textDecorationColor=C.accent}} onMouseLeave={e=>{e.target.style.color=tc; e.target.style.textDecorationColor=`${tc}60`}}>{display}</a>
                        ) : (
                          <div style={{ ...contactLinkStyle, textDecoration:"none", color:tc, marginTop:2 }}>{display}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Anim>
            <Anim dir="left" delay={0.1}>
              <div style={{ background:`linear-gradient(135deg,${C.accent}15,${C.purple}0a)`, border:`1px solid ${C.accent}25`, borderRadius:16, padding:24 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>⚡</div>
                <div style={{ fontSize:15, fontWeight:700, color:tc, marginBottom:6 }}>Fast Response</div>
                <p style={{ fontSize:13, color:mc, margin:0, lineHeight:1.6 }}>I respond to all enquiries within 24 hours. Urgent? Use the subject line "URGENT".</p>
              </div>
            </Anim>
          </div>

          <Anim dir="right" delay={0.1}>
            <div style={{ background:cb, border:`1px solid ${br}`, borderRadius:20, padding:36 }}>
              {status === "success" ? (
                <div style={{ textAlign:"center", padding:"24px 0" }}>
                  <div style={{ fontSize:56, marginBottom:16, animation:"bounceIn 0.5s ease" }}>🎉</div>
                  <h3 style={{ fontSize:22, fontWeight:800, color:tc, margin:"0 0 8px" }}>Message Sent!</h3>
                  <p style={{ color:mc, margin:"0 0 24px", fontSize:14 }}>You'll receive a confirmation email shortly.</p>
                  <div style={{ background: dark?C.navyLight:"#EEF8F5", border:`1px solid ${C.accent}25`, borderRadius:12, padding:20, textAlign:"left", marginBottom:20 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <span style={{ fontSize:16 }}>🤖</span>
                      <span style={{ fontSize:12, color:C.accent, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>AI Auto-Response</span>
                    </div>
                    <p style={{ fontSize:14, color:mc, lineHeight:1.7, margin:0, whiteSpace:"pre-wrap" }}>{aiReply}</p>
                  </div>
                  <button onClick={()=>{setForm({name:"",email:"",subject:"",message:""});setStatus("idle");setAiReply("");setServerError("");}} style={{ background:"none", border:`1.5px solid ${C.accent}`, color:C.accent, padding:"10px 24px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:13 }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  {serverError && (
                    <div style={{ background:"#FF4D8D18", border:"1px solid #FF4D8D44", borderRadius:10, padding:"12px 16px", fontSize:13, color:"#FF4D8D", lineHeight:1.5 }}>
                      ⚠ {serverError}
                    </div>
                  )}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <label style={{ display:"block", fontSize:12, color:mc, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>Full Name *</label>
                      <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                        placeholder="your name" style={iStyle("name")}
                        onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=errors.name?"#FF4D8D":br}/>
                      {errors.name && <div style={{ fontSize:11, color:"#FF4D8D", marginTop:4 }}>{errors.name}</div>}
                    </div>
                    <div>
                      <label style={{ display:"block", fontSize:12, color:mc, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>Email *</label>
                      <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
                        placeholder="Your gmail.com" style={iStyle("email")}
                        onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=errors.email?"#FF4D8D":br}/>
                      {errors.email && <div style={{ fontSize:11, color:"#FF4D8D", marginTop:4 }}>{errors.email}</div>}
                    </div>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, color:mc, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>Subject</label>
                    <input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}
                      placeholder="Project enquiry, freelance, etc." style={{...iStyle("subject"),borderColor:br}}
                      onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=br}/>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, color:mc, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>Message *</label>
                    <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                      placeholder="Tell me about your project, timeline, and budget…" rows={5}
                      style={{...iStyle("message"),resize:"vertical"}}
                      onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=errors.message?"#FF4D8D":br}/>
                    {errors.message && <div style={{ fontSize:11, color:"#FF4D8D", marginTop:4 }}>{errors.message}</div>}
                  </div>
                  <button onClick={submit} disabled={status==="loading"} style={{
                    background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,
                    color:"#060D1F", padding:"15px", borderRadius:12, border:"none",
                    fontWeight:800, fontSize:15, cursor:"pointer", fontFamily:"inherit",
                    transition:"transform 0.2s, box-shadow 0.2s",
                    boxShadow:`0 4px 20px ${C.accentGlow}`,
                    opacity: status==="loading" ? 0.8 : 1,
                  }}
                    onMouseOver={e=>{if(status!=="loading"){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 10px 32px ${C.accentGlow}`;}}}
                    onMouseOut={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 20px ${C.accentGlow}`;}}>
                    {status==="loading" ? "⏳ Sending…" : "Send Message ✉"}
                  </button>
                  <p style={{ fontSize:12, color:mc, margin:0, textAlign:"center" }}>
                    🤖 Powered by AI — you'll get an instant auto-response
                  </p>
                </div>
              )}
            </div>
          </Anim>
        </div>
      </div>
    </section>
  );
}
