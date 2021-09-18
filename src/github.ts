import { graphql } from '@octokit/graphql'

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})

export const api = {
  issueCount: async (owner: string, name: string) => {
    const response = await graphqlWithAuth(
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
    return response
  },
  labelCount: async (owner: string, name: string) => {
    const response = await graphqlWithAuth(
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
    return response
  },
  labels: async (owner: string, name: string) => {
    const response = await graphqlWithAuth(
      `
        query Issues($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            labels(first: 10) {
              edges {
                node {
                  id,
                  description,
                  name,
                  color
                }
              }
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
    return response
  },
  issues: async (owner: string, name: string) => {
    const response = await graphqlWithAuth(
      `
        query Issues($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            issues(last: 3, states: OPEN) {
              edges {
                node {
                  id,
                  number
                  title,
                  body,
                  createdAt,
                  updatedAt,
                  state,
                  labels(last: 10) {
                    edges {
                      node {
                        id,
                        color,
                        description,
                        name,
                        createdAt,
                        updatedAt
                      }
                    }
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
      },
    )
    console.log(response)
    return response
  },
}
