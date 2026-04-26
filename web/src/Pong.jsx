import { useEffect, useRef, useState } from 'react';

const PADDLE_WIDTH = 14;
const PADDLE_HEIGHT_RATIO = 0.18;
const BALL_RADIUS_FALLBACK = 10;
const PLAYER_SPEED = 800;
const AI_DIFFICULTY = 0.7;
const BALL_SPEED_RATIO = 0.55;
const BALL_SPEEDUP = 1.05;
const BALL_MAX_SPEED_RATIO = 1.4;
const PARK_DELAY_MS = 3000;
const RESET_AT_TOTAL_SCORE = 10;

const SEGMENTS = {
  0: ['a', 'b', 'c', 'd', 'e', 'f'],
  1: ['b', 'c'],
  2: ['a', 'b', 'g', 'e', 'd'],
  3: ['a', 'b', 'g', 'c', 'd'],
  4: ['f', 'g', 'b', 'c'],
  5: ['a', 'f', 'g', 'c', 'd'],
  6: ['a', 'f', 'g', 'e', 'c', 'd'],
  7: ['a', 'b', 'c'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g'],
};

function drawDigit(ctx, digit, x, y, w, h, t) {
  const segs = SEGMENTS[digit] ?? [];
  const half = h / 2;
  ctx.fillStyle = '#000';
  for (const s of segs) {
    switch (s) {
      case 'a':
        ctx.fillRect(x + t, y, w - 2 * t, t);
        break;
      case 'b':
        ctx.fillRect(x + w - t, y + t, t, half - t);
        break;
      case 'c':
        ctx.fillRect(x + w - t, y + half, t, half - t);
        break;
      case 'd':
        ctx.fillRect(x + t, y + h - t, w - 2 * t, t);
        break;
      case 'e':
        ctx.fillRect(x, y + half, t, half - t);
        break;
      case 'f':
        ctx.fillRect(x, y + t, t, half - t);
        break;
      case 'g':
        ctx.fillRect(x + t, y + half - t / 2, w - 2 * t, t);
        break;
      default:
        break;
    }
  }
}

function drawScore(ctx, score, centerX, topY, digitH) {
  const digits = String(score).split('').map(Number);
  const digitW = digitH * 0.6;
  const t = Math.max(3, Math.round(digitH * 0.13));
  const gap = digitW * 0.25;
  const totalW = digits.length * digitW + (digits.length - 1) * gap;
  let x = centerX - totalW / 2;
  for (const d of digits) {
    drawDigit(ctx, d, x, topY, digitW, digitH, t);
    x += digitW + gap;
  }
}

export default function Pong({ oRect }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const oRectRef = useRef(oRect);
  const [scores, setScores] = useState([0, 0]);

  useEffect(() => {
    oRectRef.current = oRect;
    const s = stateRef.current;
    if (s && s.parked) parkBallAt(s, oRectRef.current);
  }, [oRect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      ball: { x: 0, y: 0, vx: 0, vy: 0 },
      left: { y: 0 },
      right: { y: 0 },
      keys: new Set(),
      mouseY: null,
      score: [0, 0],
      lastTime: null,
      raf: 0,
      parked: true,
      parkUntil: performance.now() + PARK_DELAY_MS,
      pendingServeTowardLeft: true,
    };
    stateRef.current = state;

    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      state.dpr = dpr;
      state.w = window.visualViewport?.width ?? window.innerWidth;
      state.h = window.visualViewport?.height ?? window.innerHeight;
      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const paddleH = state.h * PADDLE_HEIGHT_RATIO;
      state.left.y = Math.min(Math.max(state.left.y || state.h / 2, paddleH / 2), state.h - paddleH / 2);
      state.right.y = Math.min(Math.max(state.right.y || state.h / 2, paddleH / 2), state.h - paddleH / 2);
      if (state.parked) parkBallAt(state, oRectRef.current);
    };

    const beginPark = (towardLeft) => {
      state.parked = true;
      state.parkUntil = performance.now() + PARK_DELAY_MS;
      state.pendingServeTowardLeft = towardLeft;
      state.ball.vx = 0;
      state.ball.vy = 0;
      parkBallAt(state, oRectRef.current);
    };

    const serveFromPark = () => {
      state.parked = false;
      const speed = state.h * BALL_SPEED_RATIO;
      const angle = (Math.random() * 0.5 - 0.25) * Math.PI;
      state.ball.vx = (state.pendingServeTowardLeft ? -1 : 1) * speed * Math.cos(angle);
      state.ball.vy = speed * Math.sin(angle);
    };

    sizeCanvas();
    parkBallAt(state, oRectRef.current);

    const onResize = () => sizeCanvas();
    const onMouseMove = (e) => {
      state.mouseY = e.clientY;
    };
    const onTouch = (e) => {
      if (e.touches && e.touches.length > 0) {
        state.mouseY = e.touches[0].clientY;
        if (e.cancelable) e.preventDefault();
      }
    };
    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S'].includes(e.key)) {
        state.keys.add(e.key.toLowerCase());
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => {
      state.keys.delete(e.key.toLowerCase());
    };

    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouch, { passive: false });
    window.addEventListener('touchmove', onTouch, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const stepPhysics = (dt, now) => {
      const paddleH = state.h * PADDLE_HEIGHT_RATIO;
      const halfP = paddleH / 2;
      const maxBallSpeed = state.h * BALL_MAX_SPEED_RATIO;
      const ballR = oRectRef.current?.r ?? BALL_RADIUS_FALLBACK;

      if (state.mouseY != null) {
        state.left.y = state.mouseY;
      }
      let dyKey = 0;
      if (state.keys.has('arrowup') || state.keys.has('w')) dyKey -= 1;
      if (state.keys.has('arrowdown') || state.keys.has('s')) dyKey += 1;
      if (dyKey !== 0) {
        state.left.y += dyKey * PLAYER_SPEED * dt;
        state.mouseY = null;
      }
      state.left.y = Math.min(Math.max(state.left.y, halfP), state.h - halfP);

      const aiSpeed = PLAYER_SPEED * AI_DIFFICULTY;
      const aiTarget = !state.parked && state.ball.vx > 0 ? state.ball.y : state.h / 2;
      const aiDelta = aiTarget - state.right.y;
      const aiStep = Math.sign(aiDelta) * Math.min(Math.abs(aiDelta), aiSpeed * dt);
      state.right.y += aiStep;
      state.right.y = Math.min(Math.max(state.right.y, halfP), state.h - halfP);

      if (state.parked) {
        if (now >= state.parkUntil) serveFromPark();
        else {
          parkBallAt(state, oRectRef.current);
          return;
        }
      }

      state.ball.x += state.ball.vx * dt;
      state.ball.y += state.ball.vy * dt;

      if (state.ball.y - ballR < 0) {
        state.ball.y = ballR;
        state.ball.vy = Math.abs(state.ball.vy);
      } else if (state.ball.y + ballR > state.h) {
        state.ball.y = state.h - ballR;
        state.ball.vy = -Math.abs(state.ball.vy);
      }

      const leftPaddleX = PADDLE_WIDTH;
      const rightPaddleX = state.w - PADDLE_WIDTH;

      if (
        state.ball.vx < 0 &&
        state.ball.x - ballR <= leftPaddleX + PADDLE_WIDTH / 2 &&
        state.ball.x - ballR >= leftPaddleX - PADDLE_WIDTH &&
        state.ball.y >= state.left.y - halfP &&
        state.ball.y <= state.left.y + halfP
      ) {
        const offset = (state.ball.y - state.left.y) / halfP;
        const speed = Math.min(Math.hypot(state.ball.vx, state.ball.vy) * BALL_SPEEDUP, maxBallSpeed);
        const angle = offset * (Math.PI / 3);
        state.ball.vx = Math.abs(speed * Math.cos(angle));
        state.ball.vy = speed * Math.sin(angle);
        state.ball.x = leftPaddleX + PADDLE_WIDTH / 2 + ballR;
      }

      if (
        state.ball.vx > 0 &&
        state.ball.x + ballR >= rightPaddleX - PADDLE_WIDTH / 2 &&
        state.ball.x + ballR <= rightPaddleX + PADDLE_WIDTH &&
        state.ball.y >= state.right.y - halfP &&
        state.ball.y <= state.right.y + halfP
      ) {
        const offset = (state.ball.y - state.right.y) / halfP;
        const speed = Math.min(Math.hypot(state.ball.vx, state.ball.vy) * BALL_SPEEDUP, maxBallSpeed);
        const angle = offset * (Math.PI / 3);
        state.ball.vx = -Math.abs(speed * Math.cos(angle));
        state.ball.vy = speed * Math.sin(angle);
        state.ball.x = rightPaddleX - PADDLE_WIDTH / 2 - ballR;
      }

      let scored = false;
      let nextServeTowardLeft = true;
      if (state.ball.x + ballR < 0) {
        state.score[1] += 1;
        scored = true;
        nextServeTowardLeft = false;
      } else if (state.ball.x - ballR > state.w) {
        state.score[0] += 1;
        scored = true;
        nextServeTowardLeft = true;
      }

      if (scored) {
        const total = state.score[0] + state.score[1];
        if (total >= RESET_AT_TOTAL_SCORE) {
          state.score = [0, 0];
          nextServeTowardLeft = true;
        }
        setScores([state.score[0], state.score[1]]);
        beginPark(nextServeTowardLeft);
      }
    };

    const draw = () => {
      const paddleH = state.h * PADDLE_HEIGHT_RATIO;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, state.w, state.h);

      ctx.fillStyle = '#000';
      ctx.fillRect(PADDLE_WIDTH / 2, state.left.y - paddleH / 2, PADDLE_WIDTH, paddleH);
      ctx.fillRect(state.w - PADDLE_WIDTH * 1.5, state.right.y - paddleH / 2, PADDLE_WIDTH, paddleH);

      const ballR = oRectRef.current?.r ?? BALL_RADIUS_FALLBACK;
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, ballR, 0, Math.PI * 2);
      ctx.fill();

      const digitH = Math.max(48, Math.min(96, state.h * 0.09));
      const topY = state.h * 0.04;
      drawScore(ctx, state.score[0], state.w * 0.25, topY, digitH);
      drawScore(ctx, state.score[1], state.w * 0.75, topY, digitH);
    };

    const loop = (now) => {
      if (state.lastTime == null) state.lastTime = now;
      let dt = (now - state.lastTime) / 1000;
      state.lastTime = now;
      dt = Math.min(dt, 0.05);
      const subSteps = Math.ceil(dt / 0.016) || 1;
      const subDt = dt / subSteps;
      for (let i = 0; i < subSteps; i++) stepPhysics(subDt, now);
      draw();
      state.raf = requestAnimationFrame(loop);
    };
    state.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="pong-canvas" aria-label={`Pong, score ${scores[0]} to ${scores[1]}`} />;
}

function parkBallAt(state, oRect) {
  if (oRect) {
    state.ball.x = oRect.x;
    state.ball.y = oRect.y;
  } else {
    state.ball.x = state.w / 2;
    state.ball.y = state.h / 2;
  }
  state.ball.vx = 0;
  state.ball.vy = 0;
}
