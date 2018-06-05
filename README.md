# eslint-plugin-require-docs

[![build status](https://travis-ci.org/findmypast-oss/eslint-plugin-require-docs.svg?branch=master)](https://travis-ci.org/findmypast-oss/eslint-plugin-require-docs)

---

An ESLint plugin to require code documentation

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-require-docs`:

```
$ npm install eslint-plugin-require-docs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-require-docs` globally.

## Usage

Add `require-docs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["require-docs"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "require-docs/rule-name": 2
  }
}
```

## Supported Rules

* [flow-types](./docs/rules/flow-types.md): Require documentation for Flow type declarations
