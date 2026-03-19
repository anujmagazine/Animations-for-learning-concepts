import { useState, useEffect, useRef } from "react";

/*
  BRAND PALETTE
  Yellow Green: #96c840  (primary accent — OpenClaw)
  Black:        #000000
  Platinum:     #e5e6e6  (light text)
  Space Cadet:  #121a44  (dark background)
  
  FONTS
  Primary:   Gilroy → Poppins (closest free match — geometric sans)
  Secondary: Roboto (body copy)
*/

const C = {
  bg: "#0e1538",        // deep space cadet
  bgPanel: "#151d48",   // slightly lighter panel
  green: "#96c840",     // yellow green — primary brand
  greenDim: "rgba(150,200,64,0.12)",
  greenGlow: "rgba(150,200,64,0.35)",
  greenMid: "rgba(150,200,64,0.6)",
  amber: "#e8a840",     // warm gold for chatbot era
  amberDim: "rgba(232,168,64,0.12)",
  amberGlow: "rgba(232,168,64,0.3)",
  white: "#e5e6e6",     // platinum
  light: "#c8cad0",
  muted: "#9598a8",
  dim: "#636880",
  border: "#252e5a",
  navy: "#121a44",      // space cadet
  waBg: "#0b1230",
  waBubble: "#1a3a28",
  cyan: "#5ec4d4",
  pink: "#d88ce0",
  gold: "#e8c840",
};

const FONT_HEAD = "'Poppins', 'Gilroy', sans-serif";
const FONT_BODY = "'Roboto', sans-serif";

/* ── Era badge ── */
function EraBadge({ text, color }) {
  return (
    <span style={{
      display: "inline-block", marginLeft: 12,
      fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700,
      color: color, background: `${color}18`,
      border: `1.5px solid ${color}55`,
      borderRadius: 8, padding: "4px 14px",
      letterSpacing: 2, textTransform: "uppercase",
    }}>{text}</span>
  );
}

/* ── Step label ── */
function StepLabel({ n, text }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.greenDim, padding: "3px 12px", borderRadius: 10, border: `1px solid ${C.green}30` }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.green, fontWeight: 700, background: "rgba(150,200,64,0.2)", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.green, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>{text}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 0 — OPENING QUOTE
   ════════════════════════════════════════════════════════════ */
function SceneQuote({ onDone }) {
  const lines = [
    { t: `"Every company in the world today needs to have an OpenClaw strategy, an agentic system strategy.`, hero: false },
    { t: `This is the new computer.`, hero: true },
    { t: `This is as big of a deal as HTML, as big of a deal as Linux."`, hero: false },
  ];
  const [vis, setVis] = useState([]);
  const [attrib, setAttrib] = useState(false);
  const [q, setQ] = useState(false);
  const [sub, setSub] = useState(false);

  useEffect(() => {
    const t = [];
    lines.forEach((_, i) => t.push(setTimeout(() => setVis(v => [...v, i]), 1000 + i * 1800)));
    t.push(setTimeout(() => setAttrib(true), 7000));
    t.push(setTimeout(() => setQ(true), 9500));
    t.push(setTimeout(() => setSub(true), 11500));
    t.push(setTimeout(onDone, 16000));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "32px 24px" }}>
      <div style={{ maxWidth: 820, textAlign: "center" }}>
        {lines.map((l, i) => (
          <p key={i} style={{
            fontFamily: l.hero ? FONT_HEAD : FONT_BODY,
            fontSize: l.hero ? 40 : 24,
            fontWeight: l.hero ? 700 : 400,
            color: l.hero ? C.green : C.white,
            opacity: vis.includes(i) ? 1 : 0,
            transform: vis.includes(i) ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease", margin: "10px 0", lineHeight: 1.5,
            textShadow: l.hero ? `0 0 30px ${C.greenGlow}` : "none",
          }}>{l.t}</p>
        ))}
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.muted, marginTop: 28, opacity: attrib ? 1 : 0, transition: "opacity 0.6s" }}>
          — Jensen Huang, NVIDIA GTC 2026
        </p>
        <div style={{ marginTop: 50 }}>
          <p style={{
            fontFamily: FONT_HEAD, fontSize: 32, fontWeight: 600, color: C.amber,
            opacity: q ? 1 : 0, transform: q ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s", textShadow: `0 0 20px ${C.amberGlow}`,
          }}>But what does "new computer" actually mean?</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: C.light, marginTop: 18, opacity: sub ? 1 : 0, transition: "opacity 0.6s" }}>
            Let's compare the old way with the new way — using the same task.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 1 — THE TASK
   ════════════════════════════════════════════════════════════ */
function SceneTask({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setTimeout(() => setPhase(1), 500);
    setTimeout(() => setPhase(2), 3500);
    setTimeout(() => setPhase(3), 6500);
    setTimeout(onDone, 10500);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "32px 24px" }}>
      <p style={{
        fontFamily: FONT_BODY, fontSize: 18, color: C.light,
        textAlign: "center", maxWidth: 620, lineHeight: 1.7,
        opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0)" : "translateY(15px)", transition: "all 0.8s",
      }}>
        In this simulation, we will give the <span style={{ color: C.green, fontWeight: 700 }}>exact same task</span> to
        two different systems — a chatbot and an <span style={{ color: C.green, fontWeight: 700 }}>OpenClaw agent</span> — and watch how each one handles it.
      </p>
      <div style={{
        marginTop: 36, background: `linear-gradient(135deg, ${C.greenDim}, ${C.amberDim})`,
        border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", maxWidth: 700,
        opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s",
      }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, textTransform: "uppercase", letterSpacing: 4, marginBottom: 16, textAlign: "center", fontWeight: 500 }}>The Task</p>
        <p style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 600, color: C.white, textAlign: "center", lineHeight: 1.6 }}>
          "Research our top 3 competitors, find pricing gaps, draft a strategy memo, and schedule a team meeting."
        </p>
      </div>
      <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.dim, marginTop: 32, opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.6s" }}>
        First up: The Old Computer — the Chatbot Era →
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 2 — OLD COMPUTER
   ════════════════════════════════════════════════════════════ */
function SceneOld({ onDone }) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [mins, setMins] = useState(0);
  const [labels, setLabels] = useState([]);
  const [summary, setSummary] = useState(false);
  const chatRef = useRef(null);

  const exchanges = [
    { h: "List our top 3 competitors in the CRM space", a: "Based on market share, your top 3 competitors are: Salesforce, HubSpot, and Zoho CRM." },
    { h: "Now find pricing for Salesforce enterprise tier", a: "Salesforce Enterprise is $165/user/month billed annually." },
    { h: "What about HubSpot enterprise pricing?", a: "HubSpot Enterprise starts at $1,200/month for 10 users." },
    { h: "And Zoho enterprise?", a: "Zoho CRM Enterprise is $40/user/month billed annually." },
    { h: "Compare all three in a table with our pricing", a: "Here's a comparison table with all pricing tiers side by side..." },
    { h: "Now draft a strategy memo based on these gaps", a: "Here's a draft strategy memo: Subject — Competitive Pricing Analysis..." },
    { h: "Make it more concise, bullet points", a: "Revised memo with bullet points and key findings..." },
    { h: "Add a recommendation section", a: "Added recommendations section with three strategic options..." },
    { h: "Check my team's availability for Monday", a: "I don't have access to your calendar. You'll need to check manually." },
    { h: "OK I checked. Set up the meeting invite", a: "I can't create calendar events. Here's a template you can copy..." },
    { h: "Fine. Summarize everything for the email", a: "Here's an email summary with key findings you can send to the team..." },
  ];
  const labelData = [
    { icon: "🧠", t: "You are the memory", s: "the chatbot forgets between sessions" },
    { icon: "🎯", t: "You are the orchestrator", s: "you decide what comes next" },
    { icon: "💻", t: "You are the computer", s: "without you, nothing moves" },
  ];

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    let cur = 0, m = 0;
    const iv = setInterval(() => {
      if (cur < exchanges.length) { cur++; m += 3 + Math.floor(Math.random() * 3); setStep(cur); setMins(m); }
      else { clearInterval(iv); setTimeout(() => setLabels(v => [...v, 0]), 800); setTimeout(() => setLabels(v => [...v, 1]), 2000); setTimeout(() => setLabels(v => [...v, 2]), 3200); setTimeout(() => setSummary(true), 4500); setTimeout(onDone, 8500); }
    }, 900);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => { chatRef.current && (chatRef.current.scrollTop = chatRef.current.scrollHeight); }, [step]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 20px", opacity: show ? 1 : 0, transition: "opacity 0.8s" }}>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 34, fontWeight: 700, color: C.amber, margin: 0, textShadow: `0 0 25px ${C.amberGlow}` }}>The Old Computer</h2>
          <EraBadge text="Chatbot Era" color={C.amber} />
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.light, letterSpacing: 4, marginTop: 6, textTransform: "uppercase" }}>You operate the AI</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "10px 20px", background: C.amberDim, borderRadius: 10, marginTop: 12, marginBottom: 12, fontFamily: FONT_BODY, fontSize: 16, maxWidth: 560, width: "100%" }}>
        <span style={{ color: C.amber, fontWeight: 700 }}>Actions: {step}</span>
        <span style={{ color: C.amber, fontWeight: 700 }}>⏱ {mins} min</span>
        <span style={{ color: C.amber, fontWeight: 700 }}>🧑 Present</span>
      </div>

      <div ref={chatRef} style={{ flex: "0 1 auto", maxHeight: "45vh", width: "100%", maxWidth: 620, overflow: "auto", display: "flex", flexDirection: "column", gap: 8, minHeight: 0, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 12, border: `1px solid ${C.border}` }}>
        {exchanges.slice(0, step).map((ex, i) => (
          <div key={i} style={{ opacity: i >= step - 2 ? 1 : 0.4, transition: "opacity 0.4s", animation: i === step - 1 ? "fadeInUp 0.3s ease" : "none" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, maxWidth: "85%" }}>
                <div style={{ background: C.amberDim, borderRadius: "12px 12px 3px 12px", padding: "5px 10px", fontFamily: FONT_BODY, fontSize: 12, color: C.amber, lineHeight: 1.4, fontWeight: 600, border: `1px solid ${C.amber}30` }}>{ex.h}</div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.amberDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, border: `1px solid ${C.amber}40` }}>🧑</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, maxWidth: "85%" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, border: `1px solid ${C.border}` }}>🤖</div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px 12px 12px 3px", padding: "5px 10px", fontFamily: FONT_BODY, fontSize: 11, color: C.muted, lineHeight: 1.4, border: `1px solid rgba(255,255,255,0.06)` }}>{ex.a}</div>
              </div>
            </div>
          </div>
        ))}
        {step > 0 && step <= exchanges.length && (
          <div style={{ display: "flex", gap: 5, justifyContent: "center", padding: 4 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.amber, animation: `blink 1s ease ${i*0.2}s infinite` }}/>)}
          </div>
        )}
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, maxWidth: 620, width: "100%" }}>
        {labelData.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: labels.includes(i) ? 1 : 0, transform: labels.includes(i) ? "translateX(0)" : "translateX(-30px)", transition: "all 0.6s" }}>
            <span style={{ fontSize: 22 }}>{l.icon}</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.amber, fontWeight: 700 }}>{l.t}</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.muted }}>— {l.s}</span>
          </div>
        ))}
      </div>

      {summary && (
        <div style={{ marginTop: 12, padding: "14px 24px", textAlign: "center", background: C.amberDim, borderRadius: 10, maxWidth: 620, width: "100%", border: `1px solid ${C.amber}`, animation: "fadeInUp 0.6s ease" }}>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 700, color: C.amber, textShadow: `0 0 15px ${C.amberGlow}` }}>You are the computer.</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 3 — NEW COMPUTER
   ════════════════════════════════════════════════════════════ */
function SceneNew({ onDone }) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);
  const [clockIdx, setClockIdx] = useState(0);
  const clockTimes = ["9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM", "1:00 AM", "2:00 AM", "..."];
  const [memIdx, setMemIdx] = useState(0);
  const memories = [
    { t: "User prefers bullet-point memos", icon: "📋" },
    { t: "Monday meetings always start at 10am", icon: "🕙" },
    { t: "Competitor X flagged as priority last week", icon: "🚩" },
    { t: "Q3 strategy deck is in Google Drive", icon: "📁" },
  ];
  const agents = [
    { icon: "🔍", name: "Research Agent", act: "Opens browser, scrapes competitor sites", sys: "🌐 Browser", color: C.green },
    { icon: "📊", name: "Pricing Agent", act: "Reads local files, builds comparison table", sys: "📁 Files", color: C.cyan },
    { icon: "✍️", name: "Memo Agent", act: "Drafts strategy document with citations", sys: "📝 Docs", color: C.pink },
    { icon: "📅", name: "Calendar Agent", act: "Finds availability & books meeting", sys: "📧 Cal+Email", color: C.gold },
  ];

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    const t = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 6500),
      setTimeout(() => setPhase(4), 10000),
      setTimeout(() => setPhase(5), 15000),
      setTimeout(() => setPhase(6), 20000),
      setTimeout(() => setPhase(7), 25000),
    ];
    const done = setTimeout(onDone, 32000);
    return () => { t.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  useEffect(() => {
    if (phase < 5) return;
    let idx = 0;
    const iv = setInterval(() => { idx++; if (idx < clockTimes.length) setClockIdx(idx); else clearInterval(iv); }, 700);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase < 6) return;
    let idx = 0;
    const iv = setInterval(() => { idx++; if (idx <= memories.length) setMemIdx(idx); else clearInterval(iv); }, 900);
    return () => clearInterval(iv);
  }, [phase]);

  const phoneShrunk = phase >= 4;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 20px", opacity: show ? 1 : 0, transition: "opacity 0.8s" }}>
      <div style={{ textAlign: "center", marginBottom: 2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 34, fontWeight: 700, color: C.green, margin: 0, textShadow: `0 0 25px ${C.greenGlow}` }}>The New Computer</h2>
          <EraBadge text="OpenClaw Era" color={C.green} />
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.light, letterSpacing: 4, marginTop: 4, textTransform: "uppercase" }}>The AI operates itself</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 28, padding: "8px 20px", background: C.greenDim, borderRadius: 10, marginTop: 8, marginBottom: 8, fontFamily: FONT_BODY, fontSize: 15, maxWidth: 580, width: "100%" }}>
        <span style={{ color: C.green, fontWeight: 700 }}>Actions: {phase >= 7 ? 2 : phase >= 2 ? 1 : 0}</span>
        <span style={{ color: C.green, fontWeight: 700 }}>⏱ {phase >= 7 ? "Overnight" : phase >= 5 ? clockTimes[clockIdx] : "—"}</span>
        <span style={{ color: C.green, fontWeight: 700 }}>{phase >= 5 ? "😴 Asleep" : phase >= 2 ? "📱 Sent" : "📱 WhatsApp"}</span>
      </div>

      {phase >= 1 && phase < 4 && (
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.light, textAlign: "center", maxWidth: 540, lineHeight: 1.6, marginBottom: 6, animation: "fadeInUp 0.5s ease" }}>
          Now, the same task — but the human just sends <span style={{ color: C.green, fontWeight: 700 }}>one WhatsApp message</span> to their OpenClaw agent.
        </p>
      )}

      <div style={{ flex: 1, width: "100%", maxWidth: 900, display: "flex", gap: 16, minHeight: 0, justifyContent: "center", transition: "all 0.8s ease" }}>

        {/* PHONE */}
        <div style={{
          width: phoneShrunk ? 220 : 320, flexShrink: 0, transition: "width 0.8s ease",
          display: "flex", flexDirection: "column", borderRadius: 22, overflow: "hidden",
          border: `2px solid ${phase >= 2 ? `${C.green}50` : C.border}`,
          boxShadow: phase >= 2 ? `0 0 24px ${C.greenDim}` : "none", background: "#000",
        }}>
          <div style={{ background: "#000", padding: "4px 14px", display: "flex", justifyContent: "space-between", fontFamily: FONT_BODY, fontSize: 10, color: C.dim }}>
            <span>{phase >= 7 ? "7:30 AM" : phase >= 5 ? clockTimes[clockIdx] : "9:00 PM"}</span>
            <span>📶 🔋</span>
          </div>
          <div style={{ background: "#1a2040", padding: "7px 10px", display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 10, color: C.dim }}>←</span>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, #5a8020)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: `0 0 6px ${C.greenGlow}` }}>🤖</div>
            <div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.white, fontWeight: 700 }}>OpenClaw Agent</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 9, color: phase >= 4 && phase < 7 ? C.green : C.muted, fontWeight: phase >= 4 && phase < 7 ? 700 : 400 }}>{phase >= 4 && phase < 7 ? "● working..." : phase >= 7 ? "● delivered" : "online"}</div>
            </div>
          </div>
          <div style={{ flex: 1, background: C.waBg, padding: 8, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6, overflow: "auto" }}>
            {phase >= 2 && (
              <div style={{ animation: "fadeInUp 0.4s ease" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: C.waBubble, borderRadius: "10px 10px 3px 10px", padding: "7px 10px", maxWidth: "90%", fontFamily: FONT_BODY, fontSize: phoneShrunk ? 10 : 12, color: C.white, lineHeight: 1.5 }}>
                    Handle the competitor analysis and strategy memo for Monday's meeting.
                  </div>
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 8, color: C.dim, textAlign: "right", marginTop: 2 }}>9:00 PM ✓✓</div>
              </div>
            )}
            {phase >= 4 && phase < 7 && (
              <div style={{ display: "flex", gap: 4, animation: "fadeInUp 0.3s ease" }}>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px 10px 10px 3px", padding: "7px 10px", display: "flex", gap: 3 }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: `blink 1s ease ${i*0.2}s infinite` }}/>)}
                </div>
              </div>
            )}
            {phase >= 7 && (
              <div style={{ animation: "fadeInUp 0.5s ease" }}>
                <div style={{ background: "rgba(150,200,64,0.08)", borderRadius: "10px 10px 10px 3px", padding: "8px 10px", fontFamily: FONT_BODY, fontSize: phoneShrunk ? 9.5 : 11, color: C.white, lineHeight: 1.5, border: `1px solid ${C.green}25` }}>
                  ✅ Done. Memo in Drive. Meeting set for Monday 10am.
                  {!phoneShrunk && <><br/><br/><span style={{ color: C.green, fontWeight: 700 }}>Pricing gap: Competitor B is 23% higher on enterprise tier.</span><br/><br/>Want me to draft a proposal?</>}
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 8, color: C.dim, marginTop: 2 }}>7:30 AM ✓✓</div>
              </div>
            )}
          </div>
          <div style={{ background: "#1a2040", padding: "6px 8px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, background: "#252e5a", borderRadius: 16, padding: "4px 10px", fontFamily: FONT_BODY, fontSize: 10, color: C.dim }}>Message</div>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>🎤</div>
          </div>
        </div>

        {/* Phone down interstitial */}
        {phase >= 3 && phase < 4 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeInUp 0.6s ease" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 700, color: C.green, lineHeight: 1.5, textShadow: `0 0 15px ${C.greenGlow}` }}>That's it.</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: C.light, marginTop: 8, lineHeight: 1.6 }}>One message sent.<br/>Human puts the phone down. 📱</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.dim, marginTop: 16 }}>Now watch what happens next...</p>
            </div>
          </div>
        )}

        {/* RIGHT PANEL */}
        {phase >= 4 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minHeight: 0, overflow: "auto", paddingRight: 4, animation: "fadeInRight 0.8s ease" }}>

            <StepLabel n={2} text="The Orchestration Explosion" />

            <div style={{
              background: `linear-gradient(135deg, ${C.greenDim}, rgba(94,196,212,0.04))`,
              borderRadius: 14, padding: 14, border: `1px solid ${C.green}30`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(${C.green} 1px, transparent 1px), linear-gradient(90deg, ${C.green} 1px, transparent 1px)`, backgroundSize: "30px 30px", pointerEvents: "none" }}/>
              <div style={{ textAlign: "center", marginBottom: 10, position: "relative" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.greenDim, padding: "6px 16px", borderRadius: 24, border: `2px solid ${C.green}`, animation: "pulse 2s ease infinite" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.green, boxShadow: `0 0 12px ${C.green}` }}/>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.green, fontWeight: 700, letterSpacing: 2 }}>ORCHESTRATOR</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 8 }}>
                {[0,1,2,3,4,5,6,7].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: C.green, animation: `flowDots 1.2s ease ${i*0.12}s infinite` }}/>)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, position: "relative" }}>
                {agents.map((a, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 10px", borderLeft: `3px solid ${a.color}`, animation: `fadeInUp 0.4s ease ${i*0.2}s both`, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 18 }}>{a.icon}</span>
                      <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: a.color, fontWeight: 700 }}>{a.name}</span>
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.light, lineHeight: 1.4 }}>{a.act}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${a.color}15`, borderRadius: 8, padding: "2px 8px", border: `1px solid ${a.color}30`, alignSelf: "flex-start" }}>
                      <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: a.color, fontWeight: 700 }}>{a.sys}</span>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: a.color, animation: `blink 1.5s ease ${i*0.3}s infinite` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {phase >= 5 && (
              <>
                <StepLabel n={3} text="The Clock Keeps Moving" />
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 12, animation: "fadeInUp 0.5s ease", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 30 }}>😴</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.light, fontWeight: 700 }}>Human is asleep.</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.green, fontWeight: 700 }}>OpenClaw is still working.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.greenDim, borderRadius: 8, padding: "6px 10px", overflow: "hidden", flexWrap: "wrap" }}>
                    {clockTimes.map((t, i) => (
                      <div key={i} style={{
                        fontFamily: FONT_BODY, fontSize: 13,
                        color: i <= clockIdx ? C.green : C.dim,
                        fontWeight: i === clockIdx ? 700 : 400,
                        padding: "3px 7px", borderRadius: 6,
                        background: i === clockIdx ? `${C.green}20` : "transparent",
                        border: i === clockIdx ? `1px solid ${C.green}` : "1px solid transparent",
                        transition: "all 0.3s",
                        textShadow: i === clockIdx ? `0 0 8px ${C.greenGlow}` : "none",
                        whiteSpace: "nowrap",
                      }}>{t}</div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, justifyContent: "center" }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, animation: "heartbeat 1.2s ease infinite", boxShadow: `0 0 10px ${C.green}` }}/>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.green, letterSpacing: 2, fontWeight: 600 }}>HEARTBEAT — STILL RUNNING</span>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, animation: "heartbeat 1.2s ease 0.6s infinite", boxShadow: `0 0 10px ${C.green}` }}/>
                  </div>
                </div>
              </>
            )}

            {phase >= 6 && (
              <>
                <StepLabel n={4} text="The Memory Layer" />
                <div style={{ background: C.greenDim, borderRadius: 12, padding: 12, border: `1px dashed ${C.green}40`, animation: "fadeInUp 0.5s ease" }}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2 }}>🧠 Memory — building in real time</div>
                  {memories.slice(0, memIdx).map((m, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_BODY, fontSize: 13, color: C.light, padding: "5px 0", animation: "fadeInUp 0.3s ease", borderBottom: i < memIdx - 1 ? `1px solid rgba(255,255,255,0.04)` : "none" }}>
                      <span style={{ fontSize: 14 }}>{m.icon}</span>
                      <span>{m.t}</span>
                    </div>
                  ))}
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 16, fontWeight: 600, color: C.green, marginTop: 10, fontStyle: "italic", textShadow: `0 0 10px ${C.greenGlow}` }}>It remembers. Every time. Forever.</div>
                </div>
              </>
            )}

            {phase >= 7 && (
              <>
                <StepLabel n={5} text="The Return" />
                <div style={{ background: C.greenDim, borderRadius: 12, padding: 14, border: `1px solid ${C.green}`, animation: "fadeInUp 0.5s ease" }}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.light, marginBottom: 8, textAlign: "center" }}>☀️ Morning. Human picks up phone. One notification:</div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 12, fontFamily: FONT_BODY, fontSize: 14, color: C.white, lineHeight: 1.7 }}>
                    <div>✅ <strong>Done.</strong> Memo in your Drive. Meeting set for Monday 10am.</div>
                    <div style={{ color: C.green, fontWeight: 700, marginTop: 8, fontSize: 15 }}>Pricing gap found — Competitor B is 23% higher on enterprise tier.</div>
                    <div style={{ color: C.light, marginTop: 8 }}>Want me to draft a proposal?</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 10, fontFamily: FONT_BODY, fontSize: 15 }}>
                    <div><span style={{ color: C.green, fontWeight: 700, fontSize: 22 }}>1</span> <span style={{ color: C.light }}>action to start</span></div>
                    <div><span style={{ color: C.green, fontWeight: 700, fontSize: 22 }}>1</span> <span style={{ color: C.light }}>to review</span></div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {phase >= 7 && (
        <div style={{ marginTop: 8, padding: "12px 24px", textAlign: "center", background: C.greenDim, borderRadius: 10, maxWidth: 620, width: "100%", border: `1px solid ${C.green}`, animation: "fadeInUp 0.6s ease" }}>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 700, color: C.green, textShadow: `0 0 20px ${C.greenGlow}` }}>OpenClaw is the computer.</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 4 — GAP VISUALIZER
   ════════════════════════════════════════════════════════════ */
function SceneGap({ onDone }) {
  const [show, setShow] = useState(false);
  const [complex, setComplex] = useState(false);
  const [anim, setAnim] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); setTimeout(() => setAnim(true), 1000); setTimeout(onDone, 16000); }, []);

  const ca = complex ? 43 : 11;
  const rows = [
    { label: "Human Actions", chat: ca, oc: 2, cp: complex ? 95 : 50, op: 8 },
    { label: "Time Required", chat: complex ? "3+ hours" : "47 min", oc: "Overnight (async)", cp: complex ? 90 : 55, op: 25 },
    { label: "Human Presence", chat: "Constant — every step", oc: "Not required", cp: 95, op: 10 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "32px 24px", opacity: show ? 1 : 0, transition: "opacity 0.8s" }}>
      <h2 style={{ fontFamily: FONT_HEAD, fontSize: 34, fontWeight: 700, color: C.white, marginBottom: 8 }}>The Gap</h2>
      <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.muted, marginBottom: 28 }}>Same task. Wildly different effort.</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
        <button onClick={() => setComplex(false)} style={{ background: !complex ? C.amber : "transparent", color: !complex ? C.navy : C.light, border: `1px solid ${C.amber}`, borderRadius: 24, padding: "10px 22px", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 15, fontWeight: 700, transition: "all 0.3s" }}>Simple Task</button>
        <button onClick={() => setComplex(true)} style={{ background: complex ? C.green : "transparent", color: complex ? C.navy : C.light, border: `1px solid ${C.green}`, borderRadius: 24, padding: "10px 22px", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 15, fontWeight: 700, transition: "all 0.3s" }}>Complex Enterprise Task</button>
      </div>
      <div style={{ width: "100%", maxWidth: 740, display: "flex", flexDirection: "column", gap: 28 }}>
        {rows.map((r, i) => (
          <div key={i}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.light, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>{r.label}</div>
            {[{ label: "Chatbot", val: r.chat, pct: r.cp, col: C.amber }, { label: "OpenClaw", val: r.oc, pct: r.op, col: C.green }].map((bar, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: j === 0 ? 6 : 0 }}>
                <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: bar.col, width: 85, textAlign: "right", flexShrink: 0, fontWeight: 700 }}>{bar.label}</span>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, height: 40, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 8, background: `linear-gradient(90deg, ${bar.col}, ${bar.col}88)`, width: anim ? `${bar.pct}%` : "0%", transition: `width 1.2s ease ${j*0.3}s`, display: "flex", alignItems: "center", paddingLeft: 14, minWidth: anim ? 140 : 0 }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.navy, fontWeight: 700, whiteSpace: "nowrap" }}>{bar.val}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {complex && <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.green, marginTop: 24, fontWeight: 700, animation: "fadeInUp 0.5s ease", textShadow: `0 0 10px ${C.greenGlow}` }}>The more complex the task, the more absurd the gap becomes.</p>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 5 — WHAT MAKES IT DIFFERENT
   ════════════════════════════════════════════════════════════ */
function SceneDiff({ onDone }) {
  const [show, setShow] = useState(false);
  const [vis, setVis] = useState([]);
  const props = [
    { icon: "💬", p: "Lives in WhatsApp / Telegram / Slack", d: "No browser tab. No login. It's where you already are." },
    { icon: "⚡", p: "Runs 24/7 without prompting", d: "A heartbeat scheduler wakes it. You don't have to." },
    { icon: "🧠", p: "Memory that grows over time", d: "Learns your preferences. Stops needing instructions." },
    { icon: "🌍", p: "Acts in the real world", d: "Negotiates with vendors. Files claims. Books meetings." },
  ];
  useEffect(() => { setTimeout(() => setShow(true), 200); props.forEach((_, i) => setTimeout(() => setVis(v => [...v, i]), 1000 + i * 1200)); setTimeout(onDone, 12000); }, []);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "32px 24px", opacity: show ? 1 : 0, transition: "opacity 0.8s" }}>
      <h2 style={{ fontFamily: FONT_HEAD, fontSize: 34, fontWeight: 700, color: C.white, marginBottom: 8 }}>What Makes It Different</h2>
      <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.muted, marginBottom: 36 }}>Four properties that don't exist in chatbots at all</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700, width: "100%" }}>
        {props.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, background: C.bgPanel, borderRadius: 14, padding: "18px 24px", border: `1px solid ${vis.includes(i) ? `${C.green}55` : C.border}`, opacity: vis.includes(i) ? 1 : 0, transform: vis.includes(i) ? "translateX(0)" : "translateX(-40px)", transition: "all 0.6s" }}>
            <span style={{ fontSize: 34 }}>{p.icon}</span>
            <div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 17, color: C.green, fontWeight: 700 }}>{p.p}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.light, marginTop: 3 }}>{p.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SCENE 6 — PUNCHLINE
   ════════════════════════════════════════════════════════════ */
function ScenePunch() {
  const [vis, setVis] = useState([]);
  const lines = [
    { t: `Jensen said OpenClaw is "as big a deal as HTML, as big a deal as Linux."`, s: "quote" },
    { t: "Here's the translation:", s: "label" },
    { t: "", s: "sp" },
    { t: "HTML gave everyone a way to publish.", s: "line" },
    { t: "Linux gave everyone a way to compute.", s: "line" },
    { t: "OpenClaw gives every company a way to act — without a human in the loop.", s: "hl" },
    { t: "", s: "sp" },
    { t: "In the PC era, you operated the computer.", s: "dim" },
    { t: "In the chatbot era, you operated the AI.", s: "amber" },
    { t: "In the OpenClaw era, the AI operates itself.", s: "green" },
    { t: "", s: "sp" },
    { t: "That's the new computer.", s: "final" },
  ];
  useEffect(() => { lines.forEach((_, i) => setTimeout(() => setVis(v => [...v, i]), 800 + i * 1200)); }, []);
  const gs = (s) => {
    const bHead = { fontFamily: FONT_HEAD, textAlign: "center", margin: "5px 0", lineHeight: 1.7 };
    const bBody = { fontFamily: FONT_BODY, textAlign: "center", margin: "5px 0", lineHeight: 1.7 };
    return {
      quote: { ...bBody, fontSize: 21, color: C.light },
      label: { ...bBody, fontSize: 17, color: C.muted, marginTop: 12 },
      line: { ...bBody, fontSize: 22, color: C.white, fontWeight: 500 },
      hl: { ...bHead, fontSize: 24, fontWeight: 700, color: C.green, marginTop: 4, textShadow: `0 0 25px ${C.greenGlow}` },
      dim: { ...bBody, fontSize: 19, color: C.muted },
      amber: { ...bBody, fontSize: 20, color: C.amber, textShadow: `0 0 10px ${C.amberGlow}` },
      green: { ...bBody, fontSize: 22, color: C.green, textShadow: `0 0 18px ${C.greenGlow}`, fontWeight: 700 },
      final: { ...bHead, fontSize: 46, fontWeight: 700, color: C.green, marginTop: 24, textShadow: `0 0 50px ${C.greenGlow}, 0 0 100px rgba(150,200,64,0.2)` },
      sp: { ...bBody, height: 16 },
    }[s] || bBody;
  };
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "32px 24px" }}>
      <div style={{ maxWidth: 780 }}>
        {lines.map((l, i) => (
          <p key={i} style={{ ...gs(l.s), opacity: vis.includes(i) ? 1 : 0, transform: vis.includes(i) ? "translateY(0)" : "translateY(14px)", transition: "all 0.8s ease" }}>{l.t}</p>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════ */
const LABELS = ["Quote", "Task", "Old", "New", "Gap", "Diff", "End"];

export default function TheNewComputer() {
  const [scene, setScene] = useState(0);
  const [manual, setManual] = useState(false);
  const N = 7;
  const go = (s) => { if (s >= 0 && s < N) setScene(s); };
  const done = () => { if (!manual) go(scene + 1); };

  return (
    <div style={{ width: "100%", height: "100vh", background: C.bg, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
        @keyframes blink { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 8px rgba(150,200,64,.3)} 50%{box-shadow:0 0 24px rgba(150,200,64,.6)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes flowDots { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1.4)} }
        @keyframes heartbeat { 0%,100%{transform:scale(1);opacity:.6} 25%{transform:scale(1.4);opacity:1} 35%{transform:scale(1);opacity:.8} 45%{transform:scale(1.3);opacity:1} 55%{transform:scale(1);opacity:.6} }
        *{box-sizing:border-box} body{margin:0;padding:0}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
      `}</style>
      <div style={{ position: "absolute", inset: 0 }}>
        {scene===0 && <SceneQuote onDone={done}/>}
        {scene===1 && <SceneTask onDone={done}/>}
        {scene===2 && <SceneOld onDone={done}/>}
        {scene===3 && <SceneNew onDone={done}/>}
        {scene===4 && <SceneGap onDone={done}/>}
        {scene===5 && <SceneDiff onDone={done}/>}
        {scene===6 && <ScenePunch/>}
      </div>
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, zIndex: 10, background: "rgba(14,21,56,.85)", backdropFilter: "blur(10px)", borderRadius: 30, padding: "8px 18px", border: `1px solid ${C.border}` }}>
        <button onClick={() => go(scene-1)} disabled={scene===0} style={{ background:"none", border:"none", color: scene===0?C.dim:C.white, cursor: scene===0?"default":"pointer", fontSize:18, padding:"2px 8px", fontWeight:700 }}>◀</button>
        {Array.from({length:N}).map((_,i) => (
          <div key={i} onClick={() => go(i)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer" }}>
            <div style={{ width: scene===i?22:9, height:9, borderRadius:5, background: scene===i?C.green:"rgba(255,255,255,.15)", transition:"all .3s", boxShadow: scene===i?`0 0 10px ${C.green}`:"none" }}/>
            {scene===i && <span style={{ fontFamily:FONT_BODY, fontSize:9, color:C.green, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{LABELS[i]}</span>}
          </div>
        ))}
        <button onClick={() => go(scene+1)} disabled={scene===N-1} style={{ background:"none", border:"none", color: scene===N-1?C.dim:C.white, cursor: scene===N-1?"default":"pointer", fontSize:18, padding:"2px 8px", fontWeight:700 }}>▶</button>
        <div style={{ width:1, height:18, background:C.border, margin:"0 4px" }}/>
        <button onClick={() => setManual(!manual)} style={{ background: manual?C.greenDim:"transparent", border:`1px solid ${manual?C.green:C.dim}`, color: manual?C.green:C.light, borderRadius:14, padding:"3px 12px", cursor:"pointer", fontFamily:FONT_BODY, fontSize:10, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>{manual?"Manual":"Auto"}</button>
      </div>
    </div>
  );
}
