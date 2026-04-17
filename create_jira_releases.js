/**
 * Jira Release Creator
 *
 * Creates releases in a Jira project via the Atlassian GraphQL API.
 * Run this script in the browser console while logged into Jira.
 *
 * Usage:
 *   1. Open your Jira project releases page
 *   2. Open browser DevTools console (F12)
 *   3. Paste and run this script
 */

const CONFIG = {
  projectId: 'ari:cloud:jira:e38dd556-d5ba-4444-8e93-93420ba8123c:project/10013',
  graphqlEndpoint:
    '/gateway/api/graphql/pq/20f1abdf82cd2fc04e74c89cf5262ca65c8f5cee64af4a51dd60e2a449c97a0d?operation=createReleaseForm_createReleaseMutation',
};

// Releases to create
// Format: { name, startDate, releaseDate } — dates in ISO 8601 format
const RELEASES = [
  // Web releases
  { name: '1.301.0', startDate: '2026-05-07T00:00:00.000Z', releaseDate: '2026-05-14T00:00:00.000Z' },
  { name: '1.302.0', startDate: '2026-05-14T00:00:00.000Z', releaseDate: '2026-05-21T00:00:00.000Z' },
  { name: '1.303.0', startDate: '2026-05-21T00:00:00.000Z', releaseDate: '2026-05-28T00:00:00.000Z' },
  { name: '1.304.0', startDate: '2026-05-28T00:00:00.000Z', releaseDate: '2026-06-04T00:00:00.000Z' },
  { name: '1.305.0', startDate: '2026-06-04T00:00:00.000Z', releaseDate: '2026-06-11T00:00:00.000Z' },

  // Mobile releases
  { name: '2.0.6 RN Mobile', startDate: '2026-04-23T00:00:00.000Z', releaseDate: '2026-04-30T00:00:00.000Z' },
  { name: '2.0.7 RN Mobile', startDate: '2026-04-30T00:00:00.000Z', releaseDate: '2026-05-07T00:00:00.000Z' },
  { name: '2.0.8 RN Mobile', startDate: '2026-05-07T00:00:00.000Z', releaseDate: '2026-05-14T00:00:00.000Z' },
  { name: '2.0.9 RN Mobile', startDate: '2026-05-14T00:00:00.000Z', releaseDate: '2026-05-21T00:00:00.000Z' },
  { name: '2.0.10 RN Mobile', startDate: '2026-05-21T00:00:00.000Z', releaseDate: '2026-05-28T00:00:00.000Z' },
];

async function createRelease(release) {
  const response = await fetch(CONFIG.graphqlEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input: {
          name: release.name,
          projectId: CONFIG.projectId,
          startDate: release.startDate,
          releaseDate: release.releaseDate,
        },
      },
    }),
  });

  const data = await response.json();
  const version = data?.data?.jira?.createJiraVersion?.version;
  const errors = data?.data?.jira?.createJiraVersion?.errors;

  if (version) {
    return { success: true, name: version.name, id: version.versionId };
  } else {
    return { success: false, name: release.name, errors };
  }
}

async function createAllReleases() {
  console.log(`Creating ${RELEASES.length} releases...`);
  const results = [];

  for (const release of RELEASES) {
    const result = await createRelease(release);
    if (result.success) {
      console.log(`✅ Created: ${result.name} (id: ${result.id})`);
    } else {
      console.error(`❌ Failed: ${release.name}`, result.errors);
    }
    results.push(result);
  }

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  console.log(`\nDone: ${succeeded} created, ${failed} failed`);
  return results;
}

createAllReleases();
