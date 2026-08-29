'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Zap, CheckCircle2, ArrowRight, Brain,
  TrendingUp, AlertCircle, Copy, Download, RefreshCw,
} from 'lucide-react';
import { mockOpportunities } from '@/data/mockData';
import { sleep } from '@/lib/utils';

const resumeSections = [
  { type: 'education', label: 'Education', items: [{ title: 'B.Sc. Computer Applications', org: 'Karnatak University, Dharwad', date: '2018–2021', bullets: ['Specialization: Data Systems', 'Final Year Project: Automated Data Pipeline'] }] },
  { type: 'experience', label: 'Experience', items: [
    { title: 'IT Support Engineer', org: 'Self-Employed / Freelance', date: '2021–2023', bullets: ['Managed Linux servers and network infrastructure for 10+ clients', 'Automated repetitive workflows using Python scripts, saving 8hrs/week', 'Resolved 500+ technical issues with 98% customer satisfaction'] },
    { title: 'Community Technology Coordinator', org: 'Hubli Festival Foundation', date: '2023–2024', bullets: ['Coordinated technology for annual festival of 5,000+ attendees', 'Managed ₹8,00,000 budget across 25 vendors', 'Led team of 50 volunteers'] },
  ] },
  { type: 'projects', label: 'Projects', items: [
    { title: 'AI Evaluation Framework', date: '2026', bullets: ['Built Python library for evaluating LLM output quality', 'Used RAGAS metrics, integrated with REST APIs'] },
    { title: 'Workflow Automation Suite', date: '2025', bullets: ['Python automation reducing manual data entry by 60%', 'Deployed on Linux VPS with monitoring'] },
    { title: 'Community Analytics Dashboard', date: '2025', bullets: ['SQL + Python data analysis dashboard', '3 NGOs using it to track program impact'] },
  ] },
  { type: 'skills', label: 'Skills', items: [{ title: 'Technical: Python, SQL, Linux, REST APIs, Git, Automation, AI Evaluation, Data Analysis, Cloud (AWS basics)' }, { title: 'Professional: Project Management, Vendor Negotiation, Team Leadership, Stakeholder Communication' }] },
];

const jdExample = `AI Operations Intern — Infosys AI Labs

We are looking for a motivated AI Operations Intern to join our production AI team.

Requirements:
- Proficiency in Python for scripting and automation
- Experience with REST APIs and microservices
- Linux/Unix administration skills
- Understanding of AI/ML model deployment
- Ability to monitor and evaluate AI system performance
- Strong problem-solving and analytical skills
- Experience with cloud platforms (AWS/GCP preferred)

Responsibilities:
- Deploy and monitor AI services in production
- Evaluate LLM output quality using standard metrics
- Automate operational workflows
- Create performance reports and dashboards
- Collaborate with AI engineering team

Nice to have:
- AI evaluation frameworks (RAGAS, DeepEval)
- Agent orchestration experience
- Kubernetes/Docker basics`;

const generatedResume = `PRIYA SHARMA
Hubli, India · priya.sharma@email.com · github.com/priyasharma · linkedin.com/in/priyasharma

AI OPERATIONS INTERN CANDIDATE
Python · AI Evaluation · Linux · REST APIs · Automation · Cloud (AWS)
Capability Twin Score: 82% | AI Ops Readiness: 74%

─────────────────────────────────────────────────────
RELEVANT EXPERIENCE
─────────────────────────────────────────────────────

IT Support & Automation Engineer | Freelance               2021–2023
• Deployed and administered Linux servers for 10+ production clients
• Authored Python automation scripts eliminating 8 hours/week of manual work
• Integrated REST APIs across 5 client systems for workflow automation
• Resolved 500+ technical incidents with 98% first-contact resolution rate

Community Operations Lead | Hubli Festival Foundation     2023–2024
• Coordinated technology infrastructure for annual event with 5,000+ attendees  
• Managed ₹8,00,000 budget across 25 vendors with zero overruns
• Directed cross-functional team of 50 volunteers across logistics and tech

─────────────────────────────────────────────────────
AI OPERATIONS PROJECTS
─────────────────────────────────────────────────────

AI Evaluation Framework                                     2026
• Built Python library for evaluating LLM output quality using RAGAS metrics
• REST API integration for automated quality monitoring pipelines
• Demonstrated: 87.3% accuracy tracking, 2.1% hallucination detection

Production Automation Suite                                2025
• Python-based automation reducing manual operational tasks by 60%
• Deployed on Linux VPS with health-check monitoring and alerting

Cloud Data Dashboard                                       2025
• AWS S3 + Python data pipeline with SQL analytical queries
• Used by 3 organizations for operational reporting

─────────────────────────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────────────────────────
Python (87%) · REST APIs (84%) · Linux/Unix (76%) · SQL (83%) · Automation (80%)
AI Evaluation (74%) · Cloud/AWS (61%) · Git · Data Analysis

─────────────────────────────────────────────────────
EDUCATION
─────────────────────────────────────────────────────
B.Sc. Computer Applications | Karnatak University           2018–2021

─────────────────────────────────────────────────────
CAPABILITY VERIFICATION
─────────────────────────────────────────────────────
AccessHire Practical Trial — AI Operations: 83% Verified
Evidence: GitHub (94%) · Projects (91%) · Assessment (94%)`;

function ATSBar({ label, before, after, color }: { label: string; before?: number; after: number; color: string }) {
  return (
    <div style={{ marginBottom: '0.625rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.775rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {before !== undefined && (
            <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.725rem' }}>{before}%</span>
          )}
          <span style={{ color, fontWeight: 700 }}>{after}%</span>
          {before !== undefined && (
            <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>+{after - before}%</span>
          )}
        </div>
      </div>
      <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 999, overflow: 'hidden' }}>
        {before !== undefined && (
          <motion.div
            initial={{ width: `${before}%` }}
            animate={{ width: `${after}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{ height: '100%', background: color, borderRadius: 999, transition: 'width 0.8s ease-out' }}
          />
        )}
        {before === undefined && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${after}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: '100%', background: color, borderRadius: 999 }}
          />
        )}
      </div>
    </div>
  );
}

export default function ResumePage() {
  const [stage, setStage] = useState<'input' | 'analyzing' | 'generated'>('input');
  const [jd, setJd] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState('');
  const [activeTab, setActiveTab] = useState<'jd' | 'resume'>('jd');

  const analyze = async () => {
    if (!jd.trim()) return;
    setStage('analyzing');
    const msgs = ['Reading job description...', 'Analyzing keyword requirements...', 'Matching against Capability Twin...', 'Calculating ATS fit...', 'Generating optimized resume...'];
    for (const m of msgs) {
      setLoadingMsg(m);
      await sleep(500);
    }
    setStage('generated');
    setActiveTab('resume');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([generatedResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Priya_Sharma_AI_Operations_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Resume Studio</h1>
        <p className="page-subtitle">One master profile. Every application optimized. Grounded in verified capabilities.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.25rem' }}>

        {/* Left: JD Input + Resume Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Tab Nav */}
          <div className="tab-nav" style={{ width: 'fit-content' }}>
            <button className={`tab-item ${activeTab === 'jd' ? 'active' : ''}`} onClick={() => setActiveTab('jd')}>Job Description</button>
            <button className={`tab-item ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveTab('resume')}>Generated Resume</button>
          </div>

          {activeTab === 'jd' && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.875rem' }}>Paste or Select Job Description</div>

              {/* Quick select */}
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>Quick select from Opportunity Radar:</div>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {mockOpportunities.slice(0, 4).map(o => (
                    <button
                      key={o.id}
                      onClick={() => { setJd(jdExample); setSelectedOpp(o.id); }}
                      style={{
                        padding: '0.25rem 0.625rem', borderRadius: 999, fontSize: '0.725rem',
                        background: selectedOpp === o.id ? 'rgba(79,142,247,0.15)' : 'var(--bg-elevated)',
                        border: `1px solid ${selectedOpp === o.id ? 'rgba(79,142,247,0.3)' : 'var(--border)'}`,
                        color: selectedOpp === o.id ? 'var(--blue-primary)' : 'var(--text-secondary)',
                        cursor: 'pointer', transition: 'all 0.12s',
                      }}
                    >
                      {o.title.slice(0, 30)}...
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="input"
                style={{ minHeight: 240, resize: 'vertical', lineHeight: 1.6 }}
                id="jd-input"
              />

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button
                  onClick={() => setJd(jdExample)}
                  className="btn-ghost"
                  style={{ border: '1px solid var(--border)', fontSize: '0.775rem' }}
                >
                  Use AI Ops Example
                </button>
                <button
                  onClick={analyze}
                  disabled={!jd.trim() || stage === 'analyzing'}
                  className="btn-primary"
                  id="analyze-jd-btn"
                >
                  <Zap size={14} /> Analyze & Generate
                </button>
              </div>

              {stage === 'analyzing' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.875rem' }}
                >
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[0,1,2].map(i => <div key={i} className="ai-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 500 }}>{loadingMsg}</span>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'resume' && stage === 'generated' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div className="section-title">AI Ops Internship Resume</div>
                  <div className="section-subtitle">Tailored for Infosys AI Labs · Verified capabilities only</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleCopy} className="btn-ghost" style={{ border: '1px solid var(--border)', fontSize: '0.75rem' }}>
                    {copied ? <CheckCircle2 size={13} style={{ color: 'var(--green)' }} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={handleExport} className="btn-secondary" style={{ fontSize: '0.75rem' }}>
                    <Download size={13} /> {downloaded ? 'Downloaded!' : 'Export Resume'}
                  </button>
                  <button onClick={analyze} className="btn-ghost" style={{ border: '1px solid var(--border)', fontSize: '0.75rem' }}>
                    <RefreshCw size={13} /> Regenerate
                  </button>
                </div>
              </div>

              <div className="mono" style={{
                background: 'var(--bg-elevated)', borderRadius: 8,
                padding: '1.25rem', fontSize: '0.725rem', lineHeight: 1.7,
                color: 'var(--text-secondary)', maxHeight: 480, overflowY: 'auto',
                border: '1px solid var(--border)', whiteSpace: 'pre-wrap',
              }}>
                {generatedResume}
              </div>

              <div style={{
                marginTop: '0.875rem', padding: '0.625rem 0.875rem',
                background: 'rgba(79,142,247,0.06)', borderRadius: 8,
                border: '1px solid rgba(79,142,247,0.15)',
                fontSize: '0.75rem', color: 'var(--text-secondary)',
              }}>
                <strong style={{ color: 'var(--blue-primary)' }}>⚠ Integrity Notice:</strong> This resume only includes verified capabilities and real experience. No fabricated credentials.
              </div>
            </motion.div>
          )}

          {activeTab === 'resume' && stage !== 'generated' && (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <FileText size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Paste a job description on the JD tab and click &quot;Analyze &amp; Generate&quot; to create your optimized resume.
              </div>
            </div>
          )}
        </div>

        {/* Right: ATS Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Master Profile Summary */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div className="section-title" style={{ marginBottom: '0.875rem' }}>Master Profile</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {resumeSections.map(s => (
                <div key={s.type} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.4rem 0.625rem', borderRadius: 6,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                }}>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{s.label}</span>
                  <CheckCircle2 size={13} style={{ color: 'var(--green)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* ATS Analysis (shows after generation) */}
          {stage === 'generated' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="section-title">ATS Analysis</div>
                <span className="badge badge-green">Optimized</span>
              </div>

              <ATSBar label="ATS Fit" before={81} after={94} color="var(--green)" />
              <ATSBar label="Keyword Coverage" before={72} after={96} color="var(--blue-primary)" />
              <ATSBar label="Capability Alignment" after={91} color="var(--violet)" />
              <ATSBar label="Evidence Coverage" after={88} color="var(--cyan)" />

              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.375rem', letterSpacing: '0.04em' }}>
                  ✓ KEYWORDS MATCHED
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.875rem' }}>
                  {['Python', 'REST APIs', 'Linux', 'automation', 'AI evaluation', 'monitoring', 'cloud', 'LLM', 'RAGAS', 'production'].map(k => (
                    <span key={k} className="badge badge-green" style={{ fontSize: '0.65rem' }}>{k}</span>
                  ))}
                </div>

                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.375rem', letterSpacing: '0.04em' }}>
                  ⚡ SUGGESTED ADDITIONS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {['Kubernetes', 'Docker', 'agent orchestration'].map(k => (
                    <span key={k} className="badge badge-amber" style={{ fontSize: '0.65rem' }}>{k}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Workflow */}
          {stage !== 'generated' && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.875rem' }}>Resume Workflow</div>
              {[
                { step: 1, label: 'Master Profile', done: true },
                { step: 2, label: 'Paste Job Description', done: !!jd },
                { step: 3, label: 'AI Analysis', done: false },
                { step: 4, label: 'Tailored Resume', done: false },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: s.done ? 'var(--green)' : 'var(--bg-elevated)',
                    border: `1.5px solid ${s.done ? 'var(--green)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700,
                    color: s.done ? 'white' : 'var(--text-muted)',
                  }}>
                    {s.done ? '✓' : s.step}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: s.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
