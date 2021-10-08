import { algolia } from './algolia'
import { github } from './github'
import { normalize } from '../utils'

const syncIssues = async (owner: string, name: string) => {
  let { issues, pageInfo } = await github.issues(owner, name)
  let after
  for (; ; after = pageInfo.endCursor) {
    ;({ issues, pageInfo } = await github.issues(owner, name, after))
    await algolia.uploadCheatsheets(issues)
    if (!pageInfo.hasNextPage) {
      break
    }
  }
}

const syncLabels = async (owner: string, name: string) => {
  let { labels, pageInfo } = await github.labels(owner, name)
  let after
  for (; ; after = pageInfo.endCursor) {
    ;({ labels, pageInfo } = await github.labels(owner, name, after))
    await algolia.uploadTags(labels)
    if (!pageInfo.hasNextPage) {
      break
    }
  }
}

export const api = {
  github,
  algolia,
  schedule: async (owner: string, name: string) => {
    await syncIssues(owner, name)
    await syncLabels(owner, name)
  },
  issue: async (owner: string, name: string, number: number) => {
    const issue = await api.github.issue(owner, name, number)
    const tags = normalize.labels((issue.labels as any).edges)
    const cheatsheets = [normalize.issue(issue)]
    await algolia.uploadCheatsheets(cheatsheets)
    await algolia.uploadTags(tags)
    return cheatsheets
  },
}
