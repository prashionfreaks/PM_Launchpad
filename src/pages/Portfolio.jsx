import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { pmRoles, categories } from '../data/quizQuestions';
import { getMilestones } from '../data/roadmapData';
import {
  User, GraduationCap, Package, FileText,
  Plus, X, Save, Download, Edit3, Sparkles, Eye, Upload, CheckCircle, FileUp, AlertCircle, Loader,
  Share2, Link2, Copy, Check, Globe, ExternalLink, Mail, ArrowRight
} from 'lucide-react';

// Resume parser — extracts structured data from raw text
function parseResumeText(text) {
  // Normalize: collapse multiple spaces, standardize dashes
  const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalizedText.split('\n').map(l => l.trim()).filter(Boolean);

  const result = {
    name: '', headline: '', summary: '', email: '', phone: '', linkedin: '',
    skills: [], experience: [], education: [], certifications: [], industries: [],
  };

  // ── Contact field extraction ──────────────────────────────────────────────
  const emailMatch = normalizedText.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (emailMatch) result.email = emailMatch[0];

  const phoneMatch = normalizedText.match(/(?:\+?\d{1,3}[\s\-.]?)?\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}/);
  if (phoneMatch) result.phone = phoneMatch[0].trim();

  const linkedinMatch = normalizedText.match(/(?:linkedin\.com\/in\/)([\w\-]+)/i);
  if (linkedinMatch) result.linkedin = 'https://linkedin.com/in/' + linkedinMatch[1];

  // ── Section header detection ─────────────────────────────────────────────
  const sectionPatterns = {
    summary: /^(professional\s*summary|summary|profile|objective|about(\s*me)?|career\s*(objective|summary)|overview|personal\s*statement)/i,
    experience: /^(experience|work(\s*experience)?|professional\s*experience|employment(\s*history)?|work\s*history|career\s*history|positions?\s*held)/i,
    education: /^(education|academic(\s*(background|qualifications))?|qualifications?|degrees?|schooling)/i,
    skills: /^(skills?|technical\s*skills?|core\s*(skills?|competencies)|key\s*skills?|competencies|tools(\s*[&+]\s*technologies?)?|technologies|proficiencies|areas\s*of\s*expertise|expertise)/i,
    certifications: /^(certifications?|licen[sc]es?(\s*[&+]\s*certifications?)?|professional\s*development|courses?(\s*[&+]\s*certifications?)?|credentials?|training)/i,
    projects: /^(projects?|products?\s*(built|developed)?|key\s*projects?|portfolio|selected\s*projects?|product\s*experience)/i,
    awards: /^(awards?|honors?|achievements?|recognitions?)/i,
  };

  const isSectionHeader = (line) => {
    // Remove trailing punctuation, dashes, underscores used as dividers
    const clean = line.replace(/[:\-–—_═─►▸|]+/g, '').trim();
    // All-caps short lines are often section headers (e.g. "EXPERIENCE")
    if (clean.length > 2 && clean.length < 40 && clean === clean.toUpperCase() && /^[A-Z\s&]+$/.test(clean)) {
      return Object.keys(sectionPatterns).find(s => sectionPatterns[s].test(clean)) || null;
    }
    return Object.keys(sectionPatterns).find(s => sectionPatterns[s].test(clean)) || null;
  };

  // ── Name & headline ──────────────────────────────────────────────────────
  for (let i = 0; i < Math.min(6, lines.length); i++) {
    const line = lines[i];
    if (/[@]/. test(line)) continue;          // email line
    if (/^\+?\d[\d\s\-().]{6,}/.test(line)) continue; // phone line
    if (/^(resume|curriculum vitae|cv)\b/i.test(line)) continue;
    if (isSectionHeader(line)) continue;
    if (/linkedin\.com|github\.com|http/i.test(line)) continue;
    if (line.length >= 2 && line.length <= 55) {
      result.name = line.replace(/[|•\-–—]+/g, '').trim();
      // Next non-contact line may be headline/title
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const nl = lines[j];
        if (/[@\d]/.test(nl) || isSectionHeader(nl) || /linkedin|github|http/i.test(nl)) continue;
        if (nl.length > 3 && nl.length < 90) {
          result.headline = nl.replace(/^[|•\-–—]\s*/, '').trim();
        }
        break;
      }
      break;
    }
  }

  // ── Split into sections ──────────────────────────────────────────────────
  let currentSection = null;
  let currentLines = [];
  const sections = {};

  for (const line of lines) {
    const sec = isSectionHeader(line);
    if (sec) {
      if (currentSection) sections[currentSection] = currentLines;
      currentSection = sec;
      currentLines = [];
    } else if (currentSection) {
      currentLines.push(line);
    }
  }
  if (currentSection) sections[currentSection] = currentLines;

  // ── Summary ──────────────────────────────────────────────────────────────
  if (sections.summary) {
    result.summary = sections.summary.join(' ').replace(/\s+/g, ' ').trim().substring(0, 600);
  }

  // ── Skills ───────────────────────────────────────────────────────────────
  if (sections.skills) {
    const rawSkills = [];
    for (const line of sections.skills) {
      // Handle "Category: skill1, skill2" format
      const colonIdx = line.indexOf(':');
      const content = colonIdx !== -1 && colonIdx < 30 ? line.slice(colonIdx + 1) : line;
      // Split on common delimiters
      const parts = content.split(/[,•|;·\/\\]+/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 60);
      rawSkills.push(...parts);
    }
    result.skills = [...new Set(rawSkills)].slice(0, 30);
  }

  // ── Experience ───────────────────────────────────────────────────────────
  if (sections.experience) {
    const expEntries = [];
    let cur = null;
    const expLines = sections.experience;

    const dateRx = /\b(20\d{2}|19\d{2}|present|current|now|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i;
    const fullDateRx = /((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s*\d{0,4}\s*[-–—to]+\s*(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s*)?\d{0,4}|20\d{2}\s*[-–—to]+\s*(?:20\d{2}|present|current|now)|\d{4}\s*[-–—]\s*\d{4})/i;
    const bulletRx = /^[\-•*◦▪▸►●○➤✓]\s*/;
    const separatorRx = /[|,]\s*/;

    const pushCur = () => { if (cur) { expEntries.push(cur); cur = null; } };

    const looksLikeTitle = (line) =>
      line.length > 2 && line.length < 90 &&
      !bulletRx.test(line) &&
      /^[A-Z]/.test(line) &&
      !/^\d/.test(line);

    for (let i = 0; i < expLines.length; i++) {
      const line = expLines[i];
      const isBullet = bulletRx.test(line);
      const hasDate = dateRx.test(line);
      const hasSep = /[|]/.test(line);
      const next1 = expLines[i + 1] || '';
      const next2 = expLines[i + 2] || '';

      // Bullet point → append to description
      if (isBullet) {
        if (cur) cur.description += (cur.description ? '\n' : '') + line.replace(bulletRx, '').trim();
        continue;
      }

      // Pipe-separated header: "Title | Company | Date" or "Company | Title | Date"
      if (hasSep && line.length < 120) {
        const parts = line.split('|').map(p => p.trim()).filter(Boolean);
        const dateMatch = line.match(fullDateRx);
        const duration = dateMatch ? dateMatch[0] : '';
        const nonDateParts = parts.filter(p => !fullDateRx.test(p) && !dateRx.test(p));
        pushCur();
        cur = {
          title: nonDateParts[0] || parts[0],
          company: nonDateParts[1] || '',
          duration,
          description: '',
          id: Date.now() + Math.random(),
        };
        continue;
      }

      // "Title at Company" or "Title, Company"
      const atMatch = line.match(/^(.+?)\s+at\s+(.+)$/i);
      if (atMatch && !hasDate && line.length < 100) {
        pushCur();
        cur = { title: atMatch[1].trim(), company: atMatch[2].trim(), duration: '', description: '', id: Date.now() + Math.random() };
        // Grab date from next line if present
        if (dateRx.test(next1)) {
          const dm = next1.match(fullDateRx);
          cur.duration = dm ? dm[0] : next1.trim();
          i++;
        }
        continue;
      }

      // Multi-line entry: title on this line, company+date on next lines
      if (looksLikeTitle(line) && !hasDate) {
        const next1HasDate = dateRx.test(next1);
        const next2HasDate = dateRx.test(next2);

        if (next1HasDate || next2HasDate || (looksLikeTitle(line) && cur && line.length < 70)) {
          pushCur();
          let company = '', duration = '', skip = 0;

          if (next1 && !bulletRx.test(next1)) {
            const dm1 = next1.match(fullDateRx);
            if (dm1) {
              duration = dm1[0];
              const rem = next1.replace(fullDateRx, '').replace(/[,/]\s*/g, '').trim();
              if (rem && rem.length < 60) company = rem;
              skip = 1;
            } else if (next1.length < 80 && !bulletRx.test(next1)) {
              company = next1.replace(/[,/]\s*$/, '').trim();
              skip = 1;
              if (next2) {
                const dm2 = next2.match(fullDateRx);
                if (dm2) { duration = dm2[0]; skip = 2; }
                else if (dateRx.test(next2) && next2.length < 40) { duration = next2.trim(); skip = 2; }
              }
            }
          }

          // Handle "Company | Date" on a single following line
          if (!company && next1 && /[|]/.test(next1)) {
            const parts = next1.split('|').map(p => p.trim());
            const dm = next1.match(fullDateRx);
            company = parts.find(p => !dateRx.test(p)) || '';
            duration = dm ? dm[0] : '';
            skip = 1;
          }

          cur = { title: line, company, duration, description: '', id: Date.now() + Math.random() };
          i += skip;
          continue;
        }
      }

      // Standalone date line — fill duration on current entry
      if (hasDate && cur && !cur.duration && line.length < 60) {
        const dm = line.match(fullDateRx);
        if (dm) {
          cur.duration = dm[0];
          const rem = line.replace(fullDateRx, '').replace(/[,/|]\s*/g, '').trim();
          if (rem && !cur.company) cur.company = rem;
          continue;
        }
      }

      // Fallback: description line
      if (cur) {
        cur.description += (cur.description ? '\n' : '') + line;
      }
    }
    pushCur();
    result.experience = expEntries.slice(0, 10);
  }

  // ── Education ─────────────────────────────────────────────────────────────
  if (sections.education) {
    const eduEntries = [];
    const eduLines = sections.education;
    const yearRx = /\b(20\d{2}|19\d{2})\b/;
    const fullYearRx = /\b\d{4}\s*[-–—to]+\s*(?:\d{4}|present|current)\b/i;
    const institutionRx = /university|college|institute|school|academy|polytechnic|iit|iim|iise/i;
    const degreeRx = /\b(b\.?tech|m\.?tech|b\.?e|m\.?e|b\.?sc|m\.?sc|b\.?a|m\.?a|b\.?com|m\.?com|mba|bba|phd|ph\.d|bachelor|master|diploma|associate|doctor)/i;
    const locationRx = /^[A-Za-z\s]+,\s*([A-Z]{2}|[A-Za-z\s]+)$/;

    let cur = { degree: '', institution: '', year: '', field: '' };
    const pushEdu = () => {
      if (cur.degree || cur.institution) {
        const deg = cur.field ? `${cur.degree} in ${cur.field}`.replace(/^ in /, '') : cur.degree;
        eduEntries.push({ degree: deg, institution: cur.institution, year: cur.year, id: Date.now() + Math.random() });
        cur = { degree: '', institution: '', year: '', field: '' };
      }
    };

    for (const line of eduLines) {
      if (locationRx.test(line.trim())) continue; // skip city/state lines

      const fullYearMatch = line.match(fullYearRx);
      const yearMatch = line.match(yearRx);

      if (fullYearMatch || (yearMatch && line.length < 35)) {
        cur.year = fullYearMatch ? fullYearMatch[0] : yearMatch[0];
        continue;
      }

      // Pipe/dash-separated: "Degree | Institution | Year"
      if (/[|]/.test(line)) {
        pushEdu();
        const parts = line.split('|').map(p => p.trim()).filter(Boolean);
        const ym = line.match(yearRx);
        cur.degree = parts[0] || '';
        cur.institution = parts[1] || '';
        cur.year = ym ? ym[0] : (parts[2] || '');
        pushEdu();
        continue;
      }

      const text = line.trim();
      if (!text) continue;

      if (institutionRx.test(text)) {
        if (cur.institution) pushEdu(); // new entry
        cur.institution = text;
      } else if (degreeRx.test(text)) {
        if (cur.degree && cur.institution) pushEdu(); // new entry
        // Check for "Degree, Field of Study" on same line
        const commaIdx = text.indexOf(',');
        if (commaIdx > 0 && commaIdx < text.length - 1) {
          cur.degree = text.slice(0, commaIdx).trim();
          cur.field = text.slice(commaIdx + 1).trim();
        } else {
          cur.degree = text;
        }
      } else if (!cur.degree) {
        cur.degree = text;
      } else if (!cur.institution) {
        cur.institution = text;
      } else {
        // Likely a new entry starting
        pushEdu();
        cur.degree = text;
      }
    }
    pushEdu();
    result.education = eduEntries.slice(0, 5);
  }

  // ── Certifications ───────────────────────────────────────────────────────
  if (sections.certifications) {
    const certEntries = [];
    for (const line of sections.certifications) {
      if (line.length < 3) continue;
      const parts = line.split(/[|,–—]/).map(p => p.trim()).filter(Boolean);
      const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/);
      if (parts[0]) {
        certEntries.push({
          name: parts[0],
          issuer: parts.length > 1 && !yearMatch ? parts[1] : (parts.find(p => !/\d{4}/.test(p) && p !== parts[0]) || ''),
          year: yearMatch ? yearMatch[0] : '',
          id: Date.now() + Math.random(),
        });
      }
    }
    result.certifications = certEntries.slice(0, 10);
  }

  // ── Projects / Products ──────────────────────────────────────────────────
  if (sections.projects) {
    const prodEntries = [];
    let cur = null;
    const bulletRx = /^[\-•*◦▪▸►●○➤✓]\s*/;
    for (const line of sections.projects) {
      if (/[|]/.test(line) || (line.length < 80 && !bulletRx.test(line) && /^[A-Z]/.test(line))) {
        if (cur) prodEntries.push(cur);
        const parts = line.split('|').map(p => p.trim()).filter(Boolean);
        cur = { name: parts[0] || line, role: parts[1] || '', description: '', id: Date.now() + Math.random() };
      } else if (cur) {
        const clean = line.replace(bulletRx, '').trim();
        if (clean) cur.description += (cur.description ? ' ' : '') + clean;
      }
    }
    if (cur) prodEntries.push(cur);
    result.products = prodEntries.slice(0, 10);
  }

  return result;
}

export default function Portfolio() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('upload');
  const [editing, setEditing] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [resumeData, setResumeData] = useState({
    summary: state.portfolio?.summary || '',
    headline: state.portfolio?.headline || '',
    skills: state.portfolio?.skills || [],
    experience: state.portfolio?.experience || [],
    certifications: state.portfolio?.certifications || [],
  });

  // Upload state
  const [uploadState, setUploadState] = useState('idle'); // idle, parsing, done, error
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [rawText, setRawText] = useState('');
  const fileInputRef = useRef(null);

  const portfolio = state.portfolio || { education: [], products: [], industries: [], resume: null };

  const [newItem, setNewItem] = useState({});

  // Share state
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareGenerated, setShareGenerated] = useState(false);

  const sections = [
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    { id: 'summary', label: 'Profile Summary', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: CheckCircle },
    { id: 'projects', label: 'Projects', icon: Package },
    { id: 'share', label: 'Share Portfolio', icon: Share2 },
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setUploadState('parsing');
    setParsedData(null);

    try {
      let text = '';

      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        text = await file.text();
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // For PDF, we read as text — modern browsers can extract some text
        // Use a simple approach: read as ArrayBuffer and extract text strings
        text = await extractTextFromPDF(file);
      } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        // For doc/docx, read as text (basic extraction)
        text = await file.text();
        // Clean up XML/binary artifacts from docx
        text = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      } else {
        // Try reading as text
        text = await file.text();
      }

      if (!text || text.trim().length < 20) {
        setUploadState('error');
        return;
      }

      setRawText(text);
      const parsed = parseResumeText(text);
      setParsedData(parsed);
      setUploadState('done');
    } catch (err) {
      console.error('Parse error:', err);
      setUploadState('error');
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const loadPdfJs = () => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        const lib = window.pdfjsLib;
        lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(lib);
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js'));
      document.head.appendChild(script);
    });
  };

  const extractTextFromPDF = async (file) => {
    const pdfjsLib = await loadPdfJs();
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    // Collect all text items with coordinates across all pages
    const allItems = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const viewport = page.getViewport({ scale: 1 });
      const pageWidth = viewport.width;

      content.items.forEach(item => {
        if (!item.str || !item.str.trim()) return;
        allItems.push({
          text: item.str,
          x: item.transform[4],
          y: item.transform[5],
          pageWidth,
          page: i,
        });
      });
    }

    if (allItems.length === 0) return '';

    // Detect if this is a two-column layout
    const pageWidth = allItems[0].pageWidth;
    const midX = pageWidth / 2;
    const leftItems = allItems.filter(it => it.x < midX * 0.85);
    const rightItems = allItems.filter(it => it.x >= midX * 0.85);
    const isTwoColumn = leftItems.length > 5 && rightItems.length > 5;

    const buildLines = (items) => {
      // Group by Y position (round to nearest 2 units to merge same-line items)
      const byY = {};
      items.forEach(item => {
        const y = Math.round(item.y / 2) * 2;
        if (!byY[y]) byY[y] = [];
        byY[y].push(item);
      });

      const sortedYs = Object.keys(byY).map(Number).sort((a, b) => b - a);
      const lines = [];
      for (const y of sortedYs) {
        const lineItems = byY[y].sort((a, b) => a.x - b.x);
        const lineText = lineItems.map(it => it.text).join(' ').trim();
        if (lineText) lines.push(lineText);
      }
      return lines;
    };

    if (isTwoColumn) {
      // Process columns separately, then concatenate left column first, then right
      // This keeps section headers with their content
      const leftLines = buildLines(leftItems);
      const rightLines = buildLines(rightItems);
      return leftLines.join('\n') + '\n' + rightLines.join('\n');
    } else {
      const lines = buildLines(allItems);
      return lines.join('\n');
    }
  };

  const applyParsedData = () => {
    if (!parsedData) return;

    // Update resumeData
    setResumeData(prev => ({
      summary: parsedData.summary || prev.summary,
      headline: parsedData.headline || prev.headline,
      skills: parsedData.skills.length > 0 ? parsedData.skills : prev.skills,
      experience: parsedData.experience.length > 0 ? parsedData.experience : prev.experience,
      certifications: parsedData.certifications.length > 0 ? parsedData.certifications : prev.certifications,
    }));

    // Update portfolio context
    dispatch({
      type: 'UPDATE_PORTFOLIO',
      payload: {
        summary: parsedData.summary || portfolio.summary,
        headline: parsedData.headline || portfolio.headline,
        skills: parsedData.skills.length > 0 ? parsedData.skills : portfolio.skills,
        experience: parsedData.experience.length > 0 ? parsedData.experience : portfolio.experience,
        certifications: parsedData.certifications.length > 0 ? parsedData.certifications : portfolio.certifications,
        education: parsedData.education.length > 0 ? parsedData.education : portfolio.education,
        products: parsedData.products?.length > 0 ? parsedData.products : portfolio.products,
        resumeUploaded: true,
        resumeFileName: uploadedFileName,
      },
    });

    setActiveSection('summary');
  };

  const handleAddItem = (section) => {
    const current = portfolio[section] || [];
    dispatch({
      type: 'UPDATE_PORTFOLIO',
      payload: { [section]: [...current, { ...newItem, id: Date.now() }] },
    });
    setNewItem({});
    setEditing(null);
  };

  const handleRemoveItem = (section, id) => {
    const current = portfolio[section] || [];
    dispatch({
      type: 'UPDATE_PORTFOLIO',
      payload: { [section]: current.filter(item => item.id !== id) },
    });
  };

  const handleSaveSummary = () => {
    dispatch({
      type: 'UPDATE_PORTFOLIO',
      payload: {
        summary: resumeData.summary,
        headline: resumeData.headline,
        skills: resumeData.skills,
        experience: resumeData.experience,
        certifications: resumeData.certifications,
      },
    });
    setEditing(null);
  };

  const generateResume = () => {
    const user = state.user || {};
    const lines = [];
    lines.push('═'.repeat(60));
    lines.push('');
    lines.push(`  ${user.name || 'Your Name'}`);
    lines.push(`  ${resumeData.headline || 'Aspiring Product Manager'}`);
    lines.push(`  ${user.email || 'email@example.com'}`);
    lines.push('');
    lines.push('═'.repeat(60));
    lines.push('');

    if (resumeData.summary) {
      lines.push('PROFESSIONAL SUMMARY');
      lines.push('─'.repeat(40));
      lines.push(resumeData.summary);
      lines.push('');
    }

    if (resumeData.skills.length > 0) {
      lines.push('SKILLS');
      lines.push('─'.repeat(40));
      lines.push(resumeData.skills.join(' • '));
      lines.push('');
    }

    if (resumeData.experience.length > 0) {
      lines.push('EXPERIENCE');
      lines.push('─'.repeat(40));
      resumeData.experience.forEach(exp => {
        lines.push(`${exp.title} | ${exp.company} | ${exp.duration}`);
        if (exp.description) lines.push(`  ${exp.description}`);
        lines.push('');
      });
    }

    if (portfolio.education.length > 0) {
      lines.push('EDUCATION');
      lines.push('─'.repeat(40));
      portfolio.education.forEach(edu => {
        lines.push(`${edu.degree} — ${edu.institution} (${edu.year})`);
      });
      lines.push('');
    }

    if (portfolio.products.length > 0) {
      lines.push('PRODUCTS BUILT');
      lines.push('─'.repeat(40));
      portfolio.products.forEach(prod => {
        lines.push(`${prod.name} — ${prod.role}`);
        if (prod.description) lines.push(`  ${prod.description}`);
        lines.push('');
      });
    }

    if (portfolio.industries.length > 0) {
      lines.push('INDUSTRIES');
      lines.push('─'.repeat(40));
      lines.push(portfolio.industries.map(i => i.name).join(' • '));
      lines.push('');
    }

    if (resumeData.certifications.length > 0) {
      lines.push('CERTIFICATIONS');
      lines.push('─'.repeat(40));
      resumeData.certifications.forEach(cert => {
        lines.push(`${cert.name} — ${cert.issuer} (${cert.year})`);
      });
    }

    return lines.join('\n');
  };

  const handleDownloadResume = () => {
    const content = generateResume();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(state.user?.name || 'pm').replace(/\s+/g, '_')}_resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', duration: '', description: '', id: Date.now() }],
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id),
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', year: '', id: Date.now() }],
    }));
  };

  const categoryCount = (data) => {
    let count = 0;
    if (data.summary) count++;
    if (data.skills.length > 0) count++;
    if (data.experience.length > 0) count++;
    if (data.education.length > 0) count++;
    if (data.certifications.length > 0) count++;
    if (data.products?.length > 0) count++;
    return count;
  };

  return (
    <div className="page-container">
      <h1>Portfolio & Resume</h1>
      <p className="page-subtitle">Upload your resume or build your PM portfolio from scratch.</p>

      <div className="portfolio-tabs">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              className={`tab ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <Icon size={18} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      <div className="portfolio-content">
        {/* ═══════════ Upload Resume Tab ═══════════ */}
        {activeSection === 'upload' && (
          <div className="upload-section">
            <div className="upload-header">
              <FileUp size={32} color="#6366f1" />
              <h2>Upload Your Resume</h2>
              <p>Upload your existing resume and we'll automatically parse it into structured categories for your PM portfolio.</p>
            </div>

            <div
              className={`upload-dropzone ${uploadState === 'parsing' ? 'uploading' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
              onDragLeave={(e) => { e.currentTarget.classList.remove('dragover'); }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  const fakeEvent = { target: { files: [file] } };
                  handleFileUpload(fakeEvent);
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              {uploadState === 'parsing' ? (
                <div className="upload-loading">
                  <Loader size={32} className="spin" />
                  <span>Parsing your resume...</span>
                </div>
              ) : (
                <>
                  <Upload size={40} color="#94a3b8" />
                  <span className="upload-main-text">Click to upload or drag & drop</span>
                  <span className="upload-sub-text">Supports .txt, .pdf, .doc, .docx</span>
                </>
              )}
            </div>

            {uploadState === 'error' && (
              <div className="upload-error">
                <AlertCircle size={18} />
                <span>Could not parse the file. Please try uploading a .txt or .pdf file.</span>
              </div>
            )}


            {/* Parsed results */}
            {uploadState === 'done' && parsedData && (
              <div className="parsed-results">
                <div className="parsed-header">
                  <CheckCircle size={24} color="#10b981" />
                  <div>
                    <h3>Resume Parsed Successfully</h3>
                    <p>Found {categoryCount(parsedData)} categories from "{uploadedFileName}"</p>
                  </div>
                </div>

                <div className="parsed-categories">
                  {/* Name & Headline */}
                  {parsedData.name && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <User size={16} />
                        <h4>Name & Headline</h4>
                      </div>
                      <div className="parsed-cat-content">
                        <p className="parsed-name">{parsedData.name}</p>
                        {parsedData.headline && <p className="parsed-sub">{parsedData.headline}</p>}
                        {parsedData.email && <p className="parsed-sub">{parsedData.email}</p>}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {parsedData.summary && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <FileText size={16} />
                        <h4>Professional Summary</h4>
                      </div>
                      <div className="parsed-cat-content">
                        <p>{parsedData.summary}</p>
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {parsedData.skills.length > 0 && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <Sparkles size={16} />
                        <h4>Skills</h4>
                        <span className="parsed-count">{parsedData.skills.length} found</span>
                      </div>
                      <div className="parsed-cat-content">
                        <div className="parsed-skill-tags">
                          {parsedData.skills.map((s, i) => (
                            <span key={i} className="skill-tag">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {parsedData.experience.length > 0 && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <Package size={16} />
                        <h4>Experience</h4>
                        <span className="parsed-count">{parsedData.experience.length} entries</span>
                      </div>
                      <div className="parsed-cat-content">
                        {parsedData.experience.map((exp, i) => (
                          <div key={i} className="parsed-exp-item">
                            <strong>{exp.title}</strong>
                            {exp.company && <span> at {exp.company}</span>}
                            {exp.duration && <span className="parsed-duration"> ({exp.duration})</span>}
                            {exp.description && <p className="parsed-desc">{exp.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {parsedData.education.length > 0 && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <GraduationCap size={16} />
                        <h4>Education</h4>
                        <span className="parsed-count">{parsedData.education.length} entries</span>
                      </div>
                      <div className="parsed-cat-content">
                        {parsedData.education.map((edu, i) => (
                          <div key={i} className="parsed-exp-item">
                            <strong>{edu.degree}</strong>
                            {edu.institution && <span> — {edu.institution}</span>}
                            {edu.year && <span className="parsed-duration"> ({edu.year})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {parsedData.certifications.length > 0 && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <CheckCircle size={16} />
                        <h4>Certifications</h4>
                        <span className="parsed-count">{parsedData.certifications.length} found</span>
                      </div>
                      <div className="parsed-cat-content">
                        {parsedData.certifications.map((cert, i) => (
                          <div key={i} className="parsed-exp-item">
                            <strong>{cert.name}</strong>
                            {cert.issuer && <span> — {cert.issuer}</span>}
                            {cert.year && <span className="parsed-duration"> ({cert.year})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects/Products */}
                  {parsedData.products?.length > 0 && (
                    <div className="parsed-category">
                      <div className="parsed-cat-header">
                        <Package size={16} />
                        <h4>Projects / Products</h4>
                        <span className="parsed-count">{parsedData.products.length} found</span>
                      </div>
                      <div className="parsed-cat-content">
                        {parsedData.products.map((prod, i) => (
                          <div key={i} className="parsed-exp-item">
                            <strong>{prod.name}</strong>
                            {prod.role && <span> — {prod.role}</span>}
                            {prod.description && <p className="parsed-desc">{prod.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="parsed-actions">
                  <button className="btn-primary btn-large" onClick={applyParsedData}>
                    <CheckCircle size={18} /> Apply to Portfolio
                  </button>
                  <button className="btn-secondary" onClick={() => { setUploadState('idle'); setParsedData(null); setRawText(''); }}>
                    Upload Different Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'summary' && (
          <div className="summary-section">
            <div className="profile-card-large">
              <div className="profile-avatar-large">
                {state.user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="profile-details">
                <h2>{state.user?.name || 'Your Name'}</h2>
                <div className="form-group">
                  <label>Professional Headline</label>
                  <input
                    type="text"
                    placeholder="e.g., Aspiring Product Manager | Ex-Software Engineer | Data-Driven"
                    value={resumeData.headline}
                    onChange={e => setResumeData(prev => ({ ...prev, headline: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Professional Summary</label>
                  <textarea
                    placeholder="Write a compelling 2-3 sentence summary of your professional profile and PM aspirations..."
                    rows={4}
                    value={resumeData.summary}
                    onChange={e => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                  />
                </div>
                <button className="btn-primary" onClick={handleSaveSummary}>
                  <Save size={16} /> Save Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="list-section">
            <div className="section-header">
              <h2>Education</h2>
              <button className="btn-primary btn-small" onClick={() => setEditing('education')}>
                <Plus size={16} /> Add
              </button>
            </div>

            {editing === 'education' && (
              <div className="add-form">
                <div className="form-row">
                  <input placeholder="Degree" value={newItem.degree || ''} onChange={e => setNewItem(prev => ({ ...prev, degree: e.target.value }))} />
                  <input placeholder="Institution" value={newItem.institution || ''} onChange={e => setNewItem(prev => ({ ...prev, institution: e.target.value }))} />
                  <input placeholder="Year" value={newItem.year || ''} onChange={e => setNewItem(prev => ({ ...prev, year: e.target.value }))} />
                </div>
                <div className="form-actions-inline">
                  <button className="btn-secondary btn-small" onClick={() => { setEditing(null); setNewItem({}); }}>Cancel</button>
                  <button className="btn-primary btn-small" onClick={() => handleAddItem('education')} disabled={!newItem.degree}>Save</button>
                </div>
              </div>
            )}

            <div className="items-list">
              {(portfolio.education || []).map(item => (
                <div key={item.id} className="portfolio-item">
                  <div>
                    <h4>{item.degree}</h4>
                    <p>{item.institution} • {item.year}</p>
                  </div>
                  <button className="btn-icon" onClick={() => handleRemoveItem('education', item.id)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(portfolio.education || []).length === 0 && <p className="empty-text">No education added yet.</p>}
            </div>
          </div>
        )}

        {activeSection === 'certifications' && (
          <div className="list-section">
            <div className="section-header">
              <h2>Certifications</h2>
              <button className="btn-primary btn-small" onClick={() => setEditing('certifications')}>
                <Plus size={16} /> Add
              </button>
            </div>

            {editing === 'certifications' && (
              <div className="add-form">
                <div className="form-row">
                  <input placeholder="Certification name" value={newItem.name || ''} onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))} />
                  <input placeholder="Issuer (e.g. Google, Coursera)" value={newItem.issuer || ''} onChange={e => setNewItem(prev => ({ ...prev, issuer: e.target.value }))} />
                  <input placeholder="Year" value={newItem.year || ''} onChange={e => setNewItem(prev => ({ ...prev, year: e.target.value }))} />
                </div>
                <div className="form-actions-inline">
                  <button className="btn-secondary btn-small" onClick={() => { setEditing(null); setNewItem({}); }}>Cancel</button>
                  <button className="btn-primary btn-small" onClick={() => handleAddItem('certifications')} disabled={!newItem.name}>Save</button>
                </div>
              </div>
            )}

            <div className="items-list">
              {(portfolio.certifications || []).map(item => (
                <div key={item.id} className="portfolio-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>{[item.issuer, item.year].filter(Boolean).join(' • ')}</p>
                  </div>
                  <button className="btn-icon" onClick={() => handleRemoveItem('certifications', item.id)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(portfolio.certifications || []).length === 0 && <p className="empty-text">No certifications added yet.</p>}
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="list-section">
            <div className="section-header">
              <h2>Projects</h2>
              <button className="btn-primary btn-small" onClick={() => setEditing('projects')}>
                <Plus size={16} /> Add
              </button>
            </div>

            {editing === 'projects' && (
              <div className="add-form">
                <div className="form-row">
                  <input placeholder="Project name" value={newItem.name || ''} onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))} />
                  <input placeholder="Your role (e.g. PM, Lead)" value={newItem.role || ''} onChange={e => setNewItem(prev => ({ ...prev, role: e.target.value }))} />
                </div>
                <textarea
                  placeholder="Brief description (impact, outcome, tools used)"
                  rows={3}
                  value={newItem.description || ''}
                  onChange={e => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  style={{ width: '100%', marginTop: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text)', fontSize: 13, resize: 'vertical' }}
                />
                <div className="form-actions-inline">
                  <button className="btn-secondary btn-small" onClick={() => { setEditing(null); setNewItem({}); }}>Cancel</button>
                  <button className="btn-primary btn-small" onClick={() => handleAddItem('products')} disabled={!newItem.name}>Save</button>
                </div>
              </div>
            )}

            <div className="items-list">
              {(portfolio.products || []).map(item => (
                <div key={item.id} className="portfolio-item">
                  <div>
                    <h4>{item.name}</h4>
                    {item.role && <p className="item-role">{item.role}</p>}
                    {item.description && <p className="item-desc">{item.description}</p>}
                  </div>
                  <button className="btn-icon" onClick={() => handleRemoveItem('products', item.id)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(portfolio.products || []).length === 0 && <p className="empty-text">No projects added yet.</p>}
            </div>
          </div>
        )}

        {activeSection === 'share' && (() => {
          const user = state.user || {};
          const targetRole = pmRoles.find(r => r.id === user.targetRole);
          const milestones = state.selectedPath ? getMilestones(state.selectedPath) : [];
          const completedMilestones = milestones.filter(m => state.roadmapProgress?.[m.id]?.passed).length;
          const totalXP = Object.values(state.roadmapProgress || {}).reduce(
            (sum, m) => sum + (m.passed ? (m.xpReward || 0) : 0), 0
          );

          // Completeness tracking
          const checkItems = [
            { label: 'Profile Info', done: !!user.name, icon: '👤' },
            { label: 'Summary', done: !!resumeData.summary, icon: '📝' },
            { label: 'Skills', done: resumeData.skills.length > 0, count: resumeData.skills.length, icon: '🎯' },
            { label: 'Experience', done: resumeData.experience.length > 0, count: resumeData.experience.length, icon: '💼' },
            { label: 'Education', done: (portfolio.education?.length || 0) > 0, count: portfolio.education?.length || 0, icon: '🎓' },
            { label: 'Certifications', done: resumeData.certifications.length > 0, count: resumeData.certifications.length, icon: '🏆' },
            { label: 'Readiness Score', done: !!state.quizResults, value: state.quizResults?.overallScore, icon: '📊' },
            { label: 'Interview Score', done: !!state.interviewResult, value: state.interviewResult?.overall, icon: '🎙️' },
          ];
          const completedCount = checkItems.filter(i => i.done).length;
          const completionPct = Math.round((completedCount / checkItems.length) * 100);

          const generateShareUrl = () => {
            const portfolioData = {
              name: user.name || '',
              headline: resumeData.headline || portfolio.headline || '',
              currentRole: user.currentRole || '', targetRole: targetRole?.label || '',
              summary: resumeData.summary || portfolio.summary || '',
              skills: resumeData.skills?.length > 0 ? resumeData.skills : (portfolio.skills || []),
              experience: (resumeData.experience?.length > 0 ? resumeData.experience : (portfolio.experience || [])).map(e => ({
                title: e.title, company: e.company, duration: e.duration, description: e.description
              })),
              education: (portfolio.education || []).map(e => ({ degree: e.degree, institution: e.institution, year: e.year })),
              certifications: (resumeData.certifications?.length > 0 ? resumeData.certifications : (portfolio.certifications || [])).map(c => ({
                name: c.name, issuer: c.issuer, year: c.year
              })),
              readinessScore: state.quizResults?.overallScore || null,
              interviewScore: state.interviewResult?.overall || null,
              totalXP, milestonesCompleted: completedMilestones,
              strengths: state.quizResults?.strongAreas?.map(a => categories.find(c => c.id === a)?.label).filter(Boolean) || [],
              improvements: state.quizResults?.weakAreas?.map(a => categories.find(c => c.id === a)?.label).filter(Boolean) || [],
            };
            const clean = Object.fromEntries(
              Object.entries(portfolioData).filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && v.length === 0) && v !== 0)
            );
            const encoded = encodeURIComponent(btoa(JSON.stringify(clean)));
            setShareUrl(`${window.location.origin}/portfolio/public?d=${encoded}`);
            setShareGenerated(true);
            setCopied(false);
          };

          const handleCopy = async () => {
            try { await navigator.clipboard.writeText(shareUrl); } catch {
              const ta = document.createElement('textarea'); ta.value = shareUrl;
              document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            }
            setCopied(true); setTimeout(() => setCopied(false), 3000);
          };

          return (
            <div className="share-section-v2">
              {/* Top: Hero area with gradient + mini preview */}
              <div className="share-hero">
                <div className="share-hero-left">
                  <h2>Share Your Portfolio</h2>
                  <p>Showcase your PM journey to recruiters, mentors, and peers with a beautiful public profile page.</p>

                  {/* Completeness ring */}
                  <div className="share-completeness">
                    <div className="completeness-ring">
                      <svg viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                        <circle cx="40" cy="40" r="34" fill="none"
                          stroke={completionPct >= 75 ? '#10b981' : completionPct >= 50 ? '#f59e0b' : '#6366f1'}
                          strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={`${(completionPct / 100) * 213.6} 213.6`}
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <span className="completeness-pct">{completionPct}%</span>
                    </div>
                    <div className="completeness-text">
                      <strong>{completedCount}/{checkItems.length} sections filled</strong>
                      <span>{completionPct >= 75 ? 'Looking great!' : completionPct >= 50 ? 'Almost there!' : 'Add more to stand out'}</span>
                    </div>
                  </div>
                </div>

                {/* Mini live preview card */}
                <div className="share-mini-preview">
                  <div className="mini-preview-label"><Eye size={12} /> Live Preview</div>
                  <div className="mini-card">
                    <div className="mini-card-banner" />
                    <div className="mini-card-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
                    <div className="mini-card-body">
                      <h4>{user.name || 'Your Name'}</h4>
                      <p className="mini-headline">{resumeData.headline || targetRole?.label || 'PM Professional'}</p>
                      {resumeData.skills.length > 0 && (
                        <div className="mini-skills">
                          {resumeData.skills.slice(0, 4).map((s, i) => (
                            <span key={i} className="mini-skill">{s}</span>
                          ))}
                          {resumeData.skills.length > 4 && <span className="mini-skill more">+{resumeData.skills.length - 4}</span>}
                        </div>
                      )}
                      <div className="mini-stats">
                        {state.quizResults && <span className="mini-stat">{state.quizResults.overallScore}% Ready</span>}
                        {totalXP > 0 && <span className="mini-stat">{totalXP} XP</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist as visual pills */}
              <div className="share-pills-grid">
                {checkItems.map((item, i) => (
                  <div key={i} className={`share-pill ${item.done ? 'filled' : 'empty'}`}>
                    <span className="pill-icon">{item.icon}</span>
                    <span className="pill-label">{item.label}</span>
                    {item.done ? (
                      <span className="pill-status done">
                        {item.value ? `${item.value}%` : item.count ? item.count : <CheckCircle size={14} />}
                      </span>
                    ) : (
                      <span className="pill-status missing">--</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Generate button */}
              <button className="share-generate-btn-v2" onClick={generateShareUrl}>
                <div className="generate-btn-icon"><Link2 size={22} /></div>
                <div className="generate-btn-text">
                  <strong>{shareGenerated ? 'Regenerate Link' : 'Generate Shareable Link'}</strong>
                  <span>Anyone with the link can view your portfolio</span>
                </div>
                <ArrowRight size={20} className="generate-btn-arrow" />
              </button>

              {/* Generated URL + sharing options */}
              {shareGenerated && (
                <div className="share-result-v2">
                  <div className="share-url-box-v2">
                    <div className="url-display">
                      <Globe size={16} />
                      <input type="text" value={shareUrl} readOnly onClick={(e) => e.target.select()} />
                    </div>
                    <button className={`btn-copy-v2 ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                      {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Link</>}
                    </button>
                  </div>

                  <div className="share-channels">
                    <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="share-channel preview-ch">
                      <ExternalLink size={18} />
                      <span>Preview</span>
                    </a>
                    <button className="share-channel linkedin-ch" onClick={() => {
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
                    }}>
                      <span className="channel-logo">in</span>
                      <span>LinkedIn</span>
                    </button>
                    <button className="share-channel twitter-ch" onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my PM Portfolio!')}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
                    }}>
                      <span className="channel-logo">X</span>
                      <span>Twitter</span>
                    </button>
                    <button className="share-channel email-ch" onClick={() => {
                      const subject = encodeURIComponent('My PM Portfolio - Ready PM');
                      const body = encodeURIComponent(`Hi,\n\nCheck out my Product Manager portfolio:\n${shareUrl}\n\nBuilt with Ready PM.`);
                      window.open(`mailto:?subject=${subject}&body=${body}`);
                    }}>
                      <Mail size={18} />
                      <span>Email</span>
                    </button>
                  </div>

                  <div className="share-tip-v2">
                    <Sparkles size={14} />
                    <span>No sign-up needed for viewers. Regenerate anytime for updated data.</span>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

      </div>
    </div>
  );
}
