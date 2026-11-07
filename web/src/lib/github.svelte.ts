export const GITHUB_URL = '/about';
class GithubStarsStore {
  count = $state<number | null>(null);
  async load() {
    // External repository stars disabled for VC Jobs
  }
}
export const githubStars = new GithubStarsStore();
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
}
