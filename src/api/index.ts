import { algolia } from './algolia'
import { github } from './github'

const syncIssues = async (owner: string, name: string) => {
  let { issues, pageInfo } = await github.issues(owner, name)
  let after
  for (; ; after = pageInfo.endCursor) {
    ;({ issues, pageInfo } = await github.issues(owner, name, after))
    const cheatsheets = issues.map(item => {
      return {
        ...item,
        objectID: item.id,
      }
    })
    await algolia.uploadCheatsheets(cheatsheets)
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
    const tags = labels.map(item => {
      return {
        ...item,
        objectID: item.id,
      }
    })
    await algolia.uploadTags(tags)
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
    await api.github.issue(owner, name, number)
  },
}
