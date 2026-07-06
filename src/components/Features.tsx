const FEATURES = [
  {
    icon: '🎯',
    title: 'هندسة العرض والتسعير',
    subtitle: 'الوحدة الأولى',
    color: 'gold',
    desc: 'يحول خدمتك العادية إلى عرض لا يمكن مقارنته — مع 3 مكافآت، ضمان قوي، و3 باقات تسعير.',
    bullets: ['عرض لا يقاوم', '3 مكافآت مقترحة', 'ضمان يكسر المخاطرة', '3 باقات تسعير', 'آلية ندرة واستعجال'],
  },
  {
    icon: '📄',
    title: 'مولّد صفحات الهبوط',
    subtitle: 'الوحدة الثانية',
    color: 'purple',
    desc: 'يولد هيكل صفحة هبوط كامل + نصوص بيعية قوية + SEO متوافق مع محركات البحث.',
    bullets: ['هيكل الصفحة (8 أقسام)', '3 عناوين مغناطيسية', 'قسم ألم وحل', 'ألوان CTA مدروسة', 'SEO كامل'],
  },
  {
    icon: '🚀',
    title: 'أتمتة مسارات البيع',
    subtitle: 'الوحدة الثالثة',
    color: 'green',
    desc: 'يولّد سكريبتات سوشال ميديا + شجرة ManyChat كاملة + سلسلة بريدية 7 رسائل.',
    bullets: ['سكريبت Reels / TikTok', 'شجرة ManyChat', 'سلسلة بريدية 7 رسائل', 'CTA لكل رسالة', 'قابل للتعديل والنسخ'],
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; badge: string }> = {
  gold: { text: 'text-b4m-gold', bg: 'bg-b4m-gold/10', border: 'border-b4m-gold/30', badge: 'badge-gold' },
  purple: { text: 'text-b4m-purple', bg: 'bg-b4m-purple/10', border: 'border-b4m-purple/30', badge: 'badge-purple' },
  green: { text: 'text-b4m-green', bg: 'bg-b4m-green/10', border: 'border-b4m-green/30', badge: 'badge-green' },
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-gold mb-4">⚡ 3 وحدات متكاملة</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4 text-balance">
            كل ما تحتاجه لبناء{' '}
            <span className="gradient-text">عرض لا يقاوم</span>
            {' '}في ثوانٍ
          </h2>
          <p className="mt-4 text-lg text-b4m-muted text-balance">
            مبني على منهجية كتاب "بدون تسويق كارثة" — معادلة القيمة + سيكولوجية التسعير + استراتيجيات الندرة + محرك المبيعات الآلي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const c = colorMap[f.color];
            return (
              <div key={f.title} className={`b4m-card b4m-card-hover relative overflow-hidden`}>
                {/* Background gradient blob */}
                <div className={`absolute -top-12 -left-12 w-48 h-48 ${c.bg} rounded-full blur-3xl pointer-events-none`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${c.bg} ${c.border} border rounded-2xl flex items-center justify-center text-3xl`}>
                      {f.icon}
                    </div>
                    <span className={c.badge}>{f.subtitle}</span>
                  </div>

                  <h3 className={`text-2xl font-black text-white mb-3`}>{f.title}</h3>
                  <p className="text-b4m-muted leading-relaxed mb-6">{f.desc}</p>

                  <ul className="space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={c.text}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom value props */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '< 3 ثوانٍ', label: 'وقت التوليد' },
            { value: '10+ قطاعات', label: 'مدعومة' },
            { value: '100% عربي', label: 'لغة وثقافة' },
            { value: 'مجاني', label: 'للنسخة الحالية' },
          ].map((stat) => (
            <div key={stat.label} className="b4m-card text-center py-6">
              <div className="text-2xl sm:text-3xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-b4m-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}