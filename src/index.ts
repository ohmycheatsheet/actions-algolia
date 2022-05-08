import * as core from '@actions/core'
import * as github from '@actions/github'
import { api } from './api'
import { AllowEvent } from './types'

async function run() {
  try {
    const eventName: AllowEvent = (github.context.eventName as unknown) as AllowEvent
    console.log(github.context)
    await api.algolia.ensureInit(github.context.repo.repo)
    switch (eventName) {
      case 'issues':
        // https://docs.github.com/cn/developers/webhooks-and-events/events/github-event-types#issuesevent
        api.issue(
          github.context.issue.owner,
          github.context.issue.repo,
          github.context.issue.number,
        )
        break
      case 'push':
        if (core.getInput('debug')) {
          api.schedule(github.context.issue.owner, github.context.issue.repo)
        }
        break
      case 'label':
      case 'schedule':
        api.schedule(github.context.issue.owner, github.context.issue.repo)
        break
      default:
        break
    }
    console.log(github.context.eventName)
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
