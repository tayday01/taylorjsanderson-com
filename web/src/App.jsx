import { useEffect, useRef, useState } from 'react';
import Pong from './Pong.jsx';

export default function App() {
  const oRef = useRef(null);
  const [oRect, setORect] = useState(null);

  useEffect(() => {
    const measure = () => {
      const el = oRef.current;
      if (!el) return;

      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = range.getClientRects();
      const layout = rects.length > 0 ? rects[0] : el.getBoundingClientRect();
      range.detach?.();

      const cs = window.getComputedStyle(el);
      const fontSize = parseFloat(cs.fontSize);
      const cv = document.createElement('canvas');
      const cctx = cv.getContext('2d');
      cctx.font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = cctx.measureText('o');

      const fontAscent = m.fontBoundingBoxAscent ?? fontSize * 0.8;
      const fontDescent = m.fontBoundingBoxDescent ?? fontSize * 0.2;
      const inkAscent = m.actualBoundingBoxAscent ?? fontSize * 0.5;
      const inkDescent = m.actualBoundingBoxDescent ?? 0;
      const inkLeft = m.actualBoundingBoxLeft ?? 0;
      const inkRight = m.actualBoundingBoxRight ?? m.width;

      const baselineFromTop = (layout.height + fontAscent - fontDescent) / 2;
      const inkCenterYFromBaseline = (inkDescent - inkAscent) / 2;
      const inkCenterXFromOrigin = (inkRight - inkLeft) / 2;

      const inkW = inkLeft + inkRight;
      const inkH = inkAscent + inkDescent;
      const radius = (inkW + inkH) / 4;

      setORect({
        x: layout.left + inkCenterXFromOrigin,
        y: layout.top + baselineFromTop + inkCenterYFromBaseline,
        r: radius,
      });
    };

    measure();
    window.addEventListener('resize', measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
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
