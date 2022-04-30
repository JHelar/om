import { take } from './take';

type FooObject = {
  one: string;
  two: string;
  three: string;
};

type TestShape =
  | {
      __typename: 'FOO';
      value: {
        foo: FooObject;
      };
    }
  | {
      __typename: 'BAR';
      test: string;
      value: {
        bar: string;
      };
    }
  | {
      __typename: 'MAYBE';
      maybe?: {
        value: string[];
      };
    };

describe('operators', () => {
  describe('take', () => {
    it('should retrive value at given prop string', () => {
      const mockValue = 'TEST';
      const actual = take('test.nested.value')({
        test: {
          nested: {
            value: mockValue
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should handle null in property path', () => {
      const actual = take('test.nested.value')({
        test: {
          nested: null
        }
      });

      expect(actual).toEqual(null);
    });

    it('should handle null as first prop', () => {
      const actual = take('test.nested.value')({
        test: null
      });

      expect(actual).toEqual(null);
    });
  });
});
