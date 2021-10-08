import { Issue, Label } from './types'
import dayjs from 'dayjs'
import omit from 'lodash.omit'

type LabelNode = { node: Label }
type IssueNode = { node: Issue }

export const normalize = {
  label(label: LabelNode) {
    return {
      ...label.node,
      objectID: label.node.id,
      updatedAt_timestamp: dayjs(label.node.updatedAt).unix(),
      createdAt_timestamp: dayjs(label.node.createdAt).unix(),
    }
  },
  labels(labels: LabelNode[]) {
    return labels.map(this.label)
  },
  issue(issue: Issue) {
    const labels = (issue.labels as any).edges.map((label: any) =>
      omit(this.label(label), ['objectID', 'updatedAt_timestamp', 'createdAt_timestamp']),
    )
    return {
      ...issue,
      objectID: issue.id,
      labels,
      // date -> timestamp
      updatedAt_timestamp: dayjs(issue.updatedAt).unix(),
      createdAt_timestamp: dayjs(issue.createdAt).unix(),
    }
  },
  issues(issues: IssueNode[]) {
    return issues.map(issue => normalize.issue(issue.node))
  },
}
