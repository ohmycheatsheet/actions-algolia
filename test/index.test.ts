import { github } from '../src/github'

describe('test', () => {
  it('fetch repo issues should work', async () => {
    const res = await github.issues('JiangWeixian', 'use-rematch')
    expect(res.issues.length).not.toBe(0)
    expect(res.pageInfo).toBeDefined()
  })

  it('fetch repo issues should work', async () => {
    const res = await github.labels('JiangWeixian', 'use-rematch')
    expect(res.labels.length).not.toBe(0)
    expect(res.pageInfo).toBeDefined()
  })
})
