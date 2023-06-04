import { take } from './take.types';

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
      } | null;
    }
  | null;

describe('operators', () => {
  describe('take', () => {
    it('should retrive value at given prop string', () => {
      const mockValue = 'TEST';
      const testObject: TestShape = {
        __typename: 'BAR',
        test: 'test',
        value: {
          bar: mockValue
        }
      };
      const actual = take('value.bar').transform(testObject);

      expect(actual).toEqual(mockValue);
    });

    it('should retrun whole objects', () => {
      const mockValue = {
        nested: {
          result: {
            value: 123
          }
        }
      };
      const testObject = {
        __typename: 'BAR',
        test: 'test',
        value: {
          bar: mockValue
        }
      };
      const actual = take('value.bar').transform(testObject);

      expect(actual).toEqual(mockValue);
    });

    it('should return the set default value', () => {
      const mockDefaultValue = 'DEFAULT VALUE';
      const actual = take('value.bar').default(mockDefaultValue).transform({
        value: undefined
      });

      expect(actual).toEqual(mockDefaultValue);
    });

    it('should handle null as first prop', () => {
      const actual = take('maybe.foo.bar').transform({ maybe: null });

      expect(actual).toEqual(null);
    });
  });
});
