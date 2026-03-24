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
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const result = {
    name: '',
    headline: '',
    summary: '',
    email: '',
    phone: '',
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    industries: [],
  };

  // Section header patterns
  const sectionPatterns = {
    contact: /^(contact|contact\s*info|contact\s*information|personal\s*info)/i,
    summary: /^(professional\s*summary|summary|profile|objective|about\s*me|career\s*objective)/i,
    experience: /^(experience|work\s*experience|professional\s*experience|employment|work\s*history)/i,
    education: /^(education|academic|qualifications|degrees)/i,
    skills: /^(skills|technical\s*skills|core\s*skills|key\s*skills|competencies|tools\s*&?\s*technologies|technologies)/i,
    certifications: /^(certifications?|licenses?\s*&?\s*certifications?|professional\s*development|courses?\s*&?\s*certifications?)/i,
    projects: /^(projects?|products?\s*built|key\s*projects|portfolio)/i,
  };

  // Extract email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (emailMatch) result.email = emailMatch[0];

  // Extract phone
  const phoneMatch = text.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  if (phoneMatch) result.phone = phoneMatch[0];

  // Try to get name from first meaningful line (not an email/phone/header)
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (line.match(/[@.]/)) continue; // skip email/url lines
    if (line.match(/^\d/)) continue; // skip phone
    if (line.match(/^(resume|curriculum|cv)/i)) continue;
    if (Object.values(sectionPatterns).some(p => p.test(line))) continue;
    if (line.length > 3 && line.length < 50) {
      result.name = line.replace(/[|•\-–—]/g, '').trim();
      // Check if next line is a headline
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (!nextLine.match(/[@\d]/) && !Object.values(sectionPatterns).some(p => p.test(nextLine)) && nextLine.length < 80) {
          result.headline = nextLine.replace(/^[|•\-–—]\s*/, '').trim();
        }
      }
      break;
    }
  }

  // Parse sections
  let currentSection = null;
  let currentLines = [];
  const sections = {};

  for (const line of lines) {
    // Check if this line is a section header
    let matched = false;
    for (const [section, pattern] of Object.entries(sectionPatterns)) {
      if (pattern.test(line.replace(/[:\-–—_═─]/g, '').trim())) {
        if (currentSection) {
          sections[currentSection] = currentLines;
        }
        currentSection = section;
        currentLines = [];
        matched = true;
        break;
      }
    }
    if (!matched && currentSection) {
      currentLines.push(line);
    }
  }
  if (currentSection) {
    sections[currentSection] = currentLines;
  }

  // Parse summary
  if (sections.summary) {
    result.summary = sections.summary.join(' ').substring(0, 500);
  }

  // Parse skills
  if (sections.skills) {
    // First check if skills are one-per-line (common in sidebar layouts)
    const onePerLine = sections.skills.every(line => line.split(/[,•|;·]/).length <= 2);
    let rawSkills;
    if (onePerLine && sections.skills.length >= 3) {
      // Each line is a skill (or "Skill / Skill")
      rawSkills = sections.skills.flatMap(line => line.split(/[,•|;·]/).map(s => s.trim())).filter(s => s.length > 1 && s.length < 50);
    } else {
      const skillText = sections.skills.join(' ');
      rawSkills = skillText.split(/[,•|;·]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 50);
    }
    result.skills = [...new Set(rawSkills)].slice(0, 25);
  }

  // Parse experience
  if (sections.experience) {
    let currentExp = null;
    const expEntries = [];
    const expLines = sections.experience;
    const datePattern = /\b(20\d{2}|19\d{2}|present|current|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i;
    const fullDatePattern = /((?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\w]*\.?\s*\d{0,4}\s*[-–—to/]*\s*(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?[\w]*\.?\s*\d{0,4}|20\d{2}\s*[-–—to/]*\s*(?:20\d{2}|present|current)|\d{4}\s*[-–—]\s*\d{4})/i;
    const bulletPattern = /^[\-•*◦▪▸►●○]\s*/;

    for (let i = 0; i < expLines.length; i++) {
      const line = expLines[i];
      const isBullet = bulletPattern.test(line);
      const hasPipe = /[|•–—]/.test(line);
      const hasDate = datePattern.test(line);
      const isShortLine = line.length < 80;

      // Check if this is a bullet/description line
      if (isBullet && currentExp) {
        const cleanLine = line.replace(bulletPattern, '').trim();
        if (cleanLine) {
          currentExp.description += (currentExp.description ? '\n' : '') + cleanLine;
        }
        continue;
      }

      // Pipe-separated format: "Title | Company | Date"
      if (hasPipe && isShortLine) {
        if (currentExp) expEntries.push(currentExp);
        const parts = line.split(/[|•–—]/).map(p => p.trim()).filter(Boolean);
        const dateMatch = line.match(fullDatePattern);
        currentExp = {
          title: parts[0] || line,
          company: parts[1] || '',
          duration: dateMatch ? dateMatch[0] : (parts[2] || ''),
          description: '',
          id: Date.now() + Math.random(),
        };
        continue;
      }

      // Multi-line format: Title on one line, Company on next, Date on next
      // Detect: short non-bullet line that looks like a job title
      if (isShortLine && !isBullet && !hasDate) {
        // Check if next lines have company/date info
        const next1 = expLines[i + 1] || '';
        const next2 = expLines[i + 2] || '';
        const nextHasDate = datePattern.test(next1) || datePattern.test(next2);

        if (nextHasDate || (!currentExp && line.length > 3)) {
          if (currentExp) expEntries.push(currentExp);

          // Figure out company and duration from following lines
          let company = '';
          let duration = '';
          let skip = 0;

          // Next line could be company name
          if (i + 1 < expLines.length && !bulletPattern.test(next1)) {
            const dateMatch1 = next1.match(fullDatePattern);
            if (dateMatch1) {
              // Next line has date — it might be "Date / Location" or "Company \n Date"
              duration = dateMatch1[0];
              const remaining = next1.replace(fullDatePattern, '').replace(/[\/,]\s*/g, '').trim();
              if (remaining && remaining.length < 40) company = remaining;
              skip = 1;
            } else if (next1.length < 60 && !bulletPattern.test(next1)) {
              company = next1.replace(/[\/,]\s*$/, '').trim();
              skip = 1;
              // Check line after for date
              if (i + 2 < expLines.length) {
                const dateMatch2 = next2.match(fullDatePattern);
                if (dateMatch2) {
                  duration = dateMatch2[0];
                  skip = 2;
                }
              }
            }
          }

          currentExp = {
            title: line,
            company,
            duration,
            description: '',
            id: Date.now() + Math.random(),
          };
          i += skip;
          continue;
        }
      }

      // Date line for current entry (fills in duration if missing)
      if (hasDate && currentExp && !currentExp.duration && isShortLine) {
        const dateMatch = line.match(fullDatePattern);
        if (dateMatch) {
          currentExp.duration = dateMatch[0];
          const remaining = line.replace(fullDatePattern, '').replace(/[\/,]\s*/g, '').trim();
          if (remaining && !currentExp.company) currentExp.company = remaining;
        }
        continue;
      }

      // Fallback: treat as description for current entry
      if (currentExp) {
        const cleanLine = line.replace(bulletPattern, '').trim();
        if (cleanLine) {
          currentExp.description += (currentExp.description ? '\n' : '') + cleanLine;
        }
      } else if (line.length > 3 && isShortLine) {
        // Start a new entry
        currentExp = {
          title: line,
          company: '',
          duration: '',
          description: '',
          id: Date.now() + Math.random(),
        };
      }
    }
    if (currentExp) expEntries.push(currentExp);
    result.experience = expEntries.slice(0, 10);
  }

  // Parse education
  if (sections.education) {
    const eduEntries = [];
    const eduLines = sections.education;
    const datePattern = /\b(20\d{2}|19\d{2})\b/;
    const locationPattern = /^[A-Z][a-zA-Z\s]+,\s*[A-Z]{2}$/;

    // Check if all info is on single pipe/dash-separated lines
    const isSingleLine = eduLines.some(l => /[|•–—]/.test(l) && datePattern.test(l));

    if (isSingleLine) {
      for (const line of eduLines) {
        const yearMatch = line.match(datePattern);
        const parts = line.split(/[|•–—,]/).map(p => p.trim()).filter(Boolean);
        eduEntries.push({
          degree: parts[0] || line,
          institution: parts[1] || '',
          year: yearMatch ? yearMatch[0] : (parts[2] || ''),
          id: Date.now() + Math.random(),
        });
      }
    } else {
      // Multi-line format: degree, field, institution, date, location on separate lines
      // Merge consecutive non-date/non-location lines as parts of one entry
      let current = { degree: '', institution: '', year: '', lines: [] };

      for (let i = 0; i < eduLines.length; i++) {
        const line = eduLines[i];
        const yearMatch = line.match(/\b((?:January|February|March|April|May|June|July|August|September|October|November|December|Aug|Jan|Feb|Mar|Apr|Jun|Jul|Sep|Oct|Nov|Dec)[\w]*\.?\s+\d{4}\s*[-–—]\s*(?:(?:January|February|March|April|May|June|July|August|September|October|November|December|Aug|Jan|Feb|Mar|Apr|Jun|Jul|Sep|Oct|Nov|Dec)[\w]*\.?\s+)?\d{4}|\d{4}\s*[-–—]\s*\d{4})/i);
        const simpleYearMatch = line.match(datePattern);
        const isLocation = locationPattern.test(line.trim());

        if (isLocation) {
          // Skip location lines
          continue;
        } else if (yearMatch || (simpleYearMatch && line.length < 30)) {
          // Date line — attach to current entry
          current.year = yearMatch ? yearMatch[0] : (simpleYearMatch ? simpleYearMatch[0] : '');
        } else {
          // Could be degree, field, or institution
          const text = line.trim();
          if (!text) continue;

          // If we already have degree + institution and encounter a new non-date line,
          // it's likely a new entry
          if (current.degree && current.institution && current.year) {
            eduEntries.push({
              degree: current.degree,
              institution: current.institution,
              year: current.year,
              id: Date.now() + Math.random(),
            });
            current = { degree: '', institution: '', year: '', lines: [] };
          }

          current.lines.push(text);

          // Heuristic: institution names often contain "University", "College", "Institute", "School"
          if (/university|college|institute|school|academy/i.test(text)) {
            current.institution = text;
          } else if (!current.degree) {
            current.degree = text;
          } else if (!current.institution) {
            // Could be a field (e.g., "Computer Science") — merge with degree
            if (/science|engineering|arts|business|management|technology|studies/i.test(text)) {
              current.degree = current.degree + ' in ' + text;
            } else {
              current.institution = text;
            }
          }
        }
      }

      // Push last entry
      if (current.degree || current.institution) {
        eduEntries.push({
          degree: current.degree || current.lines[0] || '',
          institution: current.institution || '',
          year: current.year || '',
          id: Date.now() + Math.random(),
        });
      }
    }
    result.education = eduEntries.slice(0, 5);
  }

  // Parse certifications
  if (sections.certifications) {
    const certEntries = [];
    for (const line of sections.certifications) {
      const parts = line.split(/[|•–—,]/).map(p => p.trim()).filter(Boolean);
      const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/);
      if (parts[0] && parts[0].length > 2) {
        certEntries.push({
          name: parts[0],
          issuer: parts[1] || '',
          year: yearMatch ? yearMatch[0] : '',
          id: Date.now() + Math.random(),
        });
      }
    }
    result.certifications = certEntries.slice(0, 10);
  }

  // Parse projects as products
  if (sections.projects) {
    const prodEntries = [];
    let currentProd = null;
    for (const line of sections.projects) {
      const hasPipe = /[|•–—]/.test(line);
      if (hasPipe || (line.length < 80 && !line.match(/^[\-•*]/))) {
        if (currentProd) prodEntries.push(currentProd);
        const parts = line.split(/[|•–—]/).map(p => p.trim()).filter(Boolean);
        currentProd = {
          name: parts[0] || line,
          role: parts[1] || '',
          description: '',
          id: Date.now() + Math.random(),
        };
      } else if (currentProd) {
        const cleanLine = line.replace(/^[\-•*◦]\s*/, '').trim();
        if (cleanLine) currentProd.description += (currentProd.description ? ' ' : '') + cleanLine;
      }
    }
    if (currentProd) prodEntries.push(currentProd);
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
                <span>Could not parse the file. Please try a .txt file or paste your resume text below.</span>
              </div>
            )}

            {/* Manual paste fallback */}
            <div className="paste-section">
              <h3>Or paste your resume text</h3>
              <textarea
                className="paste-textarea"
                placeholder="Paste your resume content here..."
                rows={8}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
              <button
                className="btn-secondary"
                disabled={!rawText.trim()}
                onClick={() => {
                  setUploadState('parsing');
                  setTimeout(() => {
                    const parsed = parseResumeText(rawText);
                    setParsedData(parsed);
                    setUploadedFileName('Pasted text');
                    setUploadState('done');
                  }, 500);
                }}
              >
                Parse Resume Text
              </button>
            </div>

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
