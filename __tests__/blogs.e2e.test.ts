import { req } from "./helpers/test-helpers";
import { CONFIG } from "../src/config";
import { blogCollection, connectToDB } from "../src/db/mongoDb";

describe(CONFIG.PATH.BLOGS, () => {
  beforeAll(async () => {
    // очистка базы данных перед началом тестирования
    await connectToDB();
    await blogCollection.deleteMany();
  });

  it("should get empty array", async () => {
    const res = await req.get(CONFIG.PATH.BLOGS).expect(200); // проверяем наличие эндпоинта

    expect(res.body.length).toEqual(0); // проверяем ответ эндпоинта
  });
});
