import { useState } from 'react';
import type { BusinessAnalysis, FunnelResult } from '../engine';
import CopyButton from './CopyButton';

interface Props {
  funnel: FunnelResult;
  analysis: BusinessAnalysis;
}

type FunnelTab = 'social' | 'manychat' | 'email';

export default function ModuleFunnel({ funnel }: Props) {
  const [activeSub, setActiveSub] = useState<FunnelTab>('social');

  const subTabs = [
    { id: 'social' as const, label: 'سكريبت سوشال', icon: '📱' },
    { id: 'manychat' as const, label: 'شجرة ManyChat', icon: '💬' },
    { id: 'email' as const, label: 'سلسلة بريدية', icon: '✉️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="b4m-card bg-card-gradient border-b4m-green/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-b4m-green/20 border border-b4m-green/40 rounded-xl flex items-center justify-center text-2xl">
            🚀
          </div>
          <div>
            <div className="text-b4m-green text-xs font-bold mb-1">الوحدة الثالثة</div>
            <h3 className="text-xl font-black text-white">أتمتة مسارات البيع</h3>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-b4m-card border border-b4m-border rounded-2xl">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSub(tab.id)}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition ${
              activeSub === tab.id
                ? 'bg-b4m-green/20 text-b4m-green border border-b4m-green/40'
                : 'text-b4m-muted hover:text-white hover:bg-b4m-dark'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSub === 'social' && <SocialScriptBlock socialScript={funnel.socialScript} />}
      {activeSub === 'manychat' && <ManyChatBlock manychatFlow={funnel.manychatFlow} />}
      {activeSub === 'email' && <EmailBlock emailSequence={funnel.emailSequence} />}
    </div>
  );
}

function SocialScriptBlock({ socialScript }: { socialScript: FunnelResult['socialScript'] }) {
  const fullScript = `${socialScript.platform} | المدة: ${socialScript.duration}

🎬 الخطاف (أول 3 ثوانٍ):
${socialScript.hook}

📝 الجسم:
${socialScript.body.map((b, i) => `${i + 1}. ${b}`).join('\n')}

🎯 الـ CTA:
${socialScript.cta}

📲 الكابشن:
${socialScript.caption}

🏷️ الهاشتاقات:
${socialScript.hashtags.join(' ')}

📌 النسخ البديلة:
${socialScript.variations.join('\n')}`;

  return (
    <div className="space-y-6">
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-pink">◆</span> سكريبت {socialScript.platform}
          </h4>
          <CopyButton text={fullScript} label="نسخ السكريبت كامل" />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge-pink">{socialScript.platform}</span>
          <span className="text-b4m-muted text-xs bg-b4m-dark px-3 py-1 rounded-full">⏱️ {socialScript.duration}</span>
        </div>

        {/* Hook */}
        <div className="bg-gradient-to-br from-pink-500/10 to-transparent rounded-xl p-5 border border-pink-500/30 mb-4">
          <div className="text-xs text-pink-400 font-bold mb-2">🎬 الخطاف (أول 3 ثوانٍ)</div>
          <div className="text-white text-lg font-bold leading-relaxed">"{socialScript.hook}"</div>
        </div>

        {/* Body */}
        <div className="bg-b4m-dark rounded-xl p-5 border border-b4m-border/50 mb-4">
          <div className="text-xs text-b4m-muted font-bold mb-3">📝 الجسم</div>
          <div className="space-y-2">
            {socialScript.body.map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-b4m-pink/20 text-pink-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </div>
                <div className="text-white leading-relaxed">{line}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent rounded-xl p-5 border border-b4m-green/30 mb-4">
          <div className="text-xs text-b4m-green font-bold mb-2">🎯 الـ CTA</div>
          <div className="text-white text-base font-bold">{socialScript.cta}</div>
        </div>

        {/* Caption + Hashtags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">📲 الكابشن</div>
            <div className="text-white text-sm leading-relaxed">{socialScript.caption}</div>
          </div>
          <div className="bg-b4m-dark rounded-xl p-4 border border-b4m-border/50">
            <div className="text-xs text-b4m-muted font-bold mb-2">🏷️ الهاشتاقات</div>
            <div className="flex flex-wrap gap-1.5">
              {socialScript.hashtags.map((h) => (
                <span key={h} className="text-xs px-2 py-1 bg-b4m-card text-pink-400 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Variations */}
        <div className="bg-b4m-dark rounded-xl p-5 border border-b4m-border/50">
          <div className="text-xs text-b4m-muted font-bold mb-3">📌 نسخ بديلة للاختبار A/B</div>
          <ul className="space-y-2">
            {socialScript.variations.map((v, i) => (
              <li key={i} className="text-white text-sm leading-relaxed flex items-start gap-2">
                <span className="text-b4m-gold flex-shrink-0">▸</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ManyChatBlock({ manychatFlow }: { manychatFlow: FunnelResult['manychatFlow'] }) {
  const flowText = `اسم المسار: ${manychatFlow.name}
الكلمة المفتاحية: ${manychatFlow.triggerKeyword}

${manychatFlow.nodes.map((n) => {
  const typeLabel = { message: 'رسالة', condition: 'شرط', delay: 'انتظار', button: 'زر' }[n.type];
  let text = `[${typeLabel}] ${n.content || ''}`;
  if (n.buttons) text += `\nالأزرار: ${n.buttons.map((b) => `${b.label} → ${b.action}`).join(' | ')}`;
  if (n.delay) text += `\nالانتظار: ${n.delay}`;
  if (n.nextNode) text += `\n→ ${n.nextNode}`;
  return text;
}).join('\n\n')}

النتيجة المتوقعة: ${manychatFlow.expectedOutcome}`;

  return (
    <div className="space-y-6">
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-blue">◆</span> شجرة ManyChat
          </h4>
          <CopyButton text={flowText} label="نسخ الشجرة كاملة" />
        </div>

        {/* Flow header */}
        <div className="bg-card-gradient rounded-xl p-4 border border-b4m-blue/30 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-b4m-muted mb-1">اسم المسار:</div>
              <div className="text-white font-bold text-sm">{manychatFlow.name}</div>
            </div>
            <div>
              <div className="text-xs text-b4m-muted mb-1">الكلمة المفتاحية:</div>
              <div className="flex items-center gap-2">
                <code className="text-b4m-blue font-mono bg-b4m-dark px-3 py-1 rounded">{manychatFlow.triggerKeyword}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Flow nodes */}
        <div className="space-y-3">
          {manychatFlow.nodes.map((node, idx) => (
            <div key={node.id}>
              <div className={`b4m-card ${
                node.type === 'delay' ? 'border-yellow-500/30 bg-yellow-500/5' :
                node.type === 'condition' ? 'border-orange-500/30 bg-orange-500/5' :
                'border-b4m-blue/30'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    node.type === 'delay' ? 'bg-yellow-500/20 text-yellow-400' :
                    node.type === 'condition' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-b4m-blue/20 text-b4m-blue'
                  }`}>
                    {node.type === 'delay' ? '⏱️' : node.type === 'condition' ? '❓' : '💬'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs text-b4m-muted font-mono">Node #{idx + 1} ({node.id})</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        node.type === 'delay' ? 'bg-yellow-500/20 text-yellow-400' :
                        node.type === 'condition' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-b4m-blue/20 text-b4m-blue'
                      }`}>
                        {node.type === 'delay' ? 'انتظار' : node.type === 'condition' ? 'شرط' : 'رسالة'}
                      </span>
                      {node.delay && (
                        <span className="text-xs text-yellow-400">⏱️ {node.delay}</span>
                      )}
                    </div>
                    {node.content && (
                      <div className="text-white text-sm leading-relaxed mb-3 whitespace-pre-wrap">{node.content}</div>
                    )}
                    {node.buttons && (
                      <div className="space-y-1.5">
                        {node.buttons.map((btn, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="px-3 py-1.5 bg-b4m-blue/20 border border-b4m-blue/40 text-b4m-blue rounded-lg text-xs font-bold">
                              [{btn.label}]
                            </span>
                            <span className="text-b4m-muted text-xs">→ {btn.action}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow to next */}
              {node.nextNode && idx < manychatFlow.nodes.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="text-b4m-muted text-2xl">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expected outcome */}
        <div className="mt-6 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl p-4 border border-b4m-green/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="text-b4m-green text-xs font-bold mb-1">النتيجة المتوقعة</div>
              <div className="text-white text-sm leading-relaxed">{manychatFlow.expectedOutcome}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailBlock({ emailSequence }: { emailSequence: FunnelResult['emailSequence'] }) {
  const fullSequence = emailSequence.map((e) => `
اليوم ${e.day}
الموضوع: ${e.subject}
Preheader: ${e.preheader}
الهدف: ${e.goal}

${e.body}

CTA: ${e.cta}
`).join('\n---\n');

  return (
    <div className="space-y-6">
      <div className="b4m-card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-b4m-purple">◆</span> سلسلة بريدية ({emailSequence.length} رسائل)
          </h4>
          <CopyButton text={fullSequence} label="نسخ السلسلة كاملة" />
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {emailSequence.map((email) => (
            <div key={email.day} className="bg-b4m-dark rounded-xl border border-b4m-border/50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-b4m-border/50 bg-b4m-card/40 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-b4m-purple/20 border border-b4m-purple/40 rounded-lg flex items-center justify-center text-b4m-purple font-black text-sm">
                    D{email.day}
                  </div>
                  <div>
                    <div className="text-xs text-b4m-muted">اليوم {email.day}</div>
                    <div className="text-xs text-b4m-purple">{email.goal}</div>
                  </div>
                </div>
                <CopyButton text={`الموضوع: ${email.subject}\n\n${email.body}\n\nCTA: ${email.cta}`} />
              </div>

              {/* Subject + preheader */}
              <div className="p-4 border-b border-b4m-border/50">
                <div className="text-xs text-b4m-muted mb-1">الموضوع:</div>
                <div className="text-white font-bold text-sm mb-2">{email.subject}</div>
                <div className="text-xs text-b4m-muted mb-1">Preheader:</div>
                <div className="text-b4m-muted text-xs">{email.preheader}</div>
              </div>

              {/* Body preview */}
              <div className="p-4 bg-b4m-black/40">
                <pre className="text-white text-sm leading-relaxed whitespace-pre-wrap font-arabic">{email.body}</pre>
              </div>

              {/* CTA */}
              <div className="p-4 border-t border-b4m-border/50 bg-b4m-card/30">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-b4m-muted">زر CTA:</div>
                  <button className="px-4 py-2 bg-gold-gradient text-b4m-black text-xs font-bold rounded-lg">
                    {email.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}