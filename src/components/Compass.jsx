import React from 'react';

const Compass = ({ deg }) => {
  const angle = (deg + 180) % 360; // flèche vers où va le vent

  return (
    <div className="compass-wrapper">
      <svg viewBox="-12.5 -12.5 125 125" className="compass-svg">
        {/* Cercle extérieur */}
        <circle cx="50" cy="50" r="60" stroke="#18181a" strokeWidth="3" fill="none" />

        {/* Points cardinaux plus gros et plus espacés */}
        <text x="50" y="6" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#18181a">N</text>
        <text x="94" y="53" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#18181a">E</text>
        <text x="50" y="99" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#18181a">S</text>
        <text x="6" y="53" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#18181a">W</text>

        {/* Aiguille bâton + flèche */}
        <g transform={`rotate(${(deg + 180) % 360}, 50, 50)`}>
          <line x1="50" y1="50" x2="50" y2="20" stroke="#e63946" strokeWidth="2" />
          <polygon points="47,22 53,22 50,15" fill="#e63946" />
        </g>
      </svg>
    </div>
  );
};

export default Compass;
