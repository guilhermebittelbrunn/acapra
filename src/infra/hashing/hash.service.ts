import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashService {
  hash(plainText: string) {
    return argon.hash(plainText);
  }

  compare(hash: string, plainText: string) {
    return argon.verify(hash, plainText);
  }
}
