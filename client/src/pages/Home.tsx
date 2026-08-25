/* Velvet Orbit: asymmetric private-world dashboard; dark plum surfaces, orbit rose actions, editorial type, and small shared rituals. */
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Flame,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Send,
  Sparkles,
  Trophy,
  Video,
  Volume2,
  WandSparkles,
  Zap,
} from "lucide-react";

const orbitMark = "/manus-storage/loveloop-orbit-mark_0f983605.png";
const coupleImage = "/manus-storage/loveloop-dashboard-couple_bcc8b708.jpg";
const memoryImage = "/manus-storage/loveloop-memory-polaroids_d72e22aa.jpg";

type NavItem = { label: string; icon: typeof LayoutDashboard };

const navItems: NavItem[] = [
  { label: "Today", icon: LayoutDashboard },
  { label: "Date night", icon: Sparkles },
  { label: "Memory vault", icon: ImageIcon },
  { label: "Games", icon: Trophy },
];

const activities = [
  { title: "One thing I love about you", type: "Question", time: "8 min", icon: Heart, color: "rose" },
  { title: "Guess my answer", type: "Game", time: "12 min", icon: CircleHelp, color: "lavender" },
  { title: "Recreate your first date", type: "Challenge", time: "20 min", icon: WandSparkles, color: "apricot" },
];

export default function Home() {
  const [active, setActive] = useState("Today");
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const showComingSoon = (label: string) => toast(`${label} is warming up`, { description: "This private space is coming in the next loop." });

  const completeLoop = () => {
    setCompleted(true);
    toast("Loop complete", { description: "+120 Love XP · your 8 day streak is safe." });
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setSentMessages((items) => [...items, message.trim()]);
    setMessage("");
    toast("Sent to Alex", { description: "A little signal crossed the distance." });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <img src={orbitMark} alt="LoveLoop mark" className="brand-mark" />
          <span>Love<span>Loop</span></span>
        </div>
        <div className="couple-mini">
          <div className="avatar-pair"><span className="avatar avatar-sage">M</span><span className="avatar avatar-rose">A</span></div>
          <div><strong>Maya & Alex</strong><small>together since 2024</small></div>
          <button aria-label="More couple options" className="icon-btn" onClick={() => showComingSoon("Couple settings")}><MoreHorizontal size={16} /></button>
        </div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => { setActive(label); if (label !== "Today") showComingSoon(label); }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{label === "Date night" && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-streak"><span className="streak-icon"><Flame size={17} fill="currentColor" /></span><div><small>Current streak</small><strong>7 days</strong></div><ArrowUpRight size={16} /></div>
          <button className="profile-row" onClick={() => showComingSoon("Profile")}><span className="avatar avatar-sage">M</span><span><strong>Maya</strong><small>Personal space</small></span><ChevronRight size={15} /></button>
        </div>
      </aside>

      <main className="main-canvas">
        <header className="topbar">
          <div className="crumb"><span>Tuesday, September 17</span><span className="live-pill"><i /> both online</span></div>
          <div className="top-actions"><button className="icon-btn notify-btn" aria-label="Notifications" onClick={() => toast("You're all caught up", { description: "No new signals from Alex yet." })}><Bell size={18} /><b>2</b></button><button className="icon-btn" aria-label="Start a call" onClick={() => showComingSoon("Video calls")}><Video size={18} /></button></div>
        </header>

        <div className="welcome-row"><div><p className="eyebrow">YOUR PRIVATE PLAYGROUND <span>✦</span></p><h1>Good morning, Maya <em>♡</em></h1><p className="subtle">Make the miles feel smaller, one little ritual at a time.</p></div><button className="date-night-btn" onClick={() => showComingSoon("Date night")}><Sparkles size={16} /> Plan a date night <ArrowUpRight size={15} /></button></div>

        <section className="hero-grid">
          <article className={`loop-card ${completed ? "is-complete" : ""}`}>
            <div className="orbit-decoration"><span /><span /><span /></div>
            <div className="loop-card-content"><div className="card-topline"><span className="eyebrow light">TODAY'S LOOP <i className="pulse-dot" /></span><span className="coordinate">40.71° N · 74.00° W</span></div><div className="loop-question"><span className="question-mark">“</span><h2>{completed ? "That felt good, didn't it?" : "Send each other a voice note describing your perfect day together."}</h2></div><p className="loop-helper">{completed ? "You and Alex added another small memory to the vault." : "No overthinking. Just press record and let them in."}</p><div className="loop-actions">{completed ? <button className="primary-action complete-action"><Check size={17} /> Loop complete</button> : <button className="primary-action" onClick={completeLoop}><Volume2 size={17} /> Start challenge <span>↗</span></button>}<button className="ghost-action" onClick={() => showComingSoon("Challenge details")}><CircleHelp size={16} /> How it works</button></div></div>
            <div className="loop-footer"><span><Clock3 size={14} /> 8–10 min</span><span><Zap size={14} /> +120 XP</span><span className="category-label">DEEP CONNECTION</span></div>
          </article>
          <div className="side-stack">
            <article className="status-card"><div className="status-head"><span className="eyebrow">YOUR LOOP</span><span className="status-live"><i /> in sync</span></div><div className="orbit-avatars"><span className="avatar avatar-sage">M</span><div className="orbit-lines"><span /><span /><span /></div><span className="avatar avatar-rose">A</span></div><div className="status-copy"><strong>742 <small>days together</small></strong><p>New York <span>↔</span> London</p></div><button className="text-link" onClick={() => showComingSoon("Couple profile")}>Open our story <ArrowUpRight size={14} /></button></article>
            <article className="xp-card"><div><span className="eyebrow">LOVE XP</span><strong>12,450</strong></div><div className="xp-badge"><Trophy size={15} /> <span>Level 4<br /><b>Unbreakable</b></span></div><div className="progress-track"><span style={{ width: "68%" }} /></div><small>550 XP to level 5 · Forever Loop</small></article>
          </div>
        </section>

        <section className="lower-grid">
          <article className="panel activity-panel"><div className="section-heading"><div><p className="eyebrow">UP NEXT</p><h3>Keep the loop going</h3></div><button className="round-plus" aria-label="Add activity" onClick={() => showComingSoon("Custom activity")}><Plus size={16} /></button></div><div className="activity-list">{activities.map(({ title, type, time, icon: Icon, color }) => <button className="activity-row" key={title} onClick={() => showComingSoon(title)}><span className={`activity-icon ${color}`}><Icon size={18} /></span><span className="activity-info"><strong>{title}</strong><small>{type} · {time}</small></span><ChevronRight size={16} /></button>)}</div><button className="view-all" onClick={() => showComingSoon("All activities")}>See all activities <ArrowUpRight size={14} /></button></article>
          <article className="panel memory-panel"><div className="section-heading"><div><p className="eyebrow">MEMORY VAULT</p><h3>Little things, kept close</h3></div><button className="text-link" onClick={() => showComingSoon("Memory vault")}>View all <ArrowUpRight size={14} /></button></div><div className="memory-visual"><img src={memoryImage} alt="Snapshots from the memory vault" /><div className="memory-note"><Heart size={15} fill="currentColor" /><span>“the best kind of ordinary”</span><small>saved 2 days ago</small></div></div><div className="memory-bottom"><span><ImageIcon size={15} /> 48 memories</span><button onClick={() => showComingSoon("Memory upload")}><Plus size={15} /> Add a memory</button></div></article>
          <article className="panel message-panel"><div className="section-heading"><div><p className="eyebrow">PRIVATE SIGNAL</p><h3>Leave a little note</h3></div><span className="online-label"><i /> Alex is online</span></div><div className="message-preview"><div className="avatar avatar-rose">A</div><div><p>“saving this one for our next slow Sunday…”</p><small>Alex · 4 min ago</small></div></div>{sentMessages.map((item, index) => <div className="message-preview mine" key={`${item}-${index}`}><div className="avatar avatar-sage">M</div><div><p>{item}</p><small>Just now · delivered</small></div></div>)}<div className="composer"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} placeholder="Send something sweet…" aria-label="Message Alex" /><button aria-label="Send message" onClick={sendMessage}><Send size={16} /></button></div><div className="composer-tools"><button onClick={() => showComingSoon("Photo sharing")}><ImageIcon size={14} /> photo</button><button onClick={() => showComingSoon("Voice messages")}><Volume2 size={14} /> voice note</button></div></article>
        </section>

        <section className="call-strip" onClick={() => showComingSoon("Love call")}><div className="call-art"><img src={coupleImage} alt="Two partners connected across the distance" /><div className="call-overlay"><span className="avatar avatar-sage">M</span><span className="connecting-line">↗</span><span className="avatar avatar-rose">A</span></div></div><div className="call-copy"><p className="eyebrow">A LITTLE CLOSER</p><h3>Call your love <em>♡</em></h3><p>Bring a game into the call, or just be in the same room for a while.</p></div><button className="call-button">Open love call <Play size={14} fill="currentColor" /></button></section>
        <footer className="footer-note"><span>LoveLoop · made for the two of you</span><span>Private by design <Heart size={12} fill="currentColor" /></span></footer>
      </main>
      <div className="mobile-dock">{navItems.slice(0, 4).map(({ label, icon: Icon }) => <button key={label} className={active === label ? "active" : ""} onClick={() => { setActive(label); if (label !== "Today") showComingSoon(label); }}><Icon size={18} /><span>{label}</span></button>)}</div>
    </div>
  );
}
