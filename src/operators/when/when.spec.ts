import { take } from '../take';
import { when } from './when';

describe('operators', () => {
  describe('when', () => {
    it('should retrive the the value if true', () => {
      const mockPredicateValue = 'TEST';
      const mockValue = true;

      const take1 = take('test.nested.value');
      const take2 = take('test.nested2.boolValue');

      const actual = when(
        take1,
        take2
      )({
        test: {
          nested: {
            value: mockPredicateValue
          },
          nested2: {
            boolValue: mockValue,
            value: ''
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should return null if false', () => {
      const mockPredicateValue = false;
      const mockValue = true;

      const take1 = take('test.nested.value');
      const take2 = take('test.nested2.boolValue');

      const actual = when(
        take1,
        take2
      )({
        test: {
          nested: {
            value: mockPredicateValue
          },
          nested2: {
            boolValue: mockValue,
            value: ''
          }
        }
      });

      expect(actual).toEqual(null);
    });
  });
});
