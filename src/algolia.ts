import algoliasearch, { SearchIndex } from 'algoliasearch'

const issueClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)

const labelClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)

let issueIndex: SearchIndex

export const algolia = {
  async ensureInit() {
    labelClient.initIndex('actions_cheatsheet_labels')
    issueIndex = issueClient.initIndex('actions_cheatsheet_issues')
  },
  async upload(cheatsheets: any) {
    await this.ensureInit()
    issueIndex.saveObjects(cheatsheets, {
      autoGenerateObjectIDIfNotExist: true,
    })
  },
}
