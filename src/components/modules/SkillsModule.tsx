// components/SkillsModule.tsx

import { useMemo, useState } from 'react';
import { skills, type Skill } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import {
  Network,
  Code2,
  BrainCircuit,
  Server,
  Cloud,
  Database,
  Wrench,
  Layers,
  ChevronRight,
  Activity,
} from 'lucide-react';

const catColor: Record<string, string> = {
  Languages: '#00e5ff',
  Frontend: '#00ffa1',
  Backend: '#ffb300',
  'AI / ML': '#ff2d9b',
  'Generative AI': '#a78bfa',
  'Cloud & DevOps': '#60a5fa',
  Databases: '#22d3ee',
  Tools: '#f472b6',
};

const catIcon: Record<string, React.ElementType> = {
  Languages: Code2,
  Frontend: Layers,
  Backend: Server,
  'AI / ML': BrainCircuit,
  'Generative AI': BrainCircuit,
  'Cloud & DevOps': Cloud,
  Databases: Database,
  Tools: Wrench,
};

const categoryOrder = [
  'Languages',
  'Frontend',
  'Backend',
  'AI / ML',
  'Generative AI',
  'Cloud & DevOps',
  'Databases',
  'Tools',
];

const VIEWBOX = 500;
const CENTER = VIEWBOX / 2;

type GraphNode = {
  name: string;
  x: number;
  y: number;
  r: number;
  color: string;
  level: number;
  category: string;
};

type GraphLink = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

export default function SkillsModule({
  onClose,
}: {
  onClose: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('Languages');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const availableCategories = useMemo(() => {
    const existing = new Set(skills.map((s) => s.category));

    return categoryOrder.filter((category) => existing.has(category));
  }, []);

  const graph = useMemo(
    () => buildGraph(skills, activeCategory),
    [activeCategory]
  );

  const activeSkills = useMemo(
    () => skills.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const currentColor = catColor[activeCategory] || '#00e5ff';
  const CurrentIcon = catIcon[activeCategory] || Network;

  return (
    <ModuleShell
      title="Skills"
      codename="LIVING NEURAL NETWORK"
      accent="amber"
      onClose={onClose}
    >
      <div className="space-y-5">

        {/* ================= HEADER ================= */}
        <div className="glass rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-cyan-400" />

                <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400/60">
                  SYSTEM CAPABILITY MATRIX
                </span>
              </div>

              <h2 className="font-mono text-lg text-cyan-100">
                FULL STACK <span className="text-fuchsia-400">AI</span>
              </h2>

              <p className="font-mono text-[10px] text-cyan-200/40 mt-1">
                Interactive technology topology // skills indexed from resume
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono text-[9px] text-cyan-200/40">
                  SKILLS INDEXED
                </div>

                <div className="font-mono text-lg text-cyan-300">
                  {skills.length.toString().padStart(2, '0')}
                </div>
              </div>

              <div className="h-8 w-px bg-cyan-400/10" />

              <div className="text-right">
                <div className="font-mono text-[9px] text-cyan-200/40">
                  DOMAINS
                </div>

                <div className="font-mono text-lg text-fuchsia-300">
                  {availableCategories.length.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CATEGORY SELECTOR ================= */}
        <div className="glass rounded-xl p-3">
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => {
              const Icon = catIcon[category] || Network;
              const color = catColor[category] || '#00e5ff';
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedSkill(null);
                  }}
                  className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300"
                  style={{
                    borderColor: active ? `${color}80` : `${color}20`,
                    background: active ? `${color}12` : 'transparent',
                    boxShadow: active
                      ? `0 0 18px ${color}18`
                      : 'none',
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color }}
                  />

                  <span
                    className="font-mono text-[10px]"
                    style={{
                      color: active
                        ? color
                        : 'rgba(165, 243, 252, 0.55)',
                    }}
                  >
                    {category}
                  </span>

                  <span
                    className="font-mono text-[8px] opacity-50"
                    style={{ color }}
                  >
                    {skills.filter((s) => s.category === category).length}
                  </span>

                  {active && (
                    <span
                      className="absolute left-2 right-2 -bottom-[1px] h-px"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= MAIN AREA ================= */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5">

          {/* ================= NEURAL GRAPH ================= */}
          <div className="relative glass rounded-xl overflow-hidden min-h-[500px]">

            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* scanline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />

            <svg
              viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
              className="relative w-full h-full min-h-[500px]"
            >
              {/* outer rings */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r="185"
                fill="none"
                stroke="#00e5ff"
                strokeOpacity="0.05"
                strokeWidth="1"
                strokeDasharray="3 8"
              />

              <circle
                cx={CENTER}
                cy={CENTER}
                r="125"
                fill="none"
                stroke="#00e5ff"
                strokeOpacity="0.05"
                strokeWidth="1"
              />

              {/* category-to-core links */}
              {graph.links.map((link, index) => (
                <line
                  key={`link-${index}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={link.color}
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                  className="animate-dash"
                />
              ))}

              {/* center core - DYNAMIC based on active category */}
              <g>
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r="44"
                  fill="#020812"
                  stroke={currentColor}
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />

                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r="32"
                  fill={currentColor}
                  fillOpacity="0.06"
                  stroke={currentColor}
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                >
                  <animate
                    attributeName="r"
                    values="32;36;32"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Category Icon */}
                <foreignObject
                  x={CENTER - 18}
                  y={CENTER - 22}
                  width="36"
                  height="36"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <CurrentIcon
                      className="w-5 h-5"
                      style={{ color: currentColor }}
                    />
                  </div>
                </foreignObject>

                {/* Category Name - Top */}
                <text
                  x={CENTER}
                  y={CENTER + 28}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  fill={currentColor}
                  fontWeight="bold"
                  letterSpacing="0.1em"
                  opacity="0.9"
                >
                  {activeCategory.toUpperCase()}
                </text>

                {/* Subtitle */}
                <text
                  x={CENTER}
                  y={CENTER + 40}
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="JetBrains Mono, monospace"
                  fill={currentColor}
                  opacity="0.35"
                  letterSpacing="0.15em"
                >
                  {activeSkills.length} SKILLS
                </text>

                {/* Inner glow pulse */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r="18"
                  fill="none"
                  stroke={currentColor}
                  strokeOpacity="0.1"
                  strokeWidth="0.5"
                >
                  <animate
                    attributeName="r"
                    values="18;24;18"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.1;0.3;0.1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* skill nodes */}
              {graph.nodes.map((node) => {
                const selected =
                  selectedSkill?.name === node.name;

                // Don't render the center category node as a separate node
                if (node.name === activeCategory) return null;

                return (
                  <g
                    key={node.name}
                    className="cursor-pointer"
                    onClick={() => {
                      const skill = skills.find(
                        (s) => s.name === node.name
                      );

                      if (skill) {
                        setSelectedSkill(skill);
                      }
                    }}
                  >
                    {/* glow */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r * 2.2}
                      fill={node.color}
                      fillOpacity={selected ? 0.12 : 0.04}
                    />

                    {/* node */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={selected ? node.r * 1.25 : node.r}
                      fill="#030912"
                      stroke={node.color}
                      strokeOpacity={selected ? 1 : 0.65}
                      strokeWidth={selected ? 2 : 1.2}
                    />

                    {/* inner point */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="2"
                      fill={node.color}
                    />

                    {/* label background */}
                    <rect
                      x={
                        node.x -
                        Math.max(node.name.length * 3.4, 25)
                      }
                      y={node.y + node.r + 7}
                      width={
                        Math.max(node.name.length * 6.8, 50)
                      }
                      height="16"
                      rx="4"
                      fill="#030912"
                      fillOpacity="0.92"
                      stroke={node.color}
                      strokeOpacity="0.08"
                    />

                    <text
                      x={node.x}
                      y={node.y + node.r + 18}
                      textAnchor="middle"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fill={node.color}
                      fillOpacity="0.9"
                    >
                      {node.name}
                    </text>

                    {/* level */}
                    <text
                      x={node.x}
                      y={node.y - node.r - 7}
                      textAnchor="middle"
                      fontSize="7"
                      fontFamily="JetBrains Mono, monospace"
                      fill="#a5f3fc"
                      fillOpacity="0.45"
                    >
                      {node.level}%
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* graph label */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-cyan-400" />

              <span className="font-mono text-[9px] tracking-widest text-cyan-200/40">
                NEURAL TOPOLOGY
              </span>
            </div>

            <div className="absolute bottom-3 left-3 font-mono text-[8px] text-cyan-200/30">
              CLICK NODE TO INSPECT
            </div>
          </div>

          {/* ================= SKILL PANEL ================= */}
          <div className="glass rounded-xl p-4">

            {/* selected skill */}
            {selectedSkill ? (
              <div
                className="mb-5 p-4 rounded-xl border"
                style={{
                  borderColor: `${catColor[selectedSkill.category]}30`,
                  background: `${catColor[selectedSkill.category]}06`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[9px] text-cyan-200/35 tracking-widest">
                      SELECTED TECHNOLOGY
                    </div>

                    <div
                      className="font-mono text-xl mt-1"
                      style={{
                        color:
                          catColor[selectedSkill.category],
                      }}
                    >
                      {selectedSkill.name}
                    </div>

                    <div className="font-mono text-[9px] text-cyan-200/40 mt-1">
                      {selectedSkill.category}
                    </div>
                  </div>

                  <div
                    className="font-mono text-2xl"
                    style={{
                      color:
                        catColor[selectedSkill.category],
                    }}
                  >
                    {selectedSkill.level}%
                  </div>
                </div>

                <div className="mt-4 h-1.5 rounded-full bg-cyan-500/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${selectedSkill.level}%`,
                      background: catColor[
                        selectedSkill.category
                      ],
                      boxShadow: `0 0 12px ${
                        catColor[selectedSkill.category]
                      }`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-5 p-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.02]">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-cyan-400/60" />

                  <div>
                    <div className="font-mono text-[9px] text-cyan-200/35 tracking-widest">
                      ACTIVE DOMAIN
                    </div>

                    <div className="font-mono text-lg text-cyan-100">
                      {activeCategory}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* skills title */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-mono text-[9px] text-cyan-200/35 tracking-widest">
                  CAPABILITY LEVEL
                </div>

                <div className="font-mono text-sm text-cyan-100 mt-1">
                  {activeCategory}
                </div>
              </div>

              <div className="font-mono text-[9px] text-cyan-200/35">
                {activeSkills.length} SKILLS
              </div>
            </div>

            {/* skill bars */}
            <div className="space-y-3 max-h-[390px] overflow-y-auto no-scrollbar pr-1">
              {activeSkills
                .slice()
                .sort((a, b) => b.level - a.level)
                .map((skill, index) => {
                  const color =
                    catColor[skill.category] || '#00e5ff';

                  const selected =
                    selectedSkill?.name === skill.name;

                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className="w-full text-left group"
                    >
                      <div className="flex justify-between items-center font-mono text-[10px] mb-1.5">
                        <span
                          className={`transition-colors ${
                            selected
                              ? 'text-white'
                              : 'text-cyan-100/70 group-hover:text-cyan-100'
                          }`}
                        >
                          {skill.name}
                        </span>

                        <span
                          style={{ color }}
                          className="text-[9px]"
                        >
                          {skill.level}%
                        </span>
                      </div>

                      <div className="relative h-1.5 rounded-full bg-cyan-500/10 overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(
                              90deg,
                              ${color}40,
                              ${color}
                            )`,
                            boxShadow: selected
                              ? `0 0 10px ${color}`
                              : `0 0 5px ${color}40`,
                            animationDelay: `${index * 0.05}s`,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* category navigation */}
            <div className="mt-5 pt-4 border-t border-cyan-400/10">
              <div className="font-mono text-[8px] text-cyan-200/30 tracking-widest mb-2">
                SWITCH DOMAIN
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {availableCategories.map((category) => {
                  const color =
                    catColor[category] || '#00e5ff';

                  const active =
                    category === activeCategory;

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setSelectedSkill(null);
                      }}
                      className="flex items-center justify-between px-2.5 py-2 rounded-md border transition-all"
                      style={{
                        borderColor: active
                          ? `${color}40`
                          : 'rgba(0,229,255,0.06)',
                        background: active
                          ? `${color}08`
                          : 'transparent',
                      }}
                    >
                      <span
                        className="font-mono text-[8px]"
                        style={{
                          color: active
                            ? color
                            : 'rgba(165,243,252,0.45)',
                        }}
                      >
                        {category}
                      </span>

                      <ChevronRight
                        className="w-3 h-3"
                        style={{
                          color: active
                            ? color
                            : 'rgba(165,243,252,0.2)',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SUPPORTING SKILLS ================= */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* APIs */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-3.5 h-3.5 text-amber-400" />

              <span className="font-mono text-[9px] tracking-widest text-cyan-200/45">
                API & INTEGRATION
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                'REST APIs',
                'RESTful Services',
                'JSON',
                'HTTP/HTTPS',
                'JWT',
                'OAuth',
                'API Authentication',
                'API Integration',
              ].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1.5 rounded-md border border-amber-400/10 bg-amber-400/[0.03] font-mono text-[8px] text-amber-200/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Concepts */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-3.5 h-3.5 text-fuchsia-400" />

              <span className="font-mono text-[9px] tracking-widest text-cyan-200/45">
                CORE CONCEPTS
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                'Responsive Design',
                'Accessibility',
                'Cloud Computing',
                'DSA',
                'Agile / Scrum',
              ].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1.5 rounded-md border border-fuchsia-400/10 bg-fuchsia-400/[0.03] font-mono text-[8px] text-fuchsia-200/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FOOTER STATUS ================= */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>

            <span className="font-mono text-[8px] text-green-300/50">
              SKILL MATRIX ONLINE
            </span>
          </div>

          <span className="font-mono text-[8px] text-cyan-200/25">
            S_ANIL_KUMAR // CAPABILITY_ENGINE
          </span>
        </div>
      </div>
    </ModuleShell>
  );
}

/* =========================================================
   GRAPH BUILDER
   ========================================================= */

function buildGraph(
  skills: Skill[],
  activeCategory: string
): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  const categorySkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  const color =
    catColor[activeCategory] || '#00e5ff';

  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  /*
   * Category sits at the center.
   * Skills orbit around it.
   */

  const categoryX = CENTER;
  const categoryY = CENTER;

  const radius = categorySkills.length > 8 ? 170 : 145;

  categorySkills.forEach((skill, index) => {
    const total = categorySkills.length;

    const angle =
      (index / total) * Math.PI * 2 -
      Math.PI / 2;

    /*
     * Slightly irregular radius so the graph
     * doesn't look mathematically perfect.
     */
    const distance =
      radius +
      ((index * 17) % 25) -
      12;

    const x =
      categoryX +
      Math.cos(angle) * distance;

    const y =
      categoryY +
      Math.sin(angle) * distance;

    const nodeRadius =
      5 + Math.max(0, skill.level - 70) / 12;

    nodes.push({
      name: skill.name,
      x,
      y,
      r: nodeRadius,
      color,
      level: skill.level,
      category: skill.category,
    });

    links.push({
      x1: categoryX,
      y1: categoryY,
      x2: x,
      y2: y,
      color,
    });
  });

  /*
   * Connect nearby nodes.
   * This creates the neural-network appearance.
   */
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;

      const distance = Math.sqrt(
        dx * dx + dy * dy
      );

      if (distance < 105) {
        links.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          color,
        });
      }
    }
  }

  /*
   * We no longer push the category node here
   * because it's now rendered directly in the SVG
   * with a dynamic icon and label.
   */

  return {
    nodes,
    links,
  };
}