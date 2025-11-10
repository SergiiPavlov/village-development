'use client';
import {useEffect, useMemo, useRef, useState} from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import {THEMES, HERO_BY_THEME, DEFAULT_THEME, FALLBACK_HERO, Theme} from '@/lib/theme/themes';

type Props = {
  locale: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaMore: string;
  ctaVisit: string;
  auto?: boolean;
  intervalMs?: number;
};

function getCurrentTheme(): Theme {
  const attr = typeof document !== 'undefined'
    ? (document.documentElement.getAttribute('data-theme') as Theme | null)
    : null;
  let fromLS: any = null;
  try { fromLS = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null; } catch {}
  const t = attr || (fromLS as Theme) || DEFAULT_THEME;
  return THEMES.includes(t) ? t : DEFAULT_THEME;
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

export default function HeroAuto({
  locale,
  badge, title, subtitle, ctaMore, ctaVisit,
  auto = true,
  intervalMs = 18000,
}: Props) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Crossfade state
  const [currSrc, setCurrSrc] = useState<string>(FALLBACK_HERO);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [nextReady, setNextReady] = useState(false);
  const [fading, setFading] = useState(false);

  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const reduceMotion = typeof window !== 'undefined'
    ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
    : false;

  const nextTheme = (t: Theme) => {
    const idx = THEMES.indexOf(t);
    return THEMES[(idx + 1) % THEMES.length];
  };

  // Init current src from current theme
  useEffect(() => {
    const init = getCurrentTheme();
    setTheme(init);
    setCurrSrc(HERO_BY_THEME[init] || FALLBACK_HERO);
  }, []);

  // Preload all
  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === 'undefined' || typeof window.Image === 'undefined') return;
    THEMES.forEach(t => {
      const src = HERO_BY_THEME[t] || FALLBACK_HERO;
      const img = new window.Image();
      img.src = src;
    });
  }, [reduceMotion]);

  // React to theme changes -> prepare crossfade to new src
  useEffect(() => {
    if (!theme) return;
    const target = HERO_BY_THEME[theme] || FALLBACK_HERO;
    if (target === currSrc || target === nextSrc) return;
    setNextSrc(target);
    setNextReady(false);
  }, [theme, currSrc, nextSrc]);

  // Global theme change listener
  useEffect(() => {
    const onThemeChange = (e: Event) => {
      pausedRef.current = true;
      window.setTimeout(() => { pausedRef.current = false; }, 120000);
      const det = (e as CustomEvent).detail as any;
      if (det && THEMES.includes(det)) setTheme(det as Theme);
      else setTheme(getCurrentTheme());
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('theme:change', onThemeChange as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('theme:change', onThemeChange as EventListener);
      }
    };
  }, []);

  // Observe DOM attribute data-theme changes (manual switches)
  useEffect(() => {
    let observer: MutationObserver | null = null;
    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
      observer = new MutationObserver(() => setTheme(getCurrentTheme()));
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
    return () => observer?.disconnect();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!auto || reduceMotion || typeof window === 'undefined') return;
    timerRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      const cur = getCurrentTheme();
      const nxt = nextTheme(cur);
      applyTheme(nxt);
      setTheme(nxt);
    }, Math.max(8000, intervalMs)) as unknown as number;
    const onVisibility = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [auto, intervalMs, reduceMotion]);

  // When next is loaded -> start fading
  useEffect(() => {
    if (nextSrc && nextReady) {
      setFading(true);
    }
  }, [nextSrc, nextReady]);

  // After fade ends -> commit next as current
  const onFadeEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'opacity') return;
    if (fading && nextSrc) {
      setCurrSrc(nextSrc);
      setNextSrc(null);
      setNextReady(false);
      setFading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/9] md:aspect-[21/9]" onTransitionEnd={onFadeEnd}>
        {/* Base / current image */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}>
          <NextImage
            key={currSrc}
            src={currSrc}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width:1280px) 100vw, 1200px"
            decoding="async"
          />
        </div>

        {/* Overlay / next image */}
        {nextSrc && (
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${fading ? 'opacity-100' : 'opacity-0'}`}>
            <NextImage
              key={nextSrc}
              src={nextSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1280px) 100vw, 1200px"
              decoding="async"
              onLoadingComplete={() => setNextReady(true)}
              priority={false}
            />
          </div>
        )}

        {/* Gentle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" aria-hidden />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center text-center p-6">
        <div className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.35)]">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-white/15 backdrop-blur">
            {badge}
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold">{title}</h1>
          <p className="mt-3 text-base md:text-lg text-white/90">{subtitle}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href={`/${locale}/about`} className="btn btn-primary">{ctaMore}</Link>
            <Link href={`/${locale}/contacts`} className="btn">{ctaVisit}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
