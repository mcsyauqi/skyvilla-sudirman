'use client';

import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   SKYVILLA SUDIRMAN — Penthouse Living Redefined
   A sky-high luxury property website
   ═══════════════════════════════════════════════════════════════ */

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80',
  concept: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
  penthouse: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  duplex: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  skyGarden: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  pool: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  lounge: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  helipad: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  elevator: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  spa: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
  cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
  cityView: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80',
};

const NAV_LINKS = [
  { label: 'Concept', href: '#concept' },
  { label: 'Residences', href: '#villas' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Views', href: '#views' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const HERO_STATS = [
  { value: '62', label: 'Floors' },
  { value: '180', label: 'Residences' },
  { value: '360°', label: 'Views' },
  { value: '∞', label: 'Sky Infinity Pool' },
];

const VILLA_TYPES = [
  {
    name: 'Sky Penthouse',
    image: IMAGES.penthouse,
    size: '400 sqm',
    beds: '4 Bedrooms',
    features: ['Private rooftop terrace', 'Floor-to-ceiling windows', 'Chef\'s kitchen with Gaggenau', 'Master suite with sky bath', 'Smart home automation'],
    price: 'From IDR 45B',
  },
  {
    name: 'Sky Duplex',
    image: IMAGES.duplex,
    size: '250 sqm',
    beds: '3 Bedrooms',
    features: ['Double-height living room', 'Internal staircase design', 'Panoramic corner views', 'Walk-in wine cellar', 'Private elevator access'],
    price: 'From IDR 28B',
  },
  {
    name: 'Sky Garden Suite',
    image: IMAGES.skyGarden,
    size: '160 sqm',
    beds: '2 Bedrooms',
    features: ['Extended sky garden balcony', 'Open-plan living concept', 'Imported marble finishes', 'Integrated Bose sound', 'Concierge service'],
    price: 'From IDR 15B',
  },
];

const AMENITIES = [
  { name: 'Infinity Sky Pool', desc: 'A 50-meter infinity pool on the 60th floor, seemingly merging with the Jakarta skyline.', image: IMAGES.pool },
  { name: 'Sky Lounge', desc: 'An exclusive residents-only lounge with a curated bar and panoramic sunset views.', image: IMAGES.lounge },
  { name: 'Helipad Access', desc: 'Private helipad access on the rooftop for direct air transfers across the city.', image: IMAGES.helipad },
  { name: 'Private Elevator', desc: 'Dedicated high-speed elevators with biometric access to your personal residence.', image: IMAGES.elevator },
  { name: 'Wellness Spa', desc: 'A holistic wellness center featuring sauna, steam room, and treatment suites.', image: IMAGES.spa },
  { name: 'Sky Cinema', desc: 'A private 24-seat cinema with Dolby Atmos sound and reclining leather seats.', image: IMAGES.cinema },
];

const VIEW_DIRECTIONS = [
  { dir: 'North', letter: 'N', desc: 'Unobstructed views of the Java Sea horizon and Thousand Islands, framed by the northern Jakarta skyline.' },
  { dir: 'South', letter: 'S', desc: 'The majestic peaks of Mount Salak and Mount Gede rising above morning clouds in breathtaking clarity.' },
  { dir: 'East', letter: 'E', desc: 'Golden sunrises illuminating the SCBD towers and Mega Kuningan business district.' },
  { dir: 'West', letter: 'W', desc: 'Spectacular sunsets painting the sky over Senayan Park and the sprawling western cityscape.' },
];

const PROXIMITY = [
  { place: 'SCBD Business District', time: '3 min' },
  { place: 'Pacific Place Mall', time: '5 min' },
  { place: 'MRT Sudirman Station', time: '2 min' },
  { place: 'Grand Indonesia', time: '7 min' },
  { place: 'Soekarno-Hatta Airport', time: '35 min' },
  { place: 'PIK / Ancol Beach', time: '25 min' },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', villaType: '' });

  /* Scroll listener for nav */
  if (typeof window !== 'undefined') {
    if (!(window as unknown as Record<string, boolean>).__skyvillaScrollInit) {
      (window as unknown as Record<string, boolean>).__skyvillaScrollInit = true;
      window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (nav) {
          if (window.scrollY > 80) {
            nav.classList.add('bg-white', 'shadow-lg');
            nav.classList.remove('bg-transparent');
            nav.querySelectorAll('.nav-text').forEach(el => el.classList.add('!text-navy'));
            nav.querySelectorAll('.nav-text').forEach(el => el.classList.remove('text-white'));
          } else {
            nav.classList.remove('bg-white', 'shadow-lg');
            nav.classList.add('bg-transparent');
            nav.querySelectorAll('.nav-text').forEach(el => el.classList.remove('!text-navy'));
            nav.querySelectorAll('.nav-text').forEach(el => el.classList.add('text-white'));
          }
        }
      });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest. Our team will contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', villaType: '' });
  };

  return (
    <main className="overflow-x-hidden">

      {/* ─────────────────── NAVIGATION ─────────────────── */}
      <nav
        id="main-nav"
        className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-baseline gap-1">
            <span className="font-heading text-2xl font-bold text-gold tracking-wide">SKYVILLA</span>
            <span className="nav-text font-heading text-lg font-light text-white tracking-widest">SUDIRMAN</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link nav-text text-white text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 bg-sky hover:bg-sky-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300"
            >
              Schedule Visit
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-navy/98 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-lg font-medium tracking-wide uppercase hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-sky text-white px-6 py-3 rounded-full text-center font-semibold tracking-wide mt-2"
              >
                Schedule Visit
              </a>
            </div>
          </div>
        )}
      </nav>


      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Skyvilla Sudirman luxury residence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold text-sm md:text-base font-semibold tracking-[0.35em] uppercase mb-6">
            Above the Clouds
          </p>
          <h1 className="font-heading text-white text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-2">
            SKYVILLA
          </h1>
          <p className="font-heading text-white/70 text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.5em] mb-8">
            SUDIRMAN
          </p>
          <p className="text-white/60 text-lg md:text-xl font-light max-w-xl mx-auto mb-10">
            Penthouse Living Redefined
          </p>
          <a
            href="#contact"
            className="inline-block bg-gold hover:bg-gold-dark text-navy-dark px-10 py-4 rounded-full text-base font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)]"
          >
            Discover Your Sky
          </a>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-0 left-0 w-full bg-navy/80 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {HERO_STATS.map((stat, i) => (
              <div key={i} className="text-center md:border-r md:last:border-r-0 border-white/10">
                <p className="font-heading text-gold text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-white/50 text-sm font-medium tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────────── CONCEPT ─────────────────── */}
      <section id="concept" className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.concept}
                  alt="Skyvilla interior concept"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-sky/20 rounded-2xl -z-10" />
            </div>

            {/* Right Content */}
            <div>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-sky text-sm font-semibold tracking-[0.2em] uppercase mb-4">The Vision</p>
              <h2 className="font-heading text-navy text-4xl md:text-5xl font-bold leading-tight mb-6">
                Living Above <br />the Clouds
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Skyvilla Sudirman reimagines luxury living at 62 stories above Jakarta&apos;s most prestigious
                boulevard. Every residence is a sanctuary in the sky &mdash; where panoramic horizons meet
                uncompromising craftsmanship, and where the city&apos;s energy transforms into serene elevation.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10">
                Designed by world-renowned architects, each sky villa features floor-to-ceiling windows,
                private terraces, and bespoke interiors that celebrate the art of living well. This is not
                merely an address &mdash; it is a statement above everything.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="font-heading text-navy text-3xl font-bold">62</p>
                  <p className="text-gray-400 text-sm mt-1">Stories Above Sudirman</p>
                </div>
                <div>
                  <p className="font-heading text-navy text-3xl font-bold">400</p>
                  <p className="text-gray-400 text-sm mt-1">sqm Largest Unit</p>
                </div>
                <div>
                  <p className="font-heading text-navy text-3xl font-bold">5★</p>
                  <p className="text-gray-400 text-sm mt-1">Hotel-Grade Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────── SKY VILLAS ─────────────────── */}
      <section id="villas" className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-sky text-sm font-semibold tracking-[0.2em] uppercase mb-4">The Residences</p>
            <h2 className="font-heading text-white text-4xl md:text-5xl font-bold">Sky Villas Collection</h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {VILLA_TYPES.map((villa, i) => (
              <div key={i} className="glass-card overflow-hidden group">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-heading text-white text-2xl font-bold">{villa.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sky text-sm font-medium">{villa.size}</span>
                      <span className="w-1 h-1 bg-sky/50 rounded-full" />
                      <span className="text-sky text-sm font-medium">{villa.beds}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {villa.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/70 text-sm">
                        <span className="text-gold mt-0.5">&#10003;</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 pt-5 flex items-center justify-between">
                    <span className="text-gold font-heading text-lg font-bold">{villa.price}</span>
                    <a
                      href="#contact"
                      className="text-sky hover:text-sky-light text-sm font-semibold tracking-wide uppercase transition-colors"
                    >
                      Inquire &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────────── AMENITIES ─────────────────── */}
      <section id="amenities" className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-sky text-sm font-semibold tracking-[0.2em] uppercase mb-4">World-Class Living</p>
            <h2 className="font-heading text-navy text-4xl md:text-5xl font-bold">Sky Amenities</h2>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((a, i) => (
              <div key={i} className="white-card overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-navy text-xl font-bold mb-2">{a.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────────── PANORAMIC VIEWS ─────────────────── */}
      <section id="views" className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-sky text-sm font-semibold tracking-[0.2em] uppercase mb-4">Every Direction</p>
            <h2 className="font-heading text-white text-4xl md:text-5xl font-bold">Panoramic Views</h2>
          </div>

          {/* Compass + Direction Cards */}
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Direction cards left */}
            <div className="lg:col-span-2 space-y-6">
              {VIEW_DIRECTIONS.slice(0, 2).map((v, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-heading text-gold text-3xl font-bold">{v.letter}</span>
                    <h3 className="font-heading text-white text-xl font-bold">{v.dir}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Center compass */}
            <div className="flex justify-center items-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <div className="absolute inset-0 rounded-full border-2 border-gold/30" />
                <div className="absolute inset-4 rounded-full border border-white/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 font-heading text-gold text-2xl font-bold">N</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-heading text-gold text-2xl font-bold">S</span>
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 font-heading text-gold text-2xl font-bold">W</span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 font-heading text-gold text-2xl font-bold">E</span>
                    {/* Cross lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-gradient-to-b from-gold/60 via-gold/20 to-gold/60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-0.5 bg-gradient-to-r from-gold/60 via-gold/20 to-gold/60" />
                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Direction cards right */}
            <div className="lg:col-span-2 space-y-6">
              {VIEW_DIRECTIONS.slice(2).map((v, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-heading text-gold text-3xl font-bold">{v.letter}</span>
                    <h3 className="font-heading text-white text-xl font-bold">{v.dir}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────── LOCATION ─────────────────── */}
      <section id="location" className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-sky text-sm font-semibold tracking-[0.2em] uppercase mb-4">Prime Location</p>
              <h2 className="font-heading text-navy text-4xl md:text-5xl font-bold leading-tight mb-6">
                The Heart of <br />Jakarta&apos;s CBD
              </h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                Positioned on Jalan Jenderal Sudirman, Indonesia&apos;s most iconic boulevard, Skyvilla
                Sudirman places you at the nexus of commerce, culture, and connectivity.
              </p>

              {/* Proximity List */}
              <div className="space-y-5">
                {PROXIMITY.map((p, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-sky rounded-full" />
                      <span className="text-navy font-medium">{p.place}</span>
                    </div>
                    <span className="text-gold font-heading font-bold text-lg">{p.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.cityView}
                  alt="Jakarta cityscape near Sudirman"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────── CONTACT ─────────────────── */}
      <section id="contact" className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-sky text-sm font-semibold tracking-[0.2em] uppercase mb-4">Get in Touch</p>
            <h2 className="font-heading text-white text-4xl md:text-5xl font-bold">Schedule a Private Viewing</h2>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto glass-card-strong p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="sky-input"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="sky-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="sky-input"
                    placeholder="+62 xxx xxxx xxxx"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Villa Type</label>
                <select
                  className="sky-input appearance-none cursor-pointer"
                  value={formData.villaType}
                  onChange={e => setFormData({ ...formData, villaType: e.target.value })}
                  required
                >
                  <option value="" className="bg-navy">Select a residence type</option>
                  <option value="sky-penthouse" className="bg-navy">Sky Penthouse (400 sqm)</option>
                  <option value="sky-duplex" className="bg-navy">Sky Duplex (250 sqm)</option>
                  <option value="sky-garden" className="bg-navy">Sky Garden Suite (160 sqm)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-navy-dark py-4 rounded-full font-bold text-base tracking-wider uppercase transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)] mt-4"
              >
                Request Private Viewing
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <p className="text-gold font-heading text-lg font-bold mb-2">Sales Gallery</p>
              <p className="text-white/50 text-sm">Jl. Jend. Sudirman Kav. 52-53</p>
              <p className="text-white/50 text-sm">Jakarta Selatan 12190</p>
            </div>
            <div>
              <p className="text-gold font-heading text-lg font-bold mb-2">Enquiries</p>
              <p className="text-white/50 text-sm">+62 21 5099 8888</p>
              <p className="text-white/50 text-sm">info@skyvillasudirman.com</p>
            </div>
            <div>
              <p className="text-gold font-heading text-lg font-bold mb-2">Viewing Hours</p>
              <p className="text-white/50 text-sm">Monday &ndash; Saturday</p>
              <p className="text-white/50 text-sm">10:00 AM &ndash; 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer className="bg-navy-dark py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-heading text-2xl font-bold text-gold">SKYVILLA</span>
                <span className="font-heading text-lg font-light text-white/50 tracking-widest">SUDIRMAN</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                The pinnacle of luxury living in Jakarta. 62 stories of unparalleled elegance above the city&apos;s most prestigious address.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gold font-heading text-base font-bold mb-4 tracking-wider uppercase">Explore</h4>
              <div className="space-y-3">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-white/40 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-gold font-heading text-base font-bold mb-4 tracking-wider uppercase">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/40 text-sm hover:text-gold transition-colors">Privacy Policy</a>
                <a href="#" className="block text-white/40 text-sm hover:text-gold transition-colors">Terms of Service</a>
                <a href="#" className="block text-white/40 text-sm hover:text-gold transition-colors">Cookie Preferences</a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; 2026 Skyvilla Sudirman. All rights reserved. Images for illustration purposes only.
            </p>
            <p className="text-white/30 text-xs">
              Made with &#9829; by <a href="https://creativism.id" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold transition-colors">Creativism</a>
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
