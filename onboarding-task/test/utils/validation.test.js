import { isNullOrWhitespace } from '../../src/utils/validation.ts';

describe('validation', () => {
  describe('isNullOrWhitespace', () => {
    it('returns true on null input', () => {
      const expectedValue = true;
      const actualValue = isNullOrWhitespace(null);

      expect(actualValue).toBe(expectedValue);
    });

    it('returns true on undefined', () => {
      const expectedValue = true;
      const actualValue = isNullOrWhitespace(undefined);

      expect(actualValue).toBe(expectedValue);
    });

    it('returns true on whitespace', () => {
      const expectedValue = true;
      const actualValue = isNullOrWhitespace(' ');

      expect(actualValue).toBe(expectedValue);
    });

    it('returns true on empty string', () => {
      const expectedValue = true;
      const actualValue = isNullOrWhitespace('');

      expect(actualValue).toBe(expectedValue);
    });

    it('returns false on a valid string', () => {
      const expectedValue = false;
      const actualValue = isNullOrWhitespace('abc');

      expect(actualValue).toBe(expectedValue);
    });
  });
});
