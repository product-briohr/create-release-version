# Jira Release Creator

Browser console script to bulk-create releases in a Jira project using Jira's internal GraphQL persisted-query API. Works with next-gen (team-managed) projects.

## How to use

1. Open https://briohr.atlassian.net (any page — must be logged in)
2. Open browser DevTools console (`F12` → Console tab)
3. Paste the contents of `create_jira_releases.js` and press Enter

## Configuration

Edit the top of `create_jira_releases.js` to update:

- `CONFIG.projectAri` — the ARI of your Jira project
- `CONFIG.pqHash` — persisted query hash (tied to your Jira version)
- `RELEASES` array — list of releases with `name`, `startDate`, `releaseDate`

Dates are in `YYYY-MM-DD` format — the script converts to RFC3339 automatically.

## Release schedule

### Web

| Release | Start | End |
| --- | --- | --- |
| 1.301.0 | May 7, 2026 | May 14, 2026 |
| 1.302.0 | May 14, 2026 | May 21, 2026 |
| 1.303.0 | May 21, 2026 | May 28, 2026 |
| 1.304.0 | May 28, 2026 | Jun 4, 2026 |
| 1.305.0 | Jun 4, 2026 | Jun 11, 2026 |
| 1.306.0 | Jun 11, 2026 | Jun 18, 2026 |
| 1.307.0 | Jun 18, 2026 | Jun 25, 2026 |
| 1.308.0 | Jun 25, 2026 | Jul 2, 2026 |
| 1.309.0 | Jul 2, 2026 | Jul 9, 2026 |
| 1.310.0 | Jul 9, 2026 | Jul 16, 2026 |
| 1.311.0 | Jul 16, 2026 | Jul 23, 2026 |

### Mobile

| Release | Start | End |
| --- | --- | --- |
| 2.0.6 RN Mobile | Apr 23, 2026 | Apr 30, 2026 |
| 2.0.7 RN Mobile | Apr 30, 2026 | May 7, 2026 |
| 2.0.8 RN Mobile | May 7, 2026 | May 14, 2026 |
| 2.0.9 RN Mobile | May 14, 2026 | May 21, 2026 |
| 2.0.10 RN Mobile | May 28, 2026 | Jun 4, 2026 |
| 2.0.11 RN Mobile | Jun 4, 2026 | Jun 11, 2026 |
| 2.0.12 RN Mobile | Jun 11, 2026 | Jun 18, 2026 |
| 2.0.13 RN Mobile | Jun 18, 2026 | Jun 25, 2026 |
| 2.0.14 RN Mobile | Jun 25, 2026 | Jul 2, 2026 |
| 2.0.15 RN Mobile | Jul 2, 2026 | Jul 9, 2026 |
