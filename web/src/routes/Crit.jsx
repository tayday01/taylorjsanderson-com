import { useEffect } from 'react';

// Crit — AI critique tool for visual design work.
// Editorial case-study layout ported from the Crit.html design prototype:
// hero · premise · walkthrough (dark) · decisions · pull quote · references
// · reflection · CTA.

const img = (name) => `/images/crit/${name}`;

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.crit .reveal'));
    if (items.length === 0) return;
    const showAll = () => items.forEach((el) => el.classList.add('in'));
    if (!('IntersectionObserver' in window)) {
      showAll();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
    const t = setTimeout(showAll, 2500);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);
}

export default function Crit() {
  useReveal();

  return (
    <article className="crit" id="crit-top">
      {/* §01 HERO */}
      <header className="crit-hero" data-screen-label="01 Hero">
        <div className="crit-hero-top reveal">
          <h1 className="crit-wordmark">Crit</h1>
          <div className="crit-hero-meta crit-marker">
            <div><b>01 / 04</b> · Selected work</div>
            <div>Independent · 2025–2026</div>
            <div>Web tool · LLM-backed · Solo build</div>
          </div>
        </div>
        <p className="crit-lede reveal">
          <strong>An AI critique tool for visual design work.</strong>{' '}
          It looks at a single screen, returns a structured critique across five disciplines, and refuses to be flattering.
        </p>
        <div className="crit-hero-shot reveal">
          <img src={img('hero.gif')} alt="Crit — the critique loop" />
        </div>
        <div className="crit-meta-rule reveal">
          <span className="crit-marker"><b>Role</b> · Design, prompt design, frontend</span>
          <span className="crit-marker"><b>Status</b> · Live · Invite-only</span>
        </div>
      </header>

      {/* §02 PREMISE */}
      <section className="crit-premise" id="crit-premise" data-screen-label="02 Premise">
        <div className="crit-row">
          <div className="crit-row-label reveal">
            <span className="crit-marker">02 — Premise</span>
            <span className="crit-sub">Why this exists</span>
          </div>
          <div className="reveal">
            <p className="crit-statement">
              Most AI tools applaud. They explain what they're looking at, agree with you, and call it feedback. I wanted the opposite: <em>a critic that does the unglamorous work of pointing at what isn't working, naming it, and being specific about why.</em>
            </p>
            <div className="crit-premise-body">
              <p className="crit-body">
                Crit reviews a single screen the way a senior designer would in a hallway critique: five disciplines, a short written read, two scores.{' '}
                <a className="crit-note" href="#crit-decisions">No score arrives without a sentence behind it.</a>
              </p>
              <p className="crit-body">
                The tool exists because I wanted that voice on tap during my own work, and because I suspected the constraint (one screen, one read, one critic) would force the model into something more useful than the default chatbot register.
              </p>
            </div>
          </div>
        </div>

        <figure className="crit-beat crit-beat--light reveal">
          <div className="crit-beat-head">
            <span className="crit-marker">In context</span>
            <span className="crit-marker r">Browser · any screen</span>
          </div>
          <div className="crit-beat-duo">
            <img src={img('lifestyle-phone.jpg')} alt="Crit — in context, phone" />
            <img src={img('lifestyle-tablet.jpg')} alt="Crit — in context, tablet" />
          </div>
          <figcaption>It lives in the browser, on any screen: phone or tablet, the read travels.</figcaption>
        </figure>
      </section>

      {/* §03 WALKTHROUGH */}
      <section className="crit-walk" id="crit-walk" data-screen-label="03 Walkthrough">
        <div className="crit-walk-inner">
          <div className="crit-walk-quote reveal">
            <p>One screen in, <em>five disciplines</em> out, and a tone that doesn't flinch.</p>
            <span className="crit-marker crit-marker--faint">03 — Walkthrough</span>
          </div>
          <p className="crit-walk-intro reveal">
            The whole loop, end to end: a screen in, five disciplines out, two scores at the head.
          </p>

          <figure className="crit-beat reveal">
            <div className="crit-beat-head">
              <span className="crit-marker">Beat A — Entry</span>
              <span className="crit-marker r">Fig · 01</span>
            </div>
            <div className="crit-beat-media on-dark">
              <img src={img('entry-screen.jpg')} alt="Entry — the empty state" />
            </div>
            <figcaption>The empty state. A slim field, one prompt, five disciplines, one ghost rule beneath it: paste a screen, not a question.</figcaption>
          </figure>

          <figure className="crit-beat reveal">
            <div className="crit-beat-head">
              <span className="crit-marker">Beat B — Thinking</span>
              <span className="crit-marker r">Fig · 02 · placeholder</span>
            </div>
            <div className="crit-beat-media on-dark">
              <img src={img('loading-temp.jpg')} alt="Thinking — loading loop" />
            </div>
            <figcaption>The model reads the screen out loud, badly, then quietly, line by line, until the page sits still.</figcaption>
          </figure>

          <figure className="crit-beat reveal">
            <div className="crit-beat-head">
              <span className="crit-marker">Beat C — The read</span>
              <span className="crit-marker r">Fig · 03</span>
            </div>
            <div className="crit-beat-pair on-dark">
              <img src={img('result-architecture.jpg')} alt="Result — architecture" />
              <img src={img('result-fashion.jpg')} alt="Result — fashion" />
            </div>
            <figcaption>The flat read, scored. Five named lenses down the left, the written critique on the right, two scores at the head. Here, the same structure across architecture and fashion.</figcaption>
          </figure>

          <figure className="crit-beat reveal">
            <div className="crit-beat-head">
              <span className="crit-marker">Beat D — In detail</span>
              <span className="crit-marker r">Fig · 04</span>
            </div>
            <div className="crit-beat-cards on-dark">
              <img src={img('card-landscape.jpg')} alt="Card — one lens" />
              <img src={img('card-accessories.jpg')} alt="Card — one lens" />
            </div>
            <figcaption>Each lens gets its own card: a named fault, the reason behind it, a score out of twenty. No score arrives without a sentence behind it.</figcaption>
          </figure>
        </div>
      </section>

      {/* §04 DECISIONS */}
      <section className="crit-decisions" id="crit-decisions" data-screen-label="04 Decisions">
        <div className="crit-row crit-decisions-intro reveal">
          <div className="crit-row-label">
            <span className="crit-marker">04 — Decisions</span>
            <span className="crit-sub">Three calls.</span>
            <span className="crit-sub muted">One I still question.</span>
          </div>
          <h2 className="crit-decisions-h2">Three calls that did most of the work, and one I'm still chewing on.</h2>
        </div>

        <div className="crit-calls">
          <article className="crit-call reveal">
            <div className="crit-call-label">
              <span className="crit-call-num">01</span>
              <span className="crit-marker crit-call-tag">Structure</span>
            </div>
            <div>
              <h3 className="crit-call-h3">Five disciplines, not ten things to fix.</h3>
              <p className="crit-body">The model wants to make a list. Left to itself it returns a flat catalogue of nits (wrong alignment, low contrast, a suggested gradient), and the reader walks away with twelve things to do and no idea which one matters.</p>
              <p className="crit-body">Crit forces the read into five named lenses. Each lens gets its own paragraph, and the names are non-negotiable; they're the spine the rest of the critique hangs on.</p>
              <div className="crit-spec">
                <div className="crit-spec-head crit-marker">The five</div>
                <ol className="crit-spec-grid">
                  <li><span className="n">01</span> Typography</li>
                  <li><span className="n">02</span> Hierarchy</li>
                  <li><span className="n">03</span> Composition</li>
                  <li><span className="n">04</span> Color &amp; Tone</li>
                  <li><span className="n">05</span> Message Fit</li>
                </ol>
              </div>
            </div>
          </article>

          <article className="crit-call reveal">
            <div className="crit-call-label">
              <span className="crit-call-num">02</span>
              <span className="crit-marker crit-call-tag">Voice</span>
            </div>
            <div>
              <h3 className="crit-call-h3">Critique, not approval.</h3>
              <p className="crit-body">The first version was too agreeable. It would point at a problem and immediately soften it: “this is mostly working, though you might consider…” The tone was wrong before the content was.</p>
              <p className="crit-body">I rewrote the system prompt with one rule above the rest: <strong>do not open on a compliment, and do not close on reassurance.</strong> Open on the strongest fault. Close on the next thing to try. Everything else is the body.</p>
            </div>
          </article>

          <article className="crit-call reveal">
            <div className="crit-call-label">
              <span className="crit-call-num">03</span>
              <span className="crit-marker crit-call-tag">Scoring</span>
            </div>
            <div>
              <h3 className="crit-call-h3">Two axes, <em>no overall score.</em></h3>
              <p className="crit-body">An overall score is a magnet for the wrong conversation. It collapses five readings into a number, and the number becomes the only thing anyone remembers.</p>
              <p className="crit-body">Crit returns two instead: <strong>Craft</strong> and <strong>Intent</strong>. Craft is how well the screen is made; Intent is how well it's pointed. The pair forces the reader to ask which of the two is failing: the question worth asking.</p>
              <div className="crit-spec">
                <div className="crit-spec-head crit-marker">Scoring axes</div>
                <dl className="crit-axes">
                  <div><dt>Craft</dt><dd>execution, polish, precision</dd></div>
                  <div><dt>Intent</dt><dd>clarity of purpose &amp; fit</dd></div>
                </dl>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* PULL QUOTE */}
      <blockquote className="crit-pull reveal">
        <span className="crit-marker">On flattery</span>
        <p>A critic that flatters is a tool <em>that lies on a faster clock.</em></p>
      </blockquote>

      {/* §05 REFERENCES */}
      <section className="crit-refs" data-screen-label="05 References">
        <div className="crit-refs-inner">
          <div className="crit-refs-head reveal">
            <span className="crit-marker">05 — References</span>
            <span className="crit-marker">Analog source</span>
          </div>
          <div className="crit-refs-img reveal">
            <img src={img('reference-studio.jpg')} alt="Precedent — margin notes, studio crit" />
          </div>
          <div className="crit-refs-cap reveal">
            <span className="crit-marker">Precedent — the studio crit. Pin-ups, panels, red pen in the margin.</span>
            <p>The form is older than the tool. Architecture studios, fashion ateliers, art programs every discipline runs some version of the same loop: work on the wall, a panel reads it, someone marks it up, the author walks back to the desk to fix what got named. Crit is that loop made portable, with the panel collapsed to a single critic that doesn't soften.</p>
          </div>
        </div>
      </section>

      {/* §06 REFLECTION */}
      <section className="crit-reflect" data-screen-label="06 Reflection">
        <div className="crit-row">
          <div className="crit-row-label reveal">
            <span className="crit-marker">06 — Reflection</span>
          </div>
          <p className="reveal crit-reflect-p">
            <em>What I underestimated</em> was how often I'd argue with my own product. Every time Crit returned a hard read on something I'd made, the first instinct was to push back not because it was wrong, but because it wasn't generous. Building a critic that refuses to flatter taught me how often I flatter my own work to keep the room comfortable. The product is sharper than I am, by design. That's the point, and it's still uncomfortable.
          </p>
        </div>
      </section>

      {/* §07 CTA */}
      <footer className="crit-cta" id="crit-cta" data-screen-label="07 Try it">
        <div className="crit-cta-head reveal">
          <span className="crit-marker">07 — Try it</span>
          <span className="crit-marker">End of case</span>
        </div>
        <div className="crit-cta-body reveal">
          <p className="crit-cta-line">Paste a screen.<em>Get a read.</em></p>
          <div className="crit-cta-action">
            <a
              className="crit-btn"
              href="https://crit.taylorjsanderson.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Crit <span aria-hidden="true">→</span>
            </a>
            <p className="crit-fine">
              Invite-only while the build is live. Paste a single screen, image or URL, and get the critique, two scores, and the next move.
            </p>
          </div>
        </div>
        <div className="crit-colophon crit-marker">
          <span>Crit · Selected work</span>
          <a href="#crit-top">↑ Back to top</a>
        </div>
      </footer>
    </article>
  );
}
