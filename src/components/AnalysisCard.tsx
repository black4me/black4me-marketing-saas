import type { FullPlan } from '../engine';

interface Props {
  plan: FullPlan;
}

export default function AnalysisCard({ plan }: Props) {
  const { analysis } = plan;

  const stats = [
    { label: 'نوع النشاط', value: analysis.sectorLabel, icon: '🏢' },
    { label: 'الجمهور المستهدف', value: analysis.audienceLabel, icon: '👥' },
    { label: 'الهدف التسويقي', value: analysis.goalLabel, icon: '🎯' },
    { label: 'مستوى السعر', value: analysis.priceLabel, icon: '💰' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="b4m-card">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-b4m-muted text-xs mb-1">{s.label}</div>
            <div className="text-white font-bold text-base">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Dream outcome */}
      <div className="b4m-card bg-card-gradient border-b4m-gold/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center text-2xl shadow-gold-glow">
            ✨
          </div>
          <div className="flex-1">
            <div className="text-b4m-gold text-xs font-bold mb-2">النتيجة الحلم المقترحة لقطاعك</div>
            <div className="text-white text-lg sm:text-xl font-bold leading-relaxed text-balance">
              {analysis.dreamOutcome}
            </div>
          </div>
        </div>
      </div>

      {/* Pain points */}
      <div className="b4m-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-gradient rounded-xl flex items-center justify-center text-xl">
            😰
          </div>
          <h3 className="text-xl font-black text-white">نقاط الألم المكتشفة</h3>
        </div>
        <ul className="space-y-3">
          {analysis.painPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </div>
              <span className="text-white leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Methodology note */}
      <div className="b4m-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-gradient rounded-xl flex items-center justify-center text-xl">
            📐
          </div>
          <h3 className="text-xl font-black text-white">المنهجية المطبقة</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-b4m-dark/60 rounded-xl border border-b4m-border/50">
            <div className="text-b4m-purple text-xs font-bold mb-2">📖 من الفصل الأول</div>
            <div className="text-white font-bold mb-1">فخ السلعة العادية</div>
            <div className="text-b4m-muted text-sm">نحلل عرضك الحالي ونحوّله من سلعة عادية إلى عرض لا يمكن مقارنته.</div>
          </div>
          <div className="p-4 bg-b4m-dark/60 rounded-xl border border-b4m-border/50">
            <div className="text-b4m-gold text-xs font-bold mb-2">📖 من معادلة القيمة</div>
            <div className="text-white font-bold mb-1">معادلة القيمة الـ 4-عوامل</div>
            <div className="text-b4m-muted text-sm">نطبّق: (النتيجة الحلم × الاحتمالية) ÷ (الوقت × الجهد) على عرضك.</div>
          </div>
          <div className="p-4 bg-b4m-dark/60 rounded-xl border border-b4m-border/50">
            <div className="text-b4m-green text-xs font-bold mb-2">📖 من سيكولوجية التسعير</div>
            <div className="text-white font-bold mb-1">3 باقات + تأثير المرساة</div>
            <div className="text-b4m-muted text-sm">نصمم 3 باقات سعرية بحيث يختار 70% الباقة الوسطى.</div>
          </div>
          <div className="p-4 bg-b4m-dark/60 rounded-xl border border-b4m-border/50">
            <div className="text-b4m-blue text-xs font-bold mb-2">📖 من الحشود الجائعة</div>
            <div className="text-white font-bold mb-1">استهداف الحشد الجائع</div>
            <div className="text-b4m-muted text-sm">نحدّد الجمهور الأكثر جاهزية للشراء ونكتب له مباشرة.</div>
          </div>
        </div>
      </div>
    </div>
  );
}