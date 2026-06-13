import React, { useState } from 'react';
import { Project, CollaboratorApplication, GuidanceReply } from '../types';

interface CreatorDashboardProps {
  projects: Project[];
  applications: CollaboratorApplication[];
  onApproveApplication: (appId: string) => void;
  onDeclineApplication: (appId: string) => void;
  onReplyToGuidance: (projectId: string, topicId: string, replyText: string, isCreator: boolean) => void;
  onCloseIssue: (projectId: string, issueId: string) => void;
}

export default function CreatorDashboard({
  projects,
  applications,
  onApproveApplication,
  onDeclineApplication,
  onReplyToGuidance,
  onCloseIssue,
}: CreatorDashboardProps) {
  // Let the user manage projects. By default, pick the first project
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'guidance' | 'sponsors' | 'issues'>('applications');
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  const projectApplications = applications.filter((app) => app.projectId === selectedProjectId);
  const pendingAppsCount = projectApplications.filter((app) => app.status === 'pending').length;

  const totalSponsorsCount = currentProject?.sponsorsList?.length || 0;
  const totalRaised = currentProject?.fundingRaised || 0;

  const handleReplyChange = (topicId: string, value: string) => {
    setReplyInput((prev) => ({ ...prev, [topicId]: value }));
  };

  const submitCreatorReply = (topicId: string) => {
    const text = replyInput[topicId];
    if (!text || !text.trim() || !currentProject) return;
    onReplyToGuidance(currentProject.id, topicId, text, true);
    setReplyInput((prev) => ({ ...prev, [topicId]: '' }));
  };

  if (projects.length === 0) {
    return (
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12 relative z-10 text-center">
        <div className="bg-bg1 border border-ink3 rounded-xl p-12 max-w-md mx-auto">
          <svg className="w-12 h-12 stroke-ink2 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          <h3 className="font-outfit font-bold text-lg text-ink0 mb-2">No projects owned</h3>
          <p className="text-xs text-ink1 leading-relaxed mb-6">
            You haven't showcased any projects yet. Go to the "Explore" gallery and click "Showcase Your Project" to create one.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="creator-dashboard" className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12 relative z-10">
      
      {/* Header */}
      <div className="mb-10">
        <div className="font-dmmono text-xs uppercase tracking-wider text-g mb-2">Creator Hub</div>
        <h2 className="font-outfit font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-ink0 leading-tight">
          Manage Workspace
        </h2>
        <p className="text-ink1 text-sm mt-1.5">
          Review collaboration applications, coordinate sponsorships, respond to feedback, and update issue trackers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Project Picker */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase text-ink2 font-dmmono tracking-wider">My Projects</h3>
          <div className="flex flex-col gap-2">
            {projects.map((p) => {
              const isSelected = p.id === selectedProjectId;
              const pendingCount = applications.filter((app) => app.projectId === p.id && app.status === 'pending').length;
              
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setActiveSubTab('applications');
                  }}
                  className={`w-full text-left p-4.5 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                    isSelected
                      ? 'border-g bg-g/5 text-ink0 shadow-md shadow-g/5'
                      : 'border-ink3 hover:border-ink2 bg-bg1 text-ink1 hover:text-ink0'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded bg-gradient-to-br ${p.bannerGradient} flex items-center justify-center text-xs font-bold text-white shadow-inner`}>
                      {p.title.substring(0, 2)}
                    </div>
                    <div>
                      <span className="font-semibold text-xs font-outfit block">{p.title}</span>
                      <span className="text-[0.62rem] font-dmmono block opacity-85">
                        {p.techStack.slice(0, 2).join(' · ')}
                      </span>
                    </div>
                  </div>
                  {pendingCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[0.65rem] flex items-center justify-center animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Panel: Management Tabs */}
        {currentProject && (
          <div className="md:col-span-3 bg-bg1 border border-ink3 rounded-xl overflow-hidden shadow-xl flex flex-col">
            
            {/* Top Info Header */}
            <div className="bg-bg2 p-5 border-b border-ink3 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="font-outfit font-extrabold text-lg text-ink0">{currentProject.title} Workspace</h3>
                <span className="text-[0.68rem] text-ink1 font-dmmono">
                  Pitch: {currentProject.pitch}
                </span>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center bg-bg3 border border-ink3 rounded-lg px-3 py-1.5">
                  <span className="text-[0.6rem] font-dmmono uppercase text-ink2 block">Funding Raised</span>
                  <span className="text-sm font-bold text-yellow-400 font-dmmono">${totalRaised}</span>
                </div>
                <div className="text-center bg-bg3 border border-ink3 rounded-lg px-3 py-1.5">
                  <span className="text-[0.6rem] font-dmmono uppercase text-ink2 block">Sponsors</span>
                  <span className="text-sm font-bold text-ink0 font-dmmono">{totalSponsorsCount}</span>
                </div>
              </div>
            </div>

            {/* Dashboard Subtabs Navigation */}
            <div className="flex border-b border-ink3 bg-bg0/60 px-4 gap-2">
              {(['applications', 'guidance', 'sponsors', 'issues'] as const).map((subTab) => {
                const label: Record<string, string> = {
                  applications: `Collab Applications (${pendingAppsCount})`,
                  guidance: 'Guidance Queries',
                  sponsors: 'Backers List',
                  issues: 'Project Issues',
                };
                
                return (
                  <button
                    key={subTab}
                    onClick={() => setActiveSubTab(subTab)}
                    className={`py-3 px-3 text-xs font-semibold font-dmmono border-b-2 transition-all outline-none whitespace-nowrap ${
                      activeSubTab === subTab
                        ? 'border-g text-g'
                        : 'border-transparent text-ink1 hover:text-ink0'
                    }`}
                  >
                    {label[subTab]}
                  </button>
                );
              })}
            </div>

            {/* Inner scrollable list */}
            <div className="p-6 overflow-y-auto max-h-[450px] min-h-[350px]">
              
              {/* SUBTAB: APPLICATIONS */}
              {activeSubTab === 'applications' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-ink2 uppercase tracking-wider font-dmmono">Collaborator Pipeline</h4>
                    <span className="text-xs font-dmmono text-ink1">Requires review</span>
                  </div>

                  {projectApplications.length === 0 ? (
                    <div className="text-center py-12 text-ink2 italic text-xs">
                      No collaborator applications received yet for this project.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projectApplications.map((app) => (
                        <div
                          key={app.id}
                          className="bg-bg2 border border-ink3 rounded-xl p-5 space-y-4 hover:border-ink2 transition-all"
                        >
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <div className="text-[0.62rem] font-dmmono text-ink1 mb-1">
                                Applied on {new Date(app.appliedAt).toLocaleDateString()}
                              </div>
                              <span className="font-bold text-sm text-ink0">{app.applicantName}</span>
                              <span className="text-xs text-ink2 block mt-0.5">Contact: {app.applicantEmail}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-dmmono text-blue-400 bg-blue-950/20 px-2.5 py-1 border border-blue-500/20 rounded font-semibold">
                                Role: {app.roleName}
                              </span>
                              <span className={`text-[0.62rem] font-bold font-dmmono uppercase px-2 py-0.5 rounded border ${
                                app.status === 'pending'
                                  ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                  : app.status === 'approved'
                                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                          </div>

                          <div className="bg-bg3 border border-ink3 p-3 rounded-lg text-xs text-ink0 space-y-2">
                            <div><strong>Key Skills:</strong> {app.skills}</div>
                            <div className="leading-relaxed whitespace-pre-wrap"><strong>Message:</strong> "{app.message}"</div>
                          </div>

                          {app.status === 'pending' && (
                            <div className="flex gap-2 pt-1.5 justify-end">
                              <button
                                onClick={() => onDeclineApplication(app.id)}
                                className="border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-400 font-semibold text-xs px-4 py-2 rounded-lg transition-all"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => onApproveApplication(app.id)}
                                className="bg-green-600 hover:bg-green-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md active:scale-95 transition-all"
                              >
                                Approve & Invite
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: GUIDANCE */}
              {activeSubTab === 'guidance' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-ink3 pb-3">
                    <h4 className="text-sm font-semibold text-ink2 uppercase tracking-wider font-dmmono">Mentorship Board</h4>
                    <span className="text-xs font-dmmono text-ink1">Double-click questions to answer</span>
                  </div>

                  {!currentProject.guidanceTopics || currentProject.guidanceTopics.length === 0 ? (
                    <div className="text-center py-12 text-ink2 italic text-xs">
                      No developer guidance queries have been posted.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentProject.guidanceTopics.map((topic) => (
                        <div key={topic.id} className="bg-bg2 border border-ink3 rounded-xl p-4 space-y-3">
                          <div>
                            <span className="text-[0.62rem] font-dmmono text-ink1">
                              Asked by @{topic.askedBy.toLowerCase()} · {new Date(topic.askedAt).toLocaleDateString()}
                            </span>
                            <h5 className="font-outfit font-bold text-xs text-ink0 mt-1">
                              {topic.question}
                            </h5>
                          </div>

                          {/* Existing Replies */}
                          {topic.replies.length > 0 && (
                            <div className="pl-4 border-l-2 border-g-dim space-y-2.5">
                              {topic.replies.map((rep) => (
                                <div key={rep.id} className="text-xs bg-bg3 border border-ink3/40 p-2 rounded-lg">
                                  <div className="flex justify-between font-dmmono text-[0.62rem] text-ink2">
                                    <span className="font-bold text-ink1">
                                      @{rep.repliedBy.toLowerCase()} {rep.isCreator && '(Workspace Creator)'}
                                    </span>
                                    <span>{new Date(rep.repliedAt).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-ink0 mt-1">{rep.replyText}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Post response as Creator form */}
                          <div className="pt-2 border-t border-ink3/40 flex gap-2">
                            <input
                              type="text"
                              placeholder="Answer as the Project Creator..."
                              value={replyInput[topic.id] || ''}
                              onChange={(e) => handleReplyChange(topic.id, e.target.value)}
                              className="flex-grow bg-bg3 border border-ink3 rounded px-2.5 py-1 text-xs text-ink0 focus:outline-none focus:border-g"
                            />
                            <button
                              onClick={() => submitCreatorReply(topic.id)}
                              className="bg-g text-bg0 font-bold text-xs px-3 rounded hover:bg-g-text active:scale-95 transition-all"
                            >
                              Post Answer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: SPONSORS */}
              {activeSubTab === 'sponsors' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-ink3 pb-3">
                    <h4 className="text-sm font-semibold text-ink2 uppercase tracking-wider font-dmmono">Project Backers</h4>
                    <span className="text-xs font-dmmono text-ink1">Simulated ledger</span>
                  </div>

                  {!currentProject.sponsorsList || currentProject.sponsorsList.length === 0 ? (
                    <div className="text-center py-12 text-ink2 italic text-xs">
                      No financial support recorded yet. Select "Sponsor" on your project card to test checkout.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {currentProject.sponsorsList.map((sponsor, idx) => (
                        <div key={idx} className="bg-bg2 border border-ink3 p-4 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={sponsor.avatar} alt={sponsor.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <span className="font-bold text-xs text-ink0">{sponsor.name}</span>
                              {sponsor.message && (
                                <p className="text-[0.7rem] text-ink1 italic mt-0.5">"{sponsor.message}"</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold font-dmmono text-yellow-400 bg-yellow-950/20 px-2.5 py-1 rounded border border-yellow-500/20">
                              +${sponsor.amount}
                            </span>
                            <span className="text-[0.62rem] text-ink2 block mt-1 font-dmmono">
                              {new Date(sponsor.sponsoredAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB: ISSUES */}
              {activeSubTab === 'issues' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-ink3 pb-3">
                    <h4 className="text-sm font-semibold text-ink2 uppercase tracking-wider font-dmmono">Open Task Board</h4>
                    <span className="text-xs font-dmmono text-ink1">Mark items complete</span>
                  </div>

                  {!currentProject.contributeIssues || currentProject.contributeIssues.length === 0 ? (
                    <div className="text-center py-12 text-ink2 italic text-xs">
                      No contribution issues are designated.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentProject.contributeIssues.map((issue) => (
                        <div key={issue.id} className="bg-bg2 border border-ink3 p-4 rounded-xl flex justify-between items-center">
                          <div>
                            <span className={`text-[0.62rem] font-bold font-dmmono uppercase px-1.5 py-0.5 rounded border mr-2 ${
                              issue.difficulty === 'easy'
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : issue.difficulty === 'medium'
                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                              {issue.difficulty}
                            </span>
                            <span className="font-bold text-xs text-ink0">{issue.title}</span>
                            <span className="text-[0.62rem] text-ink2 block mt-1">Status: {issue.status}</span>
                          </div>
                          
                          {issue.status !== 'merged' && (
                            <button
                              onClick={() => onCloseIssue(currentProject.id, issue.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                            >
                              Resolve Issue
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
