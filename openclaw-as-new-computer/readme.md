# The New Computer — Interactive Simulation

An animated, multi-scene interactive simulation comparing the **Chatbot Era** vs the **OpenClaw Era**, inspired by Jensen Huang's quote at NVIDIA GTC 2026.

Built for [AI&Beyond](https://www.aiandbeyond.co) enterprise AI literacy bootcamps.

---

## What This Simulation Does

This is a **7-scene animated experience** that walks a bootcamp audience through the shift from chatbots to autonomous AI agents.

| Scene | What It Shows |
|-------|--------------|
| **Quote** | Jensen Huang's "This is the new computer" quote, revealed line by line |
| **Task** | A single task given to both systems: competitor research + strategy memo + team meeting |
| **Old Computer** | The Chatbot Era — 11 back-and-forth exchanges, 47 minutes, human present throughout |
| **New Computer** | The OpenClaw Era — 1 WhatsApp message, overnight autonomous execution, morning result |
| **Gap** | Animated bar chart comparing actions, time, and human presence (with Simple/Complex toggle) |
| **Different** | 4 properties that don't exist in chatbots: messaging-native, 24/7, memory, real-world action |
| **Punchline** | "HTML → publish. Linux → compute. OpenClaw → act." Ending with "That's the new computer." |

---

## Key Features

- **Auto-play mode** — scenes advance automatically with generous reading pauses (~2 min total runtime)
- **Manual mode** — navigate with arrows or click any scene dot
- **Brand-aligned** — Yellow Green (#96c840), Space Cadet (#121a44), Platinum (#e5e6e6) palette with Poppins + Roboto fonts
- **Mobile-friendly** — large fonts, responsive layout
- **Circuit board aesthetic** — agent network uses grid overlay pattern reinforcing the "computer" metaphor
- **Heartbeat animation** — pulsing indicator shows OpenClaw running overnight while the human sleeps
- **Memory layer** — entries appear one by one showing the agent learning preferences in real time
- **WhatsApp phone mockup** — realistic phone UI makes the "one message" concept tangible

---

## The Concept

### The Old Computer (Chatbot Era)

You give the chatbot a task. It responds. You read the response, decide what to do next, type the next prompt. Repeat 11 times. You are the memory. You are the orchestrator. **You are the computer.**

### The New Computer (OpenClaw Era)

You send one WhatsApp message. The OpenClaw agent spawns 4 sub-agents (Research, Pricing, Memo, Calendar). They work overnight while you sleep. Morning: one notification with everything done. **OpenClaw is the computer.**

---

## Tech Stack

- **React (JSX)** — single file component, no build step required
- **No external dependencies** beyond Google Fonts (Poppins, Roboto)
- **CSS keyframe animations** — no animation library needed
- Designed to run in any React environment or as a **Claude.ai artifact**

---

## How to Use

### In Claude.ai
Upload `the-new-computer.jsx` and it renders as an interactive artifact.

### In a React project
```jsx
import TheNewComputer from './the-new-computer';

function App() {
  return <TheNewComputer />;
}
```

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Yellow Green | `#96c840` | OpenClaw accent, highlights, glows |
| Space Cadet | `#121a44` | Dark backgrounds, panels |
| Platinum | `#e5e6e6` | Body text, descriptions |
| Warm Gold | `#e8a840` | Chatbot era accent |

---

## File Structure
