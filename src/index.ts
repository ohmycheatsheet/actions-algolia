import * as core from '@actions/core'
import { api } from './github'
import {} from './algolia'

// most @actions toolkit packages have async methods
async function run() {
  try {
    const repo = process.env.GITHUB_REPOSITORY
    const [owner, name] = repo?.split('/') || []
    await api.issueCount(owner, name)
    await api.issues(owner, name)
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
