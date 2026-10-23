import type { IllustrationKind } from "@/types/portfolio";
import type { ReactNode } from "react";

const c = {
  bg: "var(--preview-bg)",
  panel: "var(--surface)",
  raised: "var(--surface-elevated)",
  line: "var(--border-strong)",
  text: "var(--foreground)",
  muted: "var(--muted)",
  accent: "var(--accent)",
  ink: "var(--accent-ink)",
};

const font = "ui-sans-serif, system-ui, sans-serif";

function Label({ x, y, children, size = 11, color = c.text, weight = 500 }: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  color?: string;
  weight?: number;
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} fontFamily={font} fontWeight={weight}>
      {children}
    </text>
  );
}

function Bar({ x, y, w, h = 6, color = c.line, r = 3 }: {
  x: number;
  y: number;
  w: number;
  h?: number;
  color?: string;
  r?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={color} />;
}

function Panel({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={c.panel} stroke={c.line} strokeOpacity={0.6} />
      {children}
    </g>
  );
}

function Pill({ x, y, text, tone = "neutral" }: { x: number; y: number; text: string; tone?: "accent" | "neutral" }) {
  const w = text.length * 6 + 16;
  return (
    <g>
      <rect x={x} y={y} width={w} height={18} rx={9} fill={tone === "accent" ? c.accent : c.raised} />
      <Label x={x + 8} y={y + 12.5} size={9.5} color={tone === "accent" ? "#161816" : c.muted}>
        {text}
      </Label>
    </g>
  );
}

function AppShell({ title, nav, active = 0, children }: {
  title: string;
  nav: string[];
  active?: number;
  children: ReactNode;
}) {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden>
      <rect width="800" height="500" fill={c.bg} />
      <rect width="168" height="500" fill={c.panel} />
      <line x1="168" y1="0" x2="168" y2="500" stroke={c.line} strokeOpacity={0.6} />
      <rect x="20" y="22" width="22" height="22" rx="6" fill={c.accent} />
      <Label x={50} y={38} size={12} weight={600}>{title}</Label>
      {nav.map((item, i) => (
        <g key={item}>
          {i === active ? <rect x="12" y={70 + i * 34} width="144" height="28" rx="6" fill={c.raised} /> : null}
          <rect x="24" y={79 + i * 34} width="10" height="10" rx="3" fill={i === active ? c.ink : c.line} />
          <Label x={44} y={88 + i * 34} size={11} color={i === active ? c.text : c.muted}>{item}</Label>
        </g>
      ))}
      <rect x="190" y="18" width="240" height="28" rx="6" fill={c.panel} stroke={c.line} strokeOpacity={0.6} />
      <Bar x={204} y={29} w={110} />
      <circle cx="764" cy="32" r="13" fill={c.raised} />
      {children}
    </svg>
  );
}

function Logistics() {
  const rows: [string, string, "accent" | "neutral"][] = [
    ["TR-1042", "In transit", "accent"],
    ["TR-1041", "Delivered", "neutral"],
    ["TR-1039", "Scheduled", "neutral"],
    ["TR-1036", "In transit", "accent"],
  ];
  return (
    <AppShell title="Transport" nav={["Dashboard", "Trips", "Vehicles", "Drivers", "Routes", "Reports"]}>
      {["Active trips", "Vehicles", "Deliveries"].map((label, i) => (
        <Panel key={label} x={190 + i * 196} y={64} w={184} h={70}>
          <Label x={206 + i * 196} y={88} size={10} color={c.muted}>{label}</Label>
          <Bar x={206 + i * 196} y={102} w={60} h={14} color={c.text} r={4} />
          <Bar x={206 + i * 196} y={122} w={120} h={4} color={i === 0 ? c.accent : c.line} />
        </Panel>
      ))}
      <Panel x={190} y={150} w={300} h={330}>
        <Label x={206} y={174} size={11} weight={600}>Route overview</Label>
        <path d="M230 420 C 260 360, 320 380, 340 320 S 420 260, 450 210" fill="none" stroke={c.ink} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 0" />
        <path d="M230 260 C 280 280, 300 230, 360 240" fill="none" stroke={c.line} strokeWidth="2" strokeDasharray="5 5" />
        {[[230, 420], [340, 320], [450, 210]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill={c.panel} stroke={c.ink} strokeWidth="2" />
            <circle cx={x} cy={y} r="3.5" fill={c.ink} />
          </g>
        ))}
        <Label x={206} y={462} size={10} color={c.muted}>Origin → Hub → Destination</Label>
      </Panel>
      <Panel x={506} y={150} w={262} h={330}>
        <Label x={522} y={174} size={11} weight={600}>Trips</Label>
        {rows.map(([id, status, tone], i) => (
          <g key={id}>
            <line x1="522" y1={192 + i * 66} x2="752" y2={192 + i * 66} stroke={c.line} strokeOpacity={0.5} />
            <Label x={522} y={216 + i * 66} size={11}>{id}</Label>
            <Bar x={522} y={228 + i * 66} w={90} h={5} />
            <Pill x={660} y={205 + i * 66} text={status} tone={tone} />
          </g>
        ))}
      </Panel>
    </AppShell>
  );
}

function DataTable({ x, y, w, rows, columns, actions = true }: {
  x: number;
  y: number;
  w: number;
  rows: number;
  columns: number[];
  actions?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={6} fill={c.raised} />
      {columns.map((cw, i) => (
        <Bar key={i} x={x + 16 + columns.slice(0, i).reduce((a, b) => a + b, 0)} y={y + 12} w={cw * 0.4} color={c.muted} />
      ))}
      {Array.from({ length: rows }).map((_, r) => (
        <g key={r}>
          <line x1={x} y1={y + 72 + r * 44} x2={x + w} y2={y + 72 + r * 44} stroke={c.line} strokeOpacity={0.45} />
          {columns.map((cw, i) => (
            <Bar
              key={i}
              x={x + 16 + columns.slice(0, i).reduce((a, b) => a + b, 0)}
              y={y + 48 + r * 44}
              w={cw * (0.45 + ((r + i) % 3) * 0.12)}
              color={i === 0 ? c.text : c.line}
            />
          ))}
          {actions ? (
            <g>
              <rect x={x + w - 64} y={y + 41 + r * 44} width="22" height="20" rx="5" fill={c.raised} />
              <rect x={x + w - 36} y={y + 41 + r * 44} width="22" height="20" rx="5" fill={c.raised} />
            </g>
          ) : null}
        </g>
      ))}
    </g>
  );
}

function SchoolAdmin() {
  return (
    <AppShell title="Super Admin" nav={["Overview", "Schools", "Admins", "Plans", "Requests", "Settings"]} active={1}>
      <Label x={190} y={84} size={16} weight={600}>Schools</Label>
      <Label x={190} y={102} size={10} color={c.muted}>Create, update, and manage school records</Label>
      <rect x="664" y="70" width="104" height="30" rx="6" fill={c.accent} />
      <Label x={684} y={89} size={11} color="#161816" weight={600}>+ Add school</Label>
      <Panel x={190} y={120} w={578} h={360}>
        <rect x="206" y="136" width="180" height="26" rx="6" fill={c.raised} />
        <Pill x={398} y={140} text="Active" tone="accent" />
        <Pill x={462} y={140} text="Inactive" />
        <DataTable x={206} y={176} w={546} rows={6} columns={[170, 120, 110, 80]} />
      </Panel>
    </AppShell>
  );
}

function Social() {
  return (
    <AppShell title="Social" nav={["Workspace", "Compose", "Calendar", "Accounts", "Settings"]}>
      <Label x={190} y={84} size={16} weight={600}>Connected accounts</Label>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={208 + i * 40} cy="116" r="15" fill={i === 0 ? c.accent : c.raised} stroke={c.line} strokeOpacity={0.6} />
        </g>
      ))}
      <circle cx="368" cy="116" r="15" fill="none" stroke={c.line} strokeDasharray="3 3" />
      <Label x={363} y={120} size={13} color={c.muted}>+</Label>
      <Panel x={190} y={150} w={300} h={330}>
        <Label x={206} y={176} size={11} weight={600}>Compose once</Label>
        <rect x="206" y="190" width="268" height="110" rx="6" fill={c.raised} />
        <Bar x={218} y={206} w={200} />
        <Bar x={218} y={220} w={170} />
        <rect x="206" y="314" width="268" height="100" rx="6" fill={c.raised} />
        <path d="M230 396 L280 346 L320 380 L350 360 L410 396 Z" fill={c.line} />
        <rect x="206" y="430" width="110" height="32" rx="6" fill={c.accent} />
        <Label x={226} y={450} size={11} color="#161816" weight={600}>Publish</Label>
      </Panel>
      <Panel x={506} y={150} w={262} h={330}>
        <Label x={522} y={176} size={11} weight={600}>Calendar</Label>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={522 + col * 33}
              y={196 + row * 52}
              width="28"
              height="44"
              rx="5"
              fill={(row * 7 + col) % 5 === 2 ? c.accent : c.raised}
              opacity={(row * 7 + col) % 5 === 2 ? 0.9 : 1}
            />
          )),
        )}
      </Panel>
    </AppShell>
  );
}

function PhoneShell({ children, title }: { children: ReactNode; title: string }) {
  return (
    <svg viewBox="0 0 300 600" className="h-full w-full" aria-hidden>
      <rect width="300" height="600" fill={c.bg} />
      <Label x={20} y={44} size={18} weight={700}>{title}</Label>
      {children}
      <rect x="0" y="540" width="300" height="60" fill={c.panel} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={36 + i * 66} y="560" width="20" height="20" rx="6" fill={i === 0 ? c.ink : c.line} />
      ))}
    </svg>
  );
}

function AndroidQuiz() {
  return (
    <PhoneShell title="Subjects">
      {["Mathematics", "Science", "English", "General Knowledge"].map((subject, i) => (
        <g key={subject}>
          <rect x="20" y={70 + i * 78} width="260" height="64" rx="12" fill={c.panel} stroke={c.line} strokeOpacity={0.6} />
          <rect x="34" y={84 + i * 78} width="36" height="36" rx="10" fill={i === 0 ? c.accent : c.raised} />
          <Label x={82} y={100 + i * 78} size={13} weight={600}>{subject}</Label>
          <Bar x={82} y={110 + i * 78} w={110} h={5} />
        </g>
      ))}
      <rect x="20" y="470" width="260" height="44" rx="12" fill={c.accent} />
      <Label x={112} y={497} size={13} color="#161816" weight={600}>Start quiz</Label>
    </PhoneShell>
  );
}

const illustrations: Record<IllustrationKind, () => ReactNode> = {
  logistics: Logistics,
  "school-admin": SchoolAdmin,
  social: Social,
  "android-quiz": AndroidQuiz,
};

export function Illustration({ kind }: { kind: IllustrationKind }) {
  const Component = illustrations[kind];
  return <Component />;
}
