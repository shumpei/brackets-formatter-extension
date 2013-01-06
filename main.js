/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager  = brackets.getModule("command/CommandManager"),
    EditorManager   = brackets.getModule("editor/EditorManager"),
    DocumentManager = brackets.getModule("document/DocumentManager"),
    Menus           = brackets.getModule("command/Menus"),
    COMMAND_ID      = "net.shumpei.autoformatter";

    // Enable formatting plugin of CodeMirror2 (this plugin is default contained)
    var script = document.createElement("script");
    script.src = "thirdparty/CodeMirror2/lib/util/formatting.js";
    document.head.appendChild(script);

    CommandManager.register("Format", COMMAND_ID, autoFormat);
    function autoFormat() {
        var editor = EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        var doc = editor._codeMirror;
        var from = doc.posFromIndex(0);
        var to = doc.posFromIndex(doc.getValue().length);
        doc.autoFormatRange(from, to);
    }

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID, [{key: "Ctrl-Shift-F", platform: "win"},
                                  {key: "Ctrl-Shift-F", platform: "mac"}]);
    
});
