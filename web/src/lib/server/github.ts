export type GithubStats = {
  stars: number;
  forks: number;
  contributors: number | null;
  license: string | null;
};

const TTL_MS = 60 * 60 * 1000;
const REPO = 'mahsproject/vcjobs';

let cache: { at: number; data: GithubStats | null } | null = null;

/** Repo stats, from cache when fresh. Best-effort: any failure yields null, and
 *  the null is cached too so a rate-limit spell doesn't retry on every request. */
export async function githubStats(fetchImpl: typeof fetch): Promise<GithubStats | null> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;

  const headers = { Accept: 'application/vnd.github+json' };
  let data: GithubStats | null;
  try {
    const res = await fetchImpl(`https://api.github.com/repos/${REPO}`, { headers });
    if (!res.ok) throw new Error(`github repo ${res.status}`);
    const repo = await res.json();

    let contributors: number | null = null;
    try {
      const c = await fetchImpl(
        `https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=true`,
        { headers },
      );
      const last = c.headers.get('link')?.match(/[?&]page=(\d+)>;\s*rel="last"/);
      contributors = last ? Number(last[1]) : c.ok ? 1 : null;
    } catch {
      contributors = null;
    }

    data = {
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      contributors,
      license: repo.license?.spdx_id ?? null,
    };
  } catch {
    data = null;
  }

  cache = { at: Date.now(), data };
  return data;
}
