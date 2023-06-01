import * as bcrypt from 'bcrypt';

export class AuthUtils {
  static async generatePasswordHash(password: string) {
    const rounds = process.env.SALT_ROUNDS;

    if (!rounds) {
      throw new Error('Salt rounds undefine in the enviroment');
    }

    const saltRounds = Number.parseInt(rounds);
    const hash = await bcrypt.hash(password, saltRounds);

    return !hash ? null : hash;
  }

  static async checkPassword(password: string, hash: string) {
    const match = await bcrypt.compare(password, hash.toString());

    return match;
  }
}