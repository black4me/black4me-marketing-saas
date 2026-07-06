export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-b4m-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-b4m-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top urgency bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-gradient rounded-full text-white text-sm font-bold shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>إصدار بيتا — مجاني للأول 100 عميل</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight text-balance">
            حوّل فكرتك إلى{' '}
            <span className="gradient-text">خطة تسويقية كاملة</span>
            {' '}في ثوانٍ
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-lg sm:text-xl text-b4m-muted leading-relaxed max-w-3xl mx-auto text-balance">
            مدير تسويق استراتيجي آلي مدعوم بمنهجية كتاب{' '}
            <span className="text-white font-semibold">"بدون تسويق كارثة تهدد ثروتك المستقبلية"</span>.
            يكتب لك العرض المغناطيسي، صفحة الهبوط، ومسار البيع — جاهز للنسخ واللصق.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#input" className="btn-primary text-base px-8 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>جرّب النظام مجاناً</span>
            </a>
            <a href="#features" className="btn-secondary text-base px-8 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              <span>شاهد كيف يعمل</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-b4m-muted">
            <div className="flex items-center gap-2">
              <span className="text-b4m-gold">⚡</span>
              <span>نتيجة فورية — بدون انتظار</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-b4m-gold">📋</span>
              <span>جاهز للنسخ واللصق</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-b4m-gold">🎯</span>
              <span>أي قطاع، أي مشروع</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-b4m-gold">🇸🇦</span>
              <span>عربي 100%</span>
            </div>
          </div>
        </div>

        {/* Mockup preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative b4m-card p-2 shadow-card-glow">
            <div className="bg-b4m-dark rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-b4m-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center text-xs text-b4m-muted font-mono">black4me.ai/tool</div>
              </div>
              <div className="p-6 sm:p-8 bg-gradient-to-br from-b4m-black to-b4m-dark">
                <div className="text-b4m-muted text-sm mb-3">📝 أدخل فكرتك:</div>
                <div className="bg-b4m-card border border-b4m-border rounded-lg p-4 text-white text-base">
                  "لدي متجر لبيع القهوة المختصة في الرياض وأريد مضاعفة المبيعات خلال 60 يوم"
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge-gold">✓ تحليل فوري</span>
                  <span className="badge-purple">✓ 3 وحدات</span>
                  <span className="badge-green">✓ جاهز للنسخ</span>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-b4m-card border border-b4m-gold/30 rounded-lg p-3">
                    <div className="text-b4m-gold text-xs font-bold mb-1">الوحدة 1</div>
                    <div className="text-white text-sm font-semibold">هندسة العرض</div>
                  </div>
                  <div className="bg-b4m-card border border-b4m-purple/30 rounded-lg p-3">
                    <div className="text-b4m-purple text-xs font-bold mb-1">الوحدة 2</div>
                    <div className="text-white text-sm font-semibold">صفحة الهبوط</div>
                  </div>
                  <div className="bg-b4m-card border border-b4m-green/30 rounded-lg p-3">
                    <div className="text-b4m-green text-xs font-bold mb-1">الوحدة 3</div>
                    <div className="text-white text-sm font-semibold">مسار البيع</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}