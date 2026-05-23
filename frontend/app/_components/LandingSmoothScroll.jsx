"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

function getAnchorTarget(href) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;

  const path = href.slice(0, hashIndex) || window.location.pathname;
  const hash = href.slice(hashIndex);

  if (hash === "#") return null;
  if (path !== window.location.pathname && path !== "" && path !== "/") return null;

  return document.querySelector(hash);
}

export default function LandingSmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      document.documentElement.style.scrollBehavior = "smooth";

      return () => {
        document.documentElement.style.scrollBehavior = "";
      };
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    const onAnchorClick = (event) => {
      const link = event.target.closest("a[href*='#']");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const target = getAnchorTarget(href);
      if (!target) return;

      event.preventDefault();

      const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      lenis.scrollTo(target, { offset: -scrollMargin });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
