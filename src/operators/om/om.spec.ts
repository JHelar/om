import { take } from '../take';
import { om } from './om';

describe('operators', () => {
  describe('om', () => {
    it('should correctly map to given object schema', () => {
      const mockValue = 'TEST';
      const test = take('test.nested.value');
      const mapObject = om({
        test
      });

      const actual = mapObject({
        test: {
          nested: {
            value: mockValue
          }
        }
      });

      expect(actual).toEqual({ test: mockValue });
    });

    it('should be able to nestle om in same schema', () => {
      const mockNestedValue = 'TEST';
      const mockBoolValue = false;

      const takeNestedValue = take('test.nested.value');

      const takeBoolValue = take('test.nested2.boolValue');

      const mapObject = om({
        boolValue: takeBoolValue,
        obj: om({
          nested: takeNestedValue
        })
      });

      const actual = mapObject({
        test: {
          nested: {
            value: mockNestedValue
          },
          nested2: {
            boolValue: mockBoolValue
          }
        }
      });

      expect(actual).toEqual({
        boolValue: mockBoolValue,
        obj: { nested: mockNestedValue }
      });
    });
  });
});
