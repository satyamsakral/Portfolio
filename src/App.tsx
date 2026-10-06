import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import OceanFacilityCanvas from './components/OceanFacilityCanvas';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import MarqueeTicker from './components/MarqueeTicker';
import AITwin from './components/AITwin';

import Hero from './sections/Hero';
import About from './sections/About';
import FeaturedStudyAI from './sections/FeaturedStudyAI';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Smooth Scrolling for Butter-Smooth Awwwards Experience
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#01040a] text-slate-200 selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
      {/* Cinematic Loading Sequence */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3D Immersive Deep Ocean AI Research Facility Canvas */}
      <OceanFacilityCanvas />

      {/* Ambient Grid Layer */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 z-[1]" />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Navigation />

        <div className="flex flex-col">
          {/* Hero Section */}
          <Hero />

          {/* High-Energy Technology Marquee Ticker 1 */}
          <MarqueeTicker
            items={[
              'PRODUCTION RAG PIPELINES',
              'GEMINI & LANGCHAIN ARCHITECTURES',
              '768-DIM VECTOR EMBEDDINGS',
              'COMPUTER VISION AT THE EDGE',
              'ULTRA LOW-LATENCY WEBRTC',
            ]}
            speed={28}
            theme="cyan"
          />

          {/* About Section */}
          <About />

          {/* Flagship Case Study: Study AI 2.0 with Interactive RAG Simulator */}
          <FeaturedStudyAI />

          {/* High-Energy Technology Marquee Ticker 2 */}
          <MarqueeTicker
            items={[
              'PROVEN 60% QUERY LATENCY OPTIMIZATION',
              '~81% COMPUTER VISION EDGE PRECISION',
              'FULL-STACK PYTHON & DJANGO & FASTAPI',
              'POST-TRAINING RLHF ALIGNMENT',
            ]}
            speed={24}
            reverse={true}
            theme="purple"
          />

          {/* Projects Section: FaceMask Detector & VividChat */}
          <Projects />

          {/* Interactive Neural Network Skills Graph */}
          <Skills />

          {/* High-Energy Technology Marquee Ticker 3 */}
          <MarqueeTicker
            items={[
              'AVAILABLE FOR HIGH-IMPACT ROLES',
              'OPEN FOR FULL-TIME OPPORTUNITIES',
              'AI & SOFTWARE ENGINEERING',
              'COLLABORATE WORLDWIDE',
            ]}
            speed={30}
            theme="emerald"
          />

          {/* Work Experience Section */}
          <Experience />

          {/* Education & Academic Dossier */}
          <Education />

          {/* Contact Section: Facility Exit */}
          <Contact />
        </div>

        {/* AI Twin Assistant Floating Drone Widget */}
        <AITwin />
      </div>
    </main>
  );
}
