import algoliasearch, { SearchIndex } from 'algoliasearch'
import { Issue, Label } from '../types'

const issueClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)
const labelClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)

let issueIndex: SearchIndex
let labelIndex: SearchIndex

export const algolia = {
  async ensureInit() {
    labelIndex = labelClient.initIndex('actions_cheatsheet_labels')
    issueIndex = issueClient.initIndex('actions_cheatsheet_issues')
    issueIndex.setSettings({
      searchableAttributes: ['title', 'description', 'body'],
      attributesForFaceting: ['state', 'filterOnly(labels.name)', 'filterOnly(labels.id)'],
      customRanking: ['desc(updatedAt_timestamp)'],
    })
    labelIndex.setSettings({
      searchableAttributes: ['name', 'description'],
    })
  },
  async uploadCheatsheets(cheatsheets: Issue[]) {
    await this.ensureInit()
    issueIndex.saveObjects(cheatsheets, {
      autoGenerateObjectIDIfNotExist: true,
    })
  },
  async uploadTags(tags: Label[]) {
    await this.ensureInit()
    labelIndex.saveObjects(tags, {
      autoGenerateObjectIDIfNotExist: true,
    })
  },
}
