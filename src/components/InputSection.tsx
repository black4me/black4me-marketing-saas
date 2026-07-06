import { useState } from 'react';

const EXAMPLES = [
  { sector: '☕', text: 'لدي متجر قهوة مختصة في الرياض وأريد مضاعفة المبيعات' },
  { sector: '👗', text: 'عندي متجر إلكتروني للعبايات وأريد جذب عملاء جدد' },
  { sector: '💼', text: 'أنا مستشار تسويقي وأريد رفع أعمالي من 5 آلاف إلى 30 ألف شهرياً' },
  { sector: '📚', text: 'عندي دورة أونلاين عن التسويق الرقمي وأبيع 3 فقط شهرياً' },
  { sector: '🏠', text: 'وكيل عقاري في دبي وأريد إغلاق صفقة واحدة على الأقل شهرياً' },
];

interface Props {
  onGenerate: (input: string) => void;
  isGenerating: boolean;
}

export default function InputSection({ onGenerate, isGenerating }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length < 10) return;
    onGenerate(input);
  };

  const useExample = (text: string) => {
    setInput(text);
  };

  return (
    <section id="input" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="badge-red mb-4">🎯 ابدأ الآن</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4 text-balance">
            صف فكرتك بكلمات بسيطة
          </h2>
          <p className="mt-4 text-lg text-b4m-muted text-balance">
            اكتب وصفاً قصيراً عن مشروعك — المنتج، الفكرة، أو الخدمة. النظام يحلل ويولد خطة كاملة خلال ثوانٍ.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="b4m-card p-2 shadow-card-glow">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="مثال: لدي متجر لبيع القهوة المختصة في الرياض وأريد زيادة المبيعات خلال 60 يوم..."
              className="w-full min-h-[140px] bg-b4m-dark border border-b4m-border rounded-xl p-5 text-white placeholder-b4m-muted/60 focus:border-b4m-gold focus:outline-none focus:ring-2 focus:ring-b4m-gold/20 resize-none text-base leading-relaxed"
              disabled={isGenerating}
            />
            <div className="absolute bottom-3 left-3 text-xs text-b4m-muted">
              {input.length} / 500 حرف
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3 px-2">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.slice(0, 3).map((ex, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => useExample(ex.text)}
                  className="text-xs px-3 py-1.5 bg-b4m-dark border border-b4m-border rounded-full text-b4m-muted hover:border-b4m-gold/50 hover:text-white transition"
                  disabled={isGenerating}
                >
                  <span className="ml-1">{ex.sector}</span>
                  {ex.text.slice(0, 30)}...
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={input.trim().length < 10 || isGenerating}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>جاري التوليد...</span>
                </>
              ) : (
                <>
                  <span>ولّد خطتي الآن</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* More examples */}
        <div className="mt-8 text-center">
          <p className="text-b4m-muted text-sm mb-3">أو جرّب هذه الأمثلة:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => useExample(ex.text)}
                disabled={isGenerating}
                className="text-sm px-4 py-2 bg-b4m-card border border-b4m-border rounded-lg text-white hover:border-b4m-gold/50 transition disabled:opacity-50"
              >
                <span className="ml-2 text-lg">{ex.sector}</span>
                <span className="text-b4m-muted">{ex.text.slice(0, 35)}...</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}