import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Footer from './components/Footer';
import type { FullPlan } from './engine';

export default function App() {
  const [plan, setPlan] = useState<FullPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (input: string) => {
    setIsGenerating(true);
    // Simulate processing for UX (the actual engine is sync but instant feels too abrupt)
    await new Promise((r) => setTimeout(r, 800));
    // Dynamic import the engine so the initial bundle is smaller
    const { generateMarketingPlan } = await import('./engine');
    const result = generateMarketingPlan(input);
    setPlan(result);
    setIsGenerating(false);
    // Scroll to dashboard
    setTimeout(() => {
      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setPlan(null);
    setTimeout(() => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-b4m-black">
      <Header />
      <main>
        <Hero />
        <Features />
        <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />
        {plan && <Dashboard plan={plan} onReset={handleReset} />}
      </main>
      <Footer />
    </div>
  );
}