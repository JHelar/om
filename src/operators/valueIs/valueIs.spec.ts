import { take } from '../take';
import { valueIs } from './valueIs';

describe('operators', () => {
  describe('valueIs', () => {
    it('should return true if value strictly compare to taken value', () => {
      const takeTest = take('test');
      const isTest = valueIs(takeTest, 'one');

      const actual = isTest({
        test: 'one'
      });

      expect(actual).toEqual(true);
    });

    it('should return true if pred returns true', () => {
      const takeTest = take('test');
      const isTest = valueIs(takeTest, (value) => value === 'one');

      const actual = isTest({
        test: 'one'
      });

      expect(actual).toEqual(true);
    });

    it('should return false if pred returns false', () => {
      const takeTest = take('test');
      const isTest = valueIs(takeTest, (value) => value === 'nope');

      const actual = isTest({
        test: 'one'
      });

      expect(actual).toEqual(false);
    });
  });
});
