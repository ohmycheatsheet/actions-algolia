import * as core from '@actions/core'
import { github } from './github'
import { algolia } from './algolia'

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

// most @actions toolkit packages have async methods
async function run() {
  try {
    const repo = process.env.GITHUB_REPOSITORY
    const [owner, name] = repo?.split('/') || []
    await syncIssues(owner, name)
    await syncLabels(owner, name)
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
