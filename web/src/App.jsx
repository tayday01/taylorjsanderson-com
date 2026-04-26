import { useEffect, useRef, useState } from 'react';
import Pong from './Pong.jsx';

export default function App() {
  const oRef = useRef(null);
  const [oRect, setORect] = useState(null);

  useEffect(() => {
    let rafId = 0;
    let timeoutId = 0;

    const measure = () => {
      const el = oRef.current;
      if (!el) return;

      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = range.getClientRects();
      const layout = rects.length > 0 ? rects[0] : el.getBoundingClientRect();
      range.detach?.();

      if (!layout || layout.width === 0 || layout.height === 0) return;

      const cs = window.getComputedStyle(el);
      const fontSize = parseFloat(cs.fontSize);
      const cv = document.createElement('canvas');
      const cctx = cv.getContext('2d');
      cctx.font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = cctx.measureText('o');

      const fontAscent = isFinite(m.fontBoundingBoxAscent) ? m.fontBoundingBoxAscent : fontSize * 0.8;
      const fontDescent = isFinite(m.fontBoundingBoxDescent) ? m.fontBoundingBoxDescent : fontSize * 0.2;
      let inkAscent = isFinite(m.actualBoundingBoxAscent) ? m.actualBoundingBoxAscent : fontSize * 0.5;
      let inkDescent = isFinite(m.actualBoundingBoxDescent) ? m.actualBoundingBoxDescent : 0;
      let inkLeft = isFinite(m.actualBoundingBoxLeft) ? m.actualBoundingBoxLeft : 0;
      let inkRight = isFinite(m.actualBoundingBoxRight) ? m.actualBoundingBoxRight : m.width;

      // Sanity-check: bad ink metrics on some mobile browsers fall back to
      // x-height heuristic so the ball stays a reasonable "o"-sized dot.
      const inkW = inkLeft + inkRight;
      const inkH = inkAscent + inkDescent;
      let radius = (inkW + inkH) / 4;
      if (!isFinite(radius) || radius <= 0 || radius > fontSize) {
        radius = fontSize * 0.28;
        inkLeft = radius;
        inkRight = radius;
        inkAscent = radius;
        inkDescent = 0;
      }

      const baselineFromTop = (layout.height + fontAscent - fontDescent) / 2;
      const inkCenterYFromBaseline = (inkDescent - inkAscent) / 2;
      const inkCenterXFromOrigin = (inkRight - inkLeft) / 2;

      setORect({
        x: layout.left + inkCenterXFromOrigin,
        y: layout.top + baselineFromTop + inkCenterYFromBaseline,
        r: radius,
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      rafId = requestAnimationFrame(() => {
        measure();
        // Re-measure after layout/font settle (esp. mobile address bar).
        timeoutId = setTimeout(measure, 250);
      });
    };

    scheduleMeasure();
    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('orientationchange', scheduleMeasure);
    window.visualViewport?.addEventListener('resize', scheduleMeasure);
    if (document.fonts?.ready) document.fonts.ready.then(scheduleMeasure);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('orientationchange', scheduleMeasure);
      window.visualViewport?.removeEventListener('resize', scheduleMeasure);
    };
  }, []);

  return (
    <>
      <Pong oRect={oRect} />
      <div className="hello-overlay" aria-label="Hello, world.">
        <span>Hell</span>
        <span ref={oRef} className="hello-o-slot">o</span>
        <span>, world.</span>
      </div>
    </>
  );
}
