import {req} from './helpers/test-helpers'
import {connectToDB, postCollection} from "../src/db/mongoDb";
import {CONFIG} from "../src/config";

describe(CONFIG.PATH.POSTS, () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        await connectToDB()
        await postCollection.deleteMany()
    })

    it('should get empty array', async () => {
        const res = await req
          .get(CONFIG.PATH.POSTS)
          .expect(200) // проверяем наличие эндпоинта

        expect(res.body.length).toEqual(0) // проверяем ответ эндпоинта
    })
})
