/* Original SVG illustrations shared across the site. */

const petals8 = [0, 45, 90, 135, 180, 225, 270, 315];
const petals5 = [0, 72, 144, 216, 288];

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <g id="leaf">
          <path d="M0 0C7-10 20-10 30 0C20 10 7 10 0 0Z" fill="#2f8a64" />
          <path d="M1 0H27" stroke="#1a5e43" strokeWidth=".9" />
        </g>
        <g id="bloom">
          <g fill="#f4ddd6" stroke="#c99a8f" strokeWidth=".8">
            {petals8.map((r) => (
              <ellipse key={r} cx="0" cy="-12" rx="7" ry="13" transform={`rotate(${r})`} />
            ))}
          </g>
          <g fill="#e9b8b0">
            {petals5.map((r) => (
              <ellipse key={r} cx="0" cy="-7" rx="4" ry="7" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r="4.5" fill="#b8933f" />
          <circle r="2" fill="#f3e2b3" />
        </g>
        <g id="bud">
          <path d="M0 0C-6-6-5-16 0-20C5-16 6-6 0 0Z" fill="#e8a33d" />
          <path d="M0 0C-3-5-2-12 0-16C2-12 3-5 0 0Z" fill="#f2c14e" />
        </g>
        <symbol id="floral" viewBox="0 0 220 220">
          <path d="M0 220C30 170 55 135 105 112C140 96 165 70 178 30" fill="none" stroke="#1f7a57" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M52 150C40 122 48 98 70 84" fill="none" stroke="#1f7a57" strokeWidth="2" strokeLinecap="round" />
          <path d="M140 96C170 100 195 118 212 146" fill="none" stroke="#1f7a57" strokeWidth="2" strokeLinecap="round" />
          <use href="#leaf" transform="translate(28 176) rotate(-80)" />
          <use href="#leaf" transform="translate(40 160) rotate(10)" />
          <use href="#leaf" transform="translate(80 128) rotate(-110)" />
          <use href="#leaf" transform="translate(120 106) rotate(20)" />
          <use href="#leaf" transform="translate(160 70) rotate(-150)" />
          <use href="#leaf" transform="translate(170 106) rotate(40)" />
          <use href="#leaf" transform="translate(192 124) rotate(-40)" />
          <use href="#leaf" transform="translate(50 116) rotate(-140)" />
          <use href="#bloom" transform="translate(105 112) scale(1.25)" />
          <use href="#bloom" transform="translate(178 34) scale(.9)" />
          <use href="#bloom" transform="translate(70 84) scale(.7)" />
          <use href="#bloom" transform="translate(212 148) scale(.75)" />
          <use href="#bud" transform="translate(140 80) rotate(30)" />
          <use href="#bud" transform="translate(58 140) rotate(-40)" />
          <circle cx="150" cy="120" r="3" fill="#b8933f" />
          <circle cx="92" cy="140" r="2.5" fill="#b8933f" />
          <circle cx="195" cy="80" r="2.5" fill="#b8933f" />
        </symbol>
        <symbol id="lanternSym" viewBox="0 0 60 150">
          <line x1="30" y1="0" x2="30" y2="40" stroke="#dcc48f" strokeWidth="1.5" />
          <path d="M22 40h16l6 10H16z" fill="#b8933f" />
          <path d="M16 50h28c4 20 4 40 0 60H16c-4-20-4-40 0-60z" fill="#b8933f" opacity=".25" stroke="#dcc48f" strokeWidth="1.5" />
          <path d="M22 58c0-6 16-6 16 0v44H22z" fill="#f2c14e" opacity=".9" />
          <path d="M30 70c-4 6-4 12 0 16 4-4 4-10 0-16z" fill="#fff4cf" />
          <path d="M16 110h28l-6 10H22z" fill="#b8933f" />
          <line x1="30" y1="120" x2="30" y2="134" stroke="#dcc48f" strokeWidth="1.5" />
          <circle cx="30" cy="138" r="4" fill="#b8933f" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Floral({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 220" aria-hidden="true">
      <use href="#floral" />
    </svg>
  );
}

export function Scallop() {
  return (
    <svg className="scallop" viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 18V9Q5 0 10 9T20 9T30 9T40 9T50 9T60 9T70 9T80 9T90 9T100 9T110 9T120 9T130 9T140 9T150 9T160 9T170 9T180 9T190 9T200 9V18Z" fill="#fbf8f1" />
    </svg>
  );
}

export function MehndiArt() {
  return (
    <svg className="illus" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="74" r="58" fill="#fbf8f1" opacity=".14" />
      <path d="M46 132C42 116 36 100 33 86L25 58C23 51 33 47 36 54L45 76L42 34C42 25 53 25 53 34L56 70L59 26C59 17 70 17 70 26L69 70L74 32C74 23 85 23 85 32L81 76L89 55C92 48 101 51 99 58L90 94C86 110 83 122 82 132Z" fill="#f6dcc0" stroke="#fbf8f1" strokeWidth="1.5" />
      <g fill="none" stroke="#8a4a14" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="62" cy="96" r="11" />
        <circle cx="62" cy="96" r="5" />
        <path d="M62 85v-4M62 111v-4M51 96h-4M77 96h-4M54 88l-3-3M70 104l3 3M54 104l-3 3M70 88l3-3" />
        <path d="M47 38c3 2 5 2 8 0M47 46c3 2 5 2 8 0M47 54c3 2 5 2 8 0" />
        <path d="M61 30c3 2 6 2 8 0M61 38c3 2 6 2 8 0M61 46c3 2 6 2 8 0M62 56h7" />
        <path d="M76 36c3 2 5 2 8 0M76 44c3 2 5 2 8 0M76 52c3 2 5 2 8 0" />
        <path d="M44 120c10 4 26 4 36 0M46 126c10 3 24 3 34 0" />
      </g>
      <g fill="#8a4a14">
        <circle cx="47.5" cy="28" r="2" /><circle cx="64.5" cy="21" r="2" /><circle cx="79.5" cy="27" r="2" /><circle cx="95" cy="52" r="2" /><circle cx="30" cy="56" r="2" />
      </g>
      <use href="#bud" transform="translate(112 118) rotate(20)" />
      <use href="#bud" transform="translate(22 120) rotate(-25)" />
      <use href="#bloom" transform="translate(116 34) scale(.6)" />
    </svg>
  );
}

const sehra = [34, 42, 50, 58, 66, 74, 82, 90, 98, 106];

export function BaratArt() {
  return (
    <svg className="illus" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="74" r="58" fill="#fbf8f1" opacity=".12" />
      <path d="M30 78C28 48 48 32 70 32S112 48 110 78Z" fill="#f3e2b3" />
      <g fill="none" stroke="#b8933f" strokeWidth="1.6">
        <path d="M32 68C50 58 90 52 108 62" />
        <path d="M30 76C52 64 88 60 110 70" />
        <path d="M40 50C58 44 84 42 100 50" />
        <path d="M70 32C78 44 86 58 90 76" />
      </g>
      <path d="M28 78H112V84H28z" fill="#b8933f" />
      <circle cx="70" cy="40" r="6" fill="#8e2436" stroke="#f3e2b3" strokeWidth="1.5" />
      <path d="M70 34C66 22 72 10 84 6C76 14 76 24 70 34Z" fill="#fbf8f1" />
      <path d="M70 34C73 24 80 18 88 16" fill="none" stroke="#dcc48f" strokeWidth="1.2" />
      {sehra.map((x) => {
        const drop = 48 - Math.abs(x - 70) * 0.4;
        return (
          <g key={x}>
            <line x1={x} y1="84" x2={x} y2={84 + drop} stroke="#f3e2b3" strokeWidth="1.2" />
            <circle cx={x} cy={84 + drop * 0.5} r="2.2" fill="#fbf8f1" />
            <circle cx={x} cy={84 + drop} r="3" fill="#fbf8f1" />
          </g>
        );
      })}
      <g fill="#e8a33d"><circle cx="46" cy="92" r="2" /><circle cx="62" cy="96" r="2" /><circle cx="78" cy="96" r="2" /><circle cx="94" cy="92" r="2" /></g>
    </svg>
  );
}

export function WalimaArt() {
  return (
    <svg className="illus" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="74" r="58" fill="#fbf8f1" opacity=".12" />
      <path d="M104 22a16 16 0 1 0 10 28a13 13 0 1 1-10-28z" fill="#f3e2b3" />
      <path d="M120 22l2 5 5 .4-4 3.3 1.3 5-4.3-2.8-4.3 2.8 1.3-5-4-3.3 5-.4z" fill="#f3e2b3" />
      <path d="M30 104C30 78 48 62 70 62S110 78 110 104Z" fill="#dcc48f" />
      <path d="M38 100C40 82 54 70 70 70" fill="none" stroke="#fbf8f1" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <circle cx="70" cy="58" r="6" fill="#b8933f" />
      <path d="M18 104H122V112H18z" fill="#fbf8f1" />
      <path d="M26 112H114L108 118H32z" fill="#dcc48f" />
      <line x1="30" y1="0" x2="30" y2="22" stroke="#f3e2b3" strokeWidth="1.2" />
      <path d="M24 22h12l4 6H20z" fill="#f3e2b3" />
      <path d="M22 28h16c2 8 2 16 0 22H22c-2-6-2-14 0-22z" fill="#f2c14e" opacity=".9" />
      <path d="M20 50h20l-4 5H24z" fill="#f3e2b3" />
      <g fill="#fbf8f1"><circle cx="54" cy="24" r="1.6" /><circle cx="84" cy="14" r="1.2" /><circle cx="64" cy="40" r="1.2" /><circle cx="96" cy="60" r="1.4" /></g>
      <use href="#bloom" transform="translate(126 106) scale(.5)" />
      <use href="#bloom" transform="translate(14 106) scale(.5)" />
    </svg>
  );
}

export const Icon = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
  ),
  cal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" /><path d="M9.5 9.5c.3 1.8 1.8 3.8 4 4.5l1-1.2 1.8.8c-.2 1-1 1.7-2 1.7-3 0-6.3-3.3-6.3-6.3 0-1 .7-1.8 1.7-2l.8 1.8z" /></svg>
  ),
  down: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6" /></svg>
  ),
};
