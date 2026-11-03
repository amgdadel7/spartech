import { Blocks, Headphones, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import { Reveal } from '@/components/ui/Reveal';

const content = {
  en: {
    processTitle: 'A deliberate path from <em>complexity to clarity.</em>',
    processIntro: 'Clear milestones keep the hard work visible and the next decision simple.',
    steps: [{ title:'Discover', copy:'We map the people, constraints, opportunities and signals that matter.' },{ title:'Define', copy:'We turn insight into a focused product, system and delivery plan.' },{ title:'Build', copy:'Design and engineering work together in visible, useful increments.' },{ title:'Evolve', copy:'We measure, support and improve what the system makes possible.' }],
    trustTitle: 'The details that <em>earn trust.</em>',
    trust: [{title:'Security-minded',copy:'Thoughtful controls and clear access patterns from the first sketch.'},{title:'Built to scale',copy:'Architecture that respects today’s needs and tomorrow’s momentum.'},{title:'Operational clarity',copy:'Interfaces designed for the people keeping important work moving.'},{title:'A real partner',copy:'Support and product thinking that stay with you after launch.'}],
    ticker:['JE​EB WALLET','AHD FINANCIAL','SPARTECH CRM','ACCOUNTING SYSTEMS','TRANSFER NETWORK'],
  },
  ar: {
    processTitle: 'مسار واضح من <em>التعقيد إلى الوضوح.</em>',
    processIntro: 'محطات واضحة تجعل العمل الصعب مرئياً والقرار التالي أكثر بساطة.',
    steps: [{ title:'نكتشف', copy:'نرسم الأشخاص والقيود والفرص والإشارات التي تهم فعلاً.' },{ title:'نحدد', copy:'نحوّل المعرفة إلى منتج ونظام وخطة تسليم مركزة.' },{ title:'نبني', copy:'يعمل التصميم والهندسة معاً في خطوات مرئية ومفيدة.' },{ title:'نطور', copy:'نقيس وندعم ونحسن ما يتيحه النظام من إمكانات.' }],
    trustTitle: 'تفاصيل <em>تصنع الثقة.</em>',
    trust: [{title:'الأمان أولاً',copy:'ضوابط مدروسة وأنماط وصول واضحة منذ أول تصور.'},{title:'مبني للتوسع',copy:'معمارية تحترم احتياجات اليوم وزخم الغد.'},{title:'وضوح تشغيلي',copy:'واجهات مصممة للناس الذين يحركون العمل المهم.'},{title:'شريك حقيقي',copy:'دعم وتفكير في المنتج يستمران بعد الإطلاق.'}],
    ticker:['محفظة جيب','عهد للخدمات المالية','سبارتك CRM','أنظمة المحاسبة','شبكة التحويلات'],
  },
} as const;
const trustIcons = [ShieldCheck, Blocks, Workflow, Headphones];

export function ProcessTrust({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <>
    <section className="process-section"><div className="container"><div className="process-intro"><Reveal><h2 dangerouslySetInnerHTML={{ __html: c.processTitle }}/><p>{c.processIntro}</p></Reveal></div><div className="process-steps">{c.steps.map((step, index) => <Reveal key={step.title} delay={index * .06}><article className="process-step"><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><i/></article></Reveal>)}</div></div></section>
    <section className="trust-section"><div className="container"><div className="trust-head"><Reveal><h2 dangerouslySetInnerHTML={{ __html: c.trustTitle }}/></Reveal></div><div className="trust-grid">{c.trust.map((item, index) => { const Icon = trustIcons[index]; return <Reveal key={item.title} delay={index * .06}><article><span className="trust-icon"><Icon size={21}/></span><h3>{item.title}</h3><p>{item.copy}</p></article></Reveal>; })}</div></div></section>
    <section className="product-ticker" aria-label="Selected products"><div className="product-ticker__track">{c.ticker.map((name, index) => <span key={`${name}-${index}`}><Sparkles size={14}/>{name}</span>)}</div></section>
  </>;
}
