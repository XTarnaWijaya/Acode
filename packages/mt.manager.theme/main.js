!(function () {
  "use strict";

  var modules = {
    980: function (module, exports, require) {
      var pluginInfo = JSON.parse('{"id":"mt.manager.theme"}');
      module = require.hmd(module);

      const settings = acode.require("settings");
      const { editor } = editorManager;
      const themeId = "mt";

      ace.define(
        "ace/theme/" + themeId + ".css",
        ["require", "exports", "module"],
        function (require, exports, module) {
          module.exports = `
          .ace-mt {
    color: #abb2bf;
    background-color: #2b2b2b;
}

.ace-mt .ace_gutter {
    color: #636d83;
    background-color: #5555;
}

.ace-mt .ace_gutter-active-line {
    color: #9b9c9d;
}

.ace-mt .ace_print-margin {
    width: 1px;
    background: #3e4451;
}

.ace-mt .ace_cursor {
    color: #c77e40;
}

.ace-mt .ace_marker-layer .ace_selection {
    background: #3e4451;
    border-radius: 0;
}

.ace-mt .ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px #000;
}

.ace-mt .ace_marker-layer .ace_step {
    background: #d19a66;
}

.ace-mt .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #abb2bf;
}

.ace-mt .ace_marker-layer .ace_active-line {
    border: 1px solid #3a424a;
    box-sizing: border-box;
}

.ace-mt .ace_marker-layer .ace_selected-word {
    background-color: rgba(75, 110, 175, 0.3);
}

.ace-mt .ace_invisible {
    color: #3e4451;
}

.ace-mt .hljs-keyword {
    color: #f79832;
}

.ace-mt .ace_keyword {
    color: #f79832;
}

.ace-mt .ace_operator {
    color: #ffff;
}

.ace-mt .ace_constant.ace_language,
.ace-mt .ace_constant.ace_numeric,
.ace-mt .ace_constant.ace_character {
    color: #d19a66;
}

.ace-mt .ace_constant.ace_character.ace_escape {
    color: #e5c07b;
}

.ace-mt .ace_identifier {
    color: #ffffff;
}

.ace-mt .ace_support.ace_function {
    color: #f79832;
}

.ace-mt .ace_support.ace_constant {
    color: #56b6c2;
}

.ace-mt .ace_class {
    color: #e5c07b;
}

.ace-mt .ace_variable.ace_language,
.ace-mt .ace_variable {
    color: #61afef;
}

.ace-mt .ace_meta.ace_tag,
.ace-mt .ace_support.ace_type,
.ace-mt .ace_storage,
.ace-mt .ace_storage.ace_type {
    color: #e06c75;
}

.ace-mt .ace_invalid {
    color: #ffffff;
    background-color: #e06c75;
}

.ace-mt .ace_invalid.ace_deprecated {
    color: #ffffff;
    background-color: #d19a66;
}

.ace-mt .ace_string {
    color: #98c379;
}

.ace-mt .ace_comment {
    color: #808080;
    font-style: italic;
}

.ace-mt .hljs-params,
.ace-mt .ace_variable.ace_parameter {
    color: #abb2bf;
}

.ace-mt .ace_entity.ace_other.ace_attribute-name {
    color: #abb2bf;
}

.ace-mt .ace_xml-pe.ace_xml,
.ace-mt .ace_punctuation.ace_tag {
    color: #abb2bf;
}

.ace-mt .ace_tag-name.ace_tag,
.ace-mt .ace_entity.ace_name.ace_tag {
    color: #C77E40;
}

.ace-mt .ace_paren {
    color: yellow;
}

.ace-mt .ace_indent-guide {
    display: inline-block;
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ09NrYAgMjP4PAAtGAwchHMyAAAAAAElFTkSuQmCC) right repeat-y;
}

.ace-mt .ace_indent-guide-active {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;
}

.ace-mt .ace_support.ace_constant.ace_js {
    color: #a6ffbd;
    
}

.ace-mt .ace_support.ace_constant.ace_css-in-js {
    color: #2fc7b6;
}
        `;
        },
      );

      ace.define(
        "ace/theme/" + themeId,
        [
          "require",
          "exports",
          "module",
          "ace/theme/" + themeId + ".css",
          "ace/lib/dom",
        ],
        function (require, exports, module) {
          exports.isDark = true;
          exports.cssClass = "ace-" + themeId;
          exports.cssText = require("./" + themeId + ".css");
          require("../lib/dom").importCssString(
            exports.cssText,
            exports.cssClass,
            false,
          );
        },
      );

      window.require(["ace/theme/" + themeId], function (themeModule) {
        if (typeof exports === "object" && themeModule) {
          module.exports = themeModule;
        }
      });

      class TarzRGBGlowPlugin {
        constructor() {
          this.onThemeChange = this.onThemeChange.bind(this);
        }

        async init() {
          ace.require("ace/ext/themelist").themes.push({
            caption: "MT Manger",
            theme: "ace/theme/" + themeId,
            isDark: true,
          });

          if (settings.get("editorTheme") === themeId) {
            editor.setTheme("ace/theme/" + themeId);
          }
          settings.on("update:editorTheme", this.onThemeChange);
        }

        async destroy() {
          settings.off("update:editorTheme", this.onThemeChange);
        }

        onThemeChange(newTheme) {
          const currentTheme = settings.get("editorTheme");
          const themeName = newTheme.split("/").pop();
          if (currentTheme !== themeName && themeName === themeId) {
            settings.update({
              editorTheme: themeName,
            });
          }
        }
      }

      function highlightErrors() {
        let session = editor.getSession();
        let annotations = [];
        let lines = session.getDocument().getAllLines();

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("error")) {
            annotations.push({
              row: i,
              column: lines[i].indexOf("error"),
              text: "Syntax Error Detected",
              type: "error",
            });
          }
        }
        session.setAnnotations(annotations);
      }

      editor.on("change", function () {
        highlightErrors();
      });

      if (window.acode) {
        const pluginInstance = new TarzRGBGlowPlugin();
        acode.setPluginInit(pluginInfo.id, (baseUrl, context, cache) => {
          if (!baseUrl.endsWith("/")) {
            baseUrl += "/";
          }
          pluginInstance.baseUrl = baseUrl;
          pluginInstance.init(context, cache, baseUrl);
        });
        acode.setPluginUnmount(pluginInfo.id, () => {
          pluginInstance.destroy();
        });
      }
    },
  };

  var cache = {};

  function require(moduleId) {
    var cached = cache[moduleId];
    if (cached !== undefined) return cached.exports;
    var module = (cache[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {},
    });
    modules[moduleId](module, module.exports, require);
    module.loaded = true;
    return module.exports;
  }

  require.hmd = function (module) {
    module.children = module.children || [];
    return module;
  };

  require(980);
})();
