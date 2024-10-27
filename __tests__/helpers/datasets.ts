import {fromUTF8ToBase64} from '../../src/global-middlewares/admin-middleware'
import {CONFIG} from "../../src/config";

// готовые данные для переиспользования в тестах

export const codedAuth = fromUTF8ToBase64(CONFIG.ADMIN)

export const createString = (length: number) => {
    let s = ''
    for (let x = 1; x <= length; x++) {
        s += x % 10
    }
    return s
}


