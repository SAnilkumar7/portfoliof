import { useEffect, useState } from 'react';
import NeuralBackground from './components/NeuralBackground';
import BootSequence from './components/BootSequence';
import HudFrame from './components/HudFrame';
import Hub, { type ModuleId } from './components/Hub';
import CommandPalette from './components/CommandPalette';
import ProjectsModule from './components/modules/ProjectsModule';
import ExperienceModule from './components/modules/ExperienceModule';
import SkillsModule from './components/modules/SkillsModule';
import ReviewsModule from './components/modules/ReviewsModule';
import AssistantModule from './components/modules/AssistantModule';
import ContactModule from './components/modules/ContactModule';
import OverrideModule from './components/modules/OverrideModule';
import Footer from './components/Footer';

function App() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState<ModuleId | null>(null);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const open = (id: ModuleId) => setActive(id);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />

      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <HudFrame
            onOpenPalette={() => setPalette(true)}
            onOpenAssistant={() => setActive('assistant')}
          />

          <main className="relative z-10">
            <Hub onOpen={open} />
            <Footer onOpen={open} />  
          </main>

          {active === 'projects' && <ProjectsModule onClose={() => setActive(null)} />}
          {active === 'experience' && <ExperienceModule onClose={() => setActive(null)} />}
          {active === 'skills' && <SkillsModule onClose={() => setActive(null)} />}
          {active === 'reviews' && <ReviewsModule onClose={() => setActive(null)} />}
          {active === 'assistant' && <AssistantModule onClose={() => setActive(null)} />}
          {active === 'contact' && <ContactModule onClose={() => setActive(null)} />}
          {active === 'override' && <OverrideModule onClose={() => setActive(null)} />}

          {palette && (
            <CommandPalette
              onClose={() => setPalette(false)}
              onOpen={(id) => setActive(id)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
