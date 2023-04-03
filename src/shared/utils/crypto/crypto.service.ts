import * as bcrypt from 'bcryptjs';

export class CryptoService {
  public async hash(target: string, salt: number): Promise<string> {
    return await bcrypt.hash(target, salt);
  }

  public async compareHash(target: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(target, hash);
  }
}
