// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {

  let removeUnusedCompEntries = vscode.commands.registerCommand('extension.removeUnusedCompEntries', function () {

    let editor = vscode.window.activeTextEditor;

    if (editor) {
      let { document } = editor;

      let contents = document.getText();

      // pattern for select and get components:{....} portion from contents
      var pat = /components:\s*{(\s+[\w:\'\.\/,\s]+)}/gm;  
      var [match] = pat.exec(contents);
      var metaString = match.replace(pat, '$1');
      var explodedMeta = metaString.split(',').map(v => v.split(':')[0].trim());


      var result = contents;
      var removedItems = [];


      explodedMeta.forEach(element => {
        if (contents.indexOf(`<${element}`) == -1) {
          // pattern for select and replace Component or Component, or ' import Component from '......' ' and also empty named import 'import {} from '.....' '
          let rPat = `\\b${element}\\b,?|\s*import\s*[^{]${element}[^}].+|\s*import\s*{[\s,]*}\s.*`;
          let r = new RegExp(rPat, 'g');
          result = result.replace(r, '');
          removedItems.push(`<${element}/> `);
        }
      });



      //selecting range of text in current activeeditor to pass as eidtor callback
      let invalidRange = new vscode.Range(0, 0, document.lineCount, 0);
      let validRange = document.validateRange(invalidRange);

      editor.edit(edit => edit.replace(validRange, result));

      if (removedItems.length > 0) {
        var msg = removedItems.join(',');
        msg += (removedItems.length > 1 ? ' are ' : ' is ') + 'removed.';
        vscode.window.showInformationMessage(msg)
      }

      if (!document.isDirty) {
        document.save()
      }

    }

  });

  context.subscriptions.push(removeUnusedCompEntries);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
