// Lightweight inline SVG icons (no icon library), per performance spec.
type P = { className?: string };
const base = "h-5 w-5";
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconSearch = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const IconUser = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>);
export const IconHeart = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" /></svg>);
export const IconBag = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>);
export const IconMenu = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const IconClose = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IconPhone = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
export const IconWhatsApp = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" /><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8c-.3 1.2-1.3 1.9-2.4 1.6A7 7 0 0 1 8.4 9.7c-.3-1.1.4-2.1 1.6-2.4l.8 1.8L9 9.5Z" /></svg>);
export const IconInstagram = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg>);
export const IconX = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M4 4l16 16M20 4 4 20" /></svg>);
export const IconPin = ({ className = base }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const IconStar = ({ className = "h-3.5 w-3.5" }: P) => (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>);
export const IconArrow = ({ className = "h-4 w-4" }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconLeaf = ({ className = "h-6 w-6" }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 14 10" /></svg>);
export const IconWind = ({ className = "h-6 w-6" }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M3 9h12a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3" /></svg>);
export const IconHand = ({ className = "h-6 w-6" }: P) => (<svg viewBox="0 0 24 24" className={className} {...s}><path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.5-1.5L8 15" /></svg>);
