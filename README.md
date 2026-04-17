# Jira Release Creator

Browser console script to bulk-create releases in a Jira project using the Atlassian GraphQL API.

## How to use

1. Open your Jira project releases page (e.g. `https://briohr.atlassian.net/projects/B2?selectedItem=...release-page`)
2. Open browser DevTools console (`F12` → Console tab)
3. Paste the contents of `create_jira_releases.js` and press Enter

## Configuration

Edit the top of `create_jira_releases.js` to update:

- `CONFIG.projectId` — the ARI of your Jira project
- `CONFIG.graphqlEndpoint` — persisted query hash (tied to your Jira version)
- `RELEASES` array — list of releases with `name`, `startDate`, `releaseDate`

## Release schedule created

### Web

| Release  | Start       | End         |
|----------|-------------|-------------|
| 1.301.0  | May 7, 2026 | May 14, 2026 |
| 1.302.0  | May 14, 2026 | May 21, 2026 |
| 1.303.0  | May 21, 2026 | May 28, 2026 |
| 1.304.0  | May 28, 2026 | Jun 4, 2026  |
| 1.305.0  | Jun 4, 2026  | Jun 11, 2026 |

### Mobile

| Release        | Start        | End          |
|----------------|--------------|--------------|
| 2.0.6 RN Mobile | Apr 23, 2026 | Apr 30, 2026 |
| 2.0.7 RN Mobile | Apr 30, 2026 | May 7, 2026  |
| 2.0.8 RN Mobile | May 7, 2026  | May 14, 2026 |
| 2.0.9 RN Mobile | May 14, 2026 | May 21, 2026 |
| 2.0.10 RN Mobile | May 21, 2026 | May 28, 2026 |
