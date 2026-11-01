import { useState, useMemo } from 'react';
import { Brain, Code2, Layout, Network, Search, X, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'ai-ml': Brain,
  'languages': Code2,
  'web-application': Layout,
  'systems-networking': Network,
};

export const SkillsSection = () => {
  const { skillCategories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtered categories and skills based on search query and category tab
  const filteredCategories = useMemo(() => {
    return skillCategories
      .map((cat) => {
        // If a specific category tab is selected, skip others
        if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
          return null;
        }

        // If search query is present, filter skills
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchingSkills = cat.skills.filter((skill) =>
            skill.name.toLowerCase().includes(q)
          );
          if (matchingSkills.length === 0 && !cat.title.toLowerCase().includes(q)) {
            return null;
          }
          return {
            ...cat,
            skills: matchingSkills.length > 0 ? matchingSkills : cat.skills,
          };
        }

        return cat;
      })
      .filter((cat): cat is typeof skillCategories[0] => cat !== null);
  }, [skillCategories, selectedCategory, searchQuery]);

  const totalSkillsCount = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [skillCategories]);

  return (
    <section id="skills" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            <span className="text-slate-500">// 02.</span>
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills &amp; Architecture Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A comprehensive matrix of machine learning frameworks, core programming languages, enterprise cloud platforms, and low-level networking tools.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter technologies (e.g. PyTorch, YOLO, Apex)..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>All Domains</span>
          <span className="ml-1.5 text-[10px] font-mono opacity-80">({totalSkillsCount})</span>
        </button>

        {skillCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const Icon = CATEGORY_ICONS[cat.id] || Brain;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.title}</span>
              <span className="text-[10px] font-mono opacity-80">({cat.skills.length})</span>
            </button>
          );
        })}
      </div>

      {/* Domain Cards Grid */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 font-mono text-xs text-slate-500">
          No technologies found matching "{searchQuery}". Try searching for another framework or keyword.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] || Brain;

            return (
              <div
                key={category.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80 hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 group-hover:border-indigo-500/40 group-hover:text-indigo-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-snug">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const isHighlighted = skill.highlight;
                      const isSearchMatch = searchQuery
                        ? skill.name.toLowerCase().includes(searchQuery.toLowerCase())
                        : false;

                      return (
                        <div
                          key={skill.name}
                          className={`group/skill relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 select-none ${
                            isSearchMatch
                              ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                              : isHighlighted
                              ? 'bg-slate-950 text-slate-100 border border-indigo-500/30 hover:border-emerald-500/50 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                              : 'bg-slate-950/70 text-slate-400 border border-slate-850 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {isHighlighted && !isSearchMatch && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                          <span>{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Count & Tag */}
                <div className="pt-6 mt-6 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{category.skills.length} core technologies</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Production Grade</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
