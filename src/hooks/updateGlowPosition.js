import { useEffect } from "react";

const calculateGlowPosition = (navRefs, glowEl, wrapperEl, pathname) => {
  const activeEl = navRefs.current[pathname];
  if (!activeEl || !glowEl || !wrapperEl) return;

  const rect = activeEl.getBoundingClientRect();
  const wrapperRect = wrapperEl.getBoundingClientRect();
  const centerX = rect.left - wrapperRect.left + rect.width / 2;
  glowEl.style.setProperty("--glow-left", `${centerX}px`);
};

const debounce = (func, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

export const useGlowPosition = ({ navRefs, glowRef, wrapperRef, pathname }) => {
  useEffect(() => {
    const glowEl = glowRef.current;
    const wrapperEl = wrapperRef.current;
    const update = () => calculateGlowPosition(navRefs, glowEl, wrapperEl, pathname);
    const debouncedResize = debounce(update, 100);
    const initialTimeout = setTimeout(() => requestAnimationFrame(update), 50);

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("load", update);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("load", update);
    };
  }, [pathname, navRefs, glowRef, wrapperRef]);
};