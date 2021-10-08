import { api } from '../src/api'

describe('test', () => {
  it('fetch repo issues should work', async () => {
    const res = await api.github.issues('JiangWeixian', 'use-rematch')
    expect(res.issues).toMatchSnapshot()
    expect(res.pageInfo).toBeDefined()
  })

  it('fetch repo labels should work', async () => {
    const res = await api.github.labels('JiangWeixian', 'use-rematch')
    expect(res.labels).toMatchSnapshot()
    expect(res.pageInfo).toBeDefined()
  })

  it('fetch repo issue by issue number should work', async () => {
    const res = await api.github.issue('ohmycheatsheet', 'actions-algolia', 6)
    expect(res.number).toBe(6)
  })

  it('sync single issue to algolia should work', async () => {
    await api.algolia.ensureInit('actions-algolia')
    const issue = await api.issue('ohmycheatsheet', 'actions-algolia', 6)
    expect(issue).toMatchSnapshot()
  })
})
