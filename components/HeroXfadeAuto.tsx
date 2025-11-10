'use client';
import {useEffect, useRef, useState} from 'react';
import NextImage from 'next/image';

type Theme = 'river' | 'forest' | 'ethno' | 'minimal';
const THEMES: Theme[] = ['river','forest','ethno','minimal'];

const HERO_BY_THEME: Record<Theme,string> = {
  river: '/hero/hero-river-2400.jpg',
  forest: '/photos/places/forest1.jpg',
  ethno: '/photos/places/sunflower.jpg',
  minimal: '/photos/places/hill.jpg',
};

const FALLBACK = '/hero/hero-river-2400.jpg';

function getCurrentTheme(): Theme {
  const t = (typeof document!=='undefined'
    ? (document.documentElement.getAttribute('data-theme') as Theme | null)
    : null) || 'river';
  return THEMES.includes(t) ? t : 'river';
}

function applyTheme(t: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', t);
  }
  try { localStorage.setItem('theme', t); } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('theme:change', { detail: t }));
  }
}

export default function HeroXfadeAuto({ intervalMs = 20000 }: { intervalMs?: number }) {
  const [curr, setCurr] = useState<string>(FALLBACK);
  const [next, setNext] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  // init
  useEffect(() => {
    const t = getCurrentTheme();
    setCurr(HERO_BY_THEME[t] || FALLBACK);
  }, []);

  // preload
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.Image === 'undefined') return;
    THEMES.forEach(t => {
      const img = new window.Image();
      img.src = HERO_BY_THEME[t];
    });
  }, []);

  const nextTheme = (t: Theme) => {
    const i = THEMES.indexOf(t);
    return THEMES[(i+1) % THEMES.length];
  };

  // autorotate
  useEffect(() => {
    if (typeof window === 'undefined') return;
    timerRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      const curT = getCurrentTheme();
      const nt = nextTheme(curT);
      applyTheme(nt);
      const target = HERO_BY_THEME[nt];
      if (target !== curr) {
        setNext(target);
        setReady(false);
      }
    }, Math.max(10000, intervalMs)) as unknown as number;

    const onVisibility = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [curr, intervalMs]);

  // start fade when next ready
  useEffect(() => {
    if (next && ready) setFading(true);
  }, [next, ready]);

  const onFadeEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'opacity') return;
    if (fading && next) {
      setCurr(next);
      setNext(null);
      setReady(false);
      setFading(false);
    }
  };

  return (
    <div className="absolute inset-0" onTransitionEnd={onFadeEnd}>
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${fading? 'opacity-0':'opacity-100'}`}>
        <NextImage src={curr} alt="" fill priority className="object-cover object-center" sizes="100vw" />
      </div>
      {next && (
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${fading? 'opacity-100':'opacity-0'}`}>
          <NextImage src={next} alt="" fill className="object-cover object-center" sizes="100vw" onLoadingComplete={()=>setReady(true)} />
        </div>
      )}
    </div>
  );
}
