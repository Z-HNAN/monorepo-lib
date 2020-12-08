import { add, addAsync } from '../src/index'
// 延长测试超时10s
jest.setTimeout(10000);

describe('test add', () => {
  test('sync add', () => {
    expect(add(1, 2)).toBe(3)
  })

  test('async add', async () => {
    expect.assertions(1)

    const sum = await addAsync(1, 2)
    expect(sum).toBe(3)
  })
})
