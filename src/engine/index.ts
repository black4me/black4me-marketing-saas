// =============================================================
// Engine Index — نقطة الدخول الرئيسية
// يأخذ مدخل العميل ويعيد خطة تسويقية كاملة من 3 وحدات
// =============================================================

import { analyzeInput, type BusinessAnalysis } from './analyzer';
import { generateOffer, type OfferResult } from './offerEngine';
import { generateLanding, type LandingResult } from './landingEngine';
import { generateFunnel, type FunnelResult } from './funnelEngine';

export interface FullPlan {
  input: string;
  analysis: BusinessAnalysis;
  offer: OfferResult;
  landing: LandingResult;
  funnel: FunnelResult;
  generatedAt: string;
}

export function generateMarketingPlan(input: string): FullPlan {
  const analysis = analyzeInput(input);
  const offer = generateOffer(analysis);
  const landing = generateLanding(analysis);
  const funnel = generateFunnel(analysis);

  return {
    input,
    analysis,
    offer,
    landing,
    funnel,
    generatedAt: new Date().toISOString(),
  };
}

export type { BusinessAnalysis, OfferResult, LandingResult, FunnelResult };
export { analyzeInput };