'use client';

import { useState, useEffect } from 'react';

/* ─── Data ─── */

const navLinks = [
  { label: 'Concept', href: '#concept' },
  { label: 'Sky Villas', href: '#villas' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Views', href: '#views' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const heroStats = [
  { value: '62', label: 'Floors' },
  { value: '180', label: 'Residences' },
  { value: '360\u00B0', label: 'Panoramic Views' },
  { value: '\u221E', label: 'Sky Infinity Pool' },
];

const villaTypes = [
  {
    name: 'Sky Penthouse',
    size: '400 sqm',
    beds: '4 Bedrooms',
    description:
      'The crown of Skyvilla. A sprawling full-floor penthouse with a private rooftop terrace, chef\u2019s kitchen by Gaggenau, master suite with sky bath, and 360-degree panoramic views of Jakarta\u2019s skyline.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    name: 'Sky Duplex',
    size: '250 sqm',
    beds: '3 Bedrooms',
    description:
      'Double-height living rooms with an internal sculptural staircase, panoramic corner windows, walk-in wine cellar, and private elevator access. Two floors of curated sky living.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    name: 'Sky Garden Suite',
    size: '160 sqm',
    beds: '2 Bedrooms',
    description:
      'An extended sky garden balcony blurs the line between indoor and outdoor living. Open-plan interiors with imported marble, integrated Bose sound, and dedicated concierge service.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  },
];

const amenities = [
  {
    name: 'Infinity Sky Pool',
    description: '50-meter infinity pool on the 60th floor, seemingly merging with the Jakarta skyline.',
    icon: '\u2248',
  },
  {
    name: 'Sky Lounge',
    description: 'Exclusive residents-only lounge with a curated bar and panoramic sunset views.',
    icon: '\u25C7',
  },
  {
    name: 'Helipad Access',
    description: 'Private rooftop helipad for direct air transfers across the city and beyond.',
    icon: '\u2606',
  },
  {
    name: 'Private Elevators',
    description: 'Dedicated high-speed elevators with biometric access to your personal residence.',
    icon: '\u2302',
  },
  {
    name: 'Wellness Spa',
    description: 'Holistic wellness center featuring sauna, steam room, and private treatment suites.',
    icon: '\u2662',
  },
  {
    name: 'Sky Cinema',
    description: 'Private 24-seat cinema with Dolby Atmos sound and reclining Italian leather seats.',
    icon: '\u25B6',
  },
];

const viewDirections = [
  {
    dir: 'North',
    letter: 'N',
    description: 'Unobstructed views of the Java Sea horizon and Thousand Islands, framed by the northern Jakarta skyline.',
  },
  {
    dir: 'South',
    letter: 'S',
    description: 'The majestic peaks of Mount Salak and Mount Gede rising above morning clouds in breathtaking clarity.',
  },
  {
    dir: 'East',
    letter: 'E',
    description: 'Golden sunrises illuminating the SCBD towers and Mega Kuningan business district each morning.',
  },
  {
    dir: 'West',
    letter: 'W',
    description: 'Spectacular sunsets painting the sky over Senayan Park and the sprawling western cityscape.',
  },
];

const proximityList = [
  { place: 'SCBD Business District', time: '3 min' },
  { place: 'Pacific Place Mall', time: '5 min' },
  { place: 'MRT Sudirman Station', time: '2 min' },
  { place: 'Grand Indonesia', time: '7 min' },
  { place: 'Soekarno-Hatta Airport', time: '35 min' },
  { place: 'PIK / Ancol Beach', time: '25 min' },
];

/* ─── Component ─── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="bg-[#0F1729] min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════
          1. FIXED NAVIGATION
      ══════════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0F1729]/95 backdrop-blur-md border-b border-[#4AA3DF]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#"
              className="flex items-baseline gap-1.5"
            >
              <span className="font-[family-name:var(--font-outfit)] text-[#D4AF37] text-xl font-bold tracking-[0.15em] uppercase">
                SKYVILLA
              </span>
              <span className="font-[family-name:var(--font-outfit)] text-[#F0F4F8] text-base font-light tracking-[0.3em] uppercase">
                SUDIRMAN
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-inter)] text-[#8A9BB5] hover:text-[#D4AF37] text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden md:inline-block px-6 py-2.5 bg-[#4AA3DF] text-[#FFFFFF] font-[family-name:var(--font-inter)] text-xs tracking-[0.15em] uppercase hover:bg-[#6BB8E8] transition-all duration-300 rounded-full"
            >
              Schedule Visit
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F1729]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-[family-name:var(--font-outfit)] text-[#F0F4F8] text-2xl tracking-[0.2em] uppercase hover:text-[#D4AF37] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-[#4AA3DF] text-[#FFFFFF] font-[family-name:var(--font-inter)] text-sm tracking-[0.15em] uppercase rounded-full"
          >
            Schedule Visit
          </a>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          2. HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80"
            alt="Modern luxury high-rise residence against city skyline"
            className="w-full h-full object-cover"
          />
          {/* Navy gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1729]/60 via-[#0F1729]/30 to-[#0F1729]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1729]/40 via-transparent to-[#0F1729]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          {/* Subtitle */}
          <p className="font-[family-name:var(--font-inter)] text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            Above the Clouds
          </p>

          {/* Main Title */}
          <h1 className="font-[family-name:var(--font-outfit)] text-[#F0F4F8] text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase mb-2">
            SKYVILLA
          </h1>
          <p className="font-[family-name:var(--font-outfit)] text-[#F0F4F8]/70 text-lg md:text-2xl font-light tracking-[0.5em] uppercase mb-8">
            SUDIRMAN
          </p>

          {/* Sky Line */}
          <div className="w-20 h-[1px] bg-[#4AA3DF] mb-8" />

          {/* Tagline */}
          <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-lg md:text-xl mb-12 max-w-lg">
            Penthouse Living Redefined
          </p>

          {/* CTA Button */}
          <a
            href="#contact"
            className="px-10 py-4 bg-[#D4AF37] text-[#0F1729] font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#E8C84A] transition-all duration-300 rounded-full hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)]"
          >
            Discover Your Sky
          </a>
        </div>

        {/* Bottom Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0F1729]/80 backdrop-blur-md border-t border-[#FFFFFF]/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center py-4 md:py-0 ${
                    index < heroStats.length - 1
                      ? 'md:border-r md:border-[#FFFFFF]/10'
                      : ''
                  } ${
                    index < 2 ? 'border-b md:border-b-0 border-[#FFFFFF]/10' : ''
                  }`}
                >
                  <span className="font-[family-name:var(--font-outfit)] text-[#D4AF37] text-3xl md:text-4xl font-bold block mb-1">
                    {stat.value}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[#FFFFFF]/50 text-xs tracking-[0.15em] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#4AA3DF] to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. CONCEPT — Living Above the Clouds
      ══════════════════════════════════════════════════════════════════ */}
      <section id="concept" className="py-24 lg:py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Image with accent frame */}
            <div className="relative">
              <div className="relative p-3 border border-[#4AA3DF]/20 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Luxury interior with warm lighting and modern finishes"
                  className="w-full h-auto aspect-[4/5] object-cover rounded-xl"
                />
              </div>
              {/* Accent corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-[#D4AF37] rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-[#D4AF37] rounded-br-lg" />
            </div>

            {/* Right: Text */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#4AA3DF]" />
                <span className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-[10px] tracking-[0.3em] uppercase">
                  The Vision
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-5xl text-[#0F1729] font-bold leading-[1.2] mb-8">
                Living Above
                <br />
                <span className="text-[#4AA3DF]">the Clouds</span>
              </h2>

              <p className="font-[family-name:var(--font-inter)] text-[#555E6E] text-sm md:text-base leading-relaxed mb-6">
                Skyvilla Sudirman reimagines luxury living at 62 stories above
                Jakarta&apos;s most prestigious boulevard. Every residence is a
                sanctuary in the sky &mdash; where panoramic horizons meet
                uncompromising craftsmanship, and where the city&apos;s energy
                transforms into serene elevation.
              </p>

              <p className="font-[family-name:var(--font-inter)] text-[#777E8E] text-sm leading-relaxed mb-10">
                Designed by world-renowned architects, each sky villa features
                floor-to-ceiling windows, private terraces, and bespoke interiors
                that celebrate the art of living well. This is not merely an
                address &mdash; it is a statement above everything.
              </p>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <span className="font-[family-name:var(--font-outfit)] text-[#0F1729] text-3xl font-bold block mb-1">62</span>
                  <span className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-xs">Stories High</span>
                </div>
                <div>
                  <span className="font-[family-name:var(--font-outfit)] text-[#0F1729] text-3xl font-bold block mb-1">400</span>
                  <span className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-xs">sqm Largest Unit</span>
                </div>
                <div>
                  <span className="font-[family-name:var(--font-outfit)] text-[#0F1729] text-3xl font-bold block mb-1">5&#9733;</span>
                  <span className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-xs">Hotel-Grade Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. SKY VILLAS COLLECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section id="villas" className="py-24 lg:py-32 bg-[#0F1729]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#4AA3DF]" />
              <span className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-[10px] tracking-[0.3em] uppercase">
                The Residences
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#4AA3DF]" />
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-5xl text-[#F0F4F8] font-bold leading-[1.2]">
              Sky Villas <span className="text-[#D4AF37]">Collection</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {villaTypes.map((villa) => (
              <div
                key={villa.name}
                className="group border border-[#1E2A45] hover:border-[#4AA3DF]/30 transition-colors duration-500 rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[#F0F4F8] mb-2">
                    {villa.name}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-xs tracking-[0.1em] mb-4">
                    {villa.size} &middot; {villa.beds}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-sm leading-relaxed mb-6">
                    {villa.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[#D4AF37] text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all duration-300"
                  >
                    Inquire Now
                    <span className="text-sm">&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. AMENITIES
      ══════════════════════════════════════════════════════════════════ */}
      <section id="amenities" className="py-24 lg:py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#4AA3DF]" />
              <span className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-[10px] tracking-[0.3em] uppercase">
                World-Class Living
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#4AA3DF]" />
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-5xl text-[#0F1729] font-bold leading-[1.2]">
              Sky <span className="text-[#4AA3DF]">Amenities</span>
            </h2>
          </div>

          {/* 2x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <div
                key={amenity.name}
                className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 hover:border-[#4AA3DF]/30 hover:shadow-lg transition-all duration-500 rounded-xl"
              >
                {/* Icon */}
                <div className="w-12 h-12 border border-[#4AA3DF]/40 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-[#4AA3DF] text-xl">{amenity.icon}</span>
                </div>

                {/* Name */}
                <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-[#0F1729] mb-3">
                  {amenity.name}
                </h3>

                {/* Description */}
                <p className="font-[family-name:var(--font-inter)] text-[#777E8E] text-sm leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. PANORAMIC VIEWS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="views" className="py-24 lg:py-32 bg-[#0F1729]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#4AA3DF]" />
              <span className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-[10px] tracking-[0.3em] uppercase">
                Every Direction
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#4AA3DF]" />
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-5xl text-[#F0F4F8] font-bold leading-[1.2]">
              Panoramic <span className="text-[#D4AF37]">Views</span>
            </h2>
          </div>

          {/* View Direction Cards — 4 cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {viewDirections.map((view) => (
              <div
                key={view.dir}
                className="bg-[#141D30] border border-[#1E2A45] p-6 hover:border-[#D4AF37]/30 transition-colors duration-500 rounded-xl"
              >
                {/* Direction Letter */}
                <div className="w-14 h-14 border border-[#D4AF37]/40 rounded-full flex items-center justify-center mb-5">
                  <span className="font-[family-name:var(--font-outfit)] text-[#D4AF37] text-2xl font-bold">
                    {view.letter}
                  </span>
                </div>

                {/* Direction Name */}
                <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-[#F0F4F8] mb-3">
                  {view.dir}
                </h3>

                {/* Description */}
                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-sm leading-relaxed">
                  {view.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. LOCATION
      ══════════════════════════════════════════════════════════════════ */}
      <section id="location" className="py-24 lg:py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#4AA3DF]" />
                <span className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-[10px] tracking-[0.3em] uppercase">
                  Prime Location
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-5xl text-[#0F1729] font-bold leading-[1.2] mb-8">
                The Heart of
                <br />
                <span className="text-[#4AA3DF]">Jakarta&apos;s CBD</span>
              </h2>

              <p className="font-[family-name:var(--font-inter)] text-[#777E8E] text-sm leading-relaxed mb-10">
                Positioned on Jalan Jenderal Sudirman, Indonesia&apos;s most
                iconic boulevard, Skyvilla Sudirman places you at the nexus of
                commerce, culture, and connectivity.
              </p>

              {/* Proximity List */}
              <div className="space-y-0">
                {proximityList.map((item) => (
                  <div
                    key={item.place}
                    className="flex items-center justify-between border-b border-[#E2E8F0] py-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-[#4AA3DF] rounded-full" />
                      <span className="font-[family-name:var(--font-inter)] text-[#0F1729] text-sm font-medium">
                        {item.place}
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-outfit)] text-[#D4AF37] text-lg font-bold">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative p-3 border border-[#4AA3DF]/20 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                  alt="Jakarta cityscape and Sudirman boulevard aerial view"
                  className="w-full h-auto aspect-[4/5] object-cover rounded-xl"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t border-r border-[#D4AF37] rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b border-l border-[#D4AF37] rounded-bl-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          8. CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 lg:py-32 bg-[#0F1729]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#4AA3DF]" />
              <span className="font-[family-name:var(--font-inter)] text-[#4AA3DF] text-[10px] tracking-[0.3em] uppercase">
                Get in Touch
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#4AA3DF]" />
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl lg:text-5xl text-[#F0F4F8] font-bold leading-[1.2] mb-4">
              Schedule a <span className="text-[#D4AF37]">Private Viewing</span>
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-sm max-w-lg mx-auto">
              Experience Skyvilla Sudirman firsthand. Our team will arrange an
              exclusive tour of our sky residences.
            </p>
          </div>

          {/* Centered Form Card */}
          <div className="max-w-2xl mx-auto">
            {!formSubmitted ? (
              <form
                onSubmit={handleFormSubmit}
                className="bg-[#141D30] border border-[#1E2A45] p-8 md:p-10 rounded-2xl"
              >
                {/* Name */}
                <div className="mb-6">
                  <label className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-[10px] tracking-[0.2em] uppercase block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-transparent border-b border-[#1E2A45] focus:border-[#4AA3DF] text-[#F0F4F8] font-[family-name:var(--font-inter)] text-sm py-3 outline-none transition-colors placeholder:text-[#8A9BB5]/40"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-[10px] tracking-[0.2em] uppercase block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-[#1E2A45] focus:border-[#4AA3DF] text-[#F0F4F8] font-[family-name:var(--font-inter)] text-sm py-3 outline-none transition-colors placeholder:text-[#8A9BB5]/40"
                  />
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-[10px] tracking-[0.2em] uppercase block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+62 812 3456 7890"
                    className="w-full bg-transparent border-b border-[#1E2A45] focus:border-[#4AA3DF] text-[#F0F4F8] font-[family-name:var(--font-inter)] text-sm py-3 outline-none transition-colors placeholder:text-[#8A9BB5]/40"
                  />
                </div>

                {/* Villa Interest */}
                <div className="mb-10">
                  <label className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-[10px] tracking-[0.2em] uppercase block mb-2">
                    Villa of Interest
                  </label>
                  <select
                    required
                    className="w-full bg-transparent border-b border-[#1E2A45] focus:border-[#4AA3DF] text-[#F0F4F8] font-[family-name:var(--font-inter)] text-sm py-3 outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#141D30]">Select a residence type</option>
                    <option value="sky-penthouse" className="bg-[#141D30]">Sky Penthouse (400 sqm)</option>
                    <option value="sky-duplex" className="bg-[#141D30]">Sky Duplex (250 sqm)</option>
                    <option value="sky-garden" className="bg-[#141D30]">Sky Garden Suite (160 sqm)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4AF37] text-[#0F1729] font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#E8C84A] transition-all duration-300 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  Request Private Viewing
                </button>

                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/40 text-[10px] mt-4 text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            ) : (
              <div className="bg-[#141D30] border border-[#4AA3DF]/30 p-8 md:p-10 flex flex-col items-center justify-center min-h-[460px] text-center rounded-2xl">
                <div className="w-12 h-12 border border-[#D4AF37] rotate-45 flex items-center justify-center mb-8 rounded-lg">
                  <span className="text-[#D4AF37] -rotate-45 text-lg">
                    &#10003;
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold text-[#F0F4F8] mb-4">
                  Thank You
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5] text-sm max-w-sm leading-relaxed">
                  Your inquiry has been received. Our team will contact you
                  within 24 hours to arrange your private viewing at Skyvilla Sudirman.
                </p>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#4AA3DF] to-transparent mt-8" />
              </div>
            )}
          </div>

          {/* Contact Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <h3 className="font-[family-name:var(--font-inter)] text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-3">
                Sales Gallery
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#F0F4F8] text-sm">
                Jl. Jend. Sudirman Kav. 52-53
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[#F0F4F8] text-sm">
                Jakarta Selatan 12190
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-[family-name:var(--font-inter)] text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-3">
                Enquiries
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#F0F4F8] text-sm">
                +62 21 5099 8888
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[#F0F4F8] text-sm">
                info@skyvillasudirman.com
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-[family-name:var(--font-inter)] text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-3">
                Viewing Hours
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#F0F4F8] text-sm">
                Monday &ndash; Saturday
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[#F0F4F8] text-sm">
                10:00 AM &ndash; 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          9. FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#070C16] border-t border-[#1E2A45]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="font-[family-name:var(--font-outfit)] text-[#D4AF37] text-lg font-bold tracking-[0.15em] uppercase">
                  SKYVILLA
                </span>
                <span className="font-[family-name:var(--font-outfit)] text-[#F0F4F8]/50 text-sm font-light tracking-[0.3em] uppercase">
                  SUDIRMAN
                </span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/60 text-xs leading-relaxed">
                The pinnacle of luxury living in Jakarta. 62 stories of
                unparalleled elegance above the city&apos;s most prestigious address.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-[family-name:var(--font-inter)] text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6">
                Explore
              </h3>
              <div className="space-y-3">
                {['Concept', 'Sky Villas', 'Amenities', 'Views', 'Location', 'Contact'].map(
                  (link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block font-[family-name:var(--font-inter)] text-[#8A9BB5]/60 text-xs hover:text-[#4AA3DF] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="font-[family-name:var(--font-inter)] text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6">
                Contact
              </h3>
              <div className="space-y-3">
                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/60 text-xs">
                  Jl. Jend. Sudirman Kav. 52-53
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/60 text-xs">
                  Jakarta Selatan 12190
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/60 text-xs">
                  +62 21 5099 8888
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/60 text-xs">
                  info@skyvillasudirman.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E2A45]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/40 text-[10px] tracking-[0.1em]">
                &copy; 2026 Skyvilla Sudirman. All rights reserved. Images for illustration purposes only.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[#8A9BB5]/40 text-[10px] tracking-[0.1em]">
                Made with &#9829; by{' '}
                <a
                  href="https://creativism.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
                >
                  Creativism
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
