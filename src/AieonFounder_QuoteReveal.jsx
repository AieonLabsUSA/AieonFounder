import { useState, useEffect } from "react";

function getLogo(){ return "data:image/webp;base64," +
    "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"; }
const QUOTE_LOGO = getLogo();


// ── Voice config ───────────────────────────────────────────────────────
const VOICES = {
  cfo:   { color:"#3b6ef8", label:"The CFO",             sub:"Capital · Burn · Survival" },
  cmo:   { color:"#0891b2", label:"The CMO",             sub:"Positioning · Customers · Brand" },
  legal: { color:"#7c3aed", label:"Legal Counsel",       sub:"Structure · Compliance · Protection" },
  vc:    { color:"#d97706", label:"The Skeptical VC",    sub:"Market · Traction · Scale" },
  devil: { color:"#dc2626", label:"Devil's Advocate",    sub:"Hard Truths · Assumptions · Reality" },
  arc:   { color:"#6366f1", label:"The Journey",             sub:"Journey · Identity · Legacy" },
  mbti:  { color:"#8b5cf6", label:"Your Founder Type",  sub:"Matched to your personality" },
};

// ── Demo quotes ────────────────────────────────────────────────────────
const DEMO_QUOTES = [
  { voice:"cfo",   text:"Runway is not just time. It's the number of mistakes you're allowed to make.", attribution:"The CFO" },
  { voice:"legal", text:"Do it right the first time. Doing it wrong the first time is not cheaper. It is deferred expensive.", attribution:"Legal Counsel" },
  { voice:"devil", text:"The assumptions you haven't questioned are the ones that will break you.", attribution:"Devil's Advocate" },
  { voice:"mbti",  text:"You solve problems others haven't noticed. Make sure the market has noticed them too.", attribution:"For the Architect" },
  { voice:"cmo",   text:"Clarity converts. Cleverness confuses.", attribution:"The CMO" },
  { voice:"arc",   text:"You are not building a business. You are becoming the founder that business requires.", attribution:"The Journey" },
  { voice:"vc",    text:"Traction is the only opinion that matters. Everything else is a hypothesis.", attribution:"The Skeptical VC" },
];

// ── Inline CSS ─────────────────────────────────────────────────────────
function GlobalStyle(){
  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=`
      @keyframes arcFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes arcSpark{0%{opacity:0;transform:translate(0,0) scale(1)}12%{opacity:1}65%{opacity:0.8}100%{opacity:0;transform:translate(20px,-40px) scale(0.08)}}
      @keyframes arcRing{0%,100%{transform:scale(1);opacity:0.15}50%{transform:scale(1.08);opacity:0.8}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes cardIn{from{opacity:0;transform:scale(0.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
      @keyframes slideIn{from{width:0}to{width:100%}}
      @keyframes glowPulse{0%,100%{opacity:0.6}50%{opacity:1}}
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:system-ui,-apple-system,sans-serif;}
    `;
    document.head.appendChild(el);
    return()=>document.head.removeChild(el);
  },[]);
  return null;
}

// ── The quote card ─────────────────────────────────────────────────────
function QuoteCard({ quote, onDismiss, onNext }){
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const voice = VOICES[quote.voice] || VOICES.arc;

  // Reveal sequence
  useEffect(()=>{
    setStep(0); setDismissed(false);
    const t1=setTimeout(()=>setStep(1),400);
    const t2=setTimeout(()=>setStep(2),1000);
    const t3=setTimeout(()=>setStep(3),1800);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[quote]);

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(onDismiss, 300);
  };

  const SPARKS = [
    {l:"6%",t:"12%",s:3,bg:voice.color,dur:"2.6s",del:"0s"},
    {l:"88%",t:"20%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},
    {l:"12%",t:"70%",s:2,bg:"#00d4c8",dur:"2.4s",del:"1.0s"},
    {l:"84%",t:"65%",s:3,bg:voice.color,dur:"3.3s",del:"1.5s"},
    {l:"48%",t:"6%",s:4,bg:"#00d4c8",dur:"2.9s",del:"0.8s"},
    {l:"94%",t:"50%",s:2,bg:"#3b6ef8",dur:"3.2s",del:"1.2s"},
    {l:"4%",t:"48%",s:3,bg:voice.color,dur:"2.7s",del:"0.3s"},
    {l:"56%",t:"88%",s:4,bg:"#5588ff",dur:"3.4s",del:"1.8s"},
    {l:"28%",t:"30%",s:2,bg:"#00d4c8",dur:"2.5s",del:"2.1s"},
    {l:"72%",t:"14%",s:3,bg:voice.color,dur:"2.8s",del:"0.7s"},
    {l:"35%",t:"78%",s:4,bg:"#3b6ef8",dur:"3.0s",del:"1.9s"},
    {l:"80%",t:"40%",s:2,bg:"#00f0e0",dur:"2.6s",del:"2.5s"},
  ];

  return(
    <div style={{
      position:"fixed",inset:0,
      background:"rgba(6,13,31,0.92)",
      zIndex:3000,
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:20,
      fontFamily:"system-ui,sans-serif",
      opacity:dismissed?0:1,
      transition:"opacity 0.3s ease",
    }} onClick={handleDismiss}>

      {/* Rings */}
      {[240,320,400].map((r,i)=>(
        <div key={i} style={{position:"absolute",width:r,height:r,borderRadius:"50%",border:"1px solid "+voice.color+(i===0?"44":"22"),animation:"arcRing "+(3.5+i*0.8)+"s ease-in-out "+(i*1.3)+"s infinite",pointerEvents:"none"}}/>
      ))}

      {/* Sparks */}
      {SPARKS.map((sp,i)=>(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
      ))}

      {/* Card */}
      <div style={{
        maxWidth:460,width:"100%",
        background:"linear-gradient(160deg,#060d1f,#0d1f4e)",
        borderRadius:24,
        border:"1px solid "+voice.color+"44",
        padding:"36px 32px 28px",
        position:"relative",
        overflow:"hidden",
        animation:"cardIn 0.5s ease",
        boxShadow:"0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px "+voice.color+"22",
        zIndex:1,
      }} onClick={e=>e.stopPropagation()}>

        {/* Glow blob */}
        <div style={{position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,"+voice.color+"30 0%,transparent 70%)",filter:"blur(20px)",pointerEvents:"none"}}/>

        {/* Close */}
        <button onClick={handleDismiss} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.4)",borderRadius:8,width:30,height:30,cursor:"pointer",fontFamily:"inherit",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>

        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:20,animation:"arcFloat 4.5s ease-in-out infinite",position:"relative",zIndex:1}}>
          <div style={{position:"relative",display:"inline-block"}}>
            <div style={{position:"absolute",inset:-20,borderRadius:"50%",background:"radial-gradient(circle,"+voice.color+"40 0%,transparent 70%)",filter:"blur(12px)",animation:"glowPulse 2.5s ease-in-out infinite"}}/>
            {/* Logo SVG — replace src with AIEON_LOGO_B64 in production */}
            <div style={{width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,"+voice.color+"33,"+voice.color+"11)",border:"1.5px solid "+voice.color+"44",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1,filter:"drop-shadow(0 0 12px "+voice.color+") drop-shadow(0 0 24px "+voice.color+"88)"}}>
              <img src={QUOTE_LOGO} alt="AieonFounder" style={{width:44,height:44,objectFit:"contain"}}/>
            </div>
          </div>
        </div>

        {/* Voice label */}
        <div style={{textAlign:"center",marginBottom:20,opacity:step>=1?1:0,transition:"opacity 0.6s ease",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <div style={{fontSize:10,color:voice.color,letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",fontWeight:700}}>{voice.label}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{voice.sub}</div>
          </div>
        </div>

        {/* Divider */}
        {step>=1&&(
          <div style={{height:1,background:"linear-gradient(90deg,transparent,"+voice.color+"44,transparent)",marginBottom:24,animation:"fadeUp 0.4s ease"}}/>
        )}

        {/* Quote text */}
        <div style={{position:"relative",zIndex:1,opacity:step>=2?1:0,transition:"opacity 0.8s ease",animation:step>=2?"fadeUp 0.6s ease":"none",marginBottom:20}}>
          {/* Opening quote mark */}
          <div style={{fontSize:48,color:voice.color+"33",lineHeight:1,fontFamily:"Georgia,serif",marginBottom:-8,marginLeft:-4}}>"</div>
          <p style={{fontSize:"clamp(16px,3.5vw,20px)",fontWeight:600,color:"#fff",lineHeight:1.65,letterSpacing:"-0.2px",textAlign:"center",padding:"0 4px"}}>
            {quote.text}
          </p>
          <div style={{fontSize:48,color:voice.color+"33",lineHeight:1,fontFamily:"Georgia,serif",textAlign:"right",marginTop:-12,marginRight:-4}}>"</div>
        </div>

        {/* Attribution + progress bar */}
        {step>=3&&(
          <div style={{animation:"fadeUp 0.5s ease",position:"relative",zIndex:1}}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",fontStyle:"italic"}}>— {quote.attribution}</div>
            </div>
            {/* Animated underline */}
            <div style={{height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,overflow:"hidden",marginBottom:20}}>
              <div style={{height:"100%",background:"linear-gradient(90deg,"+voice.color+",#00d4c8)",borderRadius:1,animation:"slideIn 1.2s ease forwards"}}/>
            </div>
            {/* Actions */}
            <div style={{display:"flex",gap:8}}>
              <button onClick={onNext} style={{flex:1,padding:"11px",borderRadius:11,background:"linear-gradient(135deg,"+voice.color+",#00d4c8)",color:"#fff",border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 20px "+voice.color+"55"}}>
                Next Quote →
              </button>
              <button onClick={handleDismiss} style={{padding:"11px 16px",borderRadius:11,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
                Done
              </button>
            </div>
          </div>
        )}

        {/* Tap to skip */}
        {step<3&&(
          <div style={{textAlign:"center",marginTop:8,fontSize:11,color:"rgba(255,255,255,0.2)"}}>Loading your daily wisdom...</div>
        )}

        {/* AieonFounder footer */}
        <div style={{marginTop:16,textAlign:"center"}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.15)",letterSpacing:2}}>AIEONFOUNDER · IGNITE</div>
        </div>
      </div>
    </div>
  );
}

// ── Preview wrapper ────────────────────────────────────────────────────
export default function QuoteRevealPreview(){
  const[idx,setIdx]=useState(0);
  const[show,setShow]=useState(true);
  const[launched,setLaunched]=useState(false);

  const next=()=>{
    setShow(false);
    setTimeout(()=>{
      setIdx(i=>(i+1)%DEMO_QUOTES.length);
      setShow(true);
    },350);
  };

  if(!launched)return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <GlobalStyle/>
      {[{l:"8%",t:"15%",s:3,bg:"#00d4c8",dur:"2.6s",del:"0s"},{l:"88%",t:"25%",s:4,bg:"#3b6ef8",dur:"3.1s",del:"0.5s"},{l:"15%",t:"72%",s:2,bg:"#5588ff",dur:"2.4s",del:"1.0s"},{l:"80%",t:"68%",s:3,bg:"#00f0e0",dur:"3.3s",del:"1.5s"}].map((sp,i)=>(
        <div key={i} style={{position:"absolute",left:sp.l,top:sp.t,width:sp.s,height:sp.s,background:sp.bg,borderRadius:"50%",animation:"arcSpark "+sp.dur+" linear "+sp.del+" infinite",opacity:0,pointerEvents:"none"}}/>
      ))}
      <div style={{textAlign:"center",zIndex:2}}>
        <div style={{fontSize:10,color:"#3b6ef8",letterSpacing:4,textTransform:"uppercase",fontFamily:"monospace",marginBottom:16}}>AieonFounder · Ignite</div>
        <div style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:900,color:"#fff",marginBottom:8,lineHeight:1.1}}>Daily Founder Quote</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.45)",marginBottom:32,lineHeight:1.7,maxWidth:380}}>
          Every day, one quote from your board. Matched to your voice for the day.<br/>7 voices. 276 quotes. All branded AieonFounder.
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32,maxWidth:320,margin:"0 auto 32px"}}>
          {Object.entries(VOICES).map(([k,v])=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 14px"}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:v.color,flexShrink:0,boxShadow:"0 0 8px "+v.color}}/>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.8)"}}>{v.label}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{v.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={()=>setLaunched(true)} style={{padding:"14px 40px",borderRadius:14,background:"linear-gradient(135deg,#1a56db,#00d4c8)",color:"#fff",border:"none",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 8px 32px rgba(26,86,219,0.5)"}}>
          Preview Quote Reveal →
        </button>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1f,#0d1f4e)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui,sans-serif"}}>
      <GlobalStyle/>
      {show&&<QuoteCard
        quote={DEMO_QUOTES[idx]}
        onDismiss={()=>setLaunched(false)}
        onNext={next}
      />}
      <div style={{textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:12}}>
        Previewing {idx+1}/{DEMO_QUOTES.length} · All 7 voices
      </div>
    </div>
  );
}
