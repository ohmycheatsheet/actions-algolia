import * as core from '@actions/core'
import { graphql } from '@octokit/graphql'

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})

const getIssues = async () => {
  const response = await graphqlWithAuth(
    `
      query Issues {
        repository(owner: "spring-projects", name: "spring-boot") {
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
  )
  console.log(response)
}

// most @actions toolkit packages have async methods
async function run() {
  try {
    await getIssues()
  } catch (error) {
    console.log(error)
    core.setFailed((error as any).message)
  }
}

run()
