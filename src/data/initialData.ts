import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'ai-verse',
    title: 'AiVerse',
    pitch: 'A generative sandbox for running multi-agent simulations in the browser.',
    description: 'AiVerse is an open-source playground where developers can spin up dozens of autonomous LLM-powered agents that interact with each other in a virtual environment. It supports custom system prompts, vector memory storage, and real-time visualization of agent conversations and action paths.',
    creatorName: 'Frozen',
    creatorAvatar: 'https://avatars.githubusercontent.com/u/174297688?s=96&v=4',
    creatorGithub: 'Frozen-47',
    bannerGradient: 'from-emerald-600 to-teal-800',
    techStack: ['React', 'TypeScript', 'Node.js', 'Vector DB', 'OpenAI API'],
    githubUrl: 'https://github.com/Frozen-47/ai-verse',
    liveUrl: 'https://aiverse.frozenn.in',
    fundingGoal: 2000,
    fundingRaised: 0,
    helpNeeded: {
      sponsor: true,
      collaborate: true,
      guide: true,
      contribute: true,
    },
    openRoles: [
      {
        id: 'role-1',
        roleName: 'Frontend Engineer (Framer Motion)',
        description: 'Need help building the interactive agent grid visualizer and custom canvas dragging controls.',
        skillsNeeded: ['React', 'Framer Motion', 'Canvas API'],
        status: 'open',
      },
      {
        id: 'role-2',
        roleName: 'Backend Vector DB Architect',
        description: 'Help optimize context retrieval queries and integrate lightweight vector search inside local storage/Dexie.',
        skillsNeeded: ['TypeScript', 'Vector Search', 'WebWorkers'],
        status: 'open',
      }
    ],
    sponsorshipTiers: [
      {
        id: 'tier-1',
        name: 'Coffee Sponsor',
        amount: 10,
        benefits: 'Get a sponsor badge on GitHub and your name in the README.',
      },
      {
        id: 'tier-2',
        name: 'Server Support',
        amount: 50,
        benefits: 'Covers GPU sandbox hosting. Featured project logo on our live demo.',
      },
      {
        id: 'tier-3',
        name: 'Enterprise Supporter',
        amount: 250,
        benefits: 'Priority support, feature steering input, and premium logo placement.',
      }
    ],
    sponsorsList: [],
    guidanceTopics: [
      {
        id: 'guide-1',
        question: 'What is the optimal chunk size for agent conversation summaries to prevent context window bloat?',
        askedBy: 'Frozen',
        askedAt: '2026-06-11T14:22:00Z',
        replies: [
          {
            id: 'reply-1',
            repliedBy: 'Dr. Nexus',
            replyText: 'Usually 200-400 tokens works best for short dialogue memory. You should also run a summarizer LLM on top of old conversations to convert them into facts, rather than feeding raw dialogue transcripts.',
            repliedAt: '2026-06-11T16:45:00Z',
          },
          {
            id: 'reply-2',
            repliedBy: 'Frozen',
            replyText: 'Thanks! Implementing fact-based extraction instead of sliding raw context windows.',
            repliedAt: '2026-06-11T18:10:00Z',
            isCreator: true,
          }
        ]
      },
      {
        id: 'guide-2',
        question: 'Should we run local embeddings using Transformers.js directly in WebWorkers, or fall back to OpenAI API?',
        askedBy: 'Frozen',
        askedAt: '2026-06-12T10:05:00Z',
        replies: []
      }
    ],
    contributeIssues: [
      {
        id: 'issue-1',
        title: 'Add custom agent color profile selector in settings panel',
        difficulty: 'easy',
        link: 'https://github.com/Frozen-47/ai-verse/issues/12',
        status: 'open',
      },
      {
        id: 'issue-2',
        title: 'Optimize memory indexing query using local DB indexes',
        difficulty: 'medium',
        link: 'https://github.com/Frozen-47/ai-verse/issues/18',
        status: 'open',
      }
    ]
  }
];
