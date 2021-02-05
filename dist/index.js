/*!
 * name: @jswork/next-slate-defaults
 * description: Defaults for slate.
 * homepage: https://github.com/afeiship/next-slate-defaults
 * version: 1.0.2
 * date: 2021-02-05 21:56:09
 * license: MIT
 */

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
          default:
            return inElement.textContent;
        }
      },
      exporter: function (inNode, inChildren) {
        if (!inChildren) return inNode.text;
        return '<p>' + inChildren + '</p>';
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateDefaults;
  }
})();
