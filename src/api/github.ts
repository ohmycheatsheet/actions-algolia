import { graphql } from '@octokit/graphql'
import { Issue, Label } from '../types'
import { normalize } from '../utils'

export const gql = String.raw

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})

export const github = {
  issueCount: async (owner: string, name: string): Promise<number> => {
    const response: any = await graphqlWithAuth(
      `
        query Issues($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            issues {
              totalCount
            }
          }
        }
      `,
      {
        owner,
        name,
      },
    )
    console.log(response)
    return response.repository.issues.totalCount
  },
  labelCount: async (owner: string, name: string): Promise<number> => {
    const response: any = await graphqlWithAuth(
      `
        query Issues($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            labels {
              totalCount
            }
          }
        }
      `,
      {
        owner,
        name,
      },
    )
    console.log(response)
    return response.repository.labels.totalCount
  },
  labels: async (
    owner: string,
    name: string,
    after?: string,
  ): Promise<{
    labels: Label[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }> => {
    const response: any = await graphqlWithAuth(
      gql`
        query Labels($owner: String!, $name: String!, $after: String) {
          repository(owner: $owner, name: $name) {
            labels(first: 10, after: $after) {
              edges {
                node {
                  id
                  description
                  name
                  color
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      `,
      {
        owner,
        name,
        after,
      },
    )
    console.log(response)
    const labels = normalize.labels(response.repository.labels.edges)
    const pageInfo = response.repository.labels.pageInfo
    return {
      labels,
      pageInfo,
    }
  },
  issues: async (
    owner: string,
    name: string,
    after?: string,
  ): Promise<{
    issues: Issue[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }> => {
    const response: any = await graphqlWithAuth(
      gql`
        query Issues($owner: String!, $name: String!, $after: String) {
          repository(owner: $owner, name: $name) {
            issues(first: 10, after: $after, states: OPEN) {
              edges {
                node {
                  id
                  number
                  title
                  body
                  createdAt
                  updatedAt
                  state
                  labels(last: 10) {
                    edges {
                      node {
                        id
                        color
                        description
                        name
                        createdAt
                        updatedAt
                      }
                    }
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      `,
      {
        owner,
        name,
        after,
      },
    )
    const issues = normalize.issues(response.repository.issues.edges)
    const pageInfo = response.repository.issues.pageInfo
    return {
      issues,
      pageInfo,
    }
  },
  issue: async (owner: string, name: string, number: number): Promise<Issue> => {
    const response: any = await graphqlWithAuth(
      gql`
        query($owner: String!, $name: String!, $number: Int!) {
          repository(owner: $owner, name: $name) {
            issue(number: $number) {
              id
              number
              title
              body
              createdAt
              updatedAt
              state
              labels(last: 10) {
                edges {
                  node {
                    id
                    color
                    description
                    name
                    createdAt
                    updatedAt
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner,
        name,
        number,
      },
    )
    return response.repository.issue
  },
}
