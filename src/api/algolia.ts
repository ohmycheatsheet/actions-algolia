import algoliasearch, { SearchIndex } from 'algoliasearch'
import { Issue, Label } from '../types'

const issueClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)
const labelClient = algoliasearch(process.env.ALGOLIA_APPID!, process.env.ALGOLIA_APP_KEY!)

let issueIndex: SearchIndex
let labelIndex: SearchIndex

export const algolia = {
  prefix: 'cheatsheets',
  async ensureInit(repo: string) {
    this.prefix = repo || this.prefix
    if (!this.prefix) {
      console.error('algolia index prefix required')
    }
    labelIndex = labelClient.initIndex(`${this.prefix}_labels`)
    issueIndex = issueClient.initIndex(`${this.prefix}_issues`)
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
    await this.ensureInit(this.prefix)
    issueIndex.saveObjects(cheatsheets, {
      autoGenerateObjectIDIfNotExist: true,
    })
  },
  async uploadTags(tags: Label[]) {
    await this.ensureInit(this.prefix)
    labelIndex.saveObjects(tags, {
      autoGenerateObjectIDIfNotExist: true,
    })
  },
}
