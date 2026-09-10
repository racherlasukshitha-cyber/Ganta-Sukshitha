import jsPDF from 'jspdf';
import { Appointment, KundliData } from '../types';

export function downloadKundliPDF(kundli: KundliData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Page 1: Header & Birth Essentials
  // Rich celestial theme banner
  doc.setFillColor(30, 27, 75); // Deep Indigo
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(253, 230, 138); // Warm Gold
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('ASTROPOORNIMA VEDIC HUB', 105, 16, { align: 'center' });

  doc.setTextColor(224, 231, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Vedic Janam Kundli Patrika • Birth Chart & Planetary Analysis', 105, 24, { align: 'center' });
  doc.text('Guided by Mata Sri Poornima • Jubilee Hills, Hyderabad', 105, 30, { align: 'center' });

  // Birth Details Card
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.setFillColor(254, 252, 232);
  doc.roundedRect(15, 42, 180, 48, 3, 3, 'FD');

  doc.setTextColor(120, 53, 15);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('1. NATIVE BIRTH PARTICULARS (जन्म विवरण)', 20, 50);

  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');

  doc.text(`Full Name: ${kundli.name}`, 20, 60);
  doc.text(`Gender: ${kundli.gender}`, 110, 60);
  doc.text(`Date of Birth: ${kundli.dob}`, 20, 68);
  doc.text(`Time of Birth: ${kundli.tob}`, 110, 68);
  doc.text(`Place of Birth: ${kundli.pob}`, 20, 76);
  doc.text(`Coordinates: ${kundli.latitude}° N, ${kundli.longitude}° E`, 110, 76);
  doc.text(`Ayanamsha: Lahiri (Chitra Paksha)`, 20, 84);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 110, 84);

  // Vital Astrological Pillars
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, 96, 180, 36, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. CORE VEDIC PILLARS (पंच महातत्व)', 20, 104);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Lagna (Ascendant): ${kundli.ascendant.sign} (${kundli.ascendant.degree}°) - Lord: ${kundli.ascendant.lord}`, 20, 112);
  doc.text(`• Moon Sign (Rashi): ${kundli.moonSign.sign} - Lord: ${kundli.moonSign.rashiLord}`, 20, 118);
  doc.text(`• Birth Nakshatra: ${kundli.moonSign.nakshatra} (Pada ${kundli.moonSign.pada})`, 20, 124);
  doc.text(`• Sun Sign (Surya Rashi): ${kundli.sunSign}`, 110, 112);
  doc.text(`• Lagna Nakshatra: ${kundli.ascendant.nakshatra}`, 110, 118);
  doc.text(`• Mahadasha at Birth: ${kundli.vimshottariDasha.currentMahaDasha}`, 110, 124);

  // Planetary Table
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('3. PLANETARY PLACEMENT MATRIX (ग्रह स्थिति चक्र)', 20, 140);

  // Table header
  doc.setFillColor(67, 56, 202); // Indigo header
  doc.rect(15, 145, 180, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Planet (Graha)', 20, 150);
  doc.text('Sign (Rashi)', 65, 150);
  doc.text('House (Bhava)', 110, 150);
  doc.text('Degrees', 145, 150);
  doc.text('Dignity / Status', 170, 150);

  let currentY = 158;
  doc.setFont('helvetica', 'normal');
  kundli.planets.forEach((p, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 241, idx % 2 === 0 ? 255 : 245, idx % 2 === 0 ? 255 : 249);
    doc.rect(15, currentY - 5, 180, 7.5, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8.5);
    doc.text(`${p.planet} (${p.sanskritName.split(' ')[0]})`, 20, currentY);
    doc.text(`${p.sign}`, 65, currentY);
    doc.text(`House ${p.house}`, 110, currentY);
    doc.text(`${p.degrees}°`, 145, currentY);
    doc.text(`${p.dignity} ${p.isRetrograde ? '(R)' : ''}`, 170, currentY);
    currentY += 7.5;
  });

  // Dosha Analysis Section
  currentY += 6;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('4. VEDIC DOSHA AUDIT (दोष परीक्षण)', 20, currentY);

  currentY += 6;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  
  // Manglik Box
  doc.setFillColor(kundli.doshas.mangalDosha.present ? 254 : 240, kundli.doshas.mangalDosha.present ? 242 : 253, kundli.doshas.mangalDosha.present ? 242 : 244);
  doc.rect(15, currentY, 180, 13, 'F');
  doc.setTextColor(kundli.doshas.mangalDosha.present ? 153 : 21, kundli.doshas.mangalDosha.present ? 27 : 128, kundli.doshas.mangalDosha.present ? 27 : 61);
  doc.setFont('helvetica', 'bold');
  doc.text(`• Manglik Dosha: ${kundli.doshas.mangalDosha.present ? `Present (${kundli.doshas.mangalDosha.severity} Severity)` : 'Absent'}`, 20, currentY + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(kundli.doshas.mangalDosha.description, 20, currentY + 10);

  currentY += 15;
  // Sade Sati Box
  doc.setFillColor(248, 250, 252);
  doc.rect(15, currentY, 180, 13, 'F');
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(`• Shani Sade Sati: ${kundli.doshas.sadeSati.active ? `Active (${kundli.doshas.sadeSati.phase})` : 'Inactive'}`, 20, currentY + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(kundli.doshas.sadeSati.description, 20, currentY + 10);

  // Footer on Page 1
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 1 of 2 • AstroVeda Vedic Astrology Portal • Certified Acharya Stamp', 105, 290, { align: 'center' });

  // Page 2: Remedies & Dasha Predictions
  doc.addPage();

  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(253, 230, 138);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ASTROLOGICAL REMEDIES & DASHA FORECAST', 105, 15, { align: 'center' });

  // Dasha Section
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(15, 32, 180, 36, 3, 3, 'F');
  doc.setTextColor(49, 46, 129);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('5. VIMSHOTTARI DASHA TIMELINE', 20, 40);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Current Mahadasha Lord: ${kundli.vimshottariDasha.currentMahaDasha}`, 20, 48);
  doc.text(`Active Antardasha Lord: ${kundli.vimshottariDasha.antarDasha}`, 110, 48);
  doc.text(`Valid Till: ${kundli.vimshottariDasha.validTill}`, 20, 56);
  doc.text(`Karmic Guidance: ${kundli.vimshottariDasha.guidance}`, 20, 63);

  // Remedies
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('6. PRESCRIBED VEDIC REMEDIES (उपाय व रत्न परामर्श)', 20, 78);

  // Gemstone Card
  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(15, 84, 180, 40, 2, 2, 'FD');
  doc.setTextColor(180, 83, 9);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Prescribed Gemstone: ${kundli.remedies.gemstone.name} (${kundli.remedies.gemstone.hindiName})`, 20, 92);
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Recommended Finger: ${kundli.remedies.gemstone.finger}`, 20, 99);
  doc.text(`• Auspicious Metal: ${kundli.remedies.gemstone.metal}`, 110, 99);
  doc.text(`• Activation Day: Thursday / Sunrise after chanting Lord mantra`, 20, 106);
  doc.text(`• Astrological Effect: ${kundli.remedies.gemstone.description}`, 20, 114);

  // Rudraksha Card
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(15, 130, 180, 30, 2, 2, 'FD');
  doc.setTextColor(153, 27, 27);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Sacred Rudraksha Recommendation: ${kundli.remedies.rudraksha.mukhi}`, 20, 138);
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Spiritual Shield: ${kundli.remedies.rudraksha.benefits}`, 20, 146);
  doc.text(`• Wearing Method: Threaded in red silk string or silver cap on auspicious Monday morning.`, 20, 153);

  // Mantra Card
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.roundedRect(15, 166, 180, 32, 2, 2, 'FD');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Vedic Chanting Mantra & Deity: ${kundli.remedies.mantra.deity}`, 20, 174);
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(`Mantra: "${kundli.remedies.mantra.mantraText}"`, 20, 182);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`• Practice: ${kundli.remedies.mantra.chantingCount}`, 20, 189);

  // Daan / Charity Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, 204, 180, 24, 2, 2, 'FD');
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Karmic Charity (दान संस्कार)', 20, 212);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(kundli.remedies.daan, 20, 220);

  // Astrologer Sign-off & Stamp
  doc.setDrawColor(180, 83, 9);
  doc.setLineWidth(0.5);
  doc.line(130, 265, 185, 265);
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Acharya Devrat Shastri', 140, 270);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('M.A. Sanskrit, Varanasi Jyotish Ratna', 133, 274);
  doc.text('Certified Vedic Astrologer', 142, 278);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 2 of 2 • AstroVeda Portal • Confidential Native Report', 105, 290, { align: 'center' });

  doc.save(`AstroVeda_Kundli_${kundli.name.replace(/\s+/g, '_')}.pdf`);
}

/**
 * Downloads Remedies Report PDF
 */
export function downloadRemediesPDF(kundli: KundliData) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  doc.setFillColor(180, 83, 9); // Golden Amber
  doc.rect(0, 0, 210, 32, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ASTROPOORNIMA VEDIC REMEDIES PRESCRIPTION', 105, 16, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Prepared exclusively by Mata Sri Poornima for: ${kundli.name} • DOB: ${kundli.dob}`, 105, 24, { align: 'center' });

  // Native summary
  doc.setFillColor(254, 252, 232);
  doc.roundedRect(15, 38, 180, 24, 2, 2, 'F');
  doc.setTextColor(120, 53, 15);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('ASTROLOGICAL PROFILE SUMMARY', 20, 45);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`Ascendant: ${kundli.ascendant.sign} | Moon Sign: ${kundli.moonSign.sign} | Nakshatra: ${kundli.moonSign.nakshatra}`, 20, 53);

  // Gemstone
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(15, 68, 180, 48, 2, 2, 'D');
  doc.setTextColor(180, 83, 9);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. SACRED RATNA (GEMSTONE) RECOMMENDATION', 20, 77);
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Gemstone: ${kundli.remedies.gemstone.name} (${kundli.remedies.gemstone.hindiName})`, 20, 86);
  doc.text(`• Finger & Hand: ${kundli.remedies.gemstone.finger} of Working Hand`, 20, 93);
  doc.text(`• Setting Metal: ${kundli.remedies.gemstone.metal}`, 20, 100);
  doc.text(`• Purification: Dip in raw cow milk and Gangajal for 30 minutes before sunrise.`, 20, 107);

  // Mantras
  doc.setDrawColor(34, 197, 94);
  doc.roundedRect(15, 122, 180, 44, 2, 2, 'D');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. MANTRA SADHANA & JAPA (मंत्र जप)', 20, 131);
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Primary Mantra: ${kundli.remedies.mantra.mantraText}`, 20, 140);
  doc.text(`• Presiding Deity: ${kundli.remedies.mantra.deity}`, 20, 147);
  doc.text(`• Rosary: Tulsi or Rudraksha Mala (108 beads)`, 20, 154);
  doc.text(`• Frequency: ${kundli.remedies.mantra.chantingCount}`, 20, 161);

  // Rudraksha & Daan
  doc.setDrawColor(99, 102, 241);
  doc.roundedRect(15, 172, 180, 48, 2, 2, 'D');
  doc.setTextColor(67, 56, 202);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('3. RUDRAKSHA & KARMIC CHARITY (दान)', 20, 181);
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Recommended Rudraksha: ${kundli.remedies.rudraksha.mukhi}`, 20, 190);
  doc.text(`• Spiritual Benefits: ${kundli.remedies.rudraksha.benefits}`, 20, 197);
  doc.text(`• Recommended Daan: ${kundli.remedies.daan}`, 20, 207);

  // Seal & Blessing
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('May Lord Surya and Devaguru Jupiter bestow boundless health, prosperity, and peace.', 105, 240, { align: 'center' });
  doc.text('Mata Sri Poornima • AstroPoornima Center for Vedic Sciences, Hyderabad', 105, 246, { align: 'center' });

  doc.save(`AstroPoornima_Remedies_${kundli.name.replace(/\s+/g, '_')}.pdf`);
}

/**
 * Generates Official Downloadable GST Tax Invoice for Booked Consultations
 */
export function downloadInvoicePDF(appointment: Appointment) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Header
  doc.setFillColor(30, 27, 75); // Deep Indigo
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(253, 230, 138);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ASTROPOORNIMA VEDIC HUB', 20, 18);

  doc.setTextColor(224, 231, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad', 20, 24);
  doc.text('Govt. Registered • Email: gantapoornima555@gmail.com • Helpline: 9160791531', 20, 29);

  // Invoice Title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('TAX INVOICE / RECEIPT', 140, 48);

  // Invoice Meta
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice No: INV-${appointment.bookingNumber}`, 140, 56);
  doc.text(`Date: ${new Date(appointment.createdAt).toLocaleDateString('en-IN')}`, 140, 62);
  doc.text(`Payment Ref: ${appointment.paymentId || 'RZP_MOCK_' + appointment.bookingNumber}`, 140, 68);
  doc.text(`Status: COMPLETED (PAID)`, 140, 74);

  // Billed To
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 50, 105, 38, 2, 2, 'F');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILLED TO (CLIENT DETAILS):', 20, 57);
  doc.setFont('helvetica', 'normal');
  doc.text(`Customer Name: ${appointment.customerName}`, 20, 64);
  doc.text(`Email: ${appointment.customerEmail}`, 20, 71);
  doc.text(`Phone: ${appointment.customerPhone}`, 20, 78);
  doc.text(`Appointment Date: ${appointment.date} (${appointment.timeSlot})`, 20, 84);

  // Table
  doc.setFillColor(67, 56, 202);
  doc.rect(15, 96, 180, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('SI', 20, 101);
  doc.text('Service Description', 32, 101);
  doc.text('SAC Code', 115, 101);
  doc.text('Qty', 145, 101);
  doc.text('Amount (INR)', 170, 101);

  const basePrice = Math.round(appointment.amount / 1.18);
  const gstAmount = appointment.amount - basePrice;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('1', 20, 112);
  doc.text(`${appointment.serviceTitle} (Mata Sri Poornima)`, 32, 112);
  doc.text('998399', 115, 112);
  doc.text('1', 145, 112);
  doc.text(`₹ ${basePrice.toLocaleString('en-IN')}`, 170, 112);

  // Calculation Breakdown
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 125, 195, 125);

  doc.text('Subtotal:', 130, 133);
  doc.text(`₹ ${basePrice.toLocaleString('en-IN')}`, 170, 133);

  doc.text('CGST (9%):', 130, 140);
  doc.text(`₹ ${(gstAmount / 2).toFixed(2)}`, 170, 140);

  doc.text('SGST (9%):', 130, 147);
  doc.text(`₹ ${(gstAmount / 2).toFixed(2)}`, 170, 147);

  doc.setFillColor(241, 245, 249);
  doc.rect(125, 153, 70, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Total Paid:', 130, 159);
  doc.text(`₹ ${appointment.amount.toLocaleString('en-IN')}`, 170, 159);

  // Terms & Signature
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Notes & Terms:', 15, 180);
  doc.text('1. Consultations are conducted via encrypted Google Meet / WhatsApp Video Call or in-person at Jubilee Hills.', 15, 186);
  doc.text('2. Rescheduling is permitted up to 6 hours before the appointed time slot.', 15, 192);
  doc.text('3. This is an official digital tax invoice and requires no physical signature.', 15, 198);

  doc.setDrawColor(67, 56, 202);
  doc.roundedRect(140, 210, 50, 24, 2, 2, 'D');
  doc.setFontSize(8);
  doc.setTextColor(67, 56, 202);
  doc.text('AstroPoornima Hub', 145, 218);
  doc.text('AUTHORIZED SIGNATORY', 145, 224);
  doc.text('Hyderabad, India', 145, 229);

  doc.save(`AstroPoornima_Invoice_${appointment.bookingNumber}.pdf`);
}
