import { useState, useEffect, useRef } from "react";

export const C = {
  accent: "#A97BFF", accentDark: "#7D4CE1", accentGlow: "rgba(169,123,255,0.22)",
  peace: "#F7EEFF", peaceSoft: "rgba(247,238,255,0.64)",
  navy: "#0B1030", navyMid: "#1A2A58", navyLight: "#293D7C",
  card: "#0F1E38", cardBorder: "rgba(169,123,255,0.16)",
  text: "#E8F3FF", muted: "#A3B0DA",
  lBg: "#FBF5FF", lCard: "#FFFFFF", lBorder: "#E7E0FF",
  lText: "#132246", lMuted: "#7A88A6",
  purple: "#A97BFF", pink: "#FF7EB6", amber: "#FFC563",
};

export const NAV_LINKS = ["Home","About","Projects","Services","Contact"];

export const PROFILE_NAME = "Dicoder";
export const PROFILE_TITLE = " Engineer";
export const PROFILE_PHOTO = "/d.jpeg";
export const RESUME_LINK = "/resume_deep.pdf";
export const RESUME_FILE_NAME = "Dipak-Mandal-Resume.pdf";

export const PROJECTS = [
  { id:1, title:"ShopFlow", tag:"MERN + AI", color:"#00FFD1",
    desc:"Full-stack e-commerce with AI-powered product recommendations, real-time inventory, Stripe payments & admin dashboard.",
    stack:["React","Node.js","MongoDB","Express","OpenAI"], featured:true, icon:"🛒" },
  { id:2, title:"TaskMind", tag:"MERN", color:"#7C5CFC",
    desc:"Collaborative project management with drag-and-drop boards, real-time WebSocket updates and team analytics.",
    stack:["React","Node.js","MongoDB","Socket.io"], featured:true, icon:"📋" },
  { id:3, title:"DocuSense", tag:"AI", color:"#FF4D8D",
    desc:"AI document analysis platform — upload PDFs and get instant summaries, key insights and Q&A powered by GPT-4.",
    stack:["React","FastAPI","OpenAI","Pinecone"], featured:true, icon:"📄" },
  { id:4, title:"DevConnect", tag:"MERN", color:"#FFB830",
    desc:"Developer networking platform with profile matching, code snippet sharing and integrated GitHub activity feed.",
    stack:["React","Express","MongoDB","GitHub API"], featured:false, icon:"👥" },
  { id:5, title:"HealthTrackr", tag:"MERN + AI", color:"#26C6DA",
    desc:"Personal health dashboard with AI-driven insights from wearable data, nutrition logging and trend visualizations.",
    stack:["React","Node.js","MongoDB","TF.js"], featured:false, icon:"❤️" },
  { id:6, title:"CodeCoach", tag:"AI", color:"#AB47BC",
    desc:"AI coding tutor that reviews your code, suggests improvements, explains errors and tracks learning progress.",
    stack:["Next.js","OpenAI","Supabase","Monaco"], featured:false, icon:"🎓" },
];

export const SKILLS = [
  { name:"React.js", level:95, cat:"Frontend", color:"#61DAFB" },
  { name:"Node.js", level:90, cat:"Backend", color:"#68A063" },
  { name:"MongoDB", level:85, cat:"Database", color:"#4DB33D" },
  { name:"Git Hub", level:88, cat:"Backend", color:"#00FFD1" },
  { name:" Quality Assurance", level:82, cat:"Language", color:"#3178C6" },
  { name:"Python", level:78, cat:"Language", color:"#FFE066" },
  { name:"C++", level:72, cat:"DevOps", color:"#FF9900" },

];

export const EXPERIENCE = [
  { role:"Mern Stack Engineer", company:"Acme Corp", period:"2022 – Present", color:"#00FFD1",
    desc:"Led development of microservices architecture serving 2M+ users. Reduced API latency by 60% and mentored a team of 5 engineers." },
  { role:"", company:"StartupXYZ", period:"2020 – 2022", color:"#7C5CFC",
    desc:"Built and launched 3 SaaS products from scratch using MERN stack. Integrated AI features that boosted user engagement by 40%." },
  { role:"", company:"DevAgency", period:"2018 – 2020", color:"#FF4D8D",
    desc:"Developed client websites and web apps. Built strong foundations in RESTful APIs, databases and responsive design." },
];

export const SERVICES = [
  { icon:"💻", title:"Full-Stack Development", color:"#00FFD1",
    desc:"End-to-end web applications using MERN stack with scalable architecture and clean, maintainable code.", price:"From $3,000" },
  { icon:"🤖", title:"AI Integration", color:"#7C5CFC",
    desc:"Embed intelligent features — chatbots, recommendation engines, smart search — powered by OpenAI and custom models.", price:"From $2,000" },
  { icon:"☁️", title:"Cloud & DevOps", color:"#FFB830",
    desc:"Deploy and scale on AWS or GCP with Docker, CI/CD pipelines, load balancing and auto-scaling.", price:"From $1,500" },
  { icon:"📱", title:"UI/UX Design & Build", color:"#FF4D8D",
    desc:"Pixel-perfect, accessible interfaces that delight users across all devices, built with React and modern CSS.", price:"From $1,200" },
];

export const FAQ = [
  { q:"What tech stack do you use?", a:"I specialize in the MERN stack — MongoDB, Express.js, React.js, Node.js — plus TypeScript, GraphQL, AWS and OpenAI APIs for AI-powered features." },
  { q:"Are you available for freelance?", a:"Yes! I'm open to freelance projects and consulting. Use the contact form or reach out directly." },
  { q:"How long does a project take?", a:"A basic MERN app takes 2–4 weeks; a full-featured SaaS with AI can take 2–4 months depending on scope." },
  { q:"Do you work with existing codebases?", a:"Absolutely — I'm comfortable with legacy code, refactoring, adding features and improving performance." },
  { q:"What's your rate?", a:"Rates depend on project complexity. Message me with details and I'll send a custom quote within 24 hours." },
  { q:"Tell me about your AI projects.", a:"I've integrated GPT-4, Claude and embedding-based search into production apps. Familiar with RAG pipelines, vector databases and fine-tuning." },
];

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Anim({ children, delay=0, dir="up", style={}, className="" }) {
  const [ref, vis] = useInView();
  const t = { up:"translateY(48px)", down:"translateY(-48px)", left:"translateX(-48px)", right:"translateX(48px)", scale:"scale(0.88)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : t[dir],
      transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

export function PhotoAvatar({ size=200, dark, photoUrl=PROFILE_PHOTO, alt="Profile photo" }) {
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <div style={{
        position:"absolute", inset:-6, borderRadius:"50%",
        background:`conic-gradient(${C.accent}, ${C.purple}, ${C.pink}, ${C.accent})`,
        animation:"spinRing 4s linear infinite",
      }} />
      <div style={{
        position:"absolute", inset:-3, borderRadius:"50%",
        background: dark ? C.navy : C.lBg,
      }} />
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden",
        background: dark
          ? "linear-gradient(145deg,#152040,#0D1730)"
          : "linear-gradient(145deg,#e8eeff,#d0d8f0)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {photoUrl ? (
          <img src={photoUrl} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        ) : (
          <svg viewBox="0 0 200 200" width={size} height={size} style={{ borderRadius:"50%" }}>
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={dark?"#152040":"#c8d4f8"}/>
                <stop offset="100%" stopColor={dark?"#0D1730":"#e8eeff"}/>
              </linearGradient>
              <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBF8C"/>
                <stop offset="100%" stopColor="#F59E5A"/>
              </linearGradient>
              <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00FFD1"/>
                <stop offset="100%" stopColor="#00A896"/>
              </linearGradient>
              <clipPath id="circle"><circle cx="100" cy="100" r="100"/></clipPath>
            </defs>
            <rect width="200" height="200" fill="url(#bg)"/>
            <ellipse cx="100" cy="190" rx="70" ry="50" fill="url(#shirt)" clipPath="url(#circle)"/>
            <ellipse cx="100" cy="165" rx="42" ry="30" fill="url(#shirt)" clipPath="url(#circle)"/>
            <rect x="88" y="118" width="24" height="22" rx="8" fill="url(#skin)"/>
            <ellipse cx="100" cy="96" rx="38" ry="40" fill="url(#skin)"/>
            <ellipse cx="100" cy="65" rx="38" ry="22" fill="#1A0A00"/>
            <ellipse cx="62" cy="86" rx="9" ry="18" fill="#1A0A00"/>
            <ellipse cx="138" cy="86" rx="9" ry="18" fill="#1A0A00"/>
            <ellipse cx="100" cy="60" rx="34" ry="14" fill="#2D1200"/>
            <ellipse cx="62" cy="96" rx="7" ry="10" fill="url(#skin)"/>
            <ellipse cx="138" cy="96" rx="7" ry="10" fill="url(#skin)"/>
            <ellipse cx="86" cy="95" rx="7" ry="8" fill="white"/>
            <ellipse cx="114" cy="95" rx="7" ry="8" fill="white"/>
            <circle cx="88" cy="96" r="4.5" fill="#1A2560"/>
            <circle cx="116" cy="96" r="4.5" fill="#1A2560"/>
            <circle cx="89.5" cy="94.5" r="1.5" fill="white"/>
            <circle cx="117.5" cy="94.5" r="1.5" fill="white"/>
            <path d="M79 86 Q86 83 93 86" stroke="#2D1200" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M107 86 Q114 83 121 86" stroke="#2D1200" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M100 100 Q97 108 93 110 Q100 113 107 110 Q103 108 100 100" fill="#E8915A"/>
            <path d="M88 118 Q100 126 112 118" stroke="#C0714A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <rect x="60" y="148" width="80" height="4" rx="2" fill={C.accent} opacity="0.6" clipPath="url(#circle)"/>
          </svg>
        )}
      </div>
      
    </div>
  );
}
