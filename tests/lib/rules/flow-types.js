var rule = require("../../../lib/rules/flow-types"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("types", rule, {
  valid: [
    {
      code: `type Props = {
        /** JSDoc comment for prop abc */
        abc: string,
        /** JSDoc comment for prop def */
        def: number
    }`,
      options: [{ docType: "jsdoc" }],
      parser: "babel-eslint"
    },
    {
      code: `type Props = {}`,
      options: [{ docType: "jsdoc" }],
      parser: "babel-eslint"
    }
  ],

  invalid: [
    {
      code: `type Props = {
            abc: string,
            def: number
        }`,
      options: [{ docType: "jsdoc" }],
      parser: "babel-eslint",
      errors: [
        {
          message: "You must provide a jsdoc comment for property 'abc'"
        },
        {
          message: "You must provide a jsdoc comment for property 'def'"
        }
      ]
    },
    {
      code: `type Props = {
            // Non-JSDoc comment for prop abc
            abc: string,
            /** JSDoc comment for prop def */
            def: number
        }`,
      options: [{ docType: "jsdoc" }],
      parser: "babel-eslint",
      errors: [
        {
          message: "You must provide a jsdoc comment for property 'abc'"
        }
      ]
    },
    {
      code: `type Props = { abc: string }`,
      options: [{ docType: "jsdoc" }],
      parser: "babel-eslint",
      errors: [
        {
          message: "You must provide a jsdoc comment for property 'abc'"
        }
      ]
    }
  ]
});
