import { useState } from 'react';
import type { FullPlan } from '../engine';
import AnalysisCard from './AnalysisCard';
import ModuleOffer from './ModuleOffer';
import ModuleLanding from './ModuleLanding';
import ModuleFunnel from './ModuleFunnel';

interface Props {
  plan: FullPlan;
  onReset: () => void;
}

type Tab = 'overview' | 'offer' | 'landing' | 'funnel';

export default function Dashboard({ plan, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'التحليل', icon: '📊', count: null },
    { id: 'offer' as const, label: 'هندسة العرض', icon: '🎯', count: null },
    { id: 'landing' as const, label: 'صفحة الهبوط', icon: '📄', count: null },
    { id: 'funnel' as const, label: 'مسار البيع', icon: '🚀', count: null },
  ];

  return (
    <section id="dashboard" className="py-20 sm:py-28 relative bg-b4m-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-green mb-4">✓ تم توليد خطتك</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4 text-balance">
            خطتك التسويقية{' '}
            <span className="gradient-text">جاهزة للتطبيق</span>
          </h2>
          <p className="mt-4 text-lg text-b4m-muted text-balance max-w-3xl mx-auto">
            3 وحدات متكاملة — انسخ، عدّل، وابدأ التنفيذ فوراً.
          </p>
        </div>

        {/* Input recap + reset */}
        <div className="b4m-card mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-b4m-gold/20 border border-b4m-gold/30 rounded-xl flex items-center justify-center text-2xl">
              💡
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-b4m-muted text-xs font-bold mb-1">فكرتك:</div>
              <div className="text-white text-base leading-relaxed break-words">{plan.input}</div>
            </div>
            <button
              onClick={onReset}
              className="flex-shrink-0 text-b4m-muted hover:text-b4m-gold transition text-sm flex items-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span className="hidden sm:inline">ابدأ من جديد</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-b4m-card border border-b4m-border rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition ${
                activeTab === tab.id
                  ? 'bg-gold-gradient text-b4m-black shadow-lg'
                  : 'text-b4m-muted hover:text-white hover:bg-b4m-dark'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <AnalysisCard plan={plan} />}
          {activeTab === 'offer' && <ModuleOffer offer={plan.offer} analysis={plan.analysis} />}
          {activeTab === 'landing' && <ModuleLanding landing={plan.landing} analysis={plan.analysis} />}
          {activeTab === 'funnel' && <ModuleFunnel funnel={plan.funnel} analysis={plan.analysis} />}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 b4m-card bg-card-gradient border-b4m-gold/30 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            جاهز لتحويل هذه الخطة إلى{' '}
            <span className="gradient-text">نتائج حقيقية؟</span>
          </h3>
          <p className="text-b4m-muted mb-6 max-w-2xl mx-auto">
            احجز استشارة 15 دقيقة مع فريق BLACK4ME — نحلل وضعك ونخصص لك خطة تنفيذ خلال 30 يوم.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:black4mestore@gmail.com?subject=استشارة BLACK4ME"
              className="btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>احجز استشارة مجانية</span>
            </a>
            <button onClick={onReset} className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>ولّد خطة جديدة</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}