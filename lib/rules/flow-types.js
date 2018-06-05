const hasDocumentation = require("../utils/has-documentation");

function findIdentifier(node, property) {
  try {
    return node.parent.tokens.find(
      token =>
        token.type === "Identifier" &&
        token.loc.start.line >= property.loc.start.line &&
        token.loc.end.line <= property.loc.end.line
    );
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
          if (property.type === "ObjectTypeProperty") {
            const { docType } = context.options[0];
            if (!hasDocumentation(property, docType)) {
              const identifier = findIdentifier(node, property);
              context.report(
                property,
                `You must provide a ${docType} comment for property${
                  identifier && identifier.value ? ` '${identifier.value}'` : ""
                }`
              );
            }
          }
        });
      }
    };
  }
};
