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
      const actual = take('value.bar')(testObject);

      expect(actual).toEqual(mockValue);
    });

    it('should handle null in property path', () => {
      const mockValue = 'TEST';
      const testObject: TestShape = {
        __typename: 'BAR',
        test: 'test',
        value: {
          bar: mockValue
        }
      };
      const actual = take('value.foo')(testObject);

      expect(actual).toEqual(null);
    });

    it('should handle null as first prop', () => {
      const actual = take('maybe.foo.bar')({ maybe: null });

      expect(actual).toEqual(null);
    });
  });
});
