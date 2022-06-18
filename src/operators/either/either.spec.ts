import { take } from '../take';
import { either } from './either';

describe('operators', () => {
  describe('either', () => {
    it('should retrive the first defined property value', () => {
      const mockValue = 'TEST';
      const take1 = take('test.nested.value');
      const take2 = take('test.nested2.value');
      const take3 = take('test.nested');

      const actual = either(
        take1,
        take2,
        take3
      )({
        test: {
          nested: {
            value: mockValue
          },
          nested2: {
            value: false
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should retrive the second value if the first one is not defined', () => {
      const mockValue = 'TEST';
      const take1 = take('test.nested.value');
      const take2 = take('test.nested2.value');

      const actual = either(
        take1,
        take2
      )({
        test: {
          nested: {
            value: null
          },
          nested2: {
            value: mockValue,
            boolValue: false
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should return null if either values are not defined', () => {
      const take1 = take('test.nested.value');
      const take2 = take('test.nested2.value');

      const actual = either(
        take1,
        take2
      )({
        test: {
          nested: {
            value: null
          }
        }
      });

      expect(actual).toEqual(null);
    });
  });
});
