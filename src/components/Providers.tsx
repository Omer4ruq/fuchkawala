"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { Cursor } from "./Cursor";

const LoadedCtx = createContext(false);
/** True once the preloader curtain starts lifting — hero entrance keys off this. */
export const useLoaded = () => useContext(LoadedCtx);

export let lenis: Lenis | null = null;

export function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: { offset: 0 }, lerp: 0.09 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return (
    <LoadedCtx.Provider value={loaded}>
      <Preloader onDone={done} />
      {children}
      <Cursor />
      <div className="grain" aria-hidden />
    </LoadedCtx.Provider>
  );
}
