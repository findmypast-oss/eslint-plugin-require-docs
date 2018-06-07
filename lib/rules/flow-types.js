const { findLast } = require("lodash");

const hasDocumentation = require("../utils/has-documentation");

function findIdentifier(node, property) {
  try {
    const propStart = property.value.loc.start;
    return findLast(node.parent.tokens, token => {
      const tokenEnd = token.loc.end;
      return (
        token.type === "Identifier" &&
        ((tokenEnd.line === propStart.line &&
          tokenEnd.column < propStart.column) ||
          tokenEnd.line < propStart.line)
      );
    }).value;
  } catch (e) {
    return undefined;
  }
}

module.exports = {
  meta: {
    schema: [
      {
        type: "object",
        uniqueItems: true,
        properties: {
          docType: { type: "string", enum: ["jsdoc"] }
        },
        required: ["docType"],
        additionalProperties: false
      }
    ]
  },

  create(context) {
    return {
      TypeAlias: function(node) {
        if (!node.right || !node.right.properties) {
          return;
        }
        node.right.properties.map(property => {
          if (property.type !== "ObjectTypeProperty") {
            return;
          }
          const { docType } = context.options[0];
          if (!hasDocumentation(property, docType)) {
            const identifier = findIdentifier(node, property);
            context.report(
              property,
              `You must provide a ${docType} comment for property${
                identifier ? ` '${identifier}'` : ""
              }`
            );
          }
        });
      }
    };
  }
};
