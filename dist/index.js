/*!
 * name: @jswork/next-slate-defaults
 * description: Defaults for slate.
 * homepage: https://github.com/afeiship/next-slate-defaults
 * version: 1.0.4
 * date: 2021-02-06 11:44:14
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
      events: function (inContext, inPlugins) {
        inPlugins.forEach(function (plugin) {
          plugin.events = nx.mix(
            {
              keydown: function (inSender, inEvent) {
                inEvent.preventDefault();
                var cmd = plugin.commands;
                if (cmd.isHotkey(inEvent)) {
                  cmd.toggle(true);
                }
              }
            },
            plugin.events
          );
        });
      },
      commands: function (inContext, inPlugins) {
        inPlugins.forEach((plugin) => {
          var id = plugin.id;
          var hotkey = plugin.hotkey;
          var editor = inContext.editor;
          plugin.commands = nx.mix(
            {
              is: function () {
                var marks = Editor.marks(editor);
                var res = marks ? marks[id] : false;
                return Boolean(res);
              },
              isHotkey: function (inEvent) {
                if (!hotkey) return false;
                return isHotkey(hotkey, inEvent);
              },
              activate: (inValue) => {
                Editor.addMark(editor, id, inValue);
              },
              deactivate: function () {
                Editor.removeMark(editor, id);
              },
              toggle: function (inValue) {
                var cmd = plugin.commands;
                if (!cmd.is()) {
                  cmd.activate(inValue);
                } else {
                  cmd.deactivate();
                }
              }
            },
            plugin.commands
          );
        });
      },
      importer: function (inNode, inChildren) {
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
