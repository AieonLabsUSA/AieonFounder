import { useState, useEffect } from "react";

var C = {
  navy:"#0d1f4e", navyDark:"#080f2b", blue:"#1a56db",
  teal:"#00d4c8", text:"#0f172a", muted:"#64748b",
  border:"#e2e8f0", offWhite:"#f8faff", white:"#fff",
  success:"#059669",
};

// -- 42 prompts: 14 per category, 2 weeks no repeat
var PROMPTS = [
  // FEELING (f1-f14)
  {id:"f1",cat:"feeling",color:"#8b5cf6",type:"scale",
   text:"On a scale of 1-10, how confident are you in your idea right now? What would move it up one point?",
   placeholder:"What would move it up one point..."},
  {id:"f2",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What's the thing you've been avoiding this week? Name it honestly.",
   placeholder:"Be honest. Nobody's watching..."},
  {id:"f3",cat:"feeling",color:"#8b5cf6",type:"choice",
   choices:["Excited","Anxious","Determined","Stuck","Energized","Overwhelmed","Focused","Unclear"],
   text:"What emotion is showing up most as you build right now?",
   placeholder:""},
  {id:"f4",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What's the hardest part of your week so far? One sentence only.",
   placeholder:"One honest sentence..."},
  {id:"f5",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"If your business were a patient, what would today's diagnosis be?",
   placeholder:"e.g. 'Early stage, showing vital signs'..."},
  {id:"f6",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What would you tell yourself six months ago about this journey?",
   placeholder:"What do you wish you knew..."},
  {id:"f7",cat:"feeling",color:"#8b5cf6",type:"scale",
   text:"How close does your current week feel to the founder life you imagined?",
   placeholder:"What's the gap, or what's better than expected..."},
  {id:"f8",cat:"feeling",color:"#8b5cf6",type:"choice",
   choices:["Gaining momentum","Treading water","Falling behind","Ahead of plan","Lost the plot"],
   text:"Where do you feel you are right now relative to where you want to be?",
   placeholder:""},
  {id:"f9",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What's draining your energy most this week that has nothing to do with your idea?",
   placeholder:"The real answer, not the polished one..."},
  {id:"f10",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What are you proud of from the last seven days, even if it's small?",
   placeholder:"Name something you did well..."},
  {id:"f11",cat:"feeling",color:"#8b5cf6",type:"scale",
   text:"On a scale of 1-10, how much do you believe in yourself as a founder today?",
   placeholder:"What's shaking your confidence, or building it..."},
  {id:"f12",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What fear have you not admitted out loud yet about your business?",
   placeholder:"The one you haven't said to anyone..."},
  {id:"f13",cat:"feeling",color:"#8b5cf6",type:"choice",
   choices:["Clarity","Capital","Customers","Confidence","Time","Support","All of the above"],
   text:"What do you feel you need most right now that you don't have?",
   placeholder:""},
  {id:"f14",cat:"feeling",color:"#8b5cf6",type:"text",
   text:"What does winning look like for you in the next 30 days? Be specific.",
   placeholder:"Specific enough that you'd know if you hit it..."},

  // ACTION (a1-a14)
  {id:"a1",cat:"action",color:"#1a56db",type:"text",
   text:"What's one thing you said you'd do last week that you actually did?",
   placeholder:"One thing you followed through on..."},
  {id:"a2",cat:"action",color:"#1a56db",type:"text",
   text:"What did you learn from the last real conversation you had with a potential customer?",
   placeholder:"What surprised you, or confirmed something..."},
  {id:"a3",cat:"action",color:"#1a56db",type:"text",
   text:"What's the smallest action you could take today that would move the needle?",
   placeholder:"Specific. Doable today..."},
  {id:"a4",cat:"action",color:"#1a56db",type:"text",
   text:"Name one assumption about your business you tested this week. What was the result?",
   placeholder:"The assumption, and what you found..."},
  {id:"a5",cat:"action",color:"#1a56db",type:"text",
   text:"What are you building toward in the next 30 days? One sentence.",
   placeholder:"Specific enough that you'd know if you hit it..."},
  {id:"a6",cat:"action",color:"#1a56db",type:"text",
   text:"What's the thing you keep putting off that would most unblock you if you just did it?",
   placeholder:"The thing you know you need to do..."},
  {id:"a7",cat:"action",color:"#1a56db",type:"text",
   text:"What's one thing you're doing differently this week compared to last week?",
   placeholder:"A real change, not just an intention..."},
  {id:"a8",cat:"action",color:"#1a56db",type:"text",
   text:"Who did you reach out to this week that you didn't last week?",
   placeholder:"A customer, a mentor, a collaborator..."},
  {id:"a9",cat:"action",color:"#1a56db",type:"choice",
   choices:["Less than 1 hour","1-2 hours","3-5 hours","More than 5 hours","I lost count"],
   text:"How many hours this week did you spend talking directly to potential customers?",
   placeholder:""},
  {id:"a10",cat:"action",color:"#1a56db",type:"text",
   text:"What did you stop doing this week that was wasting your time?",
   placeholder:"Something you cut or deprioritized..."},
  {id:"a11",cat:"action",color:"#1a56db",type:"text",
   text:"What feedback have you received recently that you haven't acted on yet?",
   placeholder:"The feedback sitting in your inbox or your head..."},
  {id:"a12",cat:"action",color:"#1a56db",type:"text",
   text:"If you had to double your output next week with no extra hours, what would you cut?",
   placeholder:"What goes first..."},
  {id:"a13",cat:"action",color:"#1a56db",type:"choice",
   choices:["Built something","Sold something","Talked to customers","Researched","Planned","Rested","All of the above"],
   text:"What best describes how you spent most of your founder time this week?",
   placeholder:""},
  {id:"a14",cat:"action",color:"#1a56db",type:"text",
   text:"What would your future self say about how you used your time this week?",
   placeholder:"Proud? Frustrated? Something in between..."},

  // DISCUSSION (d1-d14) - all open ended, no right answers
  {id:"d1",cat:"discussion",color:"#ef4444",type:"choice",
   choices:["Love it","Just believe in it","Neither - just execute","Both are required"],
   text:"Do you think you need to love what you're building - or just believe in it?",
   placeholder:"What's your take..."},
  {id:"d2",cat:"discussion",color:"#ef4444",type:"text",
   text:"What's the biggest lie the startup world told you about starting a business?",
   placeholder:"The thing that turned out to be wrong..."},
  {id:"d3",cat:"discussion",color:"#ef4444",type:"text",
   text:"Is it better to start something imperfect now, or take more time to get it right? What has your experience taught you?",
   placeholder:"Your honest take from experience..."},
  {id:"d4",cat:"discussion",color:"#ef4444",type:"text",
   text:"What do most people get wrong about starting a business with limited capital?",
   placeholder:"What you've learned that others haven't..."},
  {id:"d5",cat:"discussion",color:"#ef4444",type:"text",
   text:"What's one thing that makes your background a business advantage most people would overlook?",
   placeholder:"Something specific to your story..."},
  {id:"d6",cat:"discussion",color:"#ef4444",type:"choice",
   choices:["My idea","My capital","My network"],
   text:"If you could only keep one - your idea, your capital, or your network - which would you keep and why?",
   placeholder:"Why that one..."},
  {id:"d7",cat:"discussion",color:"#ef4444",type:"text",
   text:"At what point does a side hustle become a real business? What's the line for you?",
   placeholder:"What made it real, or what would..."},
  {id:"d8",cat:"discussion",color:"#ef4444",type:"text",
   text:"What's a piece of business advice you followed that turned out to be wrong for your situation?",
   placeholder:"The advice, and what actually worked..."},
  {id:"d9",cat:"discussion",color:"#ef4444",type:"choice",
   choices:["Build in public","Keep it private until ready","Share selectively","Not sure yet"],
   text:"Should founders build in public or keep their work private until it's ready?",
   placeholder:"What's your experience been..."},
  {id:"d10",cat:"discussion",color:"#ef4444",type:"choice",
   choices:["Most businesses fail from lack of sales, not bad ideas","You don't need passion - just discipline","Networking matters more than skill","Starting slow beats moving fast","Funding is overrated"],
   text:"Which of these do you most agree with - even if it's unpopular?",
   placeholder:"What's your honest take..."},
  {id:"d11",cat:"discussion",color:"#ef4444",type:"text",
   text:"What does success actually look like for you - not the default answer, the real one?",
   placeholder:"The version you don't always say out loud..."},
  {id:"d12",cat:"discussion",color:"#ef4444",type:"text",
   text:"Where should a first-time founder start when choosing what to build? What would you tell someone starting today?",
   placeholder:"What you believe, and why..."},
  {id:"d13",cat:"discussion",color:"#ef4444",type:"choice",
   choices:["Fear of failure","Lack of capital","Not sure it's viable","Don't have the skills yet","Nothing - I'm already building it"],
   text:"What's really stopping you from going all in on your biggest idea?",
   placeholder:"The real answer..."},
  {id:"d14",cat:"discussion",color:"#ef4444",type:"text",
   text:"What's the one thing the people around you don't understand about what you're trying to build?",
   placeholder:"The thing you've stopped trying to explain..."},
];

var CAT_META = {
  feeling:   {label:"Feeling Check-In",   color:"#8b5cf6", desc:"Honest pulse of where you are right now."},
  action:    {label:"Action Check-In",     color:"#1a56db", desc:"Accountability. What you did and what's next."},
  discussion:{label:"Discussion Topic",    color:"#ef4444", desc:"Founder philosophy. No right answers."},
};

var MOCK_AGG = {
  f3:{total:47,
    choices:{Excited:18,Determined:12,Anxious:8,Energized:5,Focused:4},
    top:[
      {text:"The days when nothing seems to move are actually moving the most. You just can't see it yet.",fires:14},
      {text:"Anxious but not stopping. That's probably what it's supposed to feel like.",fires:11},
      {text:"Excitement that keeps turning into anxiety. Still not sure which one is winning.",fires:9},
      {text:"I keep thinking I should feel more certain by now.",fires:8},
    ]},
  d1:{total:52,
    choices:{"Love it":21,"Both are required":18,"Just believe in it":10,"Neither - just execute":3},
    top:[
      {text:"I loved the idea. Then I had my first difficult customer and realized love isn't enough.",fires:16},
      {text:"Belief is more durable than love. Love fades when it gets hard.",fires:13},
      {text:"I don't love every part of it. But I love why I'm doing it.",fires:11},
      {text:"I started for passion and I'm staying for purpose. Different thing.",fires:9},
    ]},
};

// Basic profanity filter for discussion topics
var BANNED = ["fuck","shit","bitch","asshole","cunt","dick","nigger","faggot","retard","rape","kill yourself","kys"];
function hasProfanity(text) {
  var lower = text.toLowerCase();
  for (var i = 0; i < BANNED.length; i++) {
    if (lower.indexOf(BANNED[i]) !== -1) return true;
  }
  return false;
}

function getLogo(){ return "data:image/webp;base64," +
    "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"; }
var AIEON_LOGO = getLogo();

function GlobalStyle(){
  useEffect(function(){
    var el = document.createElement("style");
    el.textContent = [
      "@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}",
      "@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}",
      "@keyframes arcFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}",
      "@keyframes xpPop{0%{transform:scale(0.5);opacity:0}60%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}",
      "*{box-sizing:border-box;margin:0;padding:0;}",
      "body{font-family:system-ui,-apple-system,sans-serif;}",
      "textarea{outline:none;font-family:inherit;resize:none;}",
      "textarea:focus{border-color:#1a56db !important;}",
    ].join(" ");
    document.head.appendChild(el);
    return function(){ document.head.removeChild(el); };
  },[]);
  return null;
}

function MoodMeter(){
  var moods = [
    {label:"Energized",pct:38,color:"#059669"},
    {label:"Uncertain",pct:29,color:"#f59e0b"},
    {label:"Determined",pct:21,color:"#1a56db"},
    {label:"Stuck",pct:12,color:"#94a3b8"},
  ];
  return(
    <div style={{background:C.offWhite,borderRadius:14,border:"1px solid "+C.border,padding:"16px 18px",marginBottom:20}}>
      <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Today's Founder Mood Across Ignite</div>
      <div style={{display:"flex",height:10,borderRadius:5,overflow:"hidden",gap:2,marginBottom:10}}>
        {moods.map(function(m){ return(<div key={m.label} style={{flex:m.pct,background:m.color}}/>); })}
      </div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {moods.map(function(m){
          return(
            <div key={m.label} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:C.muted}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:m.color}}/>
              <span>{m.pct}% {m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubmitConfirmation(props){
  var color = props.color;
  var catLabel = props.catLabel;
  var onSeeResponses = props.onSeeResponses;
  return(
    <div style={{textAlign:"center",padding:"8px 0",animation:"fadeUp 0.5s ease"}}>
      <div style={{animation:"arcFloat 4s ease-in-out infinite",display:"inline-block",marginBottom:16}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{position:"absolute",inset:-12,borderRadius:"50%",background:"radial-gradient(circle,"+color+"44 0%,transparent 70%)",filter:"blur(8px)"}}/>
          <img src={AIEON_LOGO} alt="AieonFounder" style={{width:52,height:52,objectFit:"contain",position:"relative",zIndex:1,filter:"drop-shadow(0 0 10px "+color+")"}}/>
        </div>
      </div>
      <div style={{animation:"xpPop 0.6s ease 0.2s both",display:"inline-block",marginBottom:12}}>
        <div style={{background:"linear-gradient(135deg,"+color+",#00d4c8)",borderRadius:20,padding:"6px 18px",fontSize:15,fontWeight:900,color:"#fff",boxShadow:"0 4px 16px "+color+"55"}}>
          +15 XP
        </div>
      </div>
      <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:8}}>
        Thank you for sharing that.
      </div>
      <div style={{fontSize:14,color:C.muted,lineHeight:1.7,maxWidth:340,margin:"0 auto 16px"}}>
        Your response is anonymous and permanent. Every founder who answers shapes what this community knows about itself. That matters.
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16,fontStyle:"italic"}}>
        AieonFounder - {catLabel}
      </div>
      {onSeeResponses && (
        <button onClick={onSeeResponses} style={{padding:"11px 28px",borderRadius:12,background:"linear-gradient(135deg,"+color+","+color+"cc)",color:"#fff",border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 16px "+color+"44"}}>
          See What Other Founders Said
        </button>
      )}
    </div>
  );
}

function AggView(props){
  var data = props.data;
  var color = props.color;
  var total = data.total;
  var choiceEntries = data.choices ? Object.entries(data.choices).sort(function(a,b){return b[1]-a[1];}) : [];
  return(
    <div style={{animation:"fadeUp 0.5s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:color,animation:"blink 1.2s ease-in-out infinite"}}/>
        <div style={{fontSize:12,fontWeight:700,color:C.muted}}>{total} founders responded today - Anonymous</div>
      </div>
      {choiceEntries.length > 0 && (
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>How founders answered</div>
          {choiceEntries.map(function(entry,i){
            var label = entry[0]; var count = entry[1];
            var pct = Math.round((count/total)*100);
            return(
              <div key={label} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:13,color:C.text,fontWeight:i===0?700:500}}>{label}</span>
                  <span style={{fontSize:13,color:i===0?color:C.muted,fontWeight:700}}>{pct}%</span>
                </div>
                <div style={{height:6,background:C.border,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:pct+"%",background:i===0?"linear-gradient(90deg,"+color+","+color+"cc)":"#cbd5e1",borderRadius:3,transition:"width 1s ease"}}/>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>What's resonating</div>
        {data.top.map(function(r,i){
          return(
            <div key={i} style={{background:i===0?color+"08":C.offWhite,border:"1.5px solid "+(i===0?color+"30":C.border),borderRadius:12,padding:"12px 14px",marginBottom:8}}>
              <p style={{fontSize:13,color:C.text,lineHeight:1.65,marginBottom:8,fontStyle:"italic"}}>"{r.text}"</p>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:20,background:C.white,border:"1px solid "+C.border,color:C.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
                  Fire {r.fires}
                </button>
                <span style={{fontSize:11,color:C.muted}}>founders resonated</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DailyPulsePreview(){
  var catKeys = ["feeling","action","discussion"];
  var today = new Date();
  var dayIdx = Math.floor((today - new Date(today.getFullYear(),0,0))/(1000*60*60*24));
  var defaultCat = catKeys[dayIdx % 3];

  var [selCat, setSelCat] = useState(defaultCat);
  var [promptIdx, setPromptIdx] = useState(0);
  var [textVal, setTextVal] = useState("");
  var [choiceVal, setChoiceVal] = useState("");
  var [scaleVal, setScaleVal] = useState(null);
  var [view, setView] = useState("prompt");
  var [profanityFlag, setProfanityFlag] = useState(false);
  // Track which categories have been answered today
  var [answered, setAnswered] = useState({feeling:false,action:false,discussion:false});

  var allCatPrompts = PROMPTS.filter(function(p){ return p.cat === selCat; });
  // Show 3 prompts per category per day, rotating by day of year
  var startIdx = (dayIdx * 3) % allCatPrompts.length;
  var catPrompts = [
    allCatPrompts[startIdx % allCatPrompts.length],
    allCatPrompts[(startIdx + 1) % allCatPrompts.length],
    allCatPrompts[(startIdx + 2) % allCatPrompts.length],
  ];
  var prompt = catPrompts[promptIdx % 3];
  var meta = CAT_META[selCat];
  var mockData = MOCK_AGG[prompt ? prompt.id : null] || null;
  var hasResponse = textVal.trim().length > 0 || choiceVal || scaleVal;
  var alreadyAnswered = answered[selCat];
  var charLimit = 180;

  function handleCatSwitch(key) {
    setSelCat(key);
    // Pick prompt based on day so it rotates
    setPromptIdx(0);
    setView(answered[key] ? "submitted" : "prompt");
    setTextVal(""); setChoiceVal(""); setScaleVal(null);
    setProfanityFlag(false);
  }

  function handleSubmit() {
    if (!hasResponse) return;
    if (selCat === "discussion") {
      var checkText = textVal + " " + choiceVal;
      if (hasProfanity(checkText)) {
        setProfanityFlag(true);
        return;
      }
    }
    var newAnswered = {};
    newAnswered.feeling = answered.feeling;
    newAnswered.action = answered.action;
    newAnswered.discussion = answered.discussion;
    newAnswered[selCat] = true;
    setAnswered(newAnswered);
    setView("submitted");
    setProfanityFlag(false);
  }

  return(
    <div style={{minHeight:"100vh",background:C.offWhite,fontFamily:"system-ui,sans-serif"}}>
      <GlobalStyle/>
      <div style={{background:C.navyDark,padding:"14px 24px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <img src={AIEON_LOGO} alt="AieonFounder" style={{width:24,height:24,objectFit:"contain"}}/>
        <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>AieonFounder</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>|</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Daily Pulse</div>
        <div style={{marginLeft:"auto",fontSize:11,color:"#3b6ef8",fontWeight:700}}>Ignite</div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"28px 20px",animation:"fadeUp 0.4s ease"}}>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,color:C.blue,letterSpacing:3,textTransform:"uppercase",fontFamily:"monospace",marginBottom:6}}>The Daily Pulse</div>
          <h2 style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:900,color:C.text,marginBottom:4}}>What's on your mind today?</h2>
          <p style={{fontSize:13,color:C.muted,lineHeight:1.6}}>Anonymous. Honest. One per category per day. <strong style={{color:C.blue}}>+15 XP per response.</strong> Your voice shapes what this community knows about itself.</p>
        </div>

        <MoodMeter/>

        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {catKeys.map(function(key){
            var m = CAT_META[key];
            var done = answered[key];
            return(
              <button key={key} onClick={function(){ handleCatSwitch(key); }} style={{
                display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:20,
                border:"1.5px solid "+(selCat===key?m.color:(done?"#bbf7d0":C.border)),
                background:selCat===key?m.color+"15":(done?"#f0fdf4":C.white),
                color:selCat===key?m.color:(done?"#059669":C.muted),
                fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",
              }}>
                {done && <span style={{fontSize:11}}>V</span>}
                {m.label}
                {!done && <span style={{fontSize:10,background:m.color+"18",color:m.color,borderRadius:10,padding:"1px 7px",fontWeight:800}}>+15 XP</span>}
              </button>
            );
          })}
        </div>

        <div style={{fontSize:12,color:C.muted,marginBottom:12}}>
          {answered.feeling && answered.action && answered.discussion
            ? "All 3 done today! Come back tomorrow."
            : (Object.values(answered).filter(Boolean).length) + " of 3 categories answered today"}
        </div>

        {/* -- Prompt flywheel -- */}
        <div style={{marginBottom:0}}>
          {/* Header row */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <div style={{fontSize:11,color:meta.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{meta.label}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{meta.desc}</div>
            </div>
            <div style={{fontSize:12,color:C.muted,fontWeight:600}}>{(promptIdx%3)+1} of 3 today</div>
          </div>

          {/* Flywheel cards */}
          <div style={{display:"flex",gap:10,alignItems:"stretch",marginBottom:16,overflowX:"hidden"}}>
            {/* Prev arrow */}
            <button onClick={function(){
              var prev = ((promptIdx%3)+2)%3;
              setPromptIdx(prev); setView(alreadyAnswered?"submitted":"prompt");
              setTextVal(""); setChoiceVal(""); setScaleVal(null); setProfanityFlag(false);
            }} style={{flexShrink:0,width:32,background:C.offWhite,border:"1.5px solid "+C.border,borderRadius:10,cursor:"pointer",color:C.muted,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",transition:"all 0.15s"}}>
              &lt;
            </button>

            {/* 3 prompt cards */}
            <div style={{flex:1,display:"flex",gap:8,overflow:"hidden"}}>
              {[0,1,2].map(function(i){
                var isActive = i === promptIdx%3;
                var thisPrompt = catPrompts[i];
                if (!thisPrompt) return null;
                return(
                  <div key={i} onClick={function(){
                    if(!isActive){ setPromptIdx(i); setView(alreadyAnswered?"submitted":"prompt"); setTextVal(""); setChoiceVal(""); setScaleVal(null); setProfanityFlag(false); }
                  }} style={{
                    flex:isActive?3:1,
                    background:isActive?C.white:C.offWhite,
                    border:"1.5px solid "+(isActive?meta.color+"44":C.border),
                    borderRadius:16,
                    borderTop:"3px solid "+(isActive?meta.color:"#e2e8f0"),
                    padding:isActive?"18px 16px":"14px 10px",
                    cursor:isActive?"default":"pointer",
                    transition:"all 0.3s ease",
                    overflow:"hidden",
                    position:"relative",
                    boxShadow:isActive?"0 4px 20px rgba(0,0,0,0.06)":"none",
                    minHeight:120,
                  }}>
                    {isActive ? (
                      <div>
                        <div style={{fontSize:10,color:meta.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{thisPrompt.type==="choice"?"Pick one":"Open response"}</div>
                        <p style={{fontSize:16,fontWeight:700,color:C.text,lineHeight:1.6,margin:0}}>{thisPrompt.text}</p>
                      </div>
                    ) : (
                      <div>
                        <div style={{fontSize:9,color:C.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{thisPrompt.type==="choice"?"Pick one":"Open response"}</div>
                        <p style={{fontSize:12,color:C.muted,lineHeight:1.5,margin:0,display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{thisPrompt.text}</p>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next arrow */}
            <button onClick={function(){
              var next = (promptIdx%3+1)%3;
              setPromptIdx(next); setView(alreadyAnswered?"submitted":"prompt");
              setTextVal(""); setChoiceVal(""); setScaleVal(null); setProfanityFlag(false);
            }} style={{flexShrink:0,width:32,background:C.offWhite,border:"1.5px solid "+C.border,borderRadius:10,cursor:"pointer",color:C.muted,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",transition:"all 0.15s"}}>
              &gt;
            </button>
          </div>
        </div>

        {prompt && (
          <div style={{background:C.white,border:"1.5px solid "+meta.color+"22",borderRadius:18,padding:"24px",marginBottom:16,boxShadow:"0 4px 20px rgba(0,0,0,0.04)"}}>

            {view==="submitted" ? (
              <SubmitConfirmation
                color={meta.color}
                catLabel={meta.label}
                onSeeResponses={mockData ? function(){ setView("community"); } : null}
              />
            ) : view==="community" && mockData ? (
              <AggView data={mockData} color={meta.color}/>
            ) : alreadyAnswered ? (
              <div style={{textAlign:"center",padding:"20px",background:C.offWhite,borderRadius:12}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>You've already answered today's {meta.label}.</div>
                <div style={{fontSize:12,color:C.muted}}>Come back tomorrow for a fresh prompt. Try another category in the meantime.</div>
              </div>
            ) : (
              <div>
                {prompt.type==="scale" && (
                  <div style={{marginBottom:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,color:C.muted}}>Not at all</span>
                      <span style={{fontSize:11,color:C.muted}}>Completely</span>
                    </div>
                    <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                      {[1,2,3,4,5,6,7,8,9,10].map(function(n){
                        return(
                          <button key={n} onClick={function(){ setScaleVal(n); }} style={{
                            width:34,height:34,borderRadius:8,
                            border:"1.5px solid "+(scaleVal===n?meta.color:C.border),
                            background:scaleVal===n?meta.color:C.white,
                            color:scaleVal===n?"#fff":C.muted,
                            fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",
                          }}>{n}</button>
                        );
                      })}
                    </div>
                    {scaleVal && <div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:meta.color}}>You selected {scaleVal}/10</div>}
                  </div>
                )}

                {prompt.type==="choice" && (
                  <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                    {prompt.choices.map(function(ch){
                      return(
                        <button key={ch} onClick={function(){ setChoiceVal(ch); }} style={{
                          padding:"8px 14px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",
                          border:"1.5px solid "+(choiceVal===ch?meta.color:C.border),
                          background:choiceVal===ch?meta.color+"12":C.white,
                          color:choiceVal===ch?meta.color:C.muted,transition:"all 0.15s",
                        }}>{ch}</button>
                      );
                    })}
                  </div>
                )}

                {prompt.type!=="choice" && (
                  <div style={{marginBottom:12}}>
                    <textarea value={textVal}
                      onChange={function(e){ setTextVal(e.target.value.slice(0,charLimit)); setProfanityFlag(false); }}
                      placeholder={prompt.placeholder || "Share your honest take..."} rows={3}
                      style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1.5px solid "+(profanityFlag?"#ef4444":C.border),fontSize:14,color:C.text,lineHeight:1.6,background:C.offWhite}}/>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                      <span style={{fontSize:11,color:profanityFlag?"#ef4444":C.muted}}>
                        {profanityFlag?"Please keep responses respectful - this is a professional community.":""}
                      </span>
                      <span style={{fontSize:11,color:textVal.length>charLimit*0.85?"#ef4444":C.muted}}>{textVal.length}/{charLimit}</span>
                    </div>
                  </div>
                )}

                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14,padding:"8px 12px",background:C.offWhite,borderRadius:8}}>
                  <span style={{fontSize:12}}>Lock</span>
                  <span style={{fontSize:11,color:C.muted}}>Fully anonymous. Your name never appears. Responses are aggregated only.</span>
                </div>

                <button onClick={handleSubmit} disabled={!hasResponse} style={{
                  width:"100%",padding:"14px",borderRadius:12,
                  background:hasResponse?"linear-gradient(135deg,"+meta.color+","+meta.color+"cc)":"#e2e8f0",
                  color:hasResponse?"#fff":"#94a3b8",border:"none",fontSize:14,fontWeight:700,
                  cursor:hasResponse?"pointer":"default",fontFamily:"inherit",
                  boxShadow:hasResponse?"0 6px 20px "+meta.color+"44":"none",transition:"all 0.2s",
                }}>
                  Submit Anonymously - +15 XP
                </button>
              </div>
            )}
          </div>
        )}

        {view==="prompt" && !alreadyAnswered && mockData && mockData.total >= 10 && (
          <button onClick={function(){setView("community");}} style={{width:"100%",padding:"11px",borderRadius:12,background:C.white,border:"1.5px solid "+C.border,color:C.muted,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:8}}>
            See what other founders said (submit first to add your voice)
          </button>
        )}

        <div style={{marginTop:20}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Your pulse this week</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(day,i){
              var done = i < 5;
              return(
                <div key={day} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 10px",borderRadius:10,background:done?"#f0fdf4":C.offWhite,border:"1px solid "+(done?"#bbf7d0":C.border),minWidth:44}}>
                  <div style={{fontSize:14,color:done?"#059669":"#94a3b8"}}>{done?"V":"O"}</div>
                  <div style={{fontSize:10,color:done?"#059669":C.muted,fontWeight:done?700:400}}>{day}</div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:8,fontSize:12,color:C.muted}}>5 of 7 this week - 47 total responses</div>
        </div>

        <div style={{marginTop:20,padding:"12px 14px",background:"#f8faff",borderRadius:10,border:"1px solid #e2e8f0",fontSize:11,color:"#64748b",lineHeight:1.6}}>
          <strong style={{color:"#0f172a"}}>Notice:</strong> All responses are anonymous. One response per category per day. Discussion responses containing inappropriate content are automatically removed. AieonFounder content is for informational purposes only and does not constitute professional advice.
        </div>
      </div>
    </div>
  );
}
