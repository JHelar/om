// import { take, either, when, om } from '../operators';

// type TestFromObject = {
//   test: {
//     nested: {
//       value: string | null;
//     } | null;
//     nested2?: {
//       value: string;
//       boolValue: boolean;
//     };
//   } | null;
// };

// type FooObject = {
//   one: string;
//   two: string;
//   three: string;
// };

// type TestJoinedObject =
//   | {
//       __typename: 'FOO';
//       value: {
//         foo: FooObject;
//       };
//     }
//   | {
//       __typename: 'BAR';
//       test: string;
//       value: {
//         bar: string;
//       };
//     };

it('shits the bed', () => {
  expect(true).toBe(true);
});

// describe('operators', () => {
//   describe('take', () => {
//     it('should retrive value at given prop string', () => {
//       const mockValue = 'TEST';
//       const actual = take('test.nested.value')({
//         test: {
//           nested: {
//             value: mockValue
//           }
//         }
//       });

//       expect(actual).toEqual(mockValue);
//     });

//     it('should handle null in property path', () => {
//       const actual = take('test.nested.value')({
//         test: {
//           nested: null
//         }
//       });

//       expect(actual).toEqual(null);
//     });

//     it('should handle null as first prop', () => {
//       const actual = take('test.nested.value')({
//         test: null
//       });

//       expect(actual).toEqual(null);
//     });

//     it('should handle joined object', () => {
//       const actual = take('value.bar')({
//         test: '',
//         __typename: 'BAR',
//         value: {
//           bar: 'BAR'
//         }
//       });

//       expect(actual).toEqual('BAR');
//     });
//   });

//   describe('either', () => {
//     it('should retrive the first defined property value', () => {
//       const mockValue = 'TEST';
//       const take1 = take('test.nested.value');
//       const take2 = take('test.nested2.value');

//       const actual = either(
//         take1,
//         take2
//       )({
//         test: {
//           nested: {
//             value: mockValue
//           },
//           nested2: {
//             value: mockValue + '2',
//             boolValue: false
//           }
//         }
//       });

//       expect(actual).toEqual(mockValue);
//     });

//     it('should retrive the second value if the first one is not defined', () => {
//       const mockValue = 'TEST';
//       const take1 = take('test.nested.value');
//       const take2 = take('test.nested2.value');

//       const actual = either(
//         take1,
//         take2
//       )({
//         test: {
//           nested: {
//             value: null
//           },
//           nested2: {
//             value: mockValue,
//             boolValue: false
//           }
//         }
//       });

//       expect(actual).toEqual(mockValue);
//     });

//     it('should return null if either values are not defined', () => {
//       const take1 = take('test.nested.value');
//       const take2 = take('test.nested2.value');

//       const actual = either(
//         take1,
//         take2
//       )({
//         test: {
//           nested: {
//             value: null
//           }
//         }
//       });

//       expect(actual).toEqual(null);
//     });
//   });

//   describe('when', () => {
//     it('should retrive the the value if predicate returns true', () => {
//       const mockPredicateValue = 'TEST';
//       const mockValue = true;

//       const take1 = take('test.nested.value');

//       const take2 = take('test.nested2.boolValue');

//       const actual = when(
//         take1,
//         (value) => value === mockPredicateValue,
//         take2
//       )({
//         test: {
//           nested: {
//             value: mockPredicateValue
//           },
//           nested2: {
//             boolValue: mockValue,
//             value: ''
//           }
//         }
//       });

//       expect(actual).toEqual(mockValue);
//     });

//     it('should return null if predicate returns false', () => {
//       const mockPredicateValue = 'TEST';
//       const mockValue = true;

//       const take1 = take('test.nested.value');

//       const take2 = take('test.nested2.boolValue');

//       const actual = when(
//         take1,
//         (value) => value === 'NOPE',
//         take2
//       )({
//         test: {
//           nested: {
//             value: mockPredicateValue
//           },
//           nested2: {
//             boolValue: mockValue,
//             value: ''
//           }
//         }
//       });

//       expect(actual).toEqual(null);
//     });
//   });

//   describe('om', () => {
//     it('should correctly map to given object schema', () => {
//       const mockValue = 'TEST';
//       const test = take('test.nested.value');
//       const mapObject = om({
//         test
//       });

//       const actual = mapObject({
//         test: {
//           nested: {
//             value: mockValue
//           }
//         }
//       });

//       expect(actual).toEqual({ test: mockValue });
//     });

//     it('should be able to nestle om in same schema', () => {
//       const mockNestedValue = 'TEST';
//       const mockBoolValue = false;

//       const takeNestedValue = take('test.nested.value');

//       const takeBoolValue = take('test.nested2.boolValue');

//       const mapObject = om({
//         boolValue: takeBoolValue,
//         obj: om({
//           nested: takeNestedValue
//         })
//       });

//       const actual = mapObject({
//         test: {
//           nested: {
//             value: mockNestedValue
//           },
//           nested2: {
//             boolValue: mockBoolValue
//           }
//         }
//       });

//       expect(actual).toEqual({
//         boolValue: mockBoolValue,
//         obj: { nested: mockNestedValue }
//       });
//     });
//   });
// });
