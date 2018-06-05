# Require documentation for Flow type declarations (flow-types)

Requires documentation for [Flow](https://github.com/facebook/flow) type properties. A typical use case would be when you wish to use a library such as [`react-styleguidist`](https://github.com/styleguidist/react-styleguidist) which uses JSDoc to generate prop information for components.

## Rule Details

This rule aims to require documentation for Flow type properties.

### Rule Declaration

```js
{
    'require-docs/flow-types': [
      'error',
      {
        docType: 'documentation-type',
      }
    ]
}
```

When the `docType` is set to `jsdoc`, the following cases apply:

### Pass

```js
type Props = {
    /** JSDoc comment for prop abc */
    abc: string,
    /** JSDoc comment for prop def */
    def: number
}
```

### Fail

```js
type Props = {
    abc: string,
    def: number
}
```

```js
type Props = {
    // Non-JSDoc comment for prop abc
    abc: string,
    // Non-JSDoc comment for prop def
    def: number
}
```

The output of the above failures gives the following two messages (per failure):

> You must provide a jsdoc comment for property 'abc'

> You must provide a jsdoc comment for property 'def'

### Options

Takes an object with the following properties:

| key     | type     | required | available | description                                                              |
| ------- | -------- | -------- | --------- | ------------------------------------------------------------------------ |
| docType | `string` | yes      | `jsdoc`   | The documentation type you wish for the Flow type to be documented with. |
