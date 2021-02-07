/*!
 * name: @jswork/next-slate-defaults
 * description: Defaults for slate.
 * homepage: https://github.com/afeiship/next-slate-defaults
 * version: 1.0.5
 * date: 2021-02-07 11:18:21
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var NxCssText = nx.CssText || require('@jswork/next-css-text');
  var slatehyper = require('slate-hyperscript');
  var isHotkey = require('is-hotkey').default;
  var slate = require('slate');
  var jsx = slatehyper.jsx;
  var Editor = slate.Editor;

  var NxSlateDefaults = nx.declare('nx.SlateDefaults', {
    statics: {
      children: function () {
        return [{ text: '' }];
      },
      style: function (inTarget) {
        if (typeof inTarget === 'string') return NxCssText.css2obj(inTarget);
        return inTarget ? [' style="', NxCssText.obj2css(inTarget), '"'].join('') : '';
      },
      input: function (inNode, inChildren) {
        var el = inNode.el;
        var nodeName = el.nodeName.toLowerCase();
        switch (nodeName) {
          case 'body':
            return jsx('fragment', {}, inChildren);
          case 'br':
            return '\n';
          default:
            return el.textContent;
        }
      },
      output: function (inNode, inChildren) {
        if (!inChildren) return inNode.text;
        return '<p>' + inChildren + '</p>';
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateDefaults;
  }
})();
