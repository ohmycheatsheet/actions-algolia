import wait from '../src/wait'
import process from 'process'
import cp from 'child_process'
import path from 'path'

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  const delta = Math.abs(end.valueOf() - start.valueOf())
  expect(delta).toBeGreaterThanOrEqual(500)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env.INPUT_MILLISECONDS = 500 as any
  const ip = path.join(__dirname, '../dist/index.js')
  console.log(cp.execSync(`node ${ip}`, { env: process.env }).toString())
})
