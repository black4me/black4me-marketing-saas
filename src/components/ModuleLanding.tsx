import type { BusinessAnalysis, LandingResult } from '../engine';
import CopyButton from './CopyButton';

interface Props {
  landing: LandingResult;
  analysis: BusinessAnalysis;
}

export default function ModuleLanding({ landing }: Props) {
  const { seo } = landing;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="b4m-card bg-card-gradient border-b4m-purple/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-gradient rounded-xl flex items-center justify-center text-2xl">
            📄
          </div>
          <div>
            <div className="text-b4m-purple text-xs font-bold mb-1">الوحدة الثانية</div>
            <h3 className="text-xl font-black text-white">مولّد صفحات الهبوط</h3>
          </div>
        </div>
      </div>

      {/* Wireframe */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-purple">◆</span> هيكل الصفحة (Wireframe) — 8 أقسام
          </h4>
          <CopyButton
            text={landing.wireframe.map((s) => `${s.icon} ${s.section}\nالهدف: ${s.purpose}\nالعناصر: ${s.elements.join(' • ')}`).join('\n\n---\n\n')}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {landing.wireframe.map((section, idx) => (
            <div key={section.section} className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50 hover:border-b4m-purple/30 transition">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-gradient rounded-lg flex items-center justify-center text-xl">
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-b4m-purple font-bold">القسم {idx + 1}</span>
                  </div>
                  <div className="text-white font-bold text-sm mb-1">{section.section}</div>
                  <div className="text-b4m-muted text-xs leading-relaxed mb-2">{section.purpose}</div>
                  <div className="flex flex-wrap gap-1">
                    {section.elements.map((el) => (
                      <span key={el} className="text-xs px-2 py-0.5 bg-b4m-card rounded text-b4m-muted">
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Headlines */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-purple">◆</span> عناوين مغناطيسية (3 خيارات)
          </h4>
          <CopyButton text={landing.headlines.map((h) => `${h.variant}:\n${h.text}\n— ${h.whyItWorks}`).join('\n\n')} />
        </div>
        <div className="space-y-3">
          {landing.headlines.map((h, idx) => (
            <div key={h.variant} className="bg-b4m-dark rounded-xl p-5 border border-b4m-border/50 hover:border-b4m-purple/30 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-purple">الخيار {idx + 1}</span>
                <span className="text-b4m-muted text-xs font-bold">{h.variant}</span>
              </div>
              <div className="text-white text-lg sm:text-xl font-black leading-relaxed mb-2 text-balance">
                "{h.text}"
              </div>
              <div className="text-xs text-b4m-purple/80 italic">💡 {h.whyItWorks}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pain & Solution */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-red">◆</span> قسم الألم والحل
          </h4>
          <CopyButton
            text={`${landing.painSolution.painHeadline}\n\n${landing.painSolution.painPoints.join('\n')}\n\n— ${landing.painSolution.transition} —\n\n${landing.painSolution.solutionHeadline}\n\n${landing.painSolution.solutionPoints.join('\n')}`}
          />
        </div>

        {/* Pain */}
        <div className="bg-gradient-to-br from-red-500/10 to-transparent rounded-xl p-5 border border-red-500/30 mb-4">
          <div className="text-xs text-red-400 font-bold mb-2">😰 الألم</div>
          <div className="text-white text-lg font-bold mb-3">{landing.painSolution.painHeadline}</div>
          <ul className="space-y-2">
            {landing.painSolution.painPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-white text-sm leading-relaxed">
                <span className="text-red-400 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transition */}
        <div className="text-center py-3">
          <div className="inline-block px-4 py-2 bg-b4m-card rounded-full text-b4m-gold text-sm font-bold italic border border-b4m-gold/30">
            — {landing.painSolution.transition} —
          </div>
        </div>

        {/* Solution */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent rounded-xl p-5 border border-b4m-green/30">
          <div className="text-xs text-b4m-green font-bold mb-2">✨ الحل</div>
          <div className="text-white text-lg font-bold mb-3">{landing.painSolution.solutionHeadline}</div>
          <ul className="space-y-2">
            {landing.painSolution.solutionPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-white text-sm leading-relaxed">
                <span className="text-b4m-green flex-shrink-0">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-gold">◆</span> أزرار الـ CTA والألوان
          </h4>
          <CopyButton text={`CTA رئيسي: "${landing.cta.primary.text}" — اللون: ${landing.cta.primary.color}\n— ${landing.cta.primary.reasoning}\n\nCTA ثانوي: "${landing.cta.secondary.text}" — اللون: ${landing.cta.secondary.color}\n— ${landing.cta.secondary.reasoning}`} />
        </div>

        {/* CTA Buttons preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-b4m-dark rounded-xl p-5 border border-b4m-border/50 text-center">
            <div className="text-b4m-muted text-xs mb-3">الزر الرئيسي</div>
            <button
              className="w-full px-6 py-4 rounded-xl font-bold text-white text-base shadow-lg"
              style={{ backgroundColor: landing.cta.primary.color }}
            >
              {landing.cta.primary.text}
            </button>
            <div className="text-xs text-b4m-muted mt-3 italic">{landing.cta.primary.reasoning}</div>
          </div>
          <div className="bg-b4m-dark rounded-xl p-5 border border-b4m-border/50 text-center">
            <div className="text-b4m-muted text-xs mb-3">الزر الثانوي</div>
            <button
              className="w-full px-6 py-4 rounded-xl font-bold text-white text-base shadow-lg"
              style={{ backgroundColor: landing.cta.secondary.color }}
            >
              {landing.cta.secondary.text}
            </button>
            <div className="text-xs text-b4m-muted mt-3 italic">{landing.cta.secondary.reasoning}</div>
          </div>
        </div>

        {/* Color psychology */}
        <div className="space-y-2">
          <div className="text-xs text-b4m-muted font-bold mb-2">سيكولوجية الألوان:</div>
          {landing.cta.colors.map((c) => (
            <div key={c.hex} className="flex items-center gap-3 p-3 bg-b4m-dark rounded-lg border border-b4m-border/50">
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-sm">{c.name}</span>
                  <span className="text-b4m-muted text-xs font-mono">{c.hex}</span>
                </div>
                <div className="text-b4m-muted text-xs leading-relaxed">{c.psychology}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-blue">◆</span> SEO كامل — جاهز للنسخ
          </h4>
          <CopyButton
            text={`Title Tag:\n${seo.titleTag}\n\nMeta Description:\n${seo.metaDescription}\n\nH1:\n${seo.h1}\n\nH2:\n${seo.h2List.join('\n')}\n\nKeywords:\n${seo.keywords.join(', ')}\n\nOG Title:\n${seo.ogTitle}\n\nOG Description:\n${seo.ogDescription}`}
          />
        </div>

        <div className="space-y-3">
          {/* SERP Preview */}
          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">معاينة في Google:</div>
            <div className="bg-white rounded-lg p-3 text-black">
              <div className="text-xs text-blue-600 truncate">{seo.titleTag}</div>
              <div className="text-xs text-green-700 mt-0.5">https://black4me.ai › landing</div>
              <div className="text-xs text-gray-700 mt-1 leading-relaxed">{seo.metaDescription}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">Title Tag:</div>
            <div className="text-white text-sm font-mono">{seo.titleTag}</div>
          </div>

          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">Meta Description:</div>
            <div className="text-white text-sm leading-relaxed">{seo.metaDescription}</div>
          </div>

          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">H1:</div>
            <div className="text-white text-base font-bold">{seo.h1}</div>
          </div>

          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">H2 المقترحة ({seo.h2List.length}):</div>
            <ol className="space-y-1.5">
              {seo.h2List.map((h, i) => (
                <li key={i} className="text-white text-sm">
                  <span className="text-b4m-blue font-bold ml-2">{i + 1}.</span>
                  {h}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">الكلمات المفتاحية:</div>
            <div className="flex flex-wrap gap-2">
              {seo.keywords.map((k) => (
                <span key={k} className="text-xs px-3 py-1 bg-b4m-card border border-b4m-blue/30 rounded-full text-b4m-blue">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}