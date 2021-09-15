import algoliasearch from 'algoliasearch'

const issueClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)

const labelClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)

export const algolia = {
  async ensureInit() {
    labelClient.initIndex('cheatsheet_labels')
    issueClient.initIndex('cheatsheet_issues')
  },
}
