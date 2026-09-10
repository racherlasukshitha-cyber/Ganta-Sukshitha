import React from 'react';
import { KundliData } from '../../types';

interface NorthIndianChartProps {
  kundli: KundliData;
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({ kundli }) => {
  // North Indian Chart uses a square rotated with diamond diagonals
  // House 1 is top center diamond
  // Houses counter-clockwise: 1 (top center), 2 (top left triangle), 3 (left upper triangle),
  // 4 (left center diamond), 5 (left bottom triangle), 6 (bottom left triangle),
  // 7 (bottom center diamond), 8 (bottom right triangle), 9 (right bottom triangle),
  // 10 (right center diamond), 11 (right upper triangle), 12 (top right triangle).

  const houseData = kundli.houses.reduce((acc, h) => {
    acc[h.houseNumber] = h;
    return acc;
  }, {} as Record<number, typeof kundli.houses[0]>);

  const getPlanetsInHouse = (houseNum: number) => {
    const list = houseData[houseNum]?.planetsHere || [];
    return list.map(p => {
      // Short form for planet
      const shorts: Record<string, string> = {
        Sun: 'Su',
        Moon: 'Mo',
        Mars: 'Ma',
        Mercury: 'Me',
        Jupiter: 'Ju',
        Venus: 'Ve',
        Saturn: 'Sa',
        Rahu: 'Ra',
        Ketu: 'Ke',
      };
      return shorts[p] || p.substring(0, 2);
    }).join(' ');
  };

  const getSignNumInHouse = (houseNum: number) => {
    return houseData[houseNum]?.signNumber || houseNum;
  };

  return (
    <div className="w-full max-w-[420px] mx-auto select-none">
      <div className="relative aspect-square w-full bg-amber-950/20 border-2 border-amber-500/50 rounded-xl overflow-hidden shadow-2xl p-1">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-md text-amber-300"
          style={{ fontFamily: 'Cinzel, sans-serif' }}
        >
          {/* Background fill */}
          <rect width="400" height="400" fill="#090d16" />

          {/* Outer Border */}
          <rect
            x="4"
            y="4"
            width="392"
            height="392"
            fill="none"
            stroke="#d97706"
            strokeWidth="3"
          />

          {/* Diagonals forming the triangles */}
          <line x1="0" y1="0" x2="400" y2="400" stroke="#b45309" strokeWidth="2" />
          <line x1="400" y1="0" x2="0" y2="400" stroke="#b45309" strokeWidth="2" />

          {/* Center diamond */}
          <polygon
            points="200,0 400,200 200,400 0,200"
            fill="#1e1b4b"
            fillOpacity="0.4"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />

          {/* Central cross in diamond */}
          <line x1="100" y1="100" x2="300" y2="300" stroke="#b45309" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="300" y1="100" x2="100" y2="300" stroke="#b45309" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* HOUSE 1 (Lagna / Tanu Bhava - Top Diamond) */}
          <g>
            <text x="200" y="55" fill="#fcd34d" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(1)} (Lagna)
            </text>
            <text x="200" y="85" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(1) || '—'}
            </text>
            <text x="200" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">
              House 1 (तनु)
            </text>
          </g>

          {/* HOUSE 2 (Top Left Triangle) */}
          <g>
            <text x="110" y="45" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(2)}
            </text>
            <text x="100" y="65" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(2) || '—'}
            </text>
            <text x="100" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H2 धन
            </text>
          </g>

          {/* HOUSE 3 (Left Top Triangle) */}
          <g>
            <text x="45" y="110" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(3)}
            </text>
            <text x="55" y="135" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(3) || '—'}
            </text>
            <text x="55" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H3 सहज
            </text>
          </g>

          {/* HOUSE 4 (Left Center Diamond) */}
          <g>
            <text x="95" y="205" fill="#fcd34d" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(4)}
            </text>
            <text x="95" y="180" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(4) || '—'}
            </text>
            <text x="95" y="225" fill="#94a3b8" fontSize="9" textAnchor="middle">
              House 4 (सुख)
            </text>
          </g>

          {/* HOUSE 5 (Left Bottom Triangle) */}
          <g>
            <text x="45" y="295" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(5)}
            </text>
            <text x="55" y="265" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(5) || '—'}
            </text>
            <text x="55" y="320" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H5 पुत्र
            </text>
          </g>

          {/* HOUSE 6 (Bottom Left Triangle) */}
          <g>
            <text x="110" y="355" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(6)}
            </text>
            <text x="100" y="335" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(6) || '—'}
            </text>
            <text x="100" y="375" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H6 अरि
            </text>
          </g>

          {/* HOUSE 7 (Bottom Center Diamond) */}
          <g>
            <text x="200" y="345" fill="#fcd34d" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(7)}
            </text>
            <text x="200" y="320" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(7) || '—'}
            </text>
            <text x="200" y="365" fill="#94a3b8" fontSize="9" textAnchor="middle">
              House 7 (युवती)
            </text>
          </g>

          {/* HOUSE 8 (Bottom Right Triangle) */}
          <g>
            <text x="290" y="355" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(8)}
            </text>
            <text x="300" y="335" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(8) || '—'}
            </text>
            <text x="300" y="375" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H8 रन्ध्र
            </text>
          </g>

          {/* HOUSE 9 (Right Bottom Triangle) */}
          <g>
            <text x="355" y="295" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(9)}
            </text>
            <text x="345" y="265" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(9) || '—'}
            </text>
            <text x="345" y="320" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H9 धर्म
            </text>
          </g>

          {/* HOUSE 10 (Right Center Diamond) */}
          <g>
            <text x="305" y="205" fill="#fcd34d" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(10)}
            </text>
            <text x="305" y="180" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(10) || '—'}
            </text>
            <text x="305" y="225" fill="#94a3b8" fontSize="9" textAnchor="middle">
              House 10 (कर्म)
            </text>
          </g>

          {/* HOUSE 11 (Right Upper Triangle) */}
          <g>
            <text x="355" y="110" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(11)}
            </text>
            <text x="345" y="135" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(11) || '—'}
            </text>
            <text x="345" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H11 लाभ
            </text>
          </g>

          {/* HOUSE 12 (Top Right Triangle) */}
          <g>
            <text x="290" y="45" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
              {getSignNumInHouse(12)}
            </text>
            <text x="300" y="65" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              {getPlanetsInHouse(12) || '—'}
            </text>
            <text x="300" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">
              H12 व्यय
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-2 text-center text-[11px] text-slate-400">
        Authentic North Indian Diamond Kundli Chart (Lagna Chart / लग्न चक्र)
      </div>
    </div>
  );
};
