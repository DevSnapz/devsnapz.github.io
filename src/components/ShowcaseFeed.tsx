import React, { useState, useMemo } from 'react';
import { Project } from '../types';

interface ShowcaseFeedProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenCreateWizard: () => void;
}

export default function ShowcaseFeed({ projects, onSelectProject, onOpenCreateWizard }: ShowcaseFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [helpFilter, setHelpFilter] = useState<{
    sponsor: boolean;
    collaborate: boolean;
    guide: boolean;
    contribute: boolean;
  }>({
    sponsor: false,
    collaborate: false,
    guide: false,
    contribute: false,
  });

  // Extract all unique tech stack tags from all projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Text Search filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.pitch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Help Needed filters
      const matchesSponsor = !helpFilter.sponsor || project.helpNeeded.sponsor;
      const matchesCollaborate = !helpFilter.collaborate || project.helpNeeded.collaborate;
      const matchesGuide = !helpFilter.guide || project.helpNeeded.guide;
      const matchesContribute = !helpFilter.contribute || project.helpNeeded.contribute;

      // Category filter (by technology tag)
      const matchesCategory =
        selectedCategory === 'all' || project.techStack.includes(selectedCategory);

      return matchesSearch && matchesSponsor && matchesCollaborate && matchesGuide && matchesContribute && matchesCategory;
    });
  }, [projects, searchQuery, helpFilter, selectedCategory]);

  const toggleHelpFilter = (key: keyof typeof helpFilter) => {
    setHelpFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getHelpNeededStats = (project: Project) => {
    const needs = [];
    if (project.helpNeeded.sponsor) needs.push('Sponsors');
    if (project.helpNeeded.collaborate) needs.push('Collaborators');
    if (project.helpNeeded.guide) needs.push('Mentoring');
    if (project.helpNeeded.contribute) needs.push('Contributors');
    return needs;
  };

  return (
    <section id="showcase-feed" className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12 relative z-10">
      {/* Header and Call to Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <div className="font-dmmono text-xs uppercase tracking-wider text-g mb-2">Showcase Gallery</div>
          <h2 className="font-outfit font-extrabold text-[clamp(2rem,4vw,3rem)] leading-tight text-ink0">
            Discover. Sponsor.<br />Build Together.
          </h2>
          <p className="text-ink1 text-sm mt-3">
            Explore developer projects seeking collaborators, guidance, contributors, and financial support. Showcase your own work to join the ecosystem.
          </p>
        </div>
        <div>
          <button
            onClick={onOpenCreateWizard}
            className="group relative overflow-hidden bg-g text-bg0 font-semibold px-6 py-3.5 rounded-lg text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(27,206,146,0.4)] transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4.5 h-4.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Showcase Your Project
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="bg-bg1 border border-ink3 rounded-xl p-5 mb-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search box */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-ink2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, pitch, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-bg2 border border-ink3 rounded-lg text-sm text-ink0 placeholder-ink2 focus:outline-none focus:border-g focus:ring-1 focus:ring-g/30 transition-all"
            />
          </div>

          {/* Tech tags drop down */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-bg2 border border-ink3 rounded-lg text-sm text-ink0 focus:outline-none focus:border-g transition-all"
            >
              <option value="all">All Tech Stacks</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Help needed filters */}
          <div className="md:col-span-4 flex flex-wrap gap-2 items-center justify-start md:justify-end">
            <span className="text-xs font-dmmono text-ink2 mr-1">Looking for:</span>
            {(['collaborate', 'sponsor', 'guide', 'contribute'] as const).map((key) => {
              const isActive = helpFilter[key];
              const labels: Record<string, string> = {
                collaborate: 'Collabs',
                sponsor: 'Sponsors',
                guide: 'Mentors',
                contribute: 'Issues',
              };
              const colors: Record<string, string> = {
                collaborate: 'border-blue-500/30 text-blue-400 bg-blue-950/20',
                sponsor: 'border-yellow-500/30 text-yellow-400 bg-yellow-950/20',
                guide: 'border-purple-500/30 text-purple-400 bg-purple-950/20',
                contribute: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20',
              };
              const activeColors: Record<string, string> = {
                collaborate: 'bg-blue-500 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]',
                sponsor: 'bg-yellow-500 border-yellow-500 text-bg0 shadow-[0_0_12px_rgba(234,179,8,0.3)]',
                guide: 'bg-purple-500 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]',
                contribute: 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]',
              };

              return (
                <button
                  key={key}
                  onClick={() => toggleHelpFilter(key)}
                  className={`text-[0.68rem] font-semibold px-2.5 py-1.5 rounded-full border transition-all ${
                    isActive ? activeColors[key] : `bg-bg2 border-ink3 text-ink1 hover:border-ink2`
                  }`}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid listing */}
      {filteredProjects.length === 0 ? (
        <div className="bg-bg1 border border-ink3 rounded-xl p-12 text-center">
          <svg className="w-12 h-12 stroke-ink2 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path d="M8 12h8" strokeWidth="1.5" />
          </svg>
          <h3 className="font-outfit font-semibold text-lg text-ink0 mb-1">No projects found</h3>
          <p className="text-ink1 text-sm max-w-sm mx-auto">
            Try adjusting your search keywords, tags, or filters to discover other amazing setups.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const needs = getHelpNeededStats(project);
            const totalSponsors = project.sponsorsList?.length || 0;
            const fundingPercent = project.fundingGoal
              ? Math.min(100, Math.round(((project.fundingRaised || 0) / project.fundingGoal) * 100))
              : 0;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-bg1 border border-ink3 hover:border-g/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 relative"
              >
                {/* Colored banner header */}
                <div className={`h-24 bg-gradient-to-br ${project.bannerGradient} relative`}>
                  <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
                  {/* Floating Creator Avatar */}
                  <div className="absolute -bottom-5 left-5 flex items-center gap-3">
                    <img
                      src={project.creatorAvatar}
                      alt={project.creatorName}
                      className="w-10 h-10 rounded-full border-2 border-bg1 shadow-md object-cover"
                    />
                    <div className="bg-bg1 border border-ink3 rounded px-2 py-0.5 text-[0.62rem] font-dmmono text-ink1 shadow-sm">
                      @{project.creatorName.split(' ')[0].toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-8 flex-grow flex flex-col">
                  {/* Title and Short Pitch */}
                  <div className="mb-3">
                    <h3 className="font-outfit font-extrabold text-lg group-hover:text-g transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-ink1 line-clamp-2 mt-1.5 min-h-[32px]">
                      {project.pitch}
                    </p>
                  </div>

                  {/* Help indicators / Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.helpNeeded.collaborate && (
                      <span className="text-[0.62rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Collabs
                      </span>
                    )}
                    {project.helpNeeded.sponsor && (
                      <span className="text-[0.62rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        Sponsors
                      </span>
                    )}
                    {project.helpNeeded.guide && (
                      <span className="text-[0.62rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        Mentoring
                      </span>
                    )}
                    {project.helpNeeded.contribute && (
                      <span className="text-[0.62rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Issues
                      </span>
                    )}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-4 flex-grow content-start">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[0.68rem] font-dmmono bg-bg2 border border-ink3 px-2 py-0.5 rounded text-ink1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Sponsorship stats if enabled */}
                  {project.helpNeeded.sponsor && project.fundingGoal && (
                    <div className="mb-4 pt-3 border-t border-ink3/40">
                      <div className="flex justify-between items-center text-[0.68rem] text-ink1 mb-1">
                        <span>Funded: ${project.fundingRaised} / ${project.fundingGoal}</span>
                        <span className="font-semibold text-g-text">{fundingPercent}%</span>
                      </div>
                      <div className="w-full bg-bg3 h-1.5 rounded-full overflow-hidden border border-ink3">
                        <div
                          className="bg-g h-full rounded-full transition-all duration-500"
                          style={{ width: `${fundingPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer stats / Actions */}
                  <div className="flex items-center justify-between text-[0.68rem] font-dmmono text-ink2 pt-3 border-t border-ink3/40 mt-auto">
                    <div className="flex items-center gap-3">
                      {project.openRoles && project.helpNeeded.collaborate && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 stroke-ink2" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          {project.openRoles.filter(r => r.status === 'open').length} roles
                        </span>
                      )}
                      {project.helpNeeded.sponsor && totalSponsors > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 stroke-ink2" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          {totalSponsors} backers
                        </span>
                      )}
                    </div>
                    <span className="text-g hover:text-g-text font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      View details ➔
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
