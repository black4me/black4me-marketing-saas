import type { BusinessAnalysis, OfferResult } from '../engine';
import CopyButton from './CopyButton';

interface Props {
  offer: OfferResult;
  analysis: BusinessAnalysis;
}

export default function ModuleOffer({ offer, analysis }: Props) {
  const { pricing } = offer;
  const currency = pricing.currency === 'SAR' ? 'ريال' : '$';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="b4m-card bg-card-gradient border-b4m-gold/30">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center text-2xl shadow-gold-glow">
              🎯
            </div>
            <div>
              <div className="text-b4m-gold text-xs font-bold mb-1">الوحدة الأولى</div>
              <h3 className="text-xl font-black text-white">هندسة العرض والتسعير</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Core Offer */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-gold">◆</span> العرض الأساسي
          </h4>
          <CopyButton text={`${offer.coreOffer.name}\n\n${offer.coreOffer.description}\n\n${offer.coreOffer.framing}`} />
        </div>
        <div className="bg-b4m-dark rounded-xl p-5 border border-b4m-gold/20">
          <div className="text-b4m-gold font-bold text-xl mb-3">{offer.coreOffer.name}</div>
          <div className="text-white leading-relaxed mb-3">{offer.coreOffer.description}</div>
          <div className="text-b4m-muted text-sm italic border-r-2 border-b4m-gold/40 pr-3">
            💡 {offer.coreOffer.framing}
          </div>
        </div>
      </div>

      {/* Bonuses */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-gold">◆</span> المكافآت الثلاثة (تراكم القيمة)
          </h4>
          <CopyButton
            text={offer.bonuses.map((b) => `🎁 مكافأة ${b.number}: ${b.name}\nالقيمة: ${b.value}\n${b.description}\nلماذا: ${b.reasoning}`).join('\n\n')}
          />
        </div>
        <div className="space-y-3">
          {offer.bonuses.map((b) => (
            <div key={b.number} className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50 hover:border-b4m-gold/30 transition">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center text-b4m-black font-black">
                  {b.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                    <div className="text-white font-bold">{b.name}</div>
                    <div className="badge-gold">قيمة: {b.value}</div>
                  </div>
                  <div className="text-b4m-muted text-sm leading-relaxed mb-2">{b.description}</div>
                  <div className="text-xs text-b4m-gold/80 italic">💡 {b.reasoning}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantee + Scarcity (side by side on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guarantee */}
        <div className="b4m-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              <span className="text-b4m-green">◆</span> الضمان
            </h4>
            <CopyButton text={`${offer.guarantee.text}\n\n${offer.guarantee.whyItWorks}`} />
          </div>
          <div className="bg-b4m-dark rounded-xl p-5 border border-b4m-green/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-green">{offer.guarantee.type}</span>
              <span className="text-b4m-muted text-xs">لمدة {offer.guarantee.duration}</span>
            </div>
            <div className="text-white leading-relaxed mb-3">"{offer.guarantee.text}"</div>
            <div className="text-xs text-b4m-green/80 italic border-r-2 border-b4m-green/40 pr-3">
              💡 {offer.guarantee.whyItWorks}
            </div>
          </div>
        </div>

        {/* Scarcity */}
        <div className="b4m-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              <span className="text-b4m-red">◆</span> الندرة والاستعجال
            </h4>
            <CopyButton text={offer.scarcity.copy} />
          </div>
          <div className="bg-b4m-dark rounded-xl p-5 border border-red-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-red">{offer.scarcity.type}</span>
              <span className="text-b4m-muted text-xs">{offer.scarcity.mechanism}</span>
            </div>
            <div className="text-white leading-relaxed font-bold">"{offer.scarcity.copy}"</div>
          </div>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-gold">◆</span> باقات التسعير الاستراتيجية
          </h4>
          <CopyButton
            text={offer.pricing.tiers.map((t) => `${t.name} — ${t.price} ${currency}\n${t.description}\nالأفضل لـ: ${t.bestFor}\nيشمل: ${t.includes.join(' • ')}`).join('\n\n---\n\n')}
          />
        </div>

        {/* Value anchor */}
        <div className="bg-card-gradient rounded-xl p-4 mb-6 border border-b4m-gold/30">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-b4m-muted text-xs mb-1">القيمة الإجمالية للعرض</div>
              <div className="text-3xl sm:text-4xl font-black gradient-text">
                {offer.totalValue.toLocaleString()} {currency}
              </div>
            </div>
            <div className="text-right">
              <div className="text-b4m-muted text-xs mb-1">السعر الموصى به</div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                {offer.finalPrice.toLocaleString()} {currency}
              </div>
              <div className="badge-green mt-1">خصم {Math.round((1 - offer.finalPrice / offer.totalValue) * 100)}%</div>
            </div>
          </div>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offer.pricing.tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`relative b4m-card ${
                tier.isRecommended
                  ? 'border-b4m-gold shadow-gold-glow scale-[1.02] bg-card-gradient'
                  : ''
              }`}
            >
              {tier.isRecommended && (
                <div className="absolute -top-3 right-1/2 translate-x-1/2">
                  <span className="badge-gold">⭐ الأكثر طلباً</span>
                </div>
              )}

              <div className="text-center mb-4">
                <div className="text-b4m-muted text-xs font-bold mb-1">{tier.name}</div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {tier.price.toLocaleString()} {currency}
                </div>
                {tier.originalPrice && (
                  <div className="text-b4m-muted text-sm line-through mt-1">
                    بدلاً من {tier.originalPrice.toLocaleString()} {currency}
                  </div>
                )}
              </div>

              <div className="text-b4m-muted text-sm mb-4 text-center leading-relaxed">{tier.description}</div>

              <div className="text-xs text-b4m-gold font-bold mb-2">الأفضل لـ:</div>
              <div className="text-white text-sm mb-4">{tier.bestFor}</div>

              <div className="text-xs text-b4m-gold font-bold mb-2">يشمل:</div>
              <ul className="space-y-1.5">
                {tier.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2 text-sm text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-b4m-gold flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing psychology note */}
        <div className="mt-4 p-4 bg-b4m-dark/60 rounded-xl border border-b4m-purple/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div>
              <div className="text-b4m-purple text-xs font-bold mb-1">ملاحظة سيكولوجية</div>
              <div className="text-white text-sm leading-relaxed">{offer.pricing.psychologyNote}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}