import * as core from '@actions/core'
import { api } from './github'
import { algolia } from './algolia'

// most @actions toolkit packages have async methods
async function run() {
  try {
    const repo = process.env.GITHUB_REPOSITORY
    const [owner, name] = repo?.split('/') || []
    await api.issueCount(owner, name)
    const issues = await api.issues(owner, name)
    const cheatsheets = issues.map(item => {
      return {
        ...item,
        objectID: item.id,
      }
    })
    await algolia.uploadCheatsheets(cheatsheets)
    const labels = await api.labels(owner, name)
    const tags = labels.map(item => {
      return {
        ...item,
        objectID: item.id,
      }
    })
    await algolia.uploadTags(tags)
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
