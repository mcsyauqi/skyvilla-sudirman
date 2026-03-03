'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

/* ───────────────────────── IMAGE URLS ───────────────────────── */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  skyline: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
  clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80',
  penthouse: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  duplex: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  skyGarden: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  pool: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
  lounge: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  interior: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  nightCity: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80',
  cityView: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
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
    { label: 'Concept', href: '#concept' },
    { label: 'Residences', href: '#residences' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Views', href: '#views' },
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
        padding: scrolled ? '14px 40px' : '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(15, 23, 41, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(74, 163, 223, 0.15)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-display"
        style={{
          fontSize: '28px',
          letterSpacing: '8px',
          color: '#FFFFFF',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ color: '#D4AF37' }}>SKY</span>VILLA
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
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              fontSize: '12px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: 400,
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
          gap: '6px',
          padding: '4px',
          zIndex: 1001,
        }}
        aria-label="Toggle menu"
      >
        <span
          style={{
            width: '28px',
            height: '1.5px',
            background: '#D4AF37',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'rotate(45deg) translateY(7.5px)' : 'none',
          }}
        />
        <span
          style={{
            width: '28px',
            height: '1.5px',
            background: '#D4AF37',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            width: '28px',
            height: '1.5px',
            background: '#D4AF37',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translateY(-7.5px)' : 'none',
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
            background: 'rgba(15, 23, 41, 0.98)',
            backdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
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
                fontSize: '32px',
                letterSpacing: '6px',
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
   2. HERO — FULL-WIDTH DRAMATIC SKYLINE
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background image */}
      <img
        src={IMAGES.hero}
        alt="Jakarta skyline at dusk — towering glass skyscrapers"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(15,23,41,0.7) 0%, rgba(15,23,41,0.3) 40%, rgba(15,23,41,0.6) 80%, #0F1729 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 24px',
        }}
      >
        {/* Eyebrow */}
        <p
          className="animate-fade-in-up"
          style={{
            fontSize: '13px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#D4AF37',
            marginBottom: '24px',
            fontWeight: 400,
            opacity: 1,
          }}
        >
          Jl. Jend. Sudirman &mdash; Jakarta
        </p>

        {/* Main heading */}
        <h1
          className="font-display animate-fade-in-up delay-200"
          style={{
            fontSize: 'clamp(56px, 10vw, 120px)',
            lineHeight: 0.95,
            letterSpacing: '10px',
            color: '#FFFFFF',
            opacity: 1,
          }}
        >
          SKY<span style={{ color: '#D4AF37' }}>VILLA</span>
        </h1>
        <h2
          className="font-display animate-fade-in-up delay-300"
          style={{
            fontSize: 'clamp(24px, 4vw, 48px)',
            letterSpacing: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '8px',
            fontWeight: 400,
            opacity: 1,
          }}
        >
          SUDIRMAN
        </h2>

        {/* Tagline */}
        <p
          className="animate-fade-in-up delay-500"
          style={{
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '32px',
            letterSpacing: '3px',
            fontWeight: 300,
            lineHeight: 1.6,
            opacity: 1,
          }}
        >
          Where the sky becomes your living room
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up delay-700" style={{ marginTop: '48px', opacity: 1 }}>
          <a
            href="#concept"
            className="animate-gentle-pulse"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #D4AF37, #E8CC6E)',
              color: '#0F1729',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              borderRadius: '50px',
              transition: 'transform 0.3s ease',
            }}
          >
            Discover More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in-up delay-800"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 10,
          opacity: 1,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Scroll
        </span>
        <div
          className="animate-scroll-line"
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #D4AF37, transparent)',
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. CONCEPT — LIVING ABOVE THE CLOUDS
   ═══════════════════════════════════════════════════════════════ */
function Concept() {
  const { ref, inView } = useInView();

  return (
    <section
      id="concept"
      ref={ref}
      style={{
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
        className="concept-container"
      >
        {/* Eyebrow */}
        <div
          className={inView ? 'animate-fade-in-up' : ''}
          style={{ textAlign: 'center', marginBottom: '20px', opacity: 1 }}
        >
          <span
            style={{
              fontSize: '12px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: '#4AA3DF',
              fontWeight: 500,
            }}
          >
            The Vision
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            textAlign: 'center',
            color: '#0F1729',
            letterSpacing: '4px',
            lineHeight: 1.05,
            opacity: 1,
          }}
        >
          LIVING ABOVE <span className="text-gradient-sky">THE CLOUDS</span>
        </h2>

        {/* Description grid */}
        <div
          className="concept-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            marginTop: '56px',
            alignItems: 'start',
          }}
        >
          {/* Left column — image */}
          <div
            className={inView ? 'animate-fade-in-up delay-200' : ''}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              opacity: 1,
            }}
          >
            <img
              src={IMAGES.clouds}
              alt="Above the clouds — sky villa concept"
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                display: 'block',
              }}
              className="img-zoom"
            />
          </div>

          {/* Right column — text */}
          <div
            className={inView ? 'animate-fade-in-up delay-300' : ''}
            style={{ opacity: 1 }}
          >
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.85,
                color: '#475569',
                marginBottom: '28px',
              }}
            >
              Skyvilla Sudirman reimagines urban living by placing private villas
              in the sky. Rising above Jakarta&apos;s most iconic boulevard, each
              residence is a sanctuary above the city &mdash; where panoramic horizons
              replace walls and the sky is your backyard.
            </p>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.85,
                color: '#475569',
                marginBottom: '40px',
              }}
            >
              Conceived by internationally acclaimed architects, Skyvilla fuses
              the freedom of a tropical villa with the prestige of a penthouse.
              Every detail &mdash; from double-height ceilings to private sky gardens &mdash;
              is designed to make you feel above it all.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { number: '62', label: 'Stories High' },
                { number: '180', label: 'Sky Residences' },
                { number: '360\u00B0', label: 'Panoramic Views' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '48px',
                      color: '#0F1729',
                      display: 'block',
                      lineHeight: 1,
                    }}
                  >
                    {stat.number}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      letterSpacing: '2px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      marginTop: '6px',
                      display: 'block',
                    }}
                  >
                    {stat.label}
                  </span>
                  <div className="gold-line" style={{ margin: '10px auto 0' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .concept-container {
          padding: 80px 24px;
        }
        @media (min-width: 1024px) {
          .concept-container {
            padding: 128px 48px;
          }
        }
        @media (max-width: 768px) {
          .concept-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. VILLA TYPES
   ═══════════════════════════════════════════════════════════════ */
const villaTypes = [
  {
    name: 'SKY PENTHOUSE',
    tagline: 'The Crown Collection',
    area: '480 - 620 sqm',
    beds: '4 + 1 Bedrooms',
    floors: 'Levels 56 - 62',
    price: 'From IDR 42B',
    image: IMAGES.penthouse,
    features: [
      'Double-height living hall',
      'Private rooftop terrace',
      'Dedicated elevator lobby',
      'Wine cellar & cigar lounge',
    ],
  },
  {
    name: 'SKY DUPLEX',
    tagline: 'Elevated Living',
    area: '280 - 380 sqm',
    beds: '3 + 1 Bedrooms',
    floors: 'Levels 32 - 55',
    price: 'From IDR 18B',
    image: IMAGES.duplex,
    features: [
      'Two-level living space',
      'Panoramic floor-to-ceiling glass',
      'Private sky terrace',
      'Smart home integration',
    ],
  },
  {
    name: 'SKY GARDEN SUITE',
    tagline: 'Nature in the Sky',
    area: '160 - 240 sqm',
    beds: '2 + 1 Bedrooms',
    floors: 'Levels 15 - 31',
    price: 'From IDR 8.5B',
    image: IMAGES.skyGarden,
    features: [
      'Wraparound garden terrace',
      'Outdoor dining pavilion',
      'Tropical sky landscaping',
      'Direct pool deck access',
    ],
  },
];

function VillaTypes() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="residences"
      ref={ref}
      style={{
        background: '#0F1729',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(74,163,223,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
        }}
        className="villa-container"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span
            className={inView ? 'animate-fade-in-up' : ''}
            style={{
              fontSize: '12px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: 500,
              display: 'block',
              marginBottom: '16px',
              opacity: 1,
            }}
          >
            The Residences
          </span>
          <h2
            className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#FFFFFF',
              letterSpacing: '6px',
              opacity: 1,
            }}
          >
            THREE WAYS TO <span style={{ color: '#D4AF37' }}>TOUCH THE SKY</span>
          </h2>
        </div>

        {/* Villa cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
          className="villa-grid"
        >
          {villaTypes.map((villa, i) => (
            <div
              key={villa.name}
              className={`glass-card ${inView ? `animate-fade-in-up delay-${(i + 2) * 100}` : ''}`}
              style={{
                overflow: 'hidden',
                opacity: 1,
              }}
            >
              {/* Image */}
              <div style={{ height: '260px', overflow: 'hidden' }}>
                <img
                  src={villa.image}
                  alt={villa.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  className="img-zoom"
                />
              </div>

              {/* Content */}
              <div style={{ padding: '32px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '3px',
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  {villa.tagline}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '28px',
                    color: '#FFFFFF',
                    letterSpacing: '3px',
                  }}
                >
                  {villa.name}
                </h3>
                <div className="gold-line" style={{ margin: '16px 0' }} />

                {/* Specs */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginBottom: '20px',
                  }}
                >
                  {[villa.area, villa.beds, villa.floors, villa.price].map((spec) => (
                    <span
                      key={spec}
                      style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {villa.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.65)',
                        padding: '6px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#4AA3DF', fontSize: '8px' }}>&#9670;</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  style={{
                    display: 'inline-block',
                    marginTop: '24px',
                    fontSize: '12px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#D4AF37',
                    textDecoration: 'none',
                    fontWeight: 500,
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
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .villa-container {
          padding: 80px 24px;
        }
        @media (min-width: 1024px) {
          .villa-container {
            padding: 128px 48px;
          }
        }
        @media (max-width: 1024px) {
          .villa-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            max-width: 560px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. SKY AMENITIES
   ═══════════════════════════════════════════════════════════════ */
const amenities = [
  {
    icon: '\u2601',
    title: 'Infinity Sky Pool',
    description: 'A cantilevered infinity pool on Level 60, suspended above the clouds with unobstructed views of Jakarta\'s skyline.',
    level: 'Level 60',
  },
  {
    icon: '\u2605',
    title: 'Sky Lounge & Bar',
    description: 'An exclusive rooftop lounge with a signature cocktail bar, panoramic glass walls, and curated live entertainment.',
    level: 'Level 62',
  },
  {
    icon: '\u2708',
    title: 'Private Helipad',
    description: 'Direct helicopter access for residents, providing seamless connectivity to airports and beyond.',
    level: 'Rooftop',
  },
  {
    icon: '\u25B2',
    title: 'Private Elevator',
    description: 'Each Sky Penthouse features a dedicated private elevator with biometric access, opening directly into your residence.',
    level: 'All Levels',
  },
  {
    icon: '\u2764',
    title: 'Wellness Sanctuary',
    description: 'A world-class spa and fitness center with onsen baths, infrared saunas, and personal training suites.',
    level: 'Level 5-6',
  },
  {
    icon: '\u266B',
    title: 'Sky Cinema & Lounge',
    description: 'A private screening room with Dolby Atmos sound, paired with a gentlemen\'s library and business club.',
    level: 'Level 3',
  },
];

function Amenities() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="amenities"
      ref={ref}
      style={{
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
        className="amenities-container"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span
            className={inView ? 'animate-fade-in-up' : ''}
            style={{
              fontSize: '12px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: '#4AA3DF',
              fontWeight: 500,
              display: 'block',
              marginBottom: '16px',
              opacity: 1,
            }}
          >
            Sky Amenities
          </span>
          <h2
            className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#0F1729',
              letterSpacing: '4px',
              opacity: 1,
            }}
          >
            ELEVATED <span className="text-gradient-sky">EXPERIENCES</span>
          </h2>
        </div>

        {/* Amenities grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
          className="amenities-grid"
        >
          {amenities.map((a, i) => (
            <div
              key={a.title}
              className={`white-card ${inView ? `animate-fade-in-up delay-${(i + 2) * 100}` : ''}`}
              style={{
                padding: '36px 32px',
                opacity: 1,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(74,163,223,0.1), rgba(74,163,223,0.05))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '20px',
                }}
              >
                {a.icon}
              </div>

              {/* Level badge */}
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#4AA3DF',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {a.level}
              </span>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0F1729',
                  marginBottom: '12px',
                  letterSpacing: '0.5px',
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: '#475569',
                }}
              >
                {a.description}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width pool image */}
        <div
          className={inView ? 'animate-fade-in-up delay-800' : ''}
          style={{
            marginTop: '64px',
            borderRadius: '20px',
            overflow: 'hidden',
            opacity: 1,
          }}
        >
          <img
            src={IMAGES.pool}
            alt="Infinity sky pool overlooking Jakarta skyline"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block',
            }}
            className="img-zoom"
          />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .amenities-container {
          padding: 80px 24px;
        }
        @media (min-width: 1024px) {
          .amenities-container {
            padding: 128px 48px;
          }
        }
        @media (max-width: 1024px) {
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .amenities-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. VIEWS — PANORAMIC CITY VIEWS
   ═══════════════════════════════════════════════════════════════ */
function Views() {
  const { ref, inView } = useInView();

  const viewPoints = [
    {
      direction: 'North',
      vista: 'Monas & Central Jakarta',
      description: 'Watch the National Monument illuminate at dusk from your living room.',
    },
    {
      direction: 'South',
      vista: 'Senayan & Mountains',
      description: 'On clear days, the volcanic peaks of West Java paint the horizon.',
    },
    {
      direction: 'East',
      vista: 'Sunrise over the City',
      description: 'Greet every morning with golden light washing across the metropolis.',
    },
    {
      direction: 'West',
      vista: 'Sunset & Tangerang',
      description: 'Spectacular sunset views with the western suburbs stretching to the coast.',
    },
  ];

  return (
    <section
      id="views"
      ref={ref}
      style={{
        background: '#0F1729',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Full-width background image with overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <img
          src={IMAGES.nightCity}
          alt="Panoramic night view of Jakarta"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(15,23,41,0.5) 0%, rgba(15,23,41,0.85) 100%)',
          }}
        />
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
        }}
        className="views-container"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span
            className={inView ? 'animate-fade-in-up' : ''}
            style={{
              fontSize: '12px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: 500,
              display: 'block',
              marginBottom: '16px',
              opacity: 1,
            }}
          >
            Panoramic Views
          </span>
          <h2
            className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#FFFFFF',
              letterSpacing: '6px',
              opacity: 1,
            }}
          >
            THE CITY AT YOUR <span style={{ color: '#D4AF37' }}>FEET</span>
          </h2>
          <p
            className={inView ? 'animate-fade-in-up delay-200' : ''}
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '600px',
              margin: '20px auto 0',
              lineHeight: 1.7,
              opacity: 1,
            }}
          >
            From 62 stories above, Jakarta transforms into a canvas of light. Every
            direction reveals a different masterpiece.
          </p>
        </div>

        {/* View direction cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
          className="views-grid"
        >
          {viewPoints.map((v, i) => (
            <div
              key={v.direction}
              className={`glass-card ${inView ? `animate-fade-in-up delay-${(i + 3) * 100}` : ''}`}
              style={{
                padding: '36px 28px',
                textAlign: 'center',
                opacity: 1,
              }}
            >
              {/* Compass direction */}
              <span
                className="font-display"
                style={{
                  fontSize: '48px',
                  color: '#D4AF37',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {v.direction[0]}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  color: '#4AA3DF',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {v.direction}
              </span>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                }}
              >
                {v.vista}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .views-container {
          padding: 80px 24px;
        }
        @media (min-width: 1024px) {
          .views-container {
            padding: 128px 48px;
          }
        }
        @media (max-width: 1024px) {
          .views-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .views-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. LOCATION — SUDIRMAN, JAKARTA CBD
   ═══════════════════════════════════════════════════════════════ */
function Location() {
  const { ref, inView } = useInView();

  const distances = [
    { place: 'SCBD Complex', time: '3 min walk' },
    { place: 'Pacific Place Mall', time: '5 min walk' },
    { place: 'Sudirman MRT Station', time: '2 min walk' },
    { place: 'Bundaran HI', time: '8 min drive' },
    { place: 'Halim Airport', time: '25 min drive' },
    { place: 'Soekarno-Hatta Airport', time: '45 min drive' },
  ];

  return (
    <section
      id="location"
      ref={ref}
      style={{
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
        className="location-container"
      >
        <div
          className="location-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left — text */}
          <div>
            <span
              className={inView ? 'animate-fade-in-up' : ''}
              style={{
                fontSize: '12px',
                letterSpacing: '5px',
                color: '#4AA3DF',
                textTransform: 'uppercase',
                fontWeight: 500,
                display: 'block',
                marginBottom: '16px',
                opacity: 1,
              }}
            >
              Prime Location
            </span>
            <h2
              className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                color: '#0F1729',
                letterSpacing: '4px',
                lineHeight: 1.1,
                marginBottom: '12px',
                opacity: 1,
              }}
            >
              JL. JEND. SUDIRMAN
            </h2>
            <p
              className={inView ? 'animate-fade-in-up delay-200' : ''}
              style={{
                fontSize: '16px',
                color: '#475569',
                marginBottom: '40px',
                lineHeight: 1.8,
                opacity: 1,
              }}
            >
              Positioned at the heart of Jakarta&apos;s golden triangle &mdash; where
              power, culture, and commerce converge. Jalan Sudirman is more than an
              address; it is a declaration.
            </p>

            {/* Distances */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {distances.map((d, i) => (
                <div
                  key={d.place}
                  className={inView ? `animate-slide-in-left delay-${(i + 3) * 100}` : ''}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(15,23,41,0.08)',
                    padding: '14px 0',
                    opacity: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#0F1729',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {d.place}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#4AA3DF',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {d.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — city image */}
          <div
            className={inView ? 'animate-fade-in-up delay-300' : ''}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              opacity: 1,
            }}
          >
            <img
              src={IMAGES.cityView}
              alt="Sudirman CBD area, Jakarta"
              style={{
                width: '100%',
                height: '560px',
                objectFit: 'cover',
                display: 'block',
              }}
              className="img-zoom"
            />
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .location-container {
          padding: 80px 24px;
        }
        @media (min-width: 1024px) {
          .location-container {
            padding: 128px 48px;
          }
        }
        @media (max-width: 768px) {
          .location-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. CONTACT / CTA
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
        background: '#0F1729',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(74,163,223,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
        className="contact-container"
      >
        {/* Heading */}
        <span
          className={inView ? 'animate-fade-in-up' : ''}
          style={{
            fontSize: '12px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#D4AF37',
            fontWeight: 500,
            display: 'block',
            marginBottom: '16px',
            opacity: 1,
          }}
        >
          Register Interest
        </span>
        <h2
          className={`font-display ${inView ? 'animate-fade-in-up delay-100' : ''}`}
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#FFFFFF',
            letterSpacing: '6px',
            lineHeight: 1.1,
            opacity: 1,
          }}
        >
          CLAIM YOUR <span style={{ color: '#D4AF37' }}>SKY</span>
        </h2>
        <p
          className={inView ? 'animate-fade-in-up delay-200' : ''}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '15px',
            letterSpacing: '1px',
            marginTop: '16px',
            marginBottom: '48px',
            lineHeight: 1.7,
            opacity: 1,
          }}
        >
          Join an exclusive community of visionaries. Register for a private preview
          of Skyvilla Sudirman.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={inView ? 'animate-fade-in-up delay-300' : ''}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'left',
              opacity: 1,
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              className="sky-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="sky-input"
            />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              required
              className="sky-input"
            />
            <select
              className="sky-input"
              defaultValue=""
              style={{ cursor: 'pointer' }}
            >
              <option value="" disabled>Interested In</option>
              <option value="penthouse">Sky Penthouse</option>
              <option value="duplex">Sky Duplex</option>
              <option value="garden">Sky Garden Suite</option>
            </select>

            <button
              type="submit"
              style={{
                marginTop: '8px',
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #D4AF37, #E8CC6E)',
                color: '#0F1729',
                border: 'none',
                fontSize: '14px',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '50px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                alignSelf: 'center',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.04)';
                (e.target as HTMLElement).style.boxShadow =
                  '0 8px 32px rgba(212,175,55,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Request Preview
            </button>
          </form>
        ) : (
          <div
            className="animate-fade-in-up"
            style={{ padding: '40px 0' }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37, #E8CC6E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '28px',
                color: '#0F1729',
              }}
            >
              &#10003;
            </div>
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
                color: 'rgba(255,255,255,0.5)',
                marginTop: '12px',
                fontSize: '14px',
                letterSpacing: '1px',
              }}
            >
              Our team will reach out within 24 hours to arrange your private viewing.
            </p>
          </div>
        )}
      </div>

      {/* Responsive */}
      <style>{`
        .contact-container {
          padding: 80px 24px;
        }
        @media (min-width: 1024px) {
          .contact-container {
            padding: 128px 24px;
          }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. FOOTER
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
        background: '#0A0F1E',
        padding: '56px 24px 28px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '32px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Left */}
        <div>
          <span
            className="font-display"
            style={{
              fontSize: '24px',
              color: '#FFFFFF',
              letterSpacing: '8px',
            }}
          >
            <span style={{ color: '#D4AF37' }}>SKY</span>VILLA
          </span>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.35)',
              marginTop: '14px',
              lineHeight: 1.7,
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

        {/* Center — links */}
        <div style={{ display: 'flex', gap: '28px' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="nav-link"
              style={{
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Right — contact info */}
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.7,
            }}
          >
            info@skyvillasudirman.com
            <br />
            +62 21 5790 8888
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '48px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '1px',
          }}
        >
          &copy; 2026 Skyvilla Sudirman. All Rights Reserved.
        </p>
        <p
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '1px',
            marginTop: '8px',
          }}
        >
          Made with{' '}
          <span style={{ color: '#D4AF37' }}>&hearts;</span> by{' '}
          <a
            href="https://creativism.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#D4AF37',
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
      <Concept />
      <VillaTypes />
      <Amenities />
      <Views />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
