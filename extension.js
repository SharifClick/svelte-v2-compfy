// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {

	let compfyCleanup = vscode.commands.registerCommand('extension.compfyCleanup', function () {
		
		let editor = vscode.window.activeTextEditor;

		if(editor){
			
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
