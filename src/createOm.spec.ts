import { createOm } from './createOm';
import { take } from './operators';

type TestFromObject = {
  test: {
    nested: {
      value: string;
    };
  };
};

describe('createOm', () => {
  it('should correctly map to given object schema', () => {
    const mockValue = 'TEST';
    const test = take<TestFromObject, 'test.nested.value'>('test.nested.value');
    const om = createOm({
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
