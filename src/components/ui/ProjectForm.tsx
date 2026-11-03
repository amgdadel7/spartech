'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, FileText, Sparkles } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

export function ProjectForm({ t }: { t: Dictionary }) {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const f = t.contactPage.form;
  const isArabic = t.dir === 'rtl';
  const title = isArabic ? (step === 1 ? 'لنبدأ بالتعارف.' : 'حدثنا عن المشروع.') : (step === 1 ? 'Let’s start with you.' : 'Tell us about the work.');
  const note = isArabic ? (step === 1 ? 'معلومات بسيطة تساعدنا على الرد عليك بالشكل المناسب.' : 'كل معلومة تساعدنا على تصور الخطوة التالية بوضوح.') : (step === 1 ? 'A few details help us make the right first reply.' : 'Every detail helps us see the next step more clearly.');
  const nextText = isArabic ? 'التالي' : 'Continue';
  const backText = isArabic ? 'السابق' : 'Back';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  return <form className="project-form" onSubmit={(e) => { e.preventDefault(); if (step === 1) setStep(2); else setSent(true); }}>
    {sent ? <div className="form-success"><Check/><p>{f.sent}</p></div> : <>
      <div className="form-heading"><div><span className="form-overline"><Sparkles size={12}/>{isArabic ? 'استفسار مشروع' : 'Project enquiry'}</span><h2>{title}</h2><p>{note}</p></div><span className="form-count">0{step} / 02</span></div>
      <div className="form-progress" aria-label={`Step ${step} of 2`}><i className={step === 2 ? 'is-complete' : ''}/><i className={step === 2 ? 'is-active' : ''}/></div>
      {step === 1 ? <div className="form-step form-step--contact">
        <label><span><i>01</i>{f.name}</span><input required name="name" autoComplete="name" /></label>
        <label><span><i>02</i>{f.company}</span><input name="company" autoComplete="organization" /></label>
        <label className="form-wide"><span><i>03</i>{f.email}</span><input required type="email" name="email" autoComplete="email" /></label>
      </div> : <div className="form-step form-step--project">
        <div className="project-type-picker"><span><i>04</i>{f.project}</span><div>{f.options.map((option, index) => <button key={option} type="button" onClick={() => setProjectType(option)} className={projectType === option ? 'is-selected' : ''}><b>0{index + 1}</b>{option}<Check size={15}/></button>)}</div><input type="hidden" name="project" value={projectType}/></div>
        <label><span><i>05</i>{f.budget}</span><input name="budget" /></label>
        <label className="form-wide"><span><i>06</i>{f.message}</span><textarea name="message" rows={4}/></label>
      </div>}
      <div className="form-footer"><span><FileText size={15}/>{isArabic ? 'لن نستخدم معلوماتك إلا للتواصل بخصوص المشروع.' : 'Your details are only used to reply about this project.'}</span><div className="form-actions">{step === 2 && <button className="form-back" type="button" onClick={() => setStep(1)}><ChevronLeft size={16}/>{backText}</button>}<button className="form-submit" type="submit"><span>{step === 1 ? nextText : f.send}</span>{step === 1 ? <Arrow size={18}/> : <ArrowUpRight size={18}/>}</button></div></div>
    </>}
  </form>;
}
