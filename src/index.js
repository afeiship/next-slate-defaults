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
      events: function (inContext, inPlugins) {
        inPlugins.forEach(function (plugin) {
          plugin.events = nx.mix(
            {
              keydown: function (inSender, inEvent) {
                var cmd = inContext.commands[plugin.id];
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
          inContext.commands[id] = nx.mix(
            {
              is: function () {
                var marks = Editor.marks(editor);
                return marks ? marks[id] : false;
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
                var cmd = inContext.commands[id];
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
