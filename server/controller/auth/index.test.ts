import auth from "./index"
import {describe, test, expect} from "vitest"
describe('Example', () => {
    test('GET /auth', async () => {
      const res = await auth.request('/hello', {
        method:"POST"
      })
      expect(await res.json()).toEqual({
        message: 'Hello world',
      })
    })
  })