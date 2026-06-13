import React, { useState } from 'react';
import { Project, OpenRole, ContributeIssue } from '../types';

interface CreateProjectWizardProps {
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

const gradientOptions = [
  { label: 'Emerald Forest', value: 'from-emerald-600 to-teal-800' },
  { label: 'Sunset Glow', value: 'from-amber-500 to-orange-700' },
  { label: 'Midnight Ocean', value: 'from-blue-600 to-indigo-800' },
  { label: 'Vibrant Galaxy', value: 'from-purple-600 to-pink-800' },
  { label: 'Cyber Punk', value: 'from-rose-600 to-violet-800' },
  { label: 'Dark Charcoal', value: 'from-zinc-700 to-black' },
];

export default function CreateProjectWizard({ onClose, onSubmit }: CreateProjectWizardProps) {
  const [step, setStep] = useState(1);

  // Step 1: Basic Info
  const [title, setTitle] = useState('');
  const [pitch, setPitch] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState('Local Developer');
  const [creatorAvatar, setCreatorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
  const [creatorGithub, setCreatorGithub] = useState('');

  // Step 2: Tech & Links
  const [techInput, setTechInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [bannerGradient, setBannerGradient] = useState(gradientOptions[0].value);

  // Step 3: Help Toggles
  const [helpNeeded, setHelpNeeded] = useState({
    sponsor: false,
    collaborate: false,
    guide: false,
    contribute: false,
  });

  // Step 3 sub-fields: Sponsor
  const [fundingGoal, setFundingGoal] = useState('');

  // Step 3 sub-fields: Collaborate roles list
  const [rolesList, setRolesList] = useState<OpenRole[]>([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleSkills, setNewRoleSkills] = useState('');

  // Step 3 sub-fields: Guidance
  const [initialQuestion, setInitialQuestion] = useState('');

  // Step 3 sub-fields: Contribute issues list
  const [issuesList, setIssuesList] = useState<ContributeIssue[]>([]);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueDifficulty, setNewIssueDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const addRole = () => {
    if (!newRoleName.trim()) return;
    const newRole: OpenRole = {
      id: `role-${Date.now()}`,
      roleName: newRoleName,
      description: newRoleDesc,
      skillsNeeded: newRoleSkills.split(',').map((s) => s.trim()).filter((s) => s),
      status: 'open',
    };
    setRolesList([...rolesList, newRole]);
    setNewRoleName('');
    setNewRoleDesc('');
    setNewRoleSkills('');
  };

  const removeRole = (id: string) => {
    setRolesList(rolesList.filter((r) => r.id !== id));
  };

  const addIssue = () => {
    if (!newIssueTitle.trim()) return;
    const count = issuesList.length + 1;
    const newIssue: ContributeIssue = {
      id: `issue-${count}`,
      title: newIssueTitle,
      difficulty: newIssueDifficulty,
      link: githubUrl ? `${githubUrl}/issues/${count}` : '#',
      status: 'open',
    };
    setIssuesList([...issuesList, newIssue]);
    setNewIssueTitle('');
  };

  const removeIssue = (id: string) => {
    setIssuesList(issuesList.filter((i) => i.id !== id));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const techStack = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    const newProject: Project = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      pitch,
      description,
      creatorName,
      creatorAvatar,
      creatorGithub: creatorGithub || undefined,
      bannerGradient,
      techStack: techStack.length > 0 ? techStack : ['HTML', 'JavaScript'],
      githubUrl: githubUrl || 'https://github.com',
      liveUrl: liveUrl || undefined,
      fundingGoal: helpNeeded.sponsor && fundingGoal ? parseFloat(fundingGoal) : undefined,
      fundingRaised: helpNeeded.sponsor ? 0 : undefined,
      helpNeeded,
      openRoles: helpNeeded.collaborate ? rolesList : [],
      sponsorshipTiers: helpNeeded.sponsor
        ? [
            { id: 't-1', name: 'Micro Sponsor', amount: 5, benefits: 'Name in README' },
            { id: 't-2', name: 'Premium Supporter', amount: 25, benefits: 'Featured spot in about dashboard' },
          ]
        : [],
      sponsorsList: [],
      guidanceTopics: helpNeeded.guide && initialQuestion
        ? [
            {
              id: `g-${Date.now()}`,
              question: initialQuestion,
              askedBy: creatorName,
              askedAt: new Date().toISOString(),
              replies: [],
            },
          ]
        : [],
      contributeIssues: helpNeeded.contribute ? issuesList : [],
    };

    onSubmit(newProject);
  };

  const nextStep = () => {
    if (step === 1 && (!title.trim() || !pitch.trim() || !description.trim())) {
      alert('Please fill out all general details');
      return;
    }
    if (step === 2 && !techInput.trim()) {
      alert('Please input at least one tech stack tag');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-2xl bg-bg1 border border-ink3 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="bg-bg0 px-6 py-4 border-b border-ink3 flex justify-between items-center">
          <div>
            <h2 className="font-outfit font-extrabold text-lg text-ink0">Showcase Your Project</h2>
            <p className="text-xs text-ink1 mt-0.5">Share your code, build teams, and collect feedback</p>
          </div>
          <button
            onClick={onClose}
            className="text-ink2 hover:text-ink0 text-lg font-semibold w-8 h-8 rounded-full border border-ink3/40 hover:border-ink2 flex items-center justify-center transition-all duration-200"
          >
            ×
          </button>
        </div>

        {/* Stepper progress bar */}
        <div className="px-6 pt-4 bg-bg1/50 flex items-center justify-between text-[0.65rem] font-dmmono text-ink2 border-b border-ink3/30 pb-3">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${step >= 1 ? 'border-g text-g bg-g/5' : 'border-ink3 text-ink2'}`}>1</span>
            <span className={step >= 1 ? 'text-ink0' : ''}>General Details</span>
          </div>
          <div className="flex-grow h-[1px] bg-ink3 mx-4" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${step >= 2 ? 'border-g text-g bg-g/5' : 'border-ink3 text-ink2'}`}>2</span>
            <span className={step >= 2 ? 'text-ink0' : ''}>Tech & Assets</span>
          </div>
          <div className="flex-grow h-[1px] bg-ink3 mx-4" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${step >= 3 ? 'border-g text-g bg-g/5' : 'border-ink3 text-ink2'}`}>3</span>
            <span className={step >= 3 ? 'text-ink0' : ''}>Support Options</span>
          </div>
        </div>

        {/* Scrollable form content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] min-h-[350px]">
          
          {/* STEP 1: GENERAL DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">Project Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EcoLedger"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-g focus:ring-1 focus:ring-g/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">One-sentence Pitch <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Decentralized solar energy grid registry for small agricultural cooperatives."
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-g focus:ring-1 focus:ring-g/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">Detailed Description <span className="text-red-500">*</span></label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide details on project inspiration, architectural workflow, features, and future targets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-g focus:ring-1 focus:ring-g/30 transition-all"
                />
              </div>

              <div className="bg-bg0 border border-ink3 p-4 rounded-xl space-y-4">
                <div className="text-[0.62rem] font-dmmono uppercase text-ink2">Creator Profile Information</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-1.5 text-xs text-ink0 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Avatar Link URL</label>
                    <input
                      type="text"
                      value={creatorAvatar}
                      onChange={(e) => setCreatorAvatar(e.target.value)}
                      className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-1.5 text-xs text-ink0 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Github Username (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. sanapatel"
                    value={creatorGithub}
                    onChange={(e) => setCreatorGithub(e.target.value)}
                    className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-1.5 text-xs text-ink0 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TECH & ASSETS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">Tech Stack (comma separated) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, TypeScript, Rust, SQLite, WebAssembly"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-g"
                />
                <span className="text-[0.62rem] text-ink2 mt-1 block font-dmmono">Separate entries with commas</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">GitHub Code Repository URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/user/project"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-g"
                  />
                </div>
                <div>
                  <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">Live Demo / App URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://my-demo-app.vercel.app"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full bg-bg2 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-g"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-dmmono uppercase text-ink1 mb-2">Select Accent Banner Gradient</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gradientOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBannerGradient(opt.value)}
                      className={`text-left p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                        bannerGradient === opt.value
                          ? 'border-g bg-g/5 shadow-md shadow-g/10'
                          : 'border-ink3 hover:border-ink2 bg-bg2'
                      }`}
                    >
                      <span className="text-[0.65rem] font-semibold text-ink0 mb-2">{opt.label}</span>
                      <div className={`w-full h-4 rounded bg-gradient-to-r ${opt.value}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: HELP OPTIONS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="border-b border-ink3 pb-2.5">
                <h3 className="text-xs font-semibold uppercase text-ink2 font-dmmono mb-1">Identify Support Requirements</h3>
                <p className="text-[0.7rem] text-ink1">Toggle checkboxes to unlock detail cards for each area.</p>
              </div>

              {/* Toggles Panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['collaborate', 'sponsor', 'guide', 'contribute'] as const).map((key) => {
                  const isActive = helpNeeded[key];
                  const labels: Record<string, string> = {
                    collaborate: 'Collaborators',
                    sponsor: 'Sponsors',
                    guide: 'Mentorship',
                    contribute: 'Contributors',
                  };
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setHelpNeeded({ ...helpNeeded, [key]: !helpNeeded[key] })}
                      className={`py-2 px-3 text-[0.68rem] font-semibold rounded-lg border font-dmmono flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-g border-g text-bg0 font-bold shadow-md shadow-g/10'
                          : 'bg-bg2 border-ink3 text-ink1 hover:border-ink2'
                      }`}
                    >
                      <span className="text-xs">{isActive ? '✓' : '+'}</span>
                      {labels[key]}
                    </button>
                  );
                })}
              </div>

              {/* Toggle Content Forms */}
              <div className="space-y-4">
                
                {/* 1. Collaborate Sub-form */}
                {helpNeeded.collaborate && (
                  <div className="bg-bg2 border border-ink3 rounded-xl p-4 space-y-4">
                    <div className="flex justify-between items-center text-xs border-b border-ink3 pb-2 font-dmmono font-semibold text-blue-400">
                      <span>Collaboration Openings</span>
                      <span>{rolesList.length} Role(s) Added</span>
                    </div>

                    {/* Roles Added List */}
                    {rolesList.length > 0 && (
                      <div className="space-y-2">
                        {rolesList.map((role) => (
                          <div key={role.id} className="bg-bg3 border border-ink3 p-2.5 rounded-lg flex justify-between items-start text-xs">
                            <div>
                              <div className="font-bold text-ink0">{role.roleName}</div>
                              {role.description && <p className="text-ink1 text-[0.7rem] mt-0.5">{role.description}</p>}
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {role.skillsNeeded.map((s) => (
                                  <span key={s} className="text-[0.58rem] bg-bg0 border border-ink3 px-1.5 rounded text-ink2">{s}</span>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeRole(role.id)}
                              className="text-red-500 hover:text-red-400 font-bold ml-2 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add role inputs */}
                    <div className="bg-bg0 border border-ink3/60 p-3 rounded-lg space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Role Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Senior Frontend Dev"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            className="w-full bg-bg3 border border-ink3 rounded px-2.5 py-1 text-xs text-ink0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Skills needed (comma sep.)</label>
                          <input
                            type="text"
                            placeholder="e.g. React, Tailwind"
                            value={newRoleSkills}
                            onChange={(e) => setNewRoleSkills(e.target.value)}
                            className="w-full bg-bg3 border border-ink3 rounded px-2.5 py-1 text-xs text-ink0 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Brief description of duties</label>
                        <input
                          type="text"
                          placeholder="e.g. Develop interactive charts dashboard"
                          value={newRoleDesc}
                          onChange={(e) => setNewRoleDesc(e.target.value)}
                          className="w-full bg-bg3 border border-ink3 rounded px-2.5 py-1 text-xs text-ink0 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addRole}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3 py-1.5 rounded active:scale-95 transition-all"
                      >
                        + Add Role to Project
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Sponsor Sub-form */}
                {helpNeeded.sponsor && (
                  <div className="bg-bg2 border border-ink3 rounded-xl p-4 space-y-3">
                    <div className="text-xs border-b border-ink3 pb-2 font-dmmono font-semibold text-yellow-400">
                      Sponsorship Milestones
                    </div>
                    <div>
                      <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">Funding Goal Target Amount ($)</label>
                      <div className="relative max-w-[200px]">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-ink2">$</span>
                        <input
                          type="number"
                          placeholder="e.g. 1000"
                          value={fundingGoal}
                          onChange={(e) => setFundingGoal(e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-bg3 border border-ink3 rounded-lg text-xs text-ink0 focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <span className="text-[0.62rem] text-ink2 mt-1 block font-dmmono">Calculates percentage targets for sandbox checkout tests.</span>
                    </div>
                  </div>
                )}

                {/* 3. Guidance Sub-form */}
                {helpNeeded.guide && (
                  <div className="bg-bg2 border border-ink3 rounded-xl p-4 space-y-3">
                    <div className="text-xs border-b border-ink3 pb-2 font-dmmono font-semibold text-purple-400">
                      Post an Initial Mentorship Topic
                    </div>
                    <div>
                      <label className="block text-xs font-dmmono uppercase text-ink1 mb-1">What architectural topic or question do you need help with?</label>
                      <input
                        type="text"
                        placeholder="e.g. How should we set up our smart contracts for upgradeability?"
                        value={initialQuestion}
                        onChange={(e) => setInitialQuestion(e.target.value)}
                        className="w-full bg-bg3 border border-ink3 rounded-lg px-3 py-2 text-xs text-ink0 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Contribute Sub-form */}
                {helpNeeded.contribute && (
                  <div className="bg-bg2 border border-ink3 rounded-xl p-4 space-y-4">
                    <div className="flex justify-between items-center text-xs border-b border-ink3 pb-2 font-dmmono font-semibold text-emerald-400">
                      <span>Contributors Issues Board</span>
                      <span>{issuesList.length} Issue(s) Added</span>
                    </div>

                    {/* Issues Added List */}
                    {issuesList.length > 0 && (
                      <div className="space-y-2">
                        {issuesList.map((issue) => (
                          <div key={issue.id} className="bg-bg3 border border-ink3 p-2.5 rounded-lg flex justify-between items-center text-xs">
                            <div>
                              <span className="font-bold text-ink0">{issue.title}</span>
                              <span className="text-[0.58rem] ml-2 font-dmmono uppercase px-1.5 rounded bg-bg0 border border-ink3 text-ink2">{issue.difficulty}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeIssue(issue.id)}
                              className="text-red-500 hover:text-red-400 font-bold ml-2 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add issue inputs */}
                    <div className="bg-bg0 border border-ink3/60 p-3 rounded-lg flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-grow">
                        <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Issue Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Fix README broken link references"
                          value={newIssueTitle}
                          onChange={(e) => setNewIssueTitle(e.target.value)}
                          className="w-full bg-bg3 border border-ink3 rounded px-2.5 py-1 text-xs text-ink0 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.6rem] font-dmmono uppercase text-ink1 mb-1">Difficulty</label>
                        <select
                          value={newIssueDifficulty}
                          onChange={(e) => setNewIssueDifficulty(e.target.value as any)}
                          className="bg-bg3 border border-ink3 rounded px-2 py-1 text-xs text-ink0 focus:outline-none min-w-[100px]"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={addIssue}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded active:scale-95 transition-all"
                      >
                        + Add Issue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Wizard Nav Actions */}
        <div className="p-4 bg-bg0 border-t border-ink3 flex justify-between items-center text-xs font-dmmono">
          <button
            type="button"
            onClick={step === 1 ? onClose : prevStep}
            className="text-ink1 hover:text-ink0 border border-ink3 hover:border-ink2 rounded-lg px-4 py-2"
          >
            {step === 1 ? 'Cancel' : '← Back'}
          </button>
          
          <button
            type="button"
            onClick={step === 3 ? handleFinalSubmit : nextStep}
            className="bg-g text-bg0 font-bold rounded-lg px-5 py-2 hover:shadow-[0_0_12px_rgba(27,206,146,0.3)] active:scale-95 transition-all"
          >
            {step === 3 ? 'Publish Showcase Project ➔' : 'Continue ➔'}
          </button>
        </div>

      </div>
    </div>
  );
}
