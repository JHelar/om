import { take, either, when } from './operators';

type TestFromObject = {
  test: {
    nested: {
      value: string | null;
    } | null;
    nested2?: {
      value: string;
      boolValue: boolean;
    };
  } | null;
};

type FooObject = {
  one: string;
  two: string;
  three: string;
};

type TestJoinedObject =
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
    };

describe('operators', () => {
  describe('take', () => {
    it('should retrive value at given prop string', () => {
      const mockValue = 'TEST';
      const actual = take<TestFromObject>('test.nested.value' as any)({
        test: {
          nested: {
            value: mockValue
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should handle null in property path', () => {
      const actual = take<TestFromObject>('test.nested.value' as any)({
        test: {
          nested: null
        }
      });

      expect(actual).toEqual(null);
    });

    it('should handle null as first prop', () => {
      const actual = take<TestFromObject>('test.nested.value' as any)({
        test: null
      });

      expect(actual).toEqual(null);
    });
  });

  describe('either', () => {
    it('should retrive the first defined property value', () => {
      const mockValue = 'TEST';
      const take1 = take<TestFromObject>('test.nested.value' as any);
      const take2 = take<TestFromObject>('test.nested2.value' as any);

      const actual = either(
        take1,
        take2
      )({
        test: {
          nested: {
            value: mockValue
          },
          nested2: {
            value: mockValue + '2',
            boolValue: false
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should retrive the second value if the first one is not defined', () => {
      const mockValue = 'TEST';
      const take1 = take<TestFromObject>('test.nested.value' as any);
      const take2 = take<TestFromObject>('test.nested2.value' as any);

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
      const take1 = take<TestFromObject>('test.nested.value' as any);
      const take2 = take<TestFromObject>('test.nested2.value' as any);

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

  describe('when', () => {
    it('should retrive the the value if predicate returns true', () => {
      const mockPredicateValue = 'TEST';
      const mockValue = true;
      const actual = when<TestFromObject>(
        'test.nested.value' as any,
        (value) => value === mockPredicateValue,
        take('test.nested2.boolValue' as any)
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

    it('should handle a joined object', () => {
      const expected: FooObject = {
        one: 'ONE',
        two: 'TWO',
        three: 'THREE'
      };
      const actual = when<TestJoinedObject>(
        '__typename',
        (typename) => typename === 'FOO',
        take('value.foo')
      )({
        __typename: 'FOO',
        value: {
          foo: expected
        }
      });

      expect(actual).toBe(expected);
    });
  });
});
