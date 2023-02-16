export abstract class CustomError extends Error {
  private _parent: Error;

  constructor(customMessage: string, originalError: Error) {
    super(customMessage);
    this._parent = originalError;
  }

  get parent(): Error {
    return this._parent;
  }

  getCompleteErrorMessage(): string {
    return `${this.message}: ${this.parent?.message}`;
  }
}
