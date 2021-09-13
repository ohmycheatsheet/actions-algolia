import * as core from '@actions/core'
import { graphql } from '@octokit/graphql'

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})

const getIssues = async (owner: string, name: string) => {
  const response = await graphqlWithAuth(
    `
      query Issues($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          issues(last: 3) {
            edges {
              node {
                number
                title
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
}

// most @actions toolkit packages have async methods
async function run() {
  try {
    const repo = process.env.GITHUB_REPOSITORY
    const [owner, name] = repo?.split('/') || []
    await getIssues(owner, name)
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
