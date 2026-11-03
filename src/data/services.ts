import { Locale } from '@/lib/i18n';

export type ServiceKey = 'financial' | 'integration' | 'architecture' | 'security' | 'business' | 'infrastructure';
export type Service = { key: ServiceKey; number: string; title: string; englishTitle: string; description: string };

const serviceData: Record<Locale, Service[]> = {
  ar: [
    { key:'financial', number:'٠١', title:'الأنظمة المالية وحلول الدفع', englishTitle:'Financial Systems & Payment Solutions', description:'تطوير المحافظ الإلكترونية، أنظمة المعاملات، التكامل مع مزودي خدمات الدفع، أنظمة التسوية والمطابقة، وإدارة العمليات المالية.' },
    { key:'integration', number:'٠٢', title:'التكامل والربط المالي', englishTitle:'Financial Integration & APIs', description:'تطوير واجهات API الآمنة، وربط شركات الصرافة والمحافظ والمؤسسات المالية، وتكامل أنظمة الدفع والتحويلات المالية.' },
    { key:'architecture', number:'٠٣', title:'هندسة الأنظمة عالية الاعتمادية', englishTitle:'Enterprise Architecture & Distributed Systems', description:'تصميم البنى البرمجية المتقدمة، الأنظمة الموزعة، الخدمات المصغرة، تحسين الأداء والتوسع، والاستمرارية والتعافي من الكوارث.' },
    { key:'security', number:'٠٤', title:'الأمن التقني والاستشارات', englishTitle:'Technology & Security Consulting', description:'مراجعة المعمارية، تقييم المخاطر التقنية، أمن التطبيقات وواجهات الربط، استراتيجيات التحول الرقمي، وتقييم الجاهزية التشغيلية.' },
    { key:'business', number:'٠٥', title:'أنظمة الأعمال والمحاسبة', englishTitle:'Enterprise Business Systems', description:'تطوير أنظمة ERP وCRM والمحاسبة والإدارة المالية، وأنظمة الرقابة والتقارير وأتمتة العمليات.' },
    { key:'infrastructure', number:'٠٦', title:'البنية التحتية والتشغيل', englishTitle:'Infrastructure, DevOps & Reliability', description:'هندسة النشر، CI/CD، مراقبة الأنظمة، توافر الخدمات، قواعد البيانات، تحسين السعة، والاستقرار التشغيلي.' },
  ],
  en: [
    { key:'financial', number:'01', title:'Financial Systems & Payment Solutions', englishTitle:'Financial Systems & Payment Solutions', description:'Digital wallet development, transaction systems, payment-provider integration, settlement and reconciliation, and financial operations management.' },
    { key:'integration', number:'02', title:'Financial Integration & APIs', englishTitle:'Financial Integration & APIs', description:'Secure API development, connection of exchange companies, wallets and financial institutions, and integration of payment and transfer systems.' },
    { key:'architecture', number:'03', title:'Enterprise Architecture & Distributed Systems', englishTitle:'Enterprise Architecture & Distributed Systems', description:'Advanced software architecture, distributed systems, microservices, performance and scale optimisation, continuity and disaster recovery.' },
    { key:'security', number:'04', title:'Technology & Security Consulting', englishTitle:'Technology & Security Consulting', description:'Architecture review, technology risk assessment, application and API security, digital transformation strategies and operational readiness.' },
    { key:'business', number:'05', title:'Enterprise Business Systems', englishTitle:'Enterprise Business Systems', description:'ERP, CRM, accounting and financial management systems, alongside reporting, control and process automation.' },
    { key:'infrastructure', number:'06', title:'Infrastructure, DevOps & Reliability', englishTitle:'Infrastructure, DevOps & Reliability', description:'Deployment engineering, CI/CD, system monitoring, service availability, databases, capacity optimisation and operational stability.' },
  ],
};

export const getServices = (locale: Locale) => serviceData[locale];
