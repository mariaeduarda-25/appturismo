export class Photo {
  private constructor(readonly url: string) {}

  static create(url: string): Photo {
    if (!this.validate(url)) {
      throw new Error('URL da foto inválida');
    }
    return new Photo(url);
  }

  private static validate(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}