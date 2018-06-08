module.exports = function hasDocumentation(node, docType) {
  switch (docType) {
    case 'jsdoc':
      return hasJSDocComment(node);
    default:
      throw new Error('Invalid documentation type provided');
  }
};

function hasJSDocComment(node) {
  if (node.leadingComments && node.leadingComments.length > 0) {
    const comment = node.leadingComments[0];
    return comment.type === 'Block' && comment.value.startsWith('*');
  }
}
