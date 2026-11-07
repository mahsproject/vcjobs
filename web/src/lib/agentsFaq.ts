// Shared by the visible /agents FAQ and its FAQPage JSON-LD.
import type { FaqItem } from './seo';

export const AGENTS_FAQ: FaqItem[] = [
  {
    question: 'Which option should I choose?',
    answer: 'Choose VC Jobs Assistant to work directly on the site with Pro. Choose MCP to connect an assistant you already use, such as Claude, ChatGPT, Codex or Cursor. Choose CLI to work from your terminal or give a local agent access to VC Jobs alongside your files.',
  },
  {
    question: 'Do I need Pro or an account to get started?',
    answer: 'The built-in VC Jobs Assistant is included in Pro and uses your signed-in account. Public job search, employer data and market figures through MCP or CLI need no VC Jobs account. Connect your account when you want to save jobs, update application stages or use your profile. Your external assistant may have its own subscription requirements.',
  },
  {
    question: 'How do I connect my account?',
    answer: 'For MCP, choose With your account in the connection steps and approve the VC Jobs connection in your browser. Codex uses codex mcp login VC Jobs to start that sign-in. For the CLI, run VC Jobs auth login. The built-in assistant uses your existing VC Jobs sign-in.',
  },
  {
    question: 'Can my assistant submit applications for me?',
    answer: 'You submit applications on the employer’s site. Saving a job or marking it applied in VC Jobs updates your tracking board; it does not submit an application. The browser extension can fill an application form for you to review before you send it.',
  },
  {
    question: 'Does each option use the same tracking board?',
    answer: 'Yes. When connected to the same VC Jobs account, the built-in assistant, MCP and CLI save jobs and update stages on the same board you see on the website.',
  },
];
