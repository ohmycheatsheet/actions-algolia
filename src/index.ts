import * as core from '@actions/core'
import * as github from '@actions/github'
import { api } from './api'

// most @actions toolkit packages have async methods
async function run() {
  try {
    // https://docs.github.com/cn/developers/webhooks-and-events/events/github-event-types#issuesevent
    const issue = await api.github.issue(
      github.context.issue.owner,
      github.context.issue.repo,
      github.context.issue.number,
    )
    console.log(issue)
    // const repo = process.env.GITHUB_REPOSITORY
    // const [owner, name] = repo?.split('/') || []
    // await syncIssues(owner, name)
    // await syncLabels(owner, name)
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
