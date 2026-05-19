import React from "react";

const brands = [
  { name: "ASCO", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <text x="22" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="30" fill="#008A22" letterSpacing="-0.02em">ASC</text>
      {/* Custom O for ASCO */}
      <path d="M89,14 L111,14 L111,36 L89,36 Z M95,20 L95,30 L105,30 L105,20 Z" fill="#008A22" />
      <text x="113" y="20" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="8" fill="#008A22">TM</text>
    </svg>
  )},
  { name: "Continental", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      {/* Gold circle and stylized horse logo */}
      <circle cx="20" cy="18" r="8" fill="#FFA500" />
      <path d="M17,21 C17,17 19,15 21,15 C23,15 24,17 24,20" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="32" y="22" fontFamily="Georgia, serif" fontWeight="bold" fontSize="15" fill="#FFA500">Continental</text>
      <text x="64" y="36" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="10" fill="#888888" letterSpacing="0.05em">CONTITECH</text>
    </svg>
  )},
  { name: "MAGLINER", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      {/* Red triangle */}
      <path d="M6,17 L22,17 L14,25 Z" fill="#E31B23" />
      <text x="26" y="32" fontFamily="Impact, sans-serif" fontStyle="italic" fontSize="23" fill="#000000" letterSpacing="0.02em">MAGLINER</text>
      <circle cx="140" cy="18" r="2.5" fill="none" stroke="#000000" strokeWidth="0.8" />
      <text x="139.2" y="20" fontFamily="sans-serif" fontSize="3" fontWeight="bold" fill="#000000">R</text>
    </svg>
  )},
  { name: "colson", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <text x="50%" y="65%" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="38" fill="#E31B23" letterSpacing="-0.04em">colson</text>
      <circle cx="140" cy="16" r="2.5" fill="none" stroke="#E31B23" strokeWidth="0.8" />
      <text x="139.2" y="18" fontFamily="sans-serif" fontSize="3" fontWeight="bold" fill="#E31B23">R</text>
    </svg>
  )},
  { name: "REXNORD", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <text x="10" y="33" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="22" fill="#000000">REXN</text>
      {/* Concentric red target for O */}
      <circle cx="89" cy="25" r="9" fill="none" stroke="#000000" strokeWidth="3" />
      <circle cx="89" cy="25" r="5" fill="none" stroke="#E31B23" strokeWidth="1.5" />
      <circle cx="89" cy="25" r="2" fill="#E31B23" />
      <line x1="89" y1="12" x2="89" y2="38" stroke="#E31B23" strokeWidth="1.5" />
      <text x="102" y="33" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="22" fill="#000000">RD</text>
    </svg>
  )},
  { name: "CARLISLE", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      {/* Slanted blue banner */}
      <path d="M12,12 L148,12 L140,38 L4,38 Z" fill="#003E94" />
      <text x="50%" y="65%" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="20" fill="#FFFFFF" letterSpacing="0.05em">CARLISLE</text>
    </svg>
  )},
  { name: "DODGE", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <path d="M80,8 L94,22 L80,36 L66,22 Z" fill="#5A949E" />
      <text x="50%" y="65%" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="24" fill="#1C3D43" letterSpacing="0.08em">DODGE</text>
    </svg>
  )},
  { name: "Parker", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <rect x="20" y="12" width="120" height="26" fill="#000000" />
      {/* Stylized arrow P */}
      <path d="M30,17 L30,33 M30,17 L42,17 C46,17 48,19 48,22 C48,25 46,27 42,27 L30,27" fill="none" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M26,22 L38,22" stroke="#FFFFFF" strokeWidth="2.5" />
      <text x="94" y="32" textAnchor="middle" fontFamily="Times New Roman, Georgia, serif" fontWeight="bold" fontSize="20" fill="#FFFFFF">arker</text>
    </svg>
  )},
  { name: "TSUBAKI", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      {/* Slanted blue bars */}
      <g transform="translate(10, 15)">
        <path d="M0,18 L12,0 L18,0 L6,18 Z" fill="#0096DF" />
        <path d="M8,18 L20,0 L26,0 L14,18 Z" fill="#0096DF" />
        <path d="M16,18 L28,0 L34,0 L22,18 Z" fill="#0096DF" />
      </g>
      <text x="96" y="33" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontStyle="italic" fontSize="22" fill="#0096DF" letterSpacing="0.05em">TSUBAKI</text>
    </svg>
  )},
  { name: "SKF", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <path d="M15,12 L38,12 L38,18 L21,18 L21,22 L38,22 L38,38 L15,38 L15,32 L32,32 L32,28 L15,28 Z" fill="#003366" />
      <path d="M45,12 L52,12 L52,22 L65,12 L75,12 L60,24 L76,38 L65,38 L52,27 L52,38 L45,38 Z" fill="#003366" />
      <path d="M83,12 L108,12 L108,18 L91,18 L91,22 L105,22 L105,28 L91,28 L91,38 L83,38 Z" fill="#003366" />
    </svg>
  )},
  { name: "Martin", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <text x="50%" y="28" textAnchor="middle" fontFamily="Brush Script MT, cursive, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="34" fill="#0072CE">Martin</text>
      <text x="50%" y="42" textAnchor="middle" fontFamily="sans-serif" fontSize="5.5" fontWeight="bold" fill="#000000" letterSpacing="0.05em">SPROCKET & GEAR, INC.</text>
    </svg>
  )},
  { name: "FALK", render: () => (
    <svg viewBox="0 0 160 50" className="w-full h-full max-h-12">
      <text x="50%" y="70%" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="950" fontSize="36" fill="#0072CE" letterSpacing="-0.02em">FALK</text>
    </svg>
  )},
];

const FeaturedBrands = () => {
  return (
    <section className="bg-[#f2f2f2] w-full py-10 md:py-16 px-4 md:px-0">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h2 className="text-[26px] md:text-[32px] font-bold text-[#004b87] text-center mb-8 md:mb-12">
          Our Featured Brands
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-8 md:gap-x-12 md:gap-y-16 items-center">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center h-16 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              {brand.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
