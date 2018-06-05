const hasDocumentation = require("../utils/has-documentation");

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
        node.right.properties.map(property => {
          if (property.type === "ObjectTypeProperty") {
            const { docType } = context.options[0];
            if (!hasDocumentation(property, docType)) {
              const identifier = node.parent.tokens.find(
                token =>
                  token.type === "Identifier" &&
                  token.loc.start.line >= property.loc.start.line &&
                  token.loc.end.line <= property.loc.end.line
              );
              context.report(
                property,
                `You must provide a ${docType} comment for property '${identifier &&
                  identifier.value}'`
              );
            }
          }
        });
      }
    };
  }
};
