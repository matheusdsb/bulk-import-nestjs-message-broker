import { CustomError } from '../models/custom-error';

export class ErrorHelper {
  static extractMessage(error: Error): string {
    if (error instanceof CustomError) {
      return error.getCompleteErrorMessage();
    }
    return error.message;
  }
}
