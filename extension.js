// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {

	let compfyCleanup = vscode.commands.registerCommand('extension.removeUnusedCompEntries', function () {
		
		let editor = vscode.window.activeTextEditor;

		if(editor){
			let {document} = editor;

			let contents = document.getText();

			var pat = /components:\s*{(\s+[\w:\'\.\/,\s]+)}/gm;
			var [match] = pat.exec(contents);
			var metaString = match.replace(pat, '$1');
			var explodedMeta = metaString.split(',').map(v => v.split(':')[0].trim());

			
			var result = contents;
			var msg = '';
			

			explodedMeta.forEach(element => {
				if(contents.indexOf(`<${element}`) == -1){
					let rPat = `\\b${element}\\b,? | import[^{]${element}[^}].+`;
					let r =  new RegExp(rPat, 'g');
					result = result.replace(r, '');
					msg += `<${element}/> `;
				}
			});
			
			let r =  new RegExp(rPat, 'g');
			result = result.replace(r, '');
			
			msg += `<${element}/> is unused \n` 
			vscode.window.showInformationMessage(`<${element}/> not found`)	
		
			let invalidRange = new vscode.Range(0, 0, document.lineCount, 0);
			let validRange = document.validateRange(invalidRange);

			editor.edit(edit => edit.replace(fullRange, word));

		}

	});

	context.subscriptions.push(compfyCleanup);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
