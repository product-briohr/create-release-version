/**
 * Jira Release Creator - Browser Console Script
 *
 * Uses Jira's internal GraphQL persisted-query API (the same call the UI makes),
 * which works for next-gen (team-managed) projects like Brio DEV (B2).
 *
 * HOW TO RUN:
 *   1. Open https://briohr.atlassian.net (any page - must be logged in)
 *   2. Open DevTools console (F12 -> Console)
 *   3. Paste this entire file and press Enter
 */

const CONFIG = {
  projectAri: 'ari:cloud:jira:e38dd556-d5ba-4444-8e93-93420ba8123c:project/10013',
  pqHash:     '1770d793cb1ed228281f0e0b230266b11e72ff6b1c4dc442313198991e2483ae',
  operation:  'CreateReleaseFormMutation'
};

// Edit this list before running - add or remove releases as needed.
// Dates must be YYYY-MM-DD format (the script converts them to RFC3339 automatically).
const RELEASES = [
  // Web releases (next 5 after 1.306.0)
  { name: '1.307.0', startDate: '2026-06-18', releaseDate: '2026-06-25' },
  { name: '1.308.0', startDate: '2026-06-25', releaseDate: '2026-07-02' },
  { name: '1.309.0', startDate: '2026-07-02', releaseDate: '2026-07-09' },
  { name: '1.310.0', startDate: '2026-07-09', releaseDate: '2026-07-16' },
  { name: '1.311.0', startDate: '2026-07-16', releaseDate: '2026-07-23' },

  // Mobile releases (next 5 after 2.0.10 RN Mobile)
  { name: '2.0.11 RN Mobile', startDate: '2026-06-04', releaseDate: '2026-06-11' },
  { name: '2.0.12 RN Mobile', startDate: '2026-06-11', releaseDate: '2026-06-18' },
  { name: '2.0.13 RN Mobile', startDate: '2026-06-18', releaseDate: '2026-06-25' },
  { name: '2.0.14 RN Mobile', startDate: '2026-06-25', releaseDate: '2026-07-02' },
  { name: '2.0.15 RN Mobile', startDate: '2026-07-02', releaseDate: '2026-07-09' }
];

// Converts "YYYY-MM-DD" to RFC3339 format required by the API
function toRFC3339(date) {
  return date + 'T00:00:00.000Z';
}

async function createRelease(release) {
  const url = '/gateway/api/graphql/pq/' + CONFIG.pqHash + '?operation=' + CONFIG.operation;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input: {
          projectId:   CONFIG.projectAri,
          name:        release.name,
          startDate:   toRFC3339(release.startDate),
          releaseDate: toRFC3339(release.releaseDate)
        }
      }
    })
  });

  const { data, errors } = await res.json();
  if (errors && errors.length) throw new Error(errors.map(e => e.message).join('; '));
  if (!data.jira.createJiraVersion.success) {
    throw new Error(data.jira.createJiraVersion.errors.map(e => e.message).join('; ') || 'Unknown error');
  }
  return data.jira.createJiraVersion.version;
}

(async () => {
  console.log('Creating ' + RELEASES.length + ' releases for Brio DEV (B2)...');
  const results = { success: [], failed: [] };

  for (const release of RELEASES) {
    try {
      const version = await createRelease(release);
      console.log('Created: ' + release.name + ' (id: ' + version.versionId + ')');
      results.success.push(release.name);
    } catch (err) {
      console.error('Failed: ' + release.name + ' - ' + err.message);
      results.failed.push({ name: release.name, error: err.message });
    }
  }

  console.log('Summary: ' + results.success.length + ' created, ' + results.failed.length + ' failed');
  if (results.failed.length > 0) console.warn('Failed:', results.failed);
  else console.log('All releases created successfully!');
})();
