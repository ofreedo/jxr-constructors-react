import { type ReactNode, useLayoutEffect, useRef } from "react";
import { assetPath, cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ports the original homepage's "blueprint reveal" hero intro verbatim:
 * a black screen, the logo badge (two rings + X-mark) traces in
 * full-screen-centered, shrinks to its real position on the building
 * signage, the flag traces in at its real position, then the photo and
 * page content fade in together. All sequencing is CSS animation-delay
 * driven (see the hero-draw-ring/hero-draw-xmark/hero-draw-flag/
 * hero-logo-shrink/hero-fade-in/hero-photo-resolve/hero-trace-fade-out
 * utilities in tailwind.config.ts,
 * whose timings were copied verbatim from the original's @keyframes).
 * This component's only job — matching the original's inline <script>
 * exactly — is to compute the runtime geometry (stroke lengths for the
 * hand-draw effect, and the translate/scale needed to move the logo SVG
 * from its full-screen intro position to its real position on the
 * building) and set it as CSS custom properties BEFORE first paint, via
 * useLayoutEffect (the original's script ran synchronously inline,
 * before the browser's first render, for the same reason: to avoid a
 * flash of an un-positioned/undrawn state).
 *
 * `children` is the hero's text content (eyebrow/h1/sub/CTAs/cert row) —
 * passed in from HomePage.tsx rather than hardcoded here, so this
 * component owns only the animation/photo/SVG machinery.
 */

// Native company-front-trunks.png is 1448x1086. The logo badge's real
// center + diameter in that photo, verified via canvas pixel sampling
// (alpha-channel + row-span contour extraction) in the original project.
const PHOTO_NATIVE_W = 1448;
const PHOTO_NATIVE_H = 1086;
const OBJECT_POSITION_X = 0.5;
const OBJECT_POSITION_Y = 0.15;
const LOGO_NATIVE_CENTER_X = 805;
const LOGO_NATIVE_CENTER_Y = 325;
const LOGO_NATIVE_BADGE_W = 84;

// nav-logo.png source art (the hero-logo-svg's viewBox is 0 0 476 346)
// badge true bounding box, verified via alpha-channel pixel sampling:
// circle spans x:113-355, y:14-258, center (234,136), diameter ~242.
const SVG_BADGE_CENTER_X_FRAC = 234 / 476;
const SVG_BADGE_CENTER_Y_FRAC = 136 / 346;
const SVG_BADGE_WIDTH_FRAC = 242 / 476;

function computeCoverCrop(containerW: number, containerH: number) {
  const photoAspect = PHOTO_NATIVE_W / PHOTO_NATIVE_H;
  const containerAspect = containerW / containerH;
  let renderedScale: number;
  let cropX = 0;
  let cropY = 0;
  if (containerAspect > photoAspect) {
    renderedScale = containerW / PHOTO_NATIVE_W;
    cropY = (PHOTO_NATIVE_H * renderedScale - containerH) * OBJECT_POSITION_Y;
  } else {
    renderedScale = containerH / PHOTO_NATIVE_H;
    cropX = (PHOTO_NATIVE_W * renderedScale - containerW) * OBJECT_POSITION_X;
  }
  return { renderedScale, cropX, cropY };
}

interface HeroAnimatedProps {
  children: ReactNode;
}

export function HeroAnimated({ children }: HeroAnimatedProps) {
  const heroRef = useRef<HTMLElement>(null);
  const logoSvgRef = useRef<SVGSVGElement>(null);
  const traceSvgRef = useRef<SVGSVGElement>(null);
  const outerRingRef = useRef<SVGCircleElement>(null);
  const innerRingRef = useRef<SVGCircleElement>(null);
  const xmarkRef = useRef<SVGPathElement>(null);
  const flagRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const heroEl = heroRef.current;
    const logoSvgEl = logoSvgRef.current;
    const traceSvgEl = traceSvgRef.current;
    if (!heroEl || !logoSvgEl || !traceSvgEl) return;

    const tracedElements = [outerRingRef.current, innerRingRef.current, xmarkRef.current, flagRef.current];

    function setStrokeLengths() {
      tracedElements.forEach((el) => {
        if (!el) return;
        const len = el.getTotalLength();
        el.style.setProperty("--len", String(len));
        el.style.strokeDasharray = String(len);
        el.style.strokeDashoffset = String(len);
      });
    }

    function positionLogoTarget() {
      if (!heroEl || !logoSvgEl) return;
      const heroRect = heroEl.getBoundingClientRect();
      if (heroRect.width === 0 || heroRect.height === 0) return;
      const { renderedScale, cropX, cropY } = computeCoverCrop(heroRect.width, heroRect.height);

      const targetScreenX = heroRect.left + LOGO_NATIVE_CENTER_X * renderedScale - cropX;
      const targetScreenY = heroRect.top + LOGO_NATIVE_CENTER_Y * renderedScale - cropY;
      const targetScreenBadgeW = LOGO_NATIVE_BADGE_W * renderedScale;

      const svgRectNow = logoSvgEl.getBoundingClientRect();
      if (svgRectNow.width === 0 || svgRectNow.height === 0) return;
      const startBadgeScreenX = svgRectNow.left + SVG_BADGE_CENTER_X_FRAC * svgRectNow.width;
      const startBadgeScreenY = svgRectNow.top + SVG_BADGE_CENTER_Y_FRAC * svgRectNow.height;
      const startBadgeScreenW = SVG_BADGE_WIDTH_FRAC * svgRectNow.width;

      const targetScale = targetScreenBadgeW / startBadgeScreenW;

      // transform: translate(tx,ty) scale(s) with transform-origin:50% 50%
      // scales around the element's own center first, then translates —
      // solve for translate given where the badge point currently is
      // (start) and where it must end up (target):
      // translate = target - origin - s*(start - origin).
      const originX = svgRectNow.left + svgRectNow.width / 2;
      const originY = svgRectNow.top + svgRectNow.height / 2;
      const tx = targetScreenX - originX - targetScale * (startBadgeScreenX - originX);
      const ty = targetScreenY - originY - targetScale * (startBadgeScreenY - originY);

      logoSvgEl.style.setProperty("--logo-tx", `${tx}px`);
      logoSvgEl.style.setProperty("--logo-ty", `${ty}px`);
      logoSvgEl.style.setProperty("--logo-scale", String(targetScale));
    }

    function positionFlagTrace() {
      if (!heroEl || !traceSvgEl) return;
      const heroRect = heroEl.getBoundingClientRect();
      if (heroRect.width === 0 || heroRect.height === 0) return;
      const { renderedScale, cropX, cropY } = computeCoverCrop(heroRect.width, heroRect.height);
      const renderedW = PHOTO_NATIVE_W * renderedScale;
      const renderedH = PHOTO_NATIVE_H * renderedScale;

      traceSvgEl.style.position = "absolute";
      traceSvgEl.style.width = `${renderedW}px`;
      traceSvgEl.style.height = `${renderedH}px`;
      traceSvgEl.style.left = `${-cropX}px`;
      traceSvgEl.style.top = `${-cropY}px`;
    }

    setStrokeLengths();
    positionLogoTarget();
    positionFlagTrace();

    // Defends against the rare case where the hero/logo hasn't been
    // laid out yet on the very first measurement (e.g. font/asset
    // loading still settling) — re-measures one more time next frame so
    // the trace/shrink don't get stuck with stale zero-size geometry.
    const rafId = requestAnimationFrame(() => {
      positionLogoTarget();
      positionFlagTrace();
    });

    window.addEventListener("resize", positionLogoTarget);
    window.addEventListener("resize", positionFlagTrace);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", positionLogoTarget);
      window.removeEventListener("resize", positionFlagTrace);
    };
  }, [prefersReducedMotion]);

  const traceStrokeClasses =
    "fill-none stroke-jxr-blue-bright [stroke-linecap:round] [stroke-linejoin:round]";

  return (
    <section
      ref={heroRef}
      id="hero-animated"
      className="hero-animated relative min-h-[100svh] flex flex-col justify-center text-white overflow-hidden"
      style={{ background: "#060708" }}
    >
      <div className="absolute inset-0">
        <img
          src={assetPath("company-front-trunks.png")}
          alt="JXR Constructors, Inc. office and branded work trucks"
          style={{ objectPosition: "50% 15%" }}
          className={cn(
            "w-full h-full object-cover",
            prefersReducedMotion
              ? "opacity-[0.55]"
              : "opacity-0 [filter:brightness(0.55)] animate-hero-photo-resolve"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-[linear-gradient(100deg,rgba(20,22,26,0.94)_20%,rgba(20,22,26,0.55)_65%,rgba(20,22,26,0.35)_100%)]",
            !prefersReducedMotion && "opacity-0 animate-hero-fade-in"
          )}
        />
      </div>

      {!prefersReducedMotion && (
        <>
          <svg
            ref={traceSvgRef}
            className="absolute z-[2] pointer-events-none animate-hero-trace-fade-out"
            viewBox="0 0 1448 1086"
          >
            <path
              ref={flagRef}
              className={cn(traceStrokeClasses, "[stroke-width:2.5] [filter:drop-shadow(0_0_3px_rgba(37,71,214,0.7))] animate-hero-draw-flag")}
              d="M 844,60 L 844,80 L 796,154 L 789,167 L 790,168 L 788,169 L 789,170 L 787,171 L 787,175 L 785,176 L 786,179 L 784,182 L 785,183 L 783,184 L 784,186 L 782,187 L 781,192 L 777,195 L 777,200 L 788,214 L 787,215 L 794,224 L 794,227 L 806,241 L 730,242 L 730,254 L 899,254 L 898,248 L 851,245 L 852,189 L 854,185 L 852,169 L 854,160 L 854,127 L 852,126 L 853,121 L 851,115 L 853,114 L 851,113 L 852,107 L 850,106 L 849,69 L 853,63 L 851,60 Z"
            />
          </svg>

          <div className="hero-logo-layer absolute inset-0 z-[3] flex items-center justify-center pointer-events-none animate-hero-trace-fade-out">
            <svg
              ref={logoSvgRef}
              className="animate-hero-logo-shrink w-[min(85vw,85vh)] aspect-[476/346]"
              style={{ transformOrigin: "50% 50%" }}
              viewBox="0 0 476 346"
            >
              <circle
                ref={outerRingRef}
                className={cn(traceStrokeClasses, "[stroke-width:2.2] [filter:drop-shadow(0_0_4px_rgba(37,71,214,0.8))] animate-hero-draw-ring")}
                cx={234}
                cy={136}
                r={117.5}
              />
              <circle
                ref={innerRingRef}
                className={cn(traceStrokeClasses, "[stroke-width:2.2] [filter:drop-shadow(0_0_4px_rgba(37,71,214,0.8))] animate-hero-draw-ring-blue")}
                cx={234}
                cy={136}
                r={103}
              />
              <path
                ref={xmarkRef}
                className={cn(traceStrokeClasses, "[stroke-width:2.2] [filter:drop-shadow(0_0_4px_rgba(37,71,214,0.8))] animate-hero-draw-xmark")}
                d="M 174,75 L 225,135 L 173,197 L 242,197 L 242,157 L 263,181 L 277,197 L 295,197 L 244,136 L 245,133 L 294,75 Z M 206,90 L 226,114 L 226,90 Z M 242,90 L 242,114 L 263,90 Z M 226,157 L 206,181 L 226,181 L 226,157 Z"
              />
            </svg>
          </div>
        </>
      )}

      <div
        className={cn(
          "relative z-[2] max-w-container mx-auto px-6 py-[120px] pb-[100px] max-[600px]:py-[90px] max-[600px]:pb-[70px] max-w-[720px] w-full",
          !prefersReducedMotion && "opacity-0 animate-hero-fade-in"
        )}
      >
        {children}
      </div>
    </section>
  );
}
