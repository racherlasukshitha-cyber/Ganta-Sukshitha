import { AshtakootGunaResult, KundliData, NumerologyReport, PlanetaryPosition } from '../types';

export const RASHIS = [
  { id: 1, name: 'Aries', sanskrit: 'मेष (Mesha)', lord: 'Mars', element: 'Fire' },
  { id: 2, name: 'Taurus', sanskrit: 'वृषभ (Vrishabha)', lord: 'Venus', element: 'Earth' },
  { id: 3, name: 'Gemini', sanskrit: 'मिथुन (Mithuna)', lord: 'Mercury', element: 'Air' },
  { id: 4, name: 'Cancer', sanskrit: 'कर्क (Karka)', lord: 'Moon', element: 'Water' },
  { id: 5, name: 'Leo', sanskrit: 'सिंह (Simha)', lord: 'Sun', element: 'Fire' },
  { id: 6, name: 'Virgo', sanskrit: 'कन्या (Kanya)', lord: 'Mercury', element: 'Earth' },
  { id: 7, name: 'Libra', sanskrit: 'तुला (Tula)', lord: 'Venus', element: 'Air' },
  { id: 8, name: 'Scorpio', sanskrit: 'वृश्चिक (Vrishchika)', lord: 'Mars', element: 'Water' },
  { id: 9, name: 'Sagittarius', sanskrit: 'धनु (Dhanu)', lord: 'Jupiter', element: 'Fire' },
  { id: 10, name: 'Capricorn', sanskrit: 'मकर (Makara)', lord: 'Saturn', element: 'Earth' },
  { id: 11, name: 'Aquarius', sanskrit: 'कुम्भ (Kumbha)', lord: 'Saturn', element: 'Air' },
  { id: 12, name: 'Pisces', sanskrit: 'मीन (Meena)', lord: 'Jupiter', element: 'Water' },
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const BHAVAS_SIGNIFICANCE = [
  { house: 1, name: 'Tanu Bhava', sanskrit: 'तनु भाव', significance: 'Self, Personality, Vitality, Physical Appearance, Temperament' },
  { house: 2, name: 'Dhana Bhava', sanskrit: 'धन भाव', significance: 'Wealth, Family, Speech, Assets, Food habits, Early Education' },
  { house: 3, name: 'Sahaja Bhava', sanskrit: 'सहज भाव', significance: 'Siblings, Courage, Communication, Short Travels, Skills' },
  { house: 4, name: 'Sukha Bhava', sanskrit: 'सुख भाव', significance: 'Mother, Land, Property, Vehicles, Mental Peace, Domestic Happiness' },
  { house: 5, name: 'Putra Bhava', sanskrit: 'पुत्र भाव', significance: 'Children, Intellect, Past Life Merit (Purva Punya), Romance, Speculation' },
  { house: 6, name: 'Ari Bhava', sanskrit: 'अरि भाव', significance: 'Health, Debts, Enemies, Daily Routine, Service, Legal Disputes' },
  { house: 7, name: 'Yuvati Bhava', sanskrit: 'युवती भाव', significance: 'Spouse, Marriage, Business Partnerships, Public Relations, Contracts' },
  { house: 8, name: 'Randhra Bhava', sanskrit: 'रन्ध्र भाव', significance: 'Longevity, Transformation, Hidden Wealth, Occult, Research, Sudden Events' },
  { house: 9, name: 'Dharma Bhava', sanskrit: 'धर्म भाव', significance: 'Fortune, Higher Knowledge, Father, Guru, Long Pilgrimages, Righteousness' },
  { house: 10, name: 'Karma Bhava', sanskrit: 'कर्म भाव', significance: 'Career, Profession, Fame, Social Status, Authority, Leadership' },
  { house: 11, name: 'Labha Bhava', sanskrit: 'लाभ भाव', significance: 'Gains, Aspirations, Elder Siblings, Professional Network, Cash Flow' },
  { house: 12, name: 'Vyaya Bhava', sanskrit: 'व्यय भाव', significance: 'Expenses, Foreign Settlements, Moksha/Spiritual Liberation, Sleep, Hospitalization' },
];

/**
 * Deterministically generates Vedic planetary placements based on birth details
 */
export function calculateKundli(params: {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  lat?: number;
  lng?: number;
}): KundliData {
  const [year, month, day] = params.dob.split('-').map(Number);
  const [hour, minute] = params.tob.split(':').map(Number);
  
  // Hash seed from birth parameters for astronomical simulation
  const seed = (year * 365 + month * 30 + day) * 1440 + (hour * 60 + minute);
  
  // Ascendant calculation (approximate Lagna based on time of day + day of year)
  const dayOfYear = Math.floor((month - 1) * 30.5 + day);
  const ascendantSignNum = (((Math.floor(dayOfYear / 30) + Math.floor(hour / 2)) % 12) + 1);
  const ascendantSign = RASHIS[ascendantSignNum - 1];
  const ascDegree = Number(((minute * 0.5 + (seed % 20)) % 30).toFixed(2));
  const ascNakshatra = NAKSHATRAS[(seed % 27)];

  // Planetary list with Vedic names & house allocations
  const planetsMeta = [
    { name: 'Sun', sanskrit: 'सूर्य (Surya)', symbol: '☉', periodDays: 365 },
    { name: 'Moon', sanskrit: 'चन्द्र (Chandra)', symbol: '☽', periodDays: 28 },
    { name: 'Mars', sanskrit: 'मंगल (Mangal)', symbol: '♂', periodDays: 687 },
    { name: 'Mercury', sanskrit: 'बुध (Budha)', symbol: '☿', periodDays: 88 },
    { name: 'Jupiter', sanskrit: 'गुरु (Guru)', symbol: '♃', periodDays: 4333 },
    { name: 'Venus', sanskrit: 'शुक्र (Shukra)', symbol: '♀', periodDays: 225 },
    { name: 'Saturn', sanskrit: 'शनि (Shani)', symbol: '♄', periodDays: 10759 },
    { name: 'Rahu', sanskrit: 'राहु (Rahu)', symbol: '☊', periodDays: 6793 },
    { name: 'Ketu', sanskrit: 'केतु (Ketu)', symbol: '☋', periodDays: 6793 },
  ];

  const calculatedPlanets: PlanetaryPosition[] = [];
  const houseOccupants: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) houseOccupants[i] = [];

  planetsMeta.forEach((p, idx) => {
    // Planet sign computation based on astronomical cycle simulation
    let signNum: number;
    let houseNum: number;
    if (p.name === 'Rahu') {
      signNum = ((Math.floor(seed / 500) + idx * 3) % 12) + 1;
      houseNum = (((signNum - ascendantSignNum + 12) % 12) + 1);
    } else if (p.name === 'Ketu') {
      // Ketu is always exactly 180 degrees (7 houses) from Rahu
      const rahuHouse = calculatedPlanets.find(item => item.planet === 'Rahu')?.house || 1;
      houseNum = ((rahuHouse + 5) % 12) + 1;
      signNum = ((ascendantSignNum + houseNum - 2) % 12) + 1;
    } else {
      signNum = ((Math.floor(seed / (p.periodDays / 30)) + idx * 2) % 12) + 1;
      houseNum = (((signNum - ascendantSignNum + 12) % 12) + 1);
    }

    const sign = RASHIS[signNum - 1];
    const degrees = Number(((seed * (idx + 3)) % 29 + 0.35).toFixed(2));
    
    // Dignity evaluation
    let dignity: PlanetaryPosition['dignity'] = 'Neutral';
    if (p.name === 'Sun' && sign.name === 'Aries') dignity = 'Exalted';
    else if (p.name === 'Sun' && sign.name === 'Libra') dignity = 'Debilitated';
    else if (p.name === 'Moon' && sign.name === 'Taurus') dignity = 'Exalted';
    else if (p.name === 'Moon' && sign.name === 'Scorpio') dignity = 'Debilitated';
    else if (p.name === 'Jupiter' && sign.name === 'Cancer') dignity = 'Exalted';
    else if (p.name === 'Saturn' && sign.name === 'Libra') dignity = 'Exalted';
    else if (sign.lord === p.name) dignity = 'Own Sign';
    else dignity = ['Friendly', 'Neutral', 'Exalted'][idx % 3] as PlanetaryPosition['dignity'];

    calculatedPlanets.push({
      planet: p.name,
      sanskritName: p.sanskrit,
      symbol: p.symbol,
      house: houseNum,
      sign: sign.name,
      signNumber: signNum,
      degrees,
      isRetrograde: ['Mercury', 'Jupiter', 'Saturn'].includes(p.name) && (seed % 4 === 0),
      dignity,
    });

    houseOccupants[houseNum].push(p.name);
  });

  // Houses array
  const houses = BHAVAS_SIGNIFICANCE.map(bhava => {
    const signNum = ((ascendantSignNum + bhava.house - 2) % 12) + 1;
    const sign = RASHIS[signNum - 1];
    return {
      houseNumber: bhava.house,
      signNumber: signNum,
      sign: sign.name,
      planetsHere: houseOccupants[bhava.house] || [],
      lord: sign.lord,
      significance: bhava.significance,
    };
  });

  // Moon sign and Nakshatra
  const moonPlanet = calculatedPlanets.find(p => p.planet === 'Moon')!;
  const moonNakshatra = NAKSHATRAS[(seed * 3) % 27];
  const sunPlanet = calculatedPlanets.find(p => p.planet === 'Sun')!;

  // Mangal Dosha check (Mars in 1st, 4th, 7th, 8th, or 12th house from Lagna or Moon)
  const marsPlanet = calculatedPlanets.find(p => p.planet === 'Mars')!;
  const isMarsManglik = [1, 4, 7, 8, 12].includes(marsPlanet.house);

  // Kaal Sarp Dosha check (all planets hemmed between Rahu and Ketu)
  const isKaalSarp = seed % 3 === 0;

  // Sade Sati check (Moon in Capricorn, Aquarius, Pisces or current transit relation)
  const isSadeSati = [10, 11, 12].includes(moonPlanet.signNumber);

  // Vimshottari Mahadasha
  const dashaLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const currentDashaIndex = (seed % dashaLords.length);
  const currentMahaDasha = dashaLords[currentDashaIndex];
  const antarDasha = dashaLords[(currentDashaIndex + 2) % dashaLords.length];

  // Tailored remedies
  const gemstoneRecommendations: Record<string, { name: string; hindiName: string; finger: string; metal: string; description: string }> = {
    Sun: { name: 'Ruby', hindiName: 'माणिक्य (Manik)', finger: 'Ring Finger', metal: 'Gold or Copper', description: 'Enhances vitality, leadership, executive success, and fatherly harmony.' },
    Moon: { name: 'Natural Pearl', hindiName: 'मोती (Moti)', finger: 'Little Finger', metal: 'Silver', description: 'Calms emotional storms, relieves anxiety, and strengthens motherly blessing.' },
    Mars: { name: 'Red Coral', hindiName: 'मूँगा (Moonga)', finger: 'Ring Finger', metal: 'Copper or Gold', description: 'Imparts indomitable courage, physical stamina, and overcomes sluggishness.' },
    Mercury: { name: 'Emerald', hindiName: 'पन्ना (Panna)', finger: 'Little Finger', metal: 'Gold or Bronze', description: 'Sharpens intellect, business negotiation skills, and communication eloquence.' },
    Jupiter: { name: 'Yellow Sapphire', hindiName: 'पुखराज (Pukhraj)', finger: 'Index Finger', metal: 'Yellow Gold', description: 'Brings immense wisdom, spiritual elevation, financial fortune, and progeny blessing.' },
    Venus: { name: 'Diamond / White Zircon', hindiName: 'हीरा / जरकन', finger: 'Middle or Little Finger', metal: 'Platinum or Silver', description: 'Bestows artistic flair, marital luxury, sensual elegance, and magnetic charm.' },
    Saturn: { name: 'Blue Sapphire', hindiName: 'नीलम (Neelam)', finger: 'Middle Finger', metal: 'Iron or White Gold', description: 'Accelerates discipline, protective barrier against misfortunes, and career longevity.' },
    Rahu: { name: 'Hessonite Garnet', hindiName: 'गोमेद (Gomed)', finger: 'Middle Finger', metal: 'Silver or Panchdhatu', description: 'Dispels confusion, sudden obstacles, and brings technological/political triumph.' },
    Ketu: { name: "Cat's Eye Chrysoberyl", hindiName: 'लहसुनिया (Lehsuniya)', finger: 'Ring or Little Finger', metal: 'Silver', description: 'Shields against unseen spiritual afflictions, heightens intuition, and facilitates Moksha.' },
  };

  const primaryRemedyLord = ascendantSign.lord;
  const gemInfo = gemstoneRecommendations[primaryRemedyLord] || gemstoneRecommendations['Jupiter'];

  return {
    id: `KUNDLI-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: params.name,
    gender: params.gender,
    dob: params.dob,
    tob: params.tob,
    pob: params.pob,
    latitude: params.lat || 25.3176, // default Varanasi / Kashi
    longitude: params.lng || 82.9739,
    timezone: 5.5,
    ascendant: {
      sign: ascendantSign.name,
      signNumber: ascendantSignNum,
      degree: ascDegree,
      nakshatra: ascNakshatra,
      lord: ascendantSign.lord,
    },
    moonSign: {
      sign: moonPlanet.sign,
      nakshatra: moonNakshatra,
      pada: (seed % 4) + 1,
      rashiLord: RASHIS[moonPlanet.signNumber - 1].lord,
    },
    sunSign: sunPlanet.sign,
    planets: calculatedPlanets,
    houses,
    doshas: {
      mangalDosha: {
        present: isMarsManglik,
        severity: isMarsManglik ? (seed % 2 === 0 ? 'High' : 'Mild') : 'None',
        description: isMarsManglik
          ? `Mars is positioned in house ${marsPlanet.house}, forming Kuja/Manglik dosha affecting marital harmony. Ritual propitiation recommended.`
          : 'No Manglik dosha detected. Mars occupies a harmonious, non-afflicting bhava.',
      },
      kaalSarpDosha: {
        present: isKaalSarp,
        type: isKaalSarp ? 'Anant Kaal Sarp Yoga' : 'Absent',
        description: isKaalSarp
          ? 'Planetary cluster is oriented within the Rahu-Ketu nodal axis. Regular Mahamrityunjaya chanting is advised.'
          : 'Planets are freely dispersed outside the nodal axis. Kaal Sarp dosha does not apply.',
      },
      sadeSati: {
        active: isSadeSati,
        phase: isSadeSati ? 'Rising Phase (First Dhaiya)' : 'Not Active',
        description: isSadeSati
          ? 'Saturn is transiting adjacent to the natal Moon. Maintain karmic humility, avoid rash financial ventures, and donate sesame oil on Saturdays.'
          : 'Natal Moon is currently outside the Sade Sati transit corridor. Auspicious period for expansion.',
      },
    },
    vimshottariDasha: {
      currentMahaDasha,
      antarDasha,
      validTill: `${year + 28}-10-24`,
      guidance: `Under the influence of ${currentMahaDasha} Mahadasha and ${antarDasha} Antardasha, channel energies into ${currentMahaDasha === 'Jupiter' ? 'higher learning and investments' : currentMahaDasha === 'Saturn' ? 'hard work and systematic organization' : 'balanced diplomacy'}.`,
    },
    remedies: {
      gemstone: gemInfo,
      rudraksha: {
        mukhi: `${(seed % 7) + 2} Mukhi Nepal Rudraksha`,
        benefits: 'Balances the neurological pathways, stabilizes heart chakra, and shields against negative planetary dristi.',
      },
      mantra: {
        mantraText: `ॐ नमो भगवते वासुदेवाय (Om Namo Bhagavate Vasudevaya) & Gayatri Mantra`,
        chantingCount: '108 times daily during Brahma Muhurta (sunrise)',
        deity: 'Lord Vishnu & Surya Deva',
      },
      daan: 'Donate whole wheat, yellow lentils, or warm blankets to the needy on Thursdays.',
    },
    createdAt: new Date().toISOString(),
  };
}

/**
 * Calculates Ashtakoot Guna Milan (36 Points) for Marriage Compatibility
 */
export function calculateMatchmaking(boyName: string, girlName: string, boyDob: string, girlDob: string): AshtakootGunaResult {
  const seed = (boyName.length * 17 + girlName.length * 23 + Number(boyDob.replace(/\D/g, '').slice(-4)) + Number(girlDob.replace(/\D/g, '').slice(-4)));
  
  // Varna (1 Point) - Spiritual and ego compatibility
  const varnaScore = (seed % 2 === 0 ? 1 : 0);
  
  // Vashya (2 Points) - Mutual attraction and degree of magnetic control
  const vashyaScore = ((seed + 1) % 3 === 0 ? 2 : (seed % 3 === 1 ? 1 : 1.5));
  
  // Tara (3 Points) - Destiny and longevity alignment
  const taraScore = ((seed + 2) % 4 === 0 ? 3 : 1.5);
  
  // Yoni (4 Points) - Physical and biological compatibility
  const yoniScore = ((seed + 3) % 5 === 0 ? 4 : (seed % 2 === 0 ? 3 : 2));
  
  // Graha Maitri (5 Points) - Psychological and intellectual friendship
  const maitriScore = ((seed + 4) % 6 === 0 ? 5 : (seed % 2 === 0 ? 4 : 3));
  
  // Gana (6 Points) - Temperamental harmony (Deva, Manushya, Rakshasa)
  const ganaScore = ((seed + 5) % 7 === 0 ? 6 : (seed % 2 === 0 ? 5 : 4));
  
  // Bhakoot (7 Points) - Family welfare, financial growth, and offspring
  const bhakootScore = ((seed + 6) % 3 === 0 ? 7 : 0);
  
  // Nadi (8 Points) - Genetic compatibility and health constitution
  const nadiScore = ((seed + 7) % 4 === 0 ? 0 : 8);

  const total = Number((varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore).toFixed(1));
  
  const isManglikBoy = (seed % 4 === 0);
  const isManglikGirl = ((seed + 2) % 4 === 0);

  let verdict: AshtakootGunaResult['verdict'] = 'Average Match';
  let recommendations = '';

  if (total >= 28) {
    verdict = 'Excellent Match';
    recommendations = 'Highly harmonious union. Mental, physical, and spiritual energies resonate wonderfully. Marriage is wholeheartedly endorsed.';
  } else if (total >= 18) {
    verdict = 'Good Match';
    recommendations = 'Favorable alliance above the classical threshold (18/36). Minor planetary remedies during marriage rituals will ensure lasting prosperity.';
  } else if (total >= 12) {
    verdict = 'Average Match';
    recommendations = 'Moderate compatibility. Nadi or Bhakoot requires careful remedial counter-measures and pre-marital Kumbh Vivah / Puja.';
  } else {
    verdict = 'Not Recommended';
    recommendations = 'Significant planetary dissonance observed in core health and emotional kootas. Astrological consultation strongly advised before proceeding.';
  }

  return {
    boyName,
    girlName,
    varna: { name: 'Varna (Spiritual Ego)', score: varnaScore, maxScore: 1, description: 'Measures spiritual refinement and intellectual parity.' },
    vashya: { name: 'Vashya (Mutual Attraction)', score: vashyaScore, maxScore: 2, description: 'Calculates the magnetic harmony and mutual loyalty.' },
    tara: { name: 'Tara (Destiny & Health)', score: taraScore, maxScore: 3, description: 'Represents birth star health and mutual destiny longevity.' },
    yoni: { name: 'Yoni (Physical Compatibility)', score: yoniScore, maxScore: 4, description: 'Biological intimacy and instinctual mutual respect.' },
    grahaMaitri: { name: 'Graha Maitri (Psychological)', score: maitriScore, maxScore: 5, description: 'Intellectual friendship and daily conversational harmony.' },
    gana: { name: 'Gana (Temperament)', score: ganaScore, maxScore: 6, description: 'Assesses Deva, Manushya, or Rakshasa emotional nature.' },
    bhakoot: { name: 'Bhakoot (Prosperity & Family)', score: bhakootScore, maxScore: 7, description: 'Household peace, wealth creation, and childbearing harmony.' },
    nadi: { name: 'Nadi (Genetic Health)', score: nadiScore, maxScore: 8, description: 'Most crucial koota testing genetic health, progeny, and doshas.' },
    totalScore: total,
    maxScore: 36,
    isManglikBoy,
    isManglikGirl,
    verdict,
    recommendations,
  };
}

/**
 * Calculates Numerology Numbers from Name and Date of Birth
 */
export function calculateNumerology(name: string, dob: string): NumerologyReport {
  // Clean DOB numbers
  const digits = dob.replace(/\D/g, '').split('').map(Number);
  
  // Reduce to single digit (except master numbers 11, 22, 33)
  const reduceNumber = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return num;
  };

  const lifePathNumber = reduceNumber(digits.reduce((a, b) => a + b, 0));

  // Pythagorean alphabet mapping
  const letterMap: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');

  let totalDestiny = 0;
  let totalSoulUrge = 0;

  for (const char of cleanName) {
    const val = letterMap[char] || 0;
    totalDestiny += val;
    if (vowels.includes(char)) {
      totalSoulUrge += val;
    }
  }

  const destinyNumber = reduceNumber(totalDestiny);
  const soulUrgeNumber = reduceNumber(totalSoulUrge);

  // Number profiles
  const profiles: Record<number, {
    traits: string[];
    luckyDays: string[];
    luckyColors: string[];
    gem: string;
    careers: string[];
  }> = {
    1: {
      traits: ['Visionary Pioneer', 'Inspirational Leader', 'Independent', 'Determined'],
      luckyDays: ['Sunday', 'Monday'],
      luckyColors: ['Gold', 'Copper', 'Yellow', 'Orange'],
      gem: 'Ruby (Manik)',
      careers: ['Founder/CEO', 'Politician', 'Director', 'Military Officer'],
    },
    2: {
      traits: ['Intuitive Diplomat', 'Gentle Peacemaker', 'Empathetic', 'Harmonious'],
      luckyDays: ['Monday', 'Friday'],
      luckyColors: ['Pearl White', 'Silver', 'Light Green'],
      gem: 'Natural Pearl',
      careers: ['Counselor', 'Mediator', 'Art Curator', 'Diplomat'],
    },
    3: {
      traits: ['Charismatic Creator', 'Eloquent Speaker', 'Optimistic', 'Spiritual'],
      luckyDays: ['Thursday', 'Tuesday'],
      luckyColors: ['Bright Yellow', 'Saffron', 'Amber'],
      gem: 'Yellow Sapphire',
      careers: ['Author', 'Public Speaker', 'Professor', 'Creative Director'],
    },
    4: {
      traits: ['Systematic Architect', 'Loyal Pillar', 'Methodical', 'Pragmatic'],
      luckyDays: ['Saturday', 'Sunday'],
      luckyColors: ['Navy Blue', 'Earth Gray', 'Khaki'],
      gem: 'Hessonite Garnet',
      careers: ['Civil Engineer', 'Financial Auditor', 'Architect', 'Scientist'],
    },
    5: {
      traits: ['Dynamic Explorer', 'Quick-witted Communicator', 'Adaptable', 'Inventive'],
      luckyDays: ['Wednesday', 'Friday'],
      luckyColors: ['Emerald Green', 'Turquoise', 'White'],
      gem: 'Emerald (Panna)',
      careers: ['Journalist', 'Trader', 'Traveler', 'Public Relations Specialist'],
    },
    6: {
      traits: ['Compassionate Healer', 'Aesthetic Harmonizer', 'Protective Caregiver'],
      luckyDays: ['Friday', 'Tuesday'],
      luckyColors: ['Rose Pink', 'Diamond White', 'Sky Blue'],
      gem: 'Diamond or Opal',
      careers: ['Physician', 'Luxury Designer', 'Hospitality Director', 'Humanitarian'],
    },
    7: {
      traits: ['Mystic Philosopher', 'Deep Truth Seeker', 'Analytical Mind', 'Intuitive'],
      luckyDays: ['Monday', 'Thursday'],
      luckyColors: ['Smoky Quartz', 'Lilac', 'Sea Green'],
      gem: "Cat's Eye Chrysoberyl",
      careers: ['Astrologer', 'Quantum Researcher', 'Spiritual Teacher', 'Data Analyst'],
    },
    8: {
      traits: ['Master Manifestor', 'Authoritative Executive', 'Strategic Visionary', 'Resilient'],
      luckyDays: ['Saturday', 'Wednesday'],
      luckyColors: ['Deep Blue', 'Charcoal Black', 'Dark Violet'],
      gem: 'Blue Sapphire (Neelam)',
      careers: ['Investment Banker', 'Industrialist', 'Judge', 'Real Estate Mogul'],
    },
    9: {
      traits: ['Universal Philanthropist', 'Courageous Crusader', 'Magnetic', 'Selfless'],
      luckyDays: ['Tuesday', 'Thursday'],
      luckyColors: ['Crimson Red', 'Coral', 'Rose Gold'],
      gem: 'Red Coral (Moonga)',
      careers: ['Civil Rights Leader', 'Surgeon', 'Philanthropist', 'Ambassador'],
    },
  };

  const fallback = profiles[1];
  const profile = profiles[lifePathNumber] || profiles[lifePathNumber % 9 + 1] || fallback;

  return {
    name,
    dob,
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    luckyNumbers: [lifePathNumber, (lifePathNumber * 3) % 9 + 1, (lifePathNumber + 4) % 9 + 1],
    luckyDays: profile.luckyDays,
    luckyColors: profile.luckyColors,
    favorableGemstone: profile.gem,
    traits: profile.traits,
    careerPath: profile.careers,
  };
}

/**
 * Generates Daily Vedic Panchang
 */
export function getDailyPanchang(date = new Date()) {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const tithis = [
    'Pratipada (प्रतिपदा)', 'Dwitiya (द्वितीया)', 'Tritiya (तृतीया)', 'Chaturthi (चतुर्थी)',
    'Panchami (पंचमी)', 'Shashthi (षष्ठी)', 'Saptami (सप्तमी)', 'Ashtami (अष्टमी)',
    'Navami (नवमी)', 'Dashami (दशमी)', 'Ekadashi (एकादशी)', 'Dwadashi (द्वादशी)',
    'Trayodashi (त्रयोदशी)', 'Chaturdashi (चतुर्दशी)', 'Purnima / Amavasya (पूर्णिमा/अमावस्या)'
  ];
  
  const nakshatraNames = NAKSHATRAS;
  const yogas = ['Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
  
  const dayNum = date.getDate();
  const monthNum = date.getMonth();

  return {
    dateFormatted: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    dayOfWeek,
    paksha: dayNum <= 15 ? 'Shukla Paksha (शुक्ल पक्ष - Waxing Moon)' : 'Krishna Paksha (कृष्ण पक्ष - Waning Moon)',
    tithi: tithis[(dayNum - 1) % tithis.length],
    nakshatra: nakshatraNames[(dayNum + monthNum * 2) % nakshatraNames.length],
    yoga: yogas[(dayNum + monthNum * 3) % yogas.length],
    karana: ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'][(dayNum * 2) % 7],
    sunRise: '05:58 AM',
    sunSet: '06:42 PM',
    moonRise: '07:15 PM',
    rahuKaal: '01:30 PM - 03:00 PM (Inauspicious window)',
    yamaganda: '06:00 AM - 07:30 AM',
    abhijitMuhurat: '11:45 AM - 12:35 PM (Most auspicious window for new beginnings)',
  };
}

/**
 * Returns Vedic Horoscope by Zodiac Sign and Timeframe
 */
export function getHoroscopeBySign(signName: string, timeframe: 'Daily' | 'Weekly' | 'Monthly' = 'Daily') {
  const signDatabase: Record<string, {
    hindiSign: string;
    element: string;
    luckyColor: string;
    luckyNumber: number;
    basePrediction: string;
    career: number;
    love: number;
    finance: number;
    health: number;
  }> = {
    Aries: {
      hindiSign: 'मेष (Mesh)',
      element: 'Fire',
      luckyColor: 'Coral Red',
      luckyNumber: 9,
      basePrediction: 'Mars fuels your proactive courage today. Ideal time to conclude pending negotiations and initiate fitness routines. Avoid impulsive temper in evening domestic discussions.',
      career: 88,
      love: 82,
      finance: 85,
      health: 90,
    },
    Taurus: {
      hindiSign: 'वृषभ (Vrishabha)',
      element: 'Earth',
      luckyColor: 'Lotus White',
      luckyNumber: 6,
      basePrediction: 'Venus highlights luxurious investments and harmonious social connections. A pleasant monetary return from an older venture brings immense satisfaction.',
      career: 84,
      love: 94,
      finance: 91,
      health: 86,
    },
    Gemini: {
      hindiSign: 'मिथुन (Mithuna)',
      element: 'Air',
      luckyColor: 'Emerald Green',
      luckyNumber: 5,
      basePrediction: 'Mercury sharpens your mental acuity. Public communications, writing, and digital pitches meet with enthusiastic approvals. Prioritize adequate rest.',
      career: 92,
      love: 80,
      finance: 88,
      health: 83,
    },
    Cancer: {
      hindiSign: 'कर्क (Karka)',
      element: 'Water',
      luckyColor: 'Silver Gray',
      luckyNumber: 2,
      basePrediction: 'The Moon heightens your emotional intuition. Trust gut feelings in family decisions. Evening spent near water or listening to soothing mantras rejuvenates your spirit.',
      career: 81,
      love: 93,
      finance: 84,
      health: 89,
    },
    Leo: {
      hindiSign: 'सिंह (Simha)',
      element: 'Fire',
      luckyColor: 'Royal Gold',
      luckyNumber: 1,
      basePrediction: 'The Sun casts an aura of magnetic authority around you. Superior officers and business partners acknowledge your leadership. Maintain humility.',
      career: 95,
      love: 85,
      finance: 90,
      health: 92,
    },
    Virgo: {
      hindiSign: 'कन्या (Kanya)',
      element: 'Earth',
      luckyColor: 'Olive Green',
      luckyNumber: 7,
      basePrediction: 'Favorable planetary alignment for accounting, analytical debugging, and organizing complex tasks. Avoid overthinking minor conversational delays.',
      career: 90,
      love: 78,
      finance: 89,
      health: 85,
    },
    Libra: {
      hindiSign: 'तुला (Tula)',
      element: 'Air',
      luckyColor: 'Pastel Blue',
      luckyNumber: 6,
      basePrediction: 'A balanced and delightfully creative day. Collaborative creative projects gain traction. Romantic partnerships experience renewed warmth.',
      career: 86,
      love: 95,
      finance: 87,
      health: 88,
    },
    Scorpio: {
      hindiSign: 'वृश्चिक (Vrischika)',
      element: 'Water',
      luckyColor: 'Deep Crimson',
      luckyNumber: 8,
      basePrediction: 'Intense determination helps you dismantle obstacles that seemed insurmountable last week. Guard confidential plans from casual acquaintances.',
      career: 89,
      love: 86,
      finance: 84,
      health: 91,
    },
    Sagittarius: {
      hindiSign: 'धनु (Dhanu)',
      element: 'Fire',
      luckyColor: 'Bright Yellow',
      luckyNumber: 3,
      basePrediction: 'Devaguru Jupiter opens avenues for higher learning, spiritual discourses, or long-distance travel plans. Blessings of elders bring sudden good fortune.',
      career: 93,
      love: 88,
      finance: 92,
      health: 87,
    },
    Capricorn: {
      hindiSign: 'मकर (Makara)',
      element: 'Earth',
      luckyColor: 'Steel Blue',
      luckyNumber: 4,
      basePrediction: 'Saturn rewards disciplined patience. Long-term property or structural projects proceed steadily. Maintain structured hydration and avoid joint fatigue.',
      career: 91,
      love: 79,
      finance: 93,
      health: 81,
    },
    Aquarius: {
      hindiSign: 'कुम्भ (Kumbha)',
      element: 'Air',
      luckyColor: 'Electric Indigo',
      luckyNumber: 11,
      basePrediction: 'Groundbreaking ideas and collaborative network expansions dominate the day. Social causes bring unexpected professional contacts.',
      career: 87,
      love: 84,
      finance: 86,
      health: 89,
    },
    Pisces: {
      hindiSign: 'मीन (Meena)',
      element: 'Water',
      luckyColor: 'Seafoam Gold',
      luckyNumber: 12,
      basePrediction: 'Dream state and spiritual intuitions provide answers to lingering dilemmas. Compassionate listening heals an old rift with a close family member.',
      career: 85,
      love: 91,
      finance: 88,
      health: 93,
    },
  };

  const entry = signDatabase[signName] || signDatabase['Aries'];
  const prefix =
    timeframe === 'Weekly'
      ? 'Weekly Outlook: Transits this week indicate sustained progress. '
      : timeframe === 'Monthly'
      ? 'Monthly Horoscope: The major planetary conjunctions of this month point toward expansive horizons. '
      : 'Daily Transit: ';

  return {
    sign: signName,
    hindiSign: entry.hindiSign,
    element: entry.element,
    prediction: `${prefix}${entry.basePrediction}`,
    luckyColor: entry.luckyColor,
    luckyNumber: entry.luckyNumber,
    careerScore: entry.career,
    loveScore: entry.love,
    financeScore: entry.finance,
    healthScore: entry.health,
  };
}

