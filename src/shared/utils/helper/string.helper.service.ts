import { Injectable } from '@nestjs/common';

@Injectable()
export class StringHelperService {
  public escapeSpecialCharacters(keyword: string): string {
    const escapedKeyword: string = keyword;
    if (typeof escapedKeyword !== 'string') {
      throw new TypeError('Expected a string');
    }

    return escapedKeyword
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      .replace(/-/g, '\\x2d');
  }
}
