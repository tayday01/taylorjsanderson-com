import { findProject } from '../projects.js';

// Christ Cathedral — Diocese of Orange, Johnson Fain, 2014–2016
// Renovation of Philip Johnson's 1980 all-glass Crystal Cathedral campus.
// Six-section narrative: Frame · Insight · System · Iterate · Liturgy · Outcome.

const img = (name) => `/images/crystal/${name}`;

export default function Crystal() {
  const project = findProject('crystal');

  return (
    <article className="cs">
      {/* hero */}
      <div className="cs-hero">
        <img src={img('hero-exterior.jpg')} alt="Christ Cathedral exterior" />
        <div className="cs-hero-gradient" aria-hidden="true" />
        <div className="cs-hero-title">
          <h1 className="cs-hero-display">
            Christ<br />Cathedral
          </h1>
          <div className="cs-hero-tag">
            Architecture · Design system · Parametric fabrication
          </div>
        </div>
      </div>

      {/* meta strip */}
      <div className="cs-meta">
        <div className="cs-meta-item"><span className="cs-meta-key">Client</span><span className="cs-meta-val">Diocese of Orange</span></div>
        <div className="cs-meta-item"><span className="cs-meta-key">Location</span><span className="cs-meta-val">Garden Grove, CA</span></div>
        <div className="cs-meta-item"><span className="cs-meta-key">Firm</span><span className="cs-meta-val">Johnson Fain</span></div>
        <div className="cs-meta-item"><span className="cs-meta-key">Role</span><span className="cs-meta-val">{project.role}</span></div>
        <div className="cs-meta-item"><span className="cs-meta-key">Timeline</span><span className="cs-meta-val">{project.year}</span></div>
        <div className="cs-meta-item"><span className="cs-meta-key">Dedicated</span><span className="cs-meta-val">July 2019</span></div>
      </div>

      {/* 01 · Frame */}
      <section className="cs-section">
        <span className="cs-eyebrow-num">01 / 06 · Frame</span>
        <h2 className="cs-display">Frame.</h2>

        <div className="cs-two-col">
          <div className="cs-prose">
            <p>
              The Diocese of Orange purchased the Crystal Cathedral campus in 2012 for
              $57.5 million, three years after the original ministry's bankruptcy.
              Renovation cost $77 million; dedication followed in July 2019. The campus
              also includes work by Richard Neutra and Richard Meier — three architects
              of that caliber on a single site is exceptional.
            </p>
            <p>
              I joined the design team at Johnson Fain in 2014, led by Scott Johnson,
              and worked through SD, DD, and CD. The sections that follow trace three
              contributions: the parametric façade, the rood screen, and the liturgical
              elements.
            </p>
          </div>

          <div>
            <p className="cs-lead">A 1980 all-glass cathedral.</p>
            <p className="cs-lead" style={{ marginTop: '1rem' }}>Three needs at once:</p>
            <p className="cs-lead cs-lead-accent" style={{ marginTop: '1.25rem', lineHeight: 1.35 }}>
              comfort<br />preservation<br />liturgy.
            </p>

            <div className="cs-stat-row" style={{ marginTop: '2.5rem' }}>
              <div>
                <div className="cs-stat-num">$57.5M</div>
                <div className="cs-stat-lbl">Purchase · 2012</div>
              </div>
              <div>
                <div className="cs-stat-num">$77M</div>
                <div className="cs-stat-lbl">Renovation</div>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-two-col" style={{ marginTop: 'clamp(3rem, 5vw, 4rem)' }}>
          <div>
            <div className="cs-media" style={{ aspectRatio: '3 / 2' }}>
              <img src={img('johnson-portrait.jpg')} alt="Philip Johnson at the original cathedral" />
            </div>
            <p className="cs-cap">
              Philip Johnson at the original cathedral, designed with John Burgee for
              Schuller's Hour of Power. The Diocese of Orange acquired the campus in 2012.
            </p>
          </div>
          <div>
            <div className="cs-two-col" style={{ gap: '1rem' }}>
              <div className="cs-media" style={{ aspectRatio: '3 / 4' }}>
                <img src={img('orig-interior-panels.jpg')} alt="Original interior — panels" />
              </div>
              <div className="cs-media" style={{ aspectRatio: '3 / 4' }}>
                <img src={img('orig-interior-light.jpg')} alt="Original interior — light study" />
              </div>
            </div>
            <p className="cs-cap">
              The original interior. Almost entirely glass. Brilliant under desert sun
              and difficult to occupy — heat gain and glare made the volume punishing as
              a working sanctuary.
            </p>
          </div>
        </div>
      </section>

      {/* 02 · Insight */}
      <section className="cs-section align-right">
        <span className="cs-eyebrow-num">02 / 06 · Insight</span>
        <h2 className="cs-display">Insight.</h2>

        <p className="cs-lead" style={{ textAlign: 'left', marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          The deliverable was never the panels.<br />
          <span className="cs-lead-accent">It was the volume after the panels were installed.</span>
        </p>

        <div className="cs-prose" style={{ textAlign: 'left', marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', marginLeft: 'auto' }}>
          <p>
            The light Johnson's all-glass envelope produced had been the building's
            signature for forty years. It had also made the interior thermally and
            visually demanding. The Diocese needed a sanctuary that could hold a
            congregation comfortably, preserve the volume Johnson had designed, and
            accommodate a Catholic liturgical program the original building had never
            been built for. The shading system had to do both jobs at once: cut solar
            gain, and let the building feel sacred.
          </p>
        </div>
      </section>

      {/* full-bleed quatrefoil daylight study */}
      <div className="cs-fullbleed">
        <div className="cs-media" style={{ aspectRatio: '16 / 9' }}>
          <img src={img('quatrefoil-daylight.jpg')} alt="Quatrefoil daylight study" />
        </div>
        <p className="cs-cap-fullbleed">
          The dot pattern fragments daylight before it reaches the floor, replacing direct sun with a moving field of caustics.
        </p>
      </div>

      <section className="cs-section" style={{ borderTop: 'none', paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="cs-two-col">
          <div>
            {/* Grid image spans the entire left column */}
            <div className="cs-media" style={{ aspectRatio: '3 / 4' }}>
              <img src={img('quatrefoil-grid.png')} alt="Quatrefoil grid pattern" />
            </div>
          </div>
          <div>
            <div className="cs-prose">
              <p>
                Scott Johnson conceived the quatrefoil unit, modernized four-leaf-clover
                panels in four triangular petals each, reflecting the cathedral's existing
                triangular geometry. I built the parametric definition that generated every
                panel from that unit: surface position, solar exposure, and a small set of
                tuning parameters drove each opening's size and orientation. The output was
                fabrication-ready DXF for water-jet cutting.
              </p>
            </div>
            {/* 3-quatrefoils unit image, placed under the text paragraph */}
            <div className="cs-media contain" style={{ aspectRatio: '5 / 2', marginTop: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <img src={img('quatrefoil-unit.png')} alt="Quatrefoil unit iterations" />
            </div>
          </div>
        </div>
      </section>

      {/* 03 · System */}
      <section className="cs-section align-right">
        <span className="cs-eyebrow-num">03 / 06 · System</span>
        <h2 className="cs-display">System.</h2>

        <h3 className="cs-lead" style={{ textAlign: 'left', maxWidth: '32ch' }}>
          The quatrefoil. <span className="cs-lead-accent">One unit.</span><br />
          Tens of thousands of unique openings.
        </h3>

        <div className="cs-two-col" style={{ textAlign: 'left', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div>
            <div className="cs-media dark" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('massing-model.jpg')} alt="Full massing model" style={{ objectFit: 'contain' }} />
            </div>
            <p className="cs-cap">Full massing model. Quatrefoil tested at building scale before unit locked.</p>

            <div className="cs-media dark" style={{ aspectRatio: '4 / 3', marginTop: '1.25rem' }}>
              <img src={img('wall-section-model.jpg')} alt="Wall-section model" style={{ objectFit: 'contain' }} />
            </div>
            <p className="cs-cap">Wall-section model. Tested as a built thing, not a drawing.</p>
          </div>

          <div>
            <div className="cs-media contain" style={{ aspectRatio: '2 / 3' }}>
              <img src={img('dot-pattern-study.png')} alt="Perforation dot pattern study" />
            </div>
            <p className="cs-sublabel" style={{ marginTop: '0.75rem' }}>Perforation pattern</p>
          </div>
        </div>

        <div style={{ textAlign: 'left', marginTop: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div className="cs-media contain" style={{ aspectRatio: '16 / 7' }}>
            <img src={img('process-strip.png')} alt="Solar exposure progression" />
          </div>
          <p className="cs-cap">Existing · 0° · 15° · 30° · 45°. Solar profile, daylight quality, density.</p>
        </div>

        <div className="cs-process-head" style={{ textAlign: 'left', marginTop: 'clamp(3rem, 5vw, 4rem)' }}>
          <span className="cs-sublabel" style={{ margin: 0 }}>Process · iterative loop</span>
          <span className="cs-sublabel accent" style={{ margin: 0 }}>↻ Until geometry resolved</span>
        </div>
        <div className="cs-process">
          <span className="cs-pill">sketch</span>
          <span className="cs-process-dash" aria-hidden="true" />
          <span className="cs-pill">model</span>
          <span className="cs-process-dash" aria-hidden="true" />
          <span className="cs-pill">reconcile</span>
          <span className="cs-process-dash" aria-hidden="true" />
          <span className="cs-pill">regenerate</span>
          <span className="cs-process-dash" aria-hidden="true" />
          <span className="cs-pill solid">CD</span>
        </div>
      </section>

      {/* full-bleed wide interior */}
      <div className="cs-fullbleed">
        <div className="cs-media" style={{ aspectRatio: '16 / 9' }}>
          <img src={img('wide-interior-build.jpg')} alt="Christ Cathedral interior, completed" />
        </div>
        <p className="cs-cap-fullbleed">
          Interior, completed. The dot pattern is the experience the renovation produced.
        </p>
      </div>

      <section className="cs-section" style={{ borderTop: 'none', paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="cs-two-col">
          <div className="cs-prose">
            <p>
              What the quatrefoil pattern does to light is the case study's center.
              Daylight enters through millions of perforations, each one located on a
              panel sized and oriented to its position on the surface. The ceiling and
              walls become a filter. On the floor, light moves through the day in
              patterns that don't repeat — closer to caustics on a pool floor than to
              the hard rectangles of typical fenestration. We were not designing the
              panels. We were designing what happens inside the volume after the panels
              are installed.
            </p>
          </div>
          <div className="cs-stat-row">
            <div>
              <div className="cs-stat-num">5,000</div>
              <div className="cs-stat-lbl">Panels</div>
            </div>
            <div>
              <div className="cs-stat-num">10<sup>4+</sup></div>
              <div className="cs-stat-lbl">Openings</div>
            </div>
            <div>
              <div className="cs-stat-num">1</div>
              <div className="cs-stat-lbl">Script</div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · Iterate */}
      <section className="cs-section" style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <span className="cs-eyebrow-num">04 / 06 · Iterate</span>
        <h2 className="cs-display">Iterate.</h2>

        <h3 className="cs-lead" style={{ textAlign: 'right', maxWidth: '20ch', marginLeft: 'auto' }}>
          Nothing is fixed until the constraint <span className="cs-lead-accent">is real.</span>
        </h3>

        <div className="cs-two-col" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div>
            <div className="cs-media" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('rood-as-built.jpg')} alt="Rood screen as built" />
            </div>
            <p className="cs-cap">
              The rood screen as built, framing the priest's seating. The dot-pattern
              band houses the sanctuary's primary speakers.
            </p>
            <div className="cs-prose" style={{ marginTop: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <p>
                I designed the rood screen, working from Scott's initial direction. It was
                the most visible interior element framing the priest's seating, and it had
                to do two jobs: read as part of the cathedral's modernized liturgical
                language, and house the sanctuary's primary speakers behind a perforated band.
              </p>
              <p>
                I drew it thin and elegant. Then structural came back with frame depths
                that took most of the interior cavity. Then acoustics specified speakers
                larger than the space I'd left. I tried mounting the speakers outside the
                frame. I reconfigured the geometry. I kept working to preserve the
                proportions I'd set.
              </p>
              <p>
                Scott looked at it and said: <em>"Make it wider."</em>
              </p>
              <p>
                I hadn't realized that was an option. We widened it. Structure fit.
                Speakers fit. The dot-pattern script regenerated the new openings sized
                for sound. The wider rood screen read as more substantial than the
                original. Better, actually. The system absorbed the change because the
                system was built to.
              </p>
            </div>
          </div>
          <div>
            <div className="cs-media contain" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('rood-structural.png')} alt="Rood screen structural development" />
            </div>
            <div className="cs-media contain" style={{ aspectRatio: '4 / 3', marginTop: '1rem' }}>
              <img src={img('rood-detail.png')} alt="Rood screen detail" />
            </div>
            <p className="cs-cap">
              Rood screen, structural development. Original proportions on one side,
              revised after speaker integration on the other.
            </p>
          </div>
        </div>
      </section>

      {/* 05 · Liturgy */}
      <section className="cs-section align-right" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <span className="cs-eyebrow-num">05 / 06 · Liturgy</span>
        <h2 className="cs-display">Liturgy.</h2>

        <div className="cs-two-col" style={{ textAlign: 'left' }}>
          <div className="cs-prose">
            <p>
              Scott Johnson set the direction for each element. I developed altar,
              baptistry, ambo, and tester from initial sketches through detailed design
              and construction documents — modeling iterations, sketching
              reconciliations, refining options for review.
            </p>
            <p>
              These aren't ornaments. They are the instruments of the liturgy: the altar
              of Mass, the baptistry where infants are received, the ambo where scripture
              is proclaimed, the tester suspended above the altar. Use creates
              significance; design gives it form.
            </p>
          </div>
          <div>
            <h3 className="cs-lead">
              Altar. Baptistry. Ambo. Tester.<br />
              <span className="cs-lead-accent">Instruments, not ornaments.</span>
            </h3>
          </div>
        </div>
      </section>

      {/* Altar */}
      <section className="cs-element">
        <h3 className="cs-element-title">Altar.</h3>
        <div className="cs-element-tagline">
          <span className="cs-element-where">Where it happens</span>
          <p className="cs-element-desc-inline">
            Book-matched stone. Angular volumes, grain matched across faces. Sits in front of the rood screen.
          </p>
        </div>
        <div className="cs-three-up">
          <div>
            <p className="cs-sublabel">Sketch · Loose</p>
            <div className="cs-media contain" style={{ aspectRatio: '1 / 1' }}>
              <img src={img('altar-sketch.png')} alt="Altar sketch" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Drawings · Build</p>
            <div className="cs-media contain" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('altar-drawings.png')} alt="Altar drawings" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Render · Resolved</p>
            <div className="cs-media" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('altar-render.jpg')} alt="Altar render" />
            </div>
          </div>
        </div>
      </section>

      {/* Baptistry */}
      <section className="cs-element">
        <h3 className="cs-element-title" style={{ textAlign: 'right' }}>Baptistry.</h3>
        <div className="cs-element-tagline right">
          <p className="cs-element-desc-inline">
            Stone-clad vessel with an all-stone cross bath and custom coursing throughout.
          </p>
          <span className="cs-element-where">Where it begins</span>
        </div>
        <div className="cs-three-up">
          <div>
            <p className="cs-sublabel">Render · Resolved</p>
            <div className="cs-media" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('baptistry-render.jpg')} alt="Baptistry render" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Drawings · Build</p>
            <div className="cs-media contain" style={{ aspectRatio: '5 / 4' }}>
              <img src={img('baptistry-drawings.png')} alt="Baptistry drawings" />
            </div>
            <div className="cs-media contain" style={{ aspectRatio: '5 / 2', marginTop: '0.875rem' }}>
              <img src={img('baptistry-section.png')} alt="Baptistry section" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Sketch · Loose</p>
            <div className="cs-media contain" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('baptistry-sketch.png')} alt="Baptistry sketch" />
            </div>
          </div>
        </div>
      </section>

      {/* Ambo */}
      <section className="cs-element">
        <h3 className="cs-element-title">Ambo.</h3>
        <div className="cs-element-tagline">
          <span className="cs-element-where">Where it's proclaimed</span>
          <p className="cs-element-desc-inline">
            Book-matched stone, cuts reference the quatrefoil.
          </p>
        </div>
        <div className="cs-three-up">
          <div>
            <p className="cs-sublabel">Sketch · Loose</p>
            <div className="cs-media contain" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('ambo-section.png')} alt="Ambo sketch" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Drawings · Build</p>
            <div className="cs-media contain" style={{ aspectRatio: '7 / 4' }}>
              <img src={img('ambo-elevation.png')} alt="Ambo elevation" />
            </div>
            <div className="cs-media contain" style={{ aspectRatio: '7 / 4', marginTop: '0.875rem' }}>
              <img src={img('ambo-drawings.png')} alt="Ambo drawings" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Render · Resolved</p>
            <div className="cs-media" style={{ aspectRatio: '4 / 5' }}>
              <img src={img('ambo-render.jpg')} alt="Ambo render" />
            </div>
          </div>
        </div>
      </section>

      {/* Tester */}
      <section className="cs-element">
        <h3 className="cs-element-title" style={{ textAlign: 'right' }}>Tester.</h3>
        <div className="cs-element-tagline right">
          <p className="cs-element-desc-inline">
            Metal square suspended over the altar. Vented fins filter the light; more commonly the baldachin.
          </p>
          <span className="cs-element-where">Where it shines</span>
        </div>
        <div className="cs-three-up">
          <div>
            <p className="cs-sublabel">Render · Resolved</p>
            <div className="cs-media" style={{ aspectRatio: '4 / 3' }}>
              <img src={img('tester-render.jpg')} alt="Tester render" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Drawings · Build</p>
            <div className="cs-media contain" style={{ aspectRatio: '3 / 2' }}>
              <img src={img('tester-3d.png')} alt="Tester 3D" />
            </div>
            <div className="cs-media contain" style={{ aspectRatio: '3 / 2', marginTop: '0.875rem' }}>
              <img src={img('tester-perspective.png')} alt="Tester perspective" />
            </div>
          </div>
          <div>
            <p className="cs-sublabel">Sketch · Loose</p>
            <div className="cs-media contain" style={{ aspectRatio: '4 / 5' }}>
              <img src={img('tester-sketch.png')} alt="Tester sketch" />
            </div>
          </div>
        </div>
      </section>

      {/* 06 · Outcome */}
      <section className="cs-section">
        <span className="cs-eyebrow-num">06 / 06 · Outcome</span>
        <h2 className="cs-display">Outcome.</h2>

        <div className="cs-two-col">
          <p className="cs-lead">
            Dedicated <span className="cs-lead-accent">July 2019.</span>
          </p>
          <div className="cs-prose">
            <p>
              Five thousand panels, every one parametrically unique. Millions of
              perforations across the dot pattern, each one driven by location,
              orientation, and solar exposure. The parametric definition's DXF output
              went directly to fabrication — the script's geometry was the cutting geometry.
            </p>
          </div>
        </div>
      </section>

      <div className="cs-fullbleed">
        <div className="cs-media" style={{ aspectRatio: '21 / 9' }}>
          <img src={img('closing-interior.jpg')} alt="Christ Cathedral interior, completed" />
        </div>
      </div>

      <section className="cs-section" style={{ borderTop: 'none', paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="cs-stat-row three-up">
          <div>
            <div className="cs-stat-num">5,000</div>
            <div className="cs-stat-lbl">Panels · all unique</div>
          </div>
          <div>
            <div className="cs-stat-num">1,000,000s</div>
            <div className="cs-stat-lbl">Unique openings</div>
          </div>
          <div>
            <div className="cs-stat-num">1</div>
            <div className="cs-stat-lbl">Script → DXF → Cut</div>
          </div>
        </div>

        <p className="cs-pull">
          The system is the design.<br />
          The user is the test.<br />
          <span className="cs-lead-accent">The constraints are the gift.</span>
        </p>
      </section>
    </article>
  );
}
