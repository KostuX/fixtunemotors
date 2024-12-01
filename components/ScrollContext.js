import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const SmoothScrollerContext = createContext();

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function ScrollContext({ children }) {
  const [lenisRef, setLenis] = useState(null);
  const [rafState, setRaf] = useState(null);

  let lenisOptions = {
    // Valeur entre 0 et 1
    // Valeur par défaut : 0,1
    // Plus la valeur est faible, plus le scroll sera fluide
    lerp: 1.05,
    // Valeur par défaut : 1
    // Plus la valeur est haute, plus le défilement sera rapide
    wheelMultiplier: -10,
  };

  useEffect(() => {
    const scroller = new Lenis({ lerp: 0.1 });
    let rf;

    function raf(time) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setRaf(rf);
    setLenis(scroller);

    return () => {
      if (lenisRef) {
        cancelAnimationFrame(rafState);
        lenisRef.destroy();
      }
    };
  }, []);

  return (
    <SmoothScrollerContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollerContext.Provider>
  );
}
