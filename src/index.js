(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
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
      commands: function (inContext, inPlugin) {
        var id = inPlugin.id;
        var hotkey = inPlugin.hotkey;
        var editor = inContext.editor;
        return {
          is: function () {
            const marks = Editor.marks(editor);
            return marks ? marks[id] : false;
          },
          isHotkey: function (inEvent) {
            return isHotkey(hotkey, inEvent);
          },
          activate: (inValue) => {
            Editor.addMark(editor, id, inValue);
          },
          deactivate: function () {
            Editor.removeMark(editor, id);
          },
          toggle: function (inValue) {
            const cmd = inContext.commands[id];
            if (!cmd.is()) {
              cmd.activate(inValue);
            } else {
              cmd.deactivate();
            }
          }
        };
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
