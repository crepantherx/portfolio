import { useState, useRef, useEffect, useCallback } from "react";

const OPTS = [
  { id: "sgd",      label: "SGD",       color: "#E24B4A" },
  { id: "momentum", label: "Momentum",  color: "#378ADD" },
  { id: "adagrad",  label: "Adagrad",   color: "#1D9E75" },
  { id: "rmsprop",  label: "RMSprop",   color: "#EF9F27" },
  { id: "adam",     label: "Adam",      color: "#7F77DD" },
];

const LANDSCAPES = {
  bumpy:  (x) => 0.15 * x * x + 0.8 * Math.sin(3.5 * x) + 0.06 * x,
  valley: (x) => 0.5 * x * x + 0.08 * Math.sin(4 * x),
  ravine: (x) => 0.04 * x * x + 1.8 * Math.sin(0.8 * x + 0.5) * Math.exp(-0.04 * Math.abs(x)),
  saddle: (x) => 0.6 * x * x - 0.4 * x - 0.4 * Math.sin(2 * x),
};

function getLoss(key, x) { return LANDSCAPES[key](x); }
function grad(key, x) { const h = 0.0001; return (getLoss(key, x + h) - getLoss(key, x - h)) / (2 * h); }
function clamp(x) { return Math.max(-5.2, Math.min(5.2, x)); }

function findGlobalMin(key) {
  let best = Infinity, bestX = 0;
  for (let i = -520; i <= 520; i++) {
    const x = i / 100, y = getLoss(key, x);
    if (y < best) { best = y; bestX = x; }
  }
  return { x: bestX, y: best };
}

function getLandscape(key) {
  const domain = { min: -4.5, max: 4.5 };
  const pts = [];
  for (let i = 0; i <= 500; i++) {
    const x = domain.min + (i / 500) * (domain.max - domain.min);
    pts.push({ x, y: getLoss(key, x) });
  }
  const ys = pts.map(p => p.y);
  let ymin = Math.min(...ys), ymax = Math.max(...ys);
  const ypad = (ymax - ymin) * 0.22 + 0.2;
  return { pts, ymin: ymin - ypad, ymax: ymax + ypad, domain };
}

function simulateAll(key, lr, x0) {
  const eps = 1e-8, steps = 100;
  function run(initState, stepFn) {
    let s = initState(x0);
    const path = [{ x: x0, y: getLoss(key, x0) }];
    for (let i = 0; i < steps; i++) {
      const g = grad(key, s.x);
      s = stepFn(s, g, lr, i + 1, eps);
      s.x = clamp(s.x);
      path.push({ x: s.x, y: getLoss(key, s.x) });
    }
    return path;
  }
  return {
    sgd:      run(x0 => ({ x: x0 }), (s, g, lr) => ({ x: s.x - lr * g })),
    momentum: run(x0 => ({ x: x0, v: 0 }), (s, g, lr) => { const v = 0.85 * s.v - lr * g; return { x: s.x + v, v }; }),
    adagrad:  run(x0 => ({ x: x0, G: 0 }), (s, g, lr, t, eps) => { const G = s.G + g * g; return { x: s.x - (lr / Math.sqrt(G + eps)) * g, G }; }),
    rmsprop:  run(x0 => ({ x: x0, v: 0 }), (s, g, lr, t, eps) => { const v = 0.9 * s.v + 0.1 * g * g; return { x: s.x - (lr / Math.sqrt(v + eps)) * g, v }; }),
    adam:     run(x0 => ({ x: x0, m: 0, v: 0 }), (s, g, lr, t, eps) => {
      const m = 0.9 * s.m + 0.1 * g, v = 0.999 * s.v + 0.001 * g * g;
      const mh = m / (1 - Math.pow(0.9, t)), vh = v / (1 - Math.pow(0.999, t));
      return { x: s.x - (lr / Math.sqrt(vh + eps)) * mh, m, v };
    }),
  };
}

const STEP_FNS = {
  sgd:      { init: x0 => ({ x: x0 }), step: (s, g, lr) => ({ x: s.x - lr * g }) },
  momentum: { init: x0 => ({ x: x0, v: 0 }), step: (s, g, lr) => { const v = 0.85 * s.v - lr * g; return { x: s.x + v, v }; } },
  adagrad:  { init: x0 => ({ x: x0, G: 0 }), step: (s, g, lr, t, eps) => { const G = s.G + g * g; return { x: s.x - (lr / Math.sqrt(G + eps)) * g, G }; } },
  rmsprop:  { init: x0 => ({ x: x0, v: 0 }), step: (s, g, lr, t, eps) => { const v = 0.9 * s.v + 0.1 * g * g; return { x: s.x - (lr / Math.sqrt(v + eps)) * g, v }; } },
  adam:     { init: x0 => ({ x: x0, m: 0, v: 0 }), step: (s, g, lr, t, eps) => {
    const m = 0.9 * s.m + 0.1 * g, v = 0.999 * s.v + 0.001 * g * g;
    const mh = m / (1 - Math.pow(0.9, t)), vh = v / (1 - Math.pow(0.999, t));
    return { x: s.x - (lr / Math.sqrt(vh + eps)) * mh, m, v };
  }},
};

const W = 700, H = 280, PAD = { l: 46, r: 16, t: 24, b: 32 };

function mapX(x, domain) { return PAD.l + (x - domain.min) / (domain.max - domain.min) * (W - PAD.l - PAD.r); }
function mapY(y, ymin, ymax) { return PAD.t + (1 - (y - ymin) / (ymax - ymin)) * (H - PAD.t - PAD.b); }

function drawBase(ctx, L, key) {
  const { pts, ymin, ymax, domain } = L;
  ctx.clearRect(0, 0, W, H);
  ctx.beginPath();
  pts.forEach((p, i) => { const cx = mapX(p.x, domain), cy = mapY(p.y, ymin, ymax); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); });
  ctx.lineTo(mapX(pts[pts.length - 1].x, domain), H - PAD.b);
  ctx.lineTo(mapX(pts[0].x, domain), H - PAD.b);
  ctx.closePath(); ctx.fillStyle = "rgba(128,128,128,0.08)"; ctx.fill();
  ctx.beginPath();
  pts.forEach((p, i) => { const cx = mapX(p.x, domain), cy = mapY(p.y, ymin, ymax); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); });
  ctx.strokeStyle = "rgba(128,128,128,0.45)"; ctx.lineWidth = 2; ctx.stroke();
  const gm = findGlobalMin(key);
  const gcx = mapX(gm.x, domain), gcy = mapY(gm.y, ymin, ymax);
  ctx.beginPath(); ctx.arc(gcx, gcy, 6, 0, Math.PI * 2); ctx.fillStyle = "#0a6640"; ctx.fill();
  ctx.fillStyle = "#0a6640"; ctx.font = "11px sans-serif"; ctx.fillText("global min", gcx + 9, gcy + 4);
  ctx.strokeStyle = "rgba(128,128,128,0.15)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD.l, H - PAD.b); ctx.lineTo(W - PAD.r, H - PAD.b); ctx.stroke();
  ctx.fillStyle = "rgba(128,128,128,0.5)"; ctx.font = "11px sans-serif";
  ctx.fillText("← parameter space →", W / 2 - 55, H - 6);
}

function MultiPanel() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [n, setN] = useState(10);
  const [lr, setLr] = useState(10);
  const [landscape, setLandscape] = useState("bumpy");
  const [stats, setStats] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawBase(ctx, getLandscape(landscape), landscape);
  }, [landscape]);

  function runMulti() {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const lrVal = lr / 100;
    const runs = Array.from({ length: n }, () => {
      const x0 = Math.random() * 8.8 - 4.4;
      return { x0, traces: simulateAll(landscape, lrVal, x0) };
    });
    setStats(null); setRunning(true);
    let step = 0;
    const L = getLandscape(landscape);
    const gm = findGlobalMin(landscape);
    const ctx = canvasRef.current.getContext("2d");

    function frame() {
      drawBase(ctx, L, landscape);
      const gc = {}, bl = {};
      OPTS.forEach(o => { gc[o.id] = 0; bl[o.id] = Infinity; });
      runs.forEach(run => {
        const sx = mapX(run.x0, L.domain), sy = mapY(getLoss(landscape, run.x0), L.ymin, L.ymax);
        ctx.beginPath(); ctx.arc(sx, sy, 3, 0, Math.PI * 2); ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fill();
        OPTS.forEach(opt => {
          const path = run.traces[opt.id], end = Math.min(step, path.length - 1);
          ctx.beginPath();
          for (let i = 0; i <= end; i++) { const p = path[i], cx = mapX(p.x, L.domain), cy = mapY(p.y, L.ymin, L.ymax); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
          ctx.strokeStyle = opt.color; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.32; ctx.stroke(); ctx.globalAlpha = 1;
          if (step >= 100) { const cur = path[path.length - 1]; if (Math.abs(cur.x - gm.x) < 0.35) gc[opt.id]++; if (cur.y < bl[opt.id]) bl[opt.id] = cur.y; }
        });
      });
      if (step >= 100) {
        setStats(OPTS.map(o => ({ ...o, count: gc[o.id], pct: Math.round(gc[o.id] / n * 100) })));
        setRunning(false); return;
      }
      step++; animRef.current = requestAnimationFrame(frame);
    }
    frame();
  }

  function reset() {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setStats(null); setRunning(false);
    const ctx = canvasRef.current.getContext("2d");
    drawBase(ctx, getLandscape(landscape), landscape);
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        <Row label="Attempts (N)"><input type="range" min={1} max={30} value={n} step={1} onChange={e => setN(+e.target.value)} style={{ flex: 1 }} /><Val>{n}</Val></Row>
        <Row label="Learning rate"><input type="range" min={1} max={30} value={lr} step={1} onChange={e => setLr(+e.target.value)} style={{ flex: 1 }} /><Val>{(lr / 100).toFixed(2)}</Val></Row>
        <Row label="Landscape">
          <select value={landscape} onChange={e => { setLandscape(e.target.value); reset(); }} style={selStyle}>
            <option value="bumpy">Bumpy (local minima)</option>
            <option value="valley">Simple valley</option>
            <option value="ravine">Ravine</option>
            <option value="saddle">Saddle point</option>
          </select>
        </Row>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Btn onClick={runMulti} disabled={running}>Run {n} random attempts</Btn>
        <Btn onClick={reset}>Reset</Btn>
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: "100%", borderRadius: 8, display: "block" }} />
      {stats && (
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 10 }}>
          {stats.map(o => (
            <div key={o.id} style={statCard}>
              <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: o.color, display: "inline-block" }} />
                {o.label}
              </div>
              <div style={{ color: "#888", fontSize: 12 }}>found global: <strong>{o.count}/{n}</strong> ({o.pct}%)</div>
              <div style={{ marginTop: 5, height: 5, background: "rgba(128,128,128,0.15)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: o.pct + "%", background: o.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StepPanel() {
  const canvasRef = useRef(null);
  const autoRef = useRef(null);
  const simRef = useRef(null);
  const pathRef = useRef([]);
  const stepRef = useRef(0);

  const [optId, setOptId] = useState("sgd");
  const [lr, setLr] = useState(10);
  const [landscape, setLandscape] = useState("bumpy");
  const [startX, setStartX] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const [info, setInfo] = useState(null);
  const [hint, setHint] = useState("Click on the canvas to place a start point.");

  const redraw = useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");
    const L = getLandscape(landscape);
    drawBase(ctx, L, landscape);
    const { domain, ymin, ymax } = L;
    const opt = OPTS.find(o => o.id === optId);

    if (pathRef.current.length > 0) {
      const x0 = pathRef.current[0].x;
      const sx = mapX(x0, domain), sy = mapY(getLoss(landscape, x0), ymin, ymax);
      ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fill();
      ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(sx, sy - 20); ctx.lineTo(sx, sy);
      ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.font = "11px sans-serif"; ctx.fillText("start", sx - 12, sy - 26);
    }

    if (pathRef.current.length > 1) {
      ctx.beginPath();
      pathRef.current.forEach((p, i) => { const cx = mapX(p.x, domain), cy = mapY(p.y, ymin, ymax); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); });
      ctx.strokeStyle = opt.color; ctx.lineWidth = 2.5; ctx.globalAlpha = 0.85; ctx.stroke(); ctx.globalAlpha = 1;
      const cur = pathRef.current[pathRef.current.length - 1];
      const cx = mapX(cur.x, domain), cy = mapY(cur.y, ymin, ymax);
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fillStyle = opt.color; ctx.fill();
      const gm = findGlobalMin(landscape);
      setInfo({ opt, cur, isGlobal: Math.abs(cur.x - gm.x) < 0.35, step: stepRef.current });
    }
  }, [landscape, optId]);

  useEffect(() => { redraw(); }, [landscape, optId]);

  function handleCanvasClick(e) {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; setAutoRunning(false); }
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const px = (e.clientX - rect.left) * scaleX;
    const L = getLandscape(landscape);
    let x0 = L.domain.min + (px - PAD.l) / (W - PAD.l - PAD.r) * (L.domain.max - L.domain.min);
    x0 = Math.max(L.domain.min, Math.min(L.domain.max, x0));
    const lrVal = lr / 100;
    simRef.current = { state: STEP_FNS[optId].init(x0), t: 0 };
    pathRef.current = [{ x: x0, y: getLoss(landscape, x0) }];
    stepRef.current = 0;
    setStartX(x0); setStepCount(0); setInfo(null);
    setHint(`Start at x = ${x0.toFixed(2)}. Press Step or Auto-run.`);
    redraw();
  }

  function doStep() {
    if (!simRef.current || stepRef.current >= 100) return false;
    const eps = 1e-8;
    const g = grad(landscape, simRef.current.state.x);
    simRef.current.t++;
    simRef.current.state = STEP_FNS[optId].step(simRef.current.state, g, lr / 100, simRef.current.t, eps);
    simRef.current.state.x = clamp(simRef.current.state.x);
    stepRef.current++;
    pathRef.current.push({ x: simRef.current.state.x, y: getLoss(landscape, simRef.current.state.x) });
    setStepCount(stepRef.current);
    redraw();
    if (stepRef.current >= 100) { setHint("Reached 100 steps. Reset to try again."); return false; }
    return true;
  }

  function toggleAuto() {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; setAutoRunning(false); return; }
    if (!simRef.current || stepRef.current >= 100) return;
    setAutoRunning(true);
    autoRef.current = setInterval(() => { if (!doStep()) { clearInterval(autoRef.current); autoRef.current = null; setAutoRunning(false); } }, 60);
  }

  function reset() {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
    simRef.current = null; pathRef.current = []; stepRef.current = 0;
    setStartX(null); setStepCount(0); setAutoRunning(false); setInfo(null);
    setHint("Click on the canvas to place a start point.");
    const ctx = canvasRef.current.getContext("2d");
    drawBase(ctx, getLandscape(landscape), landscape);
  }

  const opt = OPTS.find(o => o.id === optId);
  const canStep = startX !== null && stepCount < 100;

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Choose optimizer</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {OPTS.map(o => (
            <button key={o.id} onClick={() => { setOptId(o.id); reset(); }}
              style={{ padding: "6px 13px", fontSize: 12, borderRadius: 6, border: "0.5px solid rgba(128,128,128,0.4)", cursor: "pointer", background: optId === o.id ? o.color : "transparent", color: optId === o.id ? "#fff" : "inherit", fontWeight: optId === o.id ? 500 : 400 }}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        <Row label="Learning rate"><input type="range" min={1} max={30} value={lr} step={1} onChange={e => setLr(+e.target.value)} style={{ flex: 1 }} /><Val>{(lr / 100).toFixed(2)}</Val></Row>
        <Row label="Landscape">
          <select value={landscape} onChange={e => { setLandscape(e.target.value); reset(); }} style={selStyle}>
            <option value="bumpy">Bumpy (local minima)</option>
            <option value="valley">Simple valley</option>
            <option value="ravine">Ravine</option>
            <option value="saddle">Saddle point</option>
          </select>
        </Row>
      </div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{hint}</p>
      <canvas ref={canvasRef} width={W} height={H} onClick={handleCanvasClick}
        style={{ width: "100%", borderRadius: 8, display: "block", cursor: "crosshair" }} />
      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        <Btn onClick={doStep} disabled={!canStep || autoRunning}>Step forward</Btn>
        <Btn onClick={toggleAuto} disabled={!canStep}>{autoRunning ? "Pause" : "Auto-run"}</Btn>
        <Btn onClick={reset}>Reset</Btn>
      </div>
      {info && (
        <div style={{ ...statCard, marginTop: 12, maxWidth: 340 }}>
          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: info.opt.color, display: "inline-block" }} />
            {info.opt.label}
          </div>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>
            Step {info.step} / 100<br />
            x = {info.cur.x.toFixed(4)}<br />
            loss = {info.cur.y.toFixed(4)}<br />
            <span style={{ color: info.isGlobal ? "#0a6640" : "#888", fontWeight: info.isGlobal ? 500 : 400 }}>
              {info.isGlobal ? "✓ Found global minimum!" : "Searching…"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#888" }}><label style={{ width: 110, flexShrink: 0 }}>{label}</label>{children}</div>;
}
function Val({ children }) { return <span style={{ width: 44, textAlign: "right", fontWeight: 500, fontSize: 13, color: "inherit" }}>{children}</span>; }
function Btn({ children, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled} style={{ padding: "7px 15px", fontSize: 13, borderRadius: 6, border: "0.5px solid rgba(128,128,128,0.4)", background: "transparent", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}>{children}</button>;
}
const selStyle = { flex: 1, padding: "5px 8px", borderRadius: 6, border: "0.5px solid rgba(128,128,128,0.4)", fontSize: 13, background: "transparent" };
const statCard = { background: "rgba(128,128,128,0.07)", borderRadius: 8, padding: "10px 12px", flex: 1, minWidth: 120 };

export default function App() {
  const [tab, setTab] = useState("multi");
  return (
    <div style={{ padding: 16, fontFamily: "sans-serif", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[["multi", "Random restarts (N attempts)"], ["step", "Step-by-step (single optimizer)"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: "7px 16px", fontSize: 13, borderRadius: 6, cursor: "pointer",
            border: tab === id ? "none" : "0.5px solid rgba(128,128,128,0.4)",
            background: tab === id ? "#111" : "transparent",
            color: tab === id ? "#fff" : "inherit", fontWeight: tab === id ? 500 : 400,
          }}>{label}</button>
        ))}
      </div>
      {tab === "multi" ? <MultiPanel /> : <StepPanel />}
    </div>
  );
}
