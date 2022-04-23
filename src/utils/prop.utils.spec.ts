import { prop, propAt } from './prop.utils';

describe('prop.utils', () => {
  describe('prop', () => {
    it('should retreive value at given prop key', () => {
      const mockValue = 'TEST';
      const mockPropKey = 'test';
      const actual = prop(mockPropKey)({
        [mockPropKey]: mockValue
      });

      expect(actual).toEqual(mockValue);
    });

    it('should return null if prop does not exist', () => {
      const mockValue = 'TEST';
      const mockPropKey = 'test';
      const actual = prop('nope')({
        [mockPropKey]: mockValue
      });

      expect(actual).toEqual(null);
    });

    it('should return null for not defined object', () => {
      const mockPropKey = 'test';
      const actual = prop(mockPropKey)(undefined);

      expect(actual).toEqual(null);
    });

    it('should handle falsy number value', () => {
      const mockValue = 0;
      const mockPropKey = 'test';
      const actual = prop(mockPropKey)({
        [mockPropKey]: mockValue
      });

      expect(actual).toEqual(mockValue);
    });

    it('should hansle falsy empty string', () => {
      const mockValue = '';
      const mockPropKey = 'test';
      const actual = prop(mockPropKey)({
        [mockPropKey]: mockValue
      });

      expect(actual).toEqual(mockValue);
    });
  });

  describe('propAt', () => {
    it('should retreive value at given prop path', () => {
      const mockValue = 'TEST';
      const mockPath = ['foo', 'bar', 'test'];
      const actual = propAt(mockPath)({
        foo: {
          bar: {
            test: mockValue
          }
        }
      });

      expect(actual).toEqual(mockValue);
    });

    it('should return null if path is invalid', () => {
      const mockValue = 'TEST';
      const mockPath = ['foo', 'bar', 'test', 'nothere'];
      const actual = propAt(mockPath)({
        foo: {
          bar: {
            test: mockValue
          }
        }
      });

      expect(actual).toEqual(null);
    });

    it('should return null if path is broken', () => {
      const mockPath = ['foo', 'bar', 'test', 'nothere'];
      const actual = propAt(mockPath)({
        foo: {
          bar: undefined
        }
      });

      expect(actual).toEqual(null);
    });
  });
});
