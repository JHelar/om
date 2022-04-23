import { createOm } from './createOm';
import { take } from './operators';

type TestFromObject = {
  test: {
    nested: {
      value: string;
    };
  };
};

type TestToObject = {
  test: string;
};

describe('createOm', () => {
  it('should correctly map to given object schema', () => {
    const mockValue = 'TEST';
    const test = take<TestFromObject, string>('test.nested.value');
    const om = createOm<TestFromObject, TestToObject>({
      test
    });

    const actual = om({
      test: {
        nested: {
          value: mockValue
        }
      }
    });

    expect(actual).toEqual({ test: mockValue });
  });
});
