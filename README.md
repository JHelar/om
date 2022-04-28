# Object Mapper

Utility that adds composable utility methods to map a complecated nested object to a flat controlled destination object.

## Applications

When integrating towards external api's it is common to get complicated nullable object structures that can result in error prone mapping of said objects.

This utility will help map and return properties in nested objects making it easier to then use in an application.

# Install

Via `yarn`

```bash
yarn add @jhel/om
```

Via `npm`

```bash
npm install @jhel/om
```

# Api

## Keypath

An essential part of the API is the `keypath`. A `keypath` is a dot notated string path that resembles the path to get to the specific property.

For example the keypath `foo.bar.value` would retreive the value of the `value` prop in the object:

```typescript
{
  foo: {
    bar: {
      value: any; // <--- The value
    }
  }
}
```

## Methods

Every method is composable meaning they can be combined with each other to create more complex structures.

### Take

Takes a specific property value from an object by given `keypath`.

If the object does not have the value specified in the keypath (or along the path), it will return `null`

@returns: `MapValueFn`

Example:

```typescript
const takeBarValue = take('foo.bar.value');

const theValue = takeBarValue({
  foo: { bar: { value: 'The returned value' } }
}); // returns "The returned value"
```

### Either

Supply it with an arbitraty amount of `MapValueFn` values, it will return the **first** defined value from the supplied `MapValuFn`'s.

@returns: `MapValueFn`

Example:

```typescript
const takeOopsValue = take('foo.bar.oops');
const takeBarValue = take('foo.bar.value');

const takeEitherOopsOrBarValue = either(takeOopsValue, takeBarValue);

const theValue = takeEitherOopsOrBarValue({
  foo: { bar: { value: 'The returned value' } }
}); // returns "The returned value"
```

### When

Takes the given value from the first `MapValueFn` and supplies it to a given predicate, if predicate returns true it will return the value from the second `MapValueFn` otherwise null.

@returns: `MapValueFn`

```typescript
const takeTypename = take('__typename');
const takeBarValue = take('foo.bar.value');

const whenBarTakeBarValue = when(
  takeTypename,
  (typename) => typename === 'BAR',
  takeBarValue
);

const theValue = whenBarTakeBarValue({
  __typename: 'BAR',
  foo: { bar: { value: 'The returned value' } }
}); // return "The returned value"
```

### Om

Allows to create a new object using a supplied schema.

@return: `MapValueFn`

```typescript
const mapObject = om({
    value: take('foo.bar.value')
    foo: om({
        bar: when(take('__typename'), (typename) => typename === 'BAR', take('foo.bar'))
    })
})

const returnObject = mapObject({ __typename: 'BAR', foo: { bar: { value: 'The returned value' } } })
console.log(returnObject) // { value: 'The returned value', foo: { bar: { value: 'The returned value' } } }
```
