(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var slatehyper = require('slate-hyperscript');
  var jsx = slatehyper.jsx;

  var NxSlateDefaults = nx.declare('nx.SlateDefaults', {
    statics: {
      children: function () {
        return [{ text: '' }];
      },
      importer: function (inElement, inChildren) {
        var nodeName = inElement.nodeName.toLowerCase();
        switch (nodeName) {
          case 'body':
            return jsx('fragment', {}, inChildren);
          case 'br':
            return '\n';
          case 'p':
            return jsx('element', { type: 'paragraph' }, inChildren);
          default:
            return inElement.textContent;
        }
      },
      exporter: function (inNode, inChildren) {
        if (!inChildren) return inNode.text;
        switch (inNode.type) {
          case 'paragraph':
            return '<p>' + inChildren + '</p>';
          default:
            return inChildren;
        }
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateDefaults;
  }
})();