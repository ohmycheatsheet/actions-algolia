import { api } from '../src/api'

describe('test', () => {
  it('fetch repo issues should work', async () => {
    const res = await api.github.issues('JiangWeixian', 'use-rematch')
    expect(res.issues.length).not.toBe(0)
    expect(res.pageInfo).toBeDefined()
  })

  it('fetch repo issues should work', async () => {
    const res = await api.github.labels('JiangWeixian', 'use-rematch')
    expect(res.labels.length).not.toBe(0)
    expect(res.pageInfo).toBeDefined()
  })

  it('fetch repo issue by issue number should work', async () => {
    const res = await api.github.issue('ohmycheatsheet', 'actions-algolia', 6)
    expect(res.number).toBe(6)
  })
})
