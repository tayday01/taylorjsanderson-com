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
const SECOND_BALL_OFFSET_MS = 2000;
const SECOND_BALL_RANDOM_MAX_MS = 10000;
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

function delayForBall(index) {
  if (index === 0) return PARK_DELAY_MS;
  return PARK_DELAY_MS + SECOND_BALL_OFFSET_MS + Math.random() * SECOND_BALL_RANDOM_MAX_MS;
}

function parkBallAt(ball, oRect, fallbackW, fallbackH) {
  if (oRect) {
    ball.x = oRect.x;
    ball.y = oRect.y;
  } else {
    ball.x = fallbackW / 2;
    ball.y = fallbackH / 2;
  }
  ball.vx = 0;
  ball.vy = 0;
}

export default function Pong({ oRects }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const oRectsRef = useRef(oRects);
  const [scores, setScores] = useState([0, 0]);

  useEffect(() => {
    oRectsRef.current = oRects;
    const s = stateRef.current;
    if (!s) return;
    s.balls.forEach((ball, i) => {
      if (ball.parked) parkBallAt(ball, oRects[i], s.w, s.h);
    });
  }, [oRects]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const now0 = performance.now();
    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      balls: [
        {
          oIndex: 0,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          parked: true,
          parkUntil: now0 + delayForBall(0),
          serveTowardLeft: true,
        },
        {
          oIndex: 1,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          parked: true,
          parkUntil: now0 + delayForBall(1),
          serveTowardLeft: true,
        },
      ],
      left: { y: 0 },
      right: { y: 0 },
      keys: new Set(),
      mouseY: null,
      score: [0, 0],
      lastTime: null,
      raf: 0,
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
      state.balls.forEach((b) => {
        if (b.parked) parkBallAt(b, oRectsRef.current[b.oIndex], state.w, state.h);
      });
    };

    const beginParkBall = (ball, towardLeft, now) => {
      ball.parked = true;
      ball.parkUntil = now + delayForBall(ball.oIndex);
      ball.serveTowardLeft = towardLeft;
      parkBallAt(ball, oRectsRef.current[ball.oIndex], state.w, state.h);
    };

    const serveBall = (ball) => {
      ball.parked = false;
      const speed = state.h * BALL_SPEED_RATIO;
      const angle = (Math.random() * 0.5 - 0.25) * Math.PI;
      ball.vx = (ball.serveTowardLeft ? -1 : 1) * speed * Math.cos(angle);
      ball.vy = speed * Math.sin(angle);
    };

    sizeCanvas();
    state.balls.forEach((b) => parkBallAt(b, oRectsRef.current[b.oIndex], state.w, state.h));

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

    const ballRadius = (ball) => oRectsRef.current[ball.oIndex]?.r ?? BALL_RADIUS_FALLBACK;

    const updateBall = (ball, dt, now) => {
      const paddleH = state.h * PADDLE_HEIGHT_RATIO;
      const halfP = paddleH / 2;
      const maxBallSpeed = state.h * BALL_MAX_SPEED_RATIO;
      const r = ballRadius(ball);

      if (ball.parked) {
        if (now >= ball.parkUntil) serveBall(ball);
        else {
          parkBallAt(ball, oRectsRef.current[ball.oIndex], state.w, state.h);
          return null;
        }
      }

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      if (ball.y - r < 0) {
        ball.y = r;
        ball.vy = Math.abs(ball.vy);
      } else if (ball.y + r > state.h) {
        ball.y = state.h - r;
        ball.vy = -Math.abs(ball.vy);
      }

      const leftPaddleX = PADDLE_WIDTH;
      const rightPaddleX = state.w - PADDLE_WIDTH;

      if (
        ball.vx < 0 &&
        ball.x - r <= leftPaddleX + PADDLE_WIDTH / 2 &&
        ball.x - r >= leftPaddleX - PADDLE_WIDTH &&
        ball.y >= state.left.y - halfP &&
        ball.y <= state.left.y + halfP
      ) {
        const offset = (ball.y - state.left.y) / halfP;
        const speed = Math.min(Math.hypot(ball.vx, ball.vy) * BALL_SPEEDUP, maxBallSpeed);
        const angle = offset * (Math.PI / 3);
        ball.vx = Math.abs(speed * Math.cos(angle));
        ball.vy = speed * Math.sin(angle);
        ball.x = leftPaddleX + PADDLE_WIDTH / 2 + r;
      }

      if (
        ball.vx > 0 &&
        ball.x + r >= rightPaddleX - PADDLE_WIDTH / 2 &&
        ball.x + r <= rightPaddleX + PADDLE_WIDTH &&
        ball.y >= state.right.y - halfP &&
        ball.y <= state.right.y + halfP
      ) {
        const offset = (ball.y - state.right.y) / halfP;
        const speed = Math.min(Math.hypot(ball.vx, ball.vy) * BALL_SPEEDUP, maxBallSpeed);
        const angle = offset * (Math.PI / 3);
        ball.vx = -Math.abs(speed * Math.cos(angle));
        ball.vy = speed * Math.sin(angle);
        ball.x = rightPaddleX - PADDLE_WIDTH / 2 - r;
      }

      if (ball.x + r < 0) {
        return { rightScored: true, leftScored: false };
      }
      if (ball.x - r > state.w) {
        return { rightScored: false, leftScored: true };
      }
      return null;
    };

    const stepPhysics = (dt, now) => {
      const paddleH = state.h * PADDLE_HEIGHT_RATIO;
      const halfP = paddleH / 2;

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

      // AI tracks the most threatening ball: the closest one moving toward the AI.
      const aiSpeed = PLAYER_SPEED * AI_DIFFICULTY;
      let aiTarget = state.h / 2;
      let bestDist = Infinity;
      for (const b of state.balls) {
        if (!b.parked && b.vx > 0) {
          const dist = state.w - b.x;
          if (dist < bestDist) {
            bestDist = dist;
            aiTarget = b.y;
          }
        }
      }
      const aiDelta = aiTarget - state.right.y;
      const aiStep = Math.sign(aiDelta) * Math.min(Math.abs(aiDelta), aiSpeed * dt);
      state.right.y += aiStep;
      state.right.y = Math.min(Math.max(state.right.y, halfP), state.h - halfP);

      let scoreChanged = false;
      let resetAll = false;
      for (const ball of state.balls) {
        const result = updateBall(ball, dt, now);
        if (!result) continue;
        if (result.leftScored) state.score[0] += 1;
        if (result.rightScored) state.score[1] += 1;
        scoreChanged = true;
        const total = state.score[0] + state.score[1];
        if (total >= RESET_AT_TOTAL_SCORE) {
          state.score = [0, 0];
          resetAll = true;
          break;
        }
        beginParkBall(ball, result.rightScored, now);
      }

      if (resetAll) {
        state.balls.forEach((b) => beginParkBall(b, true, now));
      }
      if (scoreChanged) {
        setScores([state.score[0], state.score[1]]);
      }
    };

    const draw = () => {
      const paddleH = state.h * PADDLE_HEIGHT_RATIO;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, state.w, state.h);

      ctx.fillStyle = '#000';
      ctx.fillRect(PADDLE_WIDTH / 2, state.left.y - paddleH / 2, PADDLE_WIDTH, paddleH);
      ctx.fillRect(state.w - PADDLE_WIDTH * 1.5, state.right.y - paddleH / 2, PADDLE_WIDTH, paddleH);

      for (const ball of state.balls) {
        const r = ballRadius(ball);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

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
