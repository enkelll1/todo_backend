import * as bcrypt from 'bcrypt'

export class Crypt {
  static async hash(plain: string): Promise<string> {
    try {
      const hashed = await bcrypt.hash(plain, 10)
      return Promise.resolve(hashed)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async compare(plain: string, hash: string): Promise<boolean> {
    try {
      const res = await bcrypt.compare(plain, hash)
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
