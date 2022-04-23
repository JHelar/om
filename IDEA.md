# Problemspace:

GraphQL queries often returns hard to handle deeply nested obejcts.
This leads often to problems when using within the clients as they have to often implement its own assertions and map logic in order to use the given data.
Leads to a lot of duplicate logic and type issues when developing.

# What will this library fix:

Utility to map one objects properties to another object shape, that will be easier to handle.

# What should it be able to do?

- Should be able to handle mapping of deeply nested nullable structures to a single flat object property.
- Should supply with function utility to have mulitple object properties to be mapped to a single flat property using conditional assertions on them.
- Should have a strong typing support.
- Composable api to make more complecated propery mapping

# API Example

## Take property or return null

```typescript
type FromShape = {
  foo: {
    bar: {
      too: {
        theProp: string;
      } | null;
    } | null;
  };
};

type ToShape = {
  toProp: string | null;
};

const fromObject: FromShape = {
  foo: {
    bar:
      {
        too:
          {
            theProp: 'TheValueICareAbout'
          } | null
      } | null
  }
};

const om = createOm<FromShape, ToShape>({
  toProp: take('foo.bar.too.theProp')
});

const toObject = om(fromObject);
```

## "Take either" example, will take first non null value

```typescript
type FromShape = {
  foo: {
    bar: {
      too: {
        theProp: string;
      } | null;
    };
    bar2: string;
  };
};

type ToShape = {
  toProp: string | null;
};

const fromObject: FromShape = {
  foo: {
    bar:
      {
        too:
          {
            theProp: 'TheValueICareAbout'
          } | null
      } | null
  }
};

const om = createOm<FromShape, ToShape>({
  toProp: either(take('foo.bar.too.theProp'), take('foo.bar2'))
});

const toObject = om(fromObject);
```

## "Take when" example, will take the value if the given property predicate condition is true

```typescript
type FromShape =
    | {
      __typename: 'FOO';
      value: {
        foo: string;
      };
    }
  | {
      __typename: 'BAR';
      test: string;
      value: {
        bar: string;
      };
    };

type ToShape = {
  toProp: string | null;
};

const fromObject: FromShape = {
  foo: {
    __typename: 'FOO',
     value: {
        bar: 'FooValue';
      };
  }
};

const om = createOm<FromShape, ToShape>({
  toProp: when(
    'foo.__typename',
    (typename) => typename === 'FOO',
    take('foo.value.bar')
  )
});

const toObject = om(fromObject);
```
