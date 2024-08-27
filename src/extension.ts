import * as vscode from "vscode";

let terminals: { [key: string]: vscode.Terminal } = {};
let currentActiveFolder: string | undefined; // Track the current active folder

export function activate(context: vscode.ExtensionContext) {
  // Close all existing terminals when VSCode opens
  closeAllTerminals();

  // Command to open terminals dynamically based on workspace folders
  const openTerminals = vscode.commands.registerCommand(
    "extension.openTerminals",
    () => {
      if (vscode.workspace.workspaceFolders) {
        for (const folder of vscode.workspace.workspaceFolders) {
          if (!terminals[folder.uri.fsPath]) {
            const terminal = createTerminalForFolder(folder);
            terminals[folder.uri.fsPath] = terminal;
            terminal.show();
          }
        }
      }
      focusTerminalLinkedToActiveEditor(); // Focus the terminal linked to the active editor's directory
    }
  );

  // Listen to active editor change and switch terminal directory accordingly
  const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      const config = vscode.workspace.getConfiguration("myExtension");
      const switchTerminalOnClick = config.get<boolean>(
        "switchTerminalOnDirectoryClick",
        true
      );

      if (switchTerminalOnClick && editor && vscode.workspace.workspaceFolders) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(
          editor.document.uri
        );
        if (workspaceFolder) {
          const folderPath = workspaceFolder.uri.fsPath;

          // Only switch the terminal if the active folder has changed
          if (currentActiveFolder !== folderPath) {
            const terminal = terminals[folderPath];

            if (terminal) {
              terminal.show(true);
              currentActiveFolder = folderPath; // Update the active folder
            }
          }
        }
      }
    }
  );

  // Cleanup terminals if workspace folders change (e.g., folders are removed)
  const onDidChangeWorkspaceFolders =
    vscode.workspace.onDidChangeWorkspaceFolders((event) => {
      for (const folder of event.removed) {
        const terminal = terminals[folder.uri.fsPath];
        if (terminal) {
          terminal.dispose();
          delete terminals[folder.uri.fsPath];
        }
      }

      // Automatically open terminals for newly added folders
      for (const folder of event.added) {
        if (!terminals[folder.uri.fsPath]) {
          const terminal = createTerminalForFolder(folder);
          terminals[folder.uri.fsPath] = terminal;
          terminal.show();
        }
      }
    });

  // Monitor all terminal creation events
  const onDidOpenTerminal = vscode.window.onDidOpenTerminal((terminal) => {
    if (!isExtensionManagedTerminal(terminal)) {
      // User-created terminal, do nothing special
      return;
    }

    // FEATURE_TODO: Handle any logic if needed for extension-created terminals
  });

  // Monitor terminal close events
  const onDidCloseTerminal = vscode.window.onDidCloseTerminal((terminal) => {
    // Check if the terminal was managed by the extension
    const terminalPath = Object.keys(terminals).find(
      (path) => terminals[path] === terminal
    );
    if (terminalPath) {
      delete terminals[terminalPath]; // Clean up the reference
    }
  });

  context.subscriptions.push(
    openTerminals,
    onDidChangeActiveTextEditor,
    onDidChangeWorkspaceFolders,
    onDidOpenTerminal,
    onDidCloseTerminal
  );

  // Automatically open terminals when the extension is activated
  vscode.commands.executeCommand("extension.openTerminals");

  // Utility function to create terminals with a custom name or identifier
  function createTerminalForFolder(
    folder: vscode.WorkspaceFolder
  ): vscode.Terminal {
    return vscode.window.createTerminal({
      name: `e:${folder.name}`, // Prefix to identify extension-managed terminals
      cwd: folder.uri.fsPath,
    });
  }

  // Utility function to check if a terminal is managed by the extension
  function isExtensionManagedTerminal(terminal: vscode.Terminal): boolean {
    return terminal.name.startsWith("e:");
  }

  // Focus the terminal linked to the active editor's directory
  function focusTerminalLinkedToActiveEditor() {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(
        activeEditor.document.uri
      );
      if (workspaceFolder) {
        const terminal = terminals[workspaceFolder.uri.fsPath];
        if (terminal) {
          terminal.show(true);
        }
      }
    }
  }
}

function closeAllTerminals() {
  vscode.window.terminals.forEach((terminal) => terminal.dispose());
}

export function deactivate() {
  // Clean up any open terminals
  for (const terminal of Object.values(terminals)) {
    if (terminal) {
      terminal.dispose(); // Ensure that 'terminal' is a 'vscode.Terminal'
    }
  }
}
