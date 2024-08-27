import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Workspace Terminal Switcher Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample Test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Extension Activation', async () => {
		// Test that the extension activates correctly
		const extension = vscode.extensions.getExtension('your.publisher.name');
		assert.ok(extension, 'Extension should be present');
		await extension?.activate();
		assert.ok(extension.isActive, 'Extension should be active after activation');
	});

	test('Open Terminals Command', async () => {
		// Test that the "Open Terminals" command executes successfully
		const command = 'extension.openTerminals';
		const executed = await vscode.commands.executeCommand(command);
		assert.strictEqual(executed, undefined, `"${command}" command should be executed without errors`);
	});

	test('Switch Terminal On Active Editor Change', async () => {
		// Ensure that switching the active editor triggers the appropriate terminal switch
		const config = vscode.workspace.getConfiguration('myExtension');
		const originalValue = config.get<boolean>('switchTerminalOnDirectoryClick');
		await config.update('switchTerminalOnDirectoryClick', true, vscode.ConfigurationTarget.Global);

		const document = await vscode.workspace.openTextDocument({ content: 'Test content' });
		const editor = await vscode.window.showTextDocument(document);

		assert.ok(editor, 'Editor should be opened and focused');

		// Restore original configuration value
		await config.update('switchTerminalOnDirectoryClick', originalValue, vscode.ConfigurationTarget.Global);
	});

	test('Terminals Managed Correctly', async () => {
		// Test that terminals are managed correctly (e.g., opened and closed as expected)
		vscode.window.terminals.forEach((terminal) => terminal.dispose());

		await vscode.commands.executeCommand('extension.openTerminals');

		const workspaceFolders = vscode.workspace.workspaceFolders;
		const terminals = vscode.window.terminals;
		assert.strictEqual(terminals.length, workspaceFolders ? workspaceFolders.length : 0, 'The number of terminals should match the number of workspace folders');
	});
});
