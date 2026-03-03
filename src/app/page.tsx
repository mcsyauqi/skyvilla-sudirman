'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

/* ───────────────────────── IMAGE URLS ───────────────────────── */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80',
  interior1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  interior2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  interior3: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  bedroom: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  living: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  pool: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
  building: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  penthouse: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  nightCity: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80',
};

/* ───────────────────────── INTERSECTION OBSERVER ───────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ═══════════════════════════════════════════════════════════════
   1. NAVIGATION
   ═══════════════════════════════════════════════════════════════ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Vision', href: '#vision' },
    { label: 'Residences', href: '#residences' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(230,57,70,0.3)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-display"
        style={{
          fontSize: '32px',
          letterSpacing: '6px',
          color: '#FFFFFF',
          textDecoration: 'none',
        }}
      >
        SKYVILLA
      </a>

      {/* Desktop links */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}
        className="hidden md:flex"
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav-link"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
        aria-label="Toggle menu"
      >
        <span
          style={{
            width: '28px',
            height: '2px',
            background: '#fff',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }}
        />
        <span
          style={{
            width: '28px',
            height: '2px',
            background: '#fff',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            width: '28px',
            height: '2px',
            background: '#fff',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(13,13,13,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            zIndex: 999,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display"
              style={{
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '36px',
                letterSpacing: '4px',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. HERO — SPLIT SCREEN
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left half — text */}
      <div
        style={{
          width: '50%',
          background: '#0D0D0D',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 60px',
          position: 'relative',
          zIndex: 3,
        }}
        className="hero-left"
      >
        <h1
          className="font-display animate-slide-in-left"
          style={{
            fontSize: 'clamp(80px, 12vw, 160px)',
            lineHeight: 0.9,
            color: '#FFFFFF',
            letterSpacing: '8px',
          }}
        >
          SKY
        </h1>
        <h1
          className="font-display animate-slide-in-left delay-100"
          style={{
            fontSize: 'clamp(80px, 12vw, 160px)',
            lineHeight: 0.9,
            color: '#FFFFFF',
            letterSpacing: '8px',
          }}
        >
          VILLA
        </h1>
        <p
          className="font-display animate-fade-in-up delay-300"
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#E63946',
            letterSpacing: '12px',
            marginTop: '16px',
          }}
        >
          SUDIRMAN
        </p>
        <p
          className="animate-fade-in-up delay-500"
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginTop: '24px',
            fontWeight: 300,
          }}
        >
          62 Stories Above the Ordinary
        </p>
      </div>

      {/* Right half — image */}
      <div
        style={{
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hero-right"
      >
        <img
          src={IMAGES.hero}
          alt="Jakarta city skyline at dusk"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className="animate-scale-in"
        />
        {/* Dark gradient overlay for depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(13,13,13,0.4) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Red diagonal stripe */}
      <div
        className="red-stripe"
        style={{
          left: '48%',
          top: '-50%',
        }}
      />

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        className="animate-fade-in-up delay-800"
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #E63946, transparent)',
          }}
        />
      </div>

      {/* Responsive override for mobile: stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .hero-left {
            width: 100% !important;
            position: absolute !important;
            inset: 0 !important;
            padding: 0 24px !important;
            background: rgba(13,13,13,0.85) !important;
            z-index: 4 !important;
          }
          .hero-right {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. VISION
   ═══════════════════════════════════════════════════════════════ */
function Vision() {
  const { ref, inView } = useInView();

  return (
    <section
      id="vision"
      ref={ref}
      style={{
        background: '#FFFFFF',
        padding: '120px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Statement */}
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up' : ''}`}
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.05,
            color: '#0D0D0D',
            opacity: inView ? 1 : 0,
          }}
        >
          WE DON&apos;T BUILD APARTMENTS.
        </h2>
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up delay-200' : ''}`}
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.05,
            color: '#E63946',
            opacity: inView ? 1 : 0,
          }}
        >
          WE BUILD STATEMENTS.
        </h2>

        {/* Description */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginTop: '48px',
          }}
          className="vision-grid"
        >
          <p
            className={inView ? 'animate-fade-in-up delay-300' : ''}
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#333333',
              opacity: inView ? 1 : 0,
            }}
          >
            Skyvilla Sudirman rises 62 stories above Jakarta&apos;s most
            prestigious corridor, shattering conventions of what luxury living
            means. This is not a place to simply reside — it is a declaration of
            ambition, taste, and unapologetic boldness.
          </p>
          <p
            className={inView ? 'animate-fade-in-up delay-400' : ''}
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#333333',
              opacity: inView ? 1 : 0,
            }}
          >
            Every line, every material, every view has been engineered to
            provoke. Conceived by world-renowned architects and brought to life
            with obsessive precision, Skyvilla redefines the Jakarta skyline and
            the lives of those who call it home.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '80px',
            marginTop: '80px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { number: '62', label: 'FLOORS' },
            { number: '248', label: 'RESIDENCES' },
            { number: '\u221E', label: 'POSSIBILITIES' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={inView ? `animate-fade-in-up delay-${(i + 5) * 100}` : ''}
              style={{
                textAlign: 'center',
                opacity: inView ? 1 : 0,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(48px, 8vw, 96px)',
                  color: '#0D0D0D',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  letterSpacing: '3px',
                  color: '#333333',
                  marginTop: '8px',
                  display: 'block',
                }}
              >
                {stat.label}
              </span>
              {/* Red underline accent */}
              <div
                style={{
                  width: '40px',
                  height: '3px',
                  background: '#E63946',
                  margin: '12px auto 0',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .vision-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. RESIDENCES — ASYMMETRIC LAYOUT
   ═══════════════════════════════════════════════════════════════ */
const residences = [
  {
    name: 'APEX',
    subtitle: 'Sky Penthouse',
    area: '500 sqm',
    beds: '4 Bedrooms',
    floors: 'Floors 58-62',
    price: 'From IDR 45B',
    image: 'penthouse',
    description:
      'The crown of Skyvilla. Duplex living across the top floors with 360-degree panoramic views, private elevator, and a rooftop terrace that stretches across the sky.',
    imageLeft: true,
  },
  {
    name: 'STRATOS',
    subtitle: 'Premium Residence',
    area: '200 sqm',
    beds: '3 Bedrooms',
    floors: 'Floors 30-57',
    price: 'From IDR 12B',
    image: 'interior1',
    description:
      'Expansive living for those who demand space without compromise. Floor-to-ceiling glass walls frame the city like a living canvas. Every room is a statement.',
    imageLeft: false,
  },
  {
    name: 'AERO',
    subtitle: 'Studio Suite',
    area: '90 sqm',
    beds: 'Studio',
    floors: 'Floors 10-29',
    price: 'From IDR 4.5B',
    image: 'living',
    description:
      'Compact brilliance. Intelligently designed studios that prove luxury has no minimum size. Smart home integrated, with views that dwarf penthouses elsewhere.',
    imageLeft: true,
  },
];

function Residences() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="residences"
      ref={ref}
      style={{
        background: '#0D0D0D',
        padding: '120px 0',
      }}
    >
      {/* Section title */}
      <div
        style={{ padding: '0 60px', marginBottom: '80px' }}
        className={inView ? 'animate-fade-in-up' : ''}
      >
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#FFFFFF',
            letterSpacing: '4px',
            opacity: inView ? 1 : 0,
          }}
        >
          THE <span style={{ color: '#E63946' }}>RESIDENCES</span>
        </h2>
      </div>

      {/* Residence cards */}
      {residences.map((r, index) => (
        <ResidenceCard key={r.name} residence={r} index={index} parentInView={inView} />
      ))}
    </section>
  );
}

interface Residence {
  name: string;
  subtitle: string;
  area: string;
  beds: string;
  floors: string;
  price: string;
  image: string;
  description: string;
  imageLeft: boolean;
}

function ResidenceCard({
  residence: r,
  index,
  parentInView,
}: {
  residence: Residence;
  index: number;
  parentInView: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  const visible = parentInView || inView;

  const imgSrc = IMAGES[r.image as keyof typeof IMAGES];

  const imageBlock = (
    <div
      style={{
        flex: '0 0 70%',
        maxWidth: '70%',
        height: '500px',
        overflow: 'hidden',
        position: 'relative',
      }}
      className="residence-image-block"
    >
      <img
        src={imgSrc}
        alt={`${r.name} — ${r.subtitle}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        className="img-zoom"
      />
      {/* Red corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: r.imageLeft ? 'auto' : 0,
          right: r.imageLeft ? 0 : 'auto',
          width: '4px',
          height: '80px',
          background: '#E63946',
        }}
      />
    </div>
  );

  const textBlock = (
    <div
      style={{
        flex: '0 0 30%',
        maxWidth: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
      }}
      className="residence-text-block"
    >
      <span
        style={{
          fontSize: '12px',
          letterSpacing: '3px',
          color: '#E63946',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        {r.subtitle}
      </span>
      <h3
        className="font-display"
        style={{
          fontSize: 'clamp(36px, 4vw, 64px)',
          color: '#FFFFFF',
          letterSpacing: '4px',
          lineHeight: 1,
        }}
      >
        {r.name}
      </h3>
      {/* Red accent line */}
      <div
        style={{
          width: '50px',
          height: '3px',
          background: '#E63946',
          margin: '20px 0',
        }}
      />
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '24px',
        }}
      >
        {r.description}
      </p>
      {/* Specs */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {[r.area, r.beds, r.floors, r.price].map((spec) => (
          <span
            key={spec}
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '1px',
            }}
          >
            {spec}
          </span>
        ))}
      </div>
      {/* CTA link */}
      <a
        href="#contact"
        style={{
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#E63946',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'letter-spacing 0.3s ease',
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLElement).style.letterSpacing = '5px')
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.letterSpacing = '3px')
        }
      >
        Inquire &rarr;
      </a>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`residence-card ${visible ? 'animate-fade-in-up' : ''}`}
      style={{
        display: 'flex',
        flexDirection: r.imageLeft ? 'row' : 'row-reverse',
        marginBottom: index < residences.length - 1 ? '80px' : 0,
        opacity: visible ? 1 : 0,
      }}
    >
      {imageBlock}
      {textBlock}

      <style>{`
        @media (max-width: 768px) {
          .residence-image-block {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            height: 300px !important;
          }
          .residence-text-block {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            padding: 24px !important;
          }
          .residence-card {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. AMENITIES — HORIZONTAL STRIP
   ═══════════════════════════════════════════════════════════════ */
const amenities = [
  { image: IMAGES.pool, label: 'INFINITY POOL', desc: 'Rooftop, Level 60' },
  { image: IMAGES.building, label: 'SKY GYM', desc: 'Level 55, Panoramic' },
  { image: IMAGES.interior2, label: 'PRIVATE CINEMA', desc: 'Level 3, Dolby Atmos' },
  { image: IMAGES.nightCity, label: 'ROOFTOP BAR', desc: 'Level 62, Signature' },
];

function Amenities() {
  const { ref, inView } = useInView();

  return (
    <section
      id="amenities"
      ref={ref}
      style={{
        background: '#FFFFFF',
        padding: '120px 60px',
      }}
    >
      {/* Section title */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up' : ''}`}
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#0D0D0D',
            letterSpacing: '4px',
            opacity: inView ? 1 : 0,
          }}
        >
          WORLD-CLASS{' '}
          <span style={{ color: '#E63946' }}>AMENITIES</span>
        </h2>
      </div>

      {/* Horizontal row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
        className="amenities-grid"
      >
        {amenities.map((a, i) => (
          <div
            key={a.label}
            className={inView ? `animate-fade-in-up delay-${(i + 2) * 100}` : ''}
            style={{
              textAlign: 'center',
              opacity: inView ? 1 : 0,
            }}
          >
            <div
              style={{
                width: '200px',
                height: '200px',
                margin: '0 auto',
                overflow: 'hidden',
                borderRadius: '4px',
              }}
            >
              <img
                src={a.image}
                alt={a.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                className="img-zoom"
              />
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: '24px',
                color: '#0D0D0D',
                letterSpacing: '3px',
                marginTop: '20px',
              }}
            >
              {a.label}
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: '#333333',
                letterSpacing: '1px',
                marginTop: '6px',
              }}
            >
              {a.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .amenities-grid img {
            width: 150px !important;
            height: 150px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. LOCATION — SPLIT SCREEN
   ═══════════════════════════════════════════════════════════════ */
function Location() {
  const { ref, inView } = useInView();

  const distances = [
    { place: 'SCBD Complex', time: '3 min walk' },
    { place: 'Pacific Place Mall', time: '5 min walk' },
    { place: 'Sudirman MRT Station', time: '2 min walk' },
    { place: 'Halim Airport', time: '25 min drive' },
    { place: 'Soekarno-Hatta Airport', time: '45 min drive' },
  ];

  return (
    <section
      id="location"
      ref={ref}
      style={{
        display: 'flex',
        minHeight: '600px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="location-section"
    >
      {/* Left — text on black */}
      <div
        style={{
          width: '50%',
          background: '#0D0D0D',
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="location-left"
      >
        {/* Giant background text */}
        <span
          className="font-display"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '200px',
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '20px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          SCBD
        </span>

        <span
          className={inView ? 'animate-fade-in-up' : ''}
          style={{
            fontSize: '12px',
            letterSpacing: '4px',
            color: '#E63946',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: inView ? 1 : 0,
          }}
        >
          Prime Location
        </span>
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#FFFFFF',
            letterSpacing: '4px',
            lineHeight: 1.1,
            marginBottom: '12px',
            opacity: inView ? 1 : 0,
          }}
        >
          JL. JEND. SUDIRMAN
        </h2>
        <p
          className={inView ? 'animate-fade-in-up delay-200' : ''}
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '40px',
            lineHeight: 1.7,
            opacity: inView ? 1 : 0,
          }}
        >
          Positioned at the epicenter of Jakarta&apos;s golden triangle — where
          power, culture, and commerce converge. Every address you need is
          already at your doorstep.
        </p>

        {/* Distances */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {distances.map((d, i) => (
            <div
              key={d.place}
              className={inView ? `animate-slide-in-left delay-${(i + 3) * 100}` : ''}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '12px',
                opacity: inView ? 1 : 0,
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#FFFFFF',
                  letterSpacing: '1px',
                }}
              >
                {d.place}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#E63946',
                  letterSpacing: '1px',
                }}
              >
                {d.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — night city image */}
      <div
        style={{
          width: '50%',
          overflow: 'hidden',
          position: 'relative',
        }}
        className="location-right"
      >
        <img
          src={IMAGES.nightCity}
          alt="Jakarta at night"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minHeight: '600px',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(13,13,13,0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-section {
            flex-direction: column !important;
          }
          .location-left, .location-right {
            width: 100% !important;
          }
          .location-right {
            min-height: 300px !important;
          }
          .location-right img {
            min-height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. CONTACT CTA
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#E63946',
        padding: '120px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent text */}
      <span
        className="font-display"
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          fontSize: '300px',
          color: 'rgba(255,255,255,0.06)',
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        SKY
      </span>

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up' : ''}`}
          style={{
            fontSize: 'clamp(48px, 7vw, 80px)',
            color: '#FFFFFF',
            letterSpacing: '6px',
            textAlign: 'center',
            lineHeight: 1.1,
            opacity: inView ? 1 : 0,
          }}
        >
          READY TO RISE?
        </h2>
        <p
          className={inView ? 'animate-fade-in-up delay-200' : ''}
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '15px',
            letterSpacing: '1px',
            marginTop: '16px',
            marginBottom: '48px',
            opacity: inView ? 1 : 0,
          }}
        >
          Register your interest for an exclusive preview.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={inView ? 'animate-fade-in-up delay-300' : ''}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              opacity: inView ? 1 : 0,
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              className="red-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="red-input"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="red-input"
            />
            <button
              type="submit"
              className="animate-red-pulse"
              style={{
                marginTop: '16px',
                padding: '16px 40px',
                background: '#FFFFFF',
                color: '#E63946',
                border: 'none',
                fontSize: '16px',
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: '4px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                alignSelf: 'center',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              CLAIM YOUR SKY
            </button>
          </form>
        ) : (
          <div
            className="animate-fade-in-up"
            style={{
              textAlign: 'center',
              padding: '40px',
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: '32px',
                color: '#FFFFFF',
                letterSpacing: '4px',
              }}
            >
              THE SKY AWAITS
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                marginTop: '12px',
                fontSize: '14px',
                letterSpacing: '1px',
              }}
            >
              Our team will reach out within 24 hours.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  const socials = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'WhatsApp', href: '#' },
  ];

  return (
    <footer
      style={{
        background: '#0D0D0D',
        padding: '60px 60px 32px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Left */}
        <div>
          <span
            className="font-display"
            style={{
              fontSize: '28px',
              color: '#FFFFFF',
              letterSpacing: '6px',
            }}
          >
            SKYVILLA
          </span>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '12px',
              lineHeight: 1.6,
              maxWidth: '280px',
            }}
          >
            Jl. Jend. Sudirman Kav. 52-53
            <br />
            SCBD, Jakarta Selatan 12190
            <br />
            Indonesia
          </p>
        </div>

        {/* Right — socials */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="nav-link"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '1px',
          }}
        >
          &copy; 2026 Skyvilla Sudirman. All Rights Reserved.
        </p>
        <p
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '1px',
            marginTop: '8px',
          }}
        >
          Made with{' '}
          <span style={{ color: '#E63946' }}>&hearts;</span> by{' '}
          <a
            href="https://creativism.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#E63946',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Creativism
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Vision />
      <Residences />
      <Amenities />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
