import Navigation from './components/Navigation';
import NeuralCanvas from './components/NeuralCanvas';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import AITwin from './components/AITwin';
import CustomCursor from './components/CustomCursor';
import MarqueeTicker from './components/MarqueeTicker';

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3D Atmospheric Neural Mesh Canvas */}
      <NeuralCanvas />

      {/* Ambient Grid Background Layer */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-[1]" />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Navigation />

        <div className="flex flex-col">
          <Hero />

          {/* High Energy Marquee Ticker 1 */}
          <MarqueeTicker
            items={[
              'PRODUCTION RAG PIPELINES',
              'GEMINI & LANGCHAIN ARCHITECTURES',
              'COMPUTER VISION AT THE EDGE',
              'DISTRIBUTED BACKEND SYSTEMS',
              'ULTRA LOW-LATENCY WEBRTC',
            ]}
            speed={30}
            theme="cyan"
          />

          <Journey />

          {/* High Energy Marquee Ticker 2 */}
          <MarqueeTicker
            items={[
              'PROVEN 60% QUERY LATENCY OPTIMIZATION',
              '~81% COMPUTER VISION F1 PRECISION',
              'FULL STACK PYTHON & DJANGO & REACT',
              'DEEP LEARNING MODEL TRAINING',
            ]}
            speed={25}
            reverse={true}
            theme="purple"
          />

          <Projects />

          {/* High Energy Marquee Ticker 3 */}
          <MarqueeTicker
            items={[
              'AVAILABLE FOR HIGH-IMPACT ROLES',
              'OPEN FOR FULL-TIME OPPORTUNITIES',
              'AI & SOFTWARE ENGINEERING',
              'COLLABORATE WORLDWIDE',
            ]}
            speed={35}
            theme="emerald"
          />

          <Contact />
        </div>

        {/* AI Twin Floating Assistant Widget */}
        <AITwin />
      </div>
    </main>
  );
}
