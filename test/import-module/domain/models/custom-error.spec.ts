import { DatabaseError } from '../../../../src/import-module/domain/models/database-error';
import { IntegrationServiceError } from '../../../../src/import-module/domain/models/integration-service-error';
describe('CustomError', () => {
  describe('parent', () => {
    it('should return the parent error', () => {
      const originalError = new Error('any_error');
      const customError = new DatabaseError(
        'any_database_error',
        originalError,
      );

      expect(customError.parent).toEqual(originalError);
    });
  });

  describe('getCompleteErrorMessage', () => {
    it('should return the error message with the parent error message', () => {
      const originalError = new Error('any_error');
      const customError = new IntegrationServiceError(
        'any_integration_error',
        originalError,
      );
      const expected = `${customError.message}: ${originalError.message}`;
      expect(customError.getCompleteErrorMessage()).toEqual(expected);
    });
  });
});
