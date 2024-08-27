# Workspace Terminal Switcher

## Overview

**Workspace Terminal Switcher** is a Visual Studio Code extension that automates the management of terminals based on your workspace folders. It closes any terminals present when VSCode is opened and creates new terminals for each workspace folder, ensuring a clean and consistent terminal setup every time you start your development environment.

This extension also dynamically switches the active terminal based on the currently active editor, making sure that the terminal you see is always aligned with the directory of the file you're working on.

## Features

- **Automatic Terminal Management**: Closes all existing terminals when VSCode starts and opens new terminals for each workspace folder.
- **Dynamic Terminal Switching**: Automatically switches to the terminal corresponding to the active editor's directory.
- **Configurable Behavior**: Easily toggle the dynamic terminal switching feature through settings.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X` (`Cmd+Shift+X` on macOS).
3. Search for **Workspace Terminal Switcher**.
4. Click **Install** to install the extension.

Alternatively, you can install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).

## Usage

### Automatic Terminal Management

Once installed, the extension will automatically:

- Close all existing terminals when you open a workspace.
- Open a new terminal for each workspace folder.

### Dynamic Terminal Switching

By default, the extension automatically switches the active terminal to match the directory of the active editor. This ensures that the terminal is always aligned with the file you're currently working on.

### Configuration

You can toggle the dynamic terminal switching feature by adjusting the extension's settings:

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and type `Settings`.
2. Go to **Settings: Open Settings (UI)** and search for **Workspace Terminal Switcher**.
3. Adjust the `Switch Terminal On Directory Click` option as needed:
   - **Enable**: The extension will automatically switch the terminal based on the active editor's directory.
   - **Disable**: The extension will not change the active terminal automatically.

## Commands

This extension provides the following commands:

- **Open Terminals**: Manually triggers the opening of terminals for each workspace folder. You can run this command from the Command Palette.

## Known Issues

- **Terminal Tab Selection**: While the extension correctly switches the terminal content, it does not automatically switch the terminal tab in the terminal panel. Users may need to manually select the terminal tab if multiple terminals are open.

## Contributing

Contributions are welcome! If you have suggestions for new features or improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/juni93/vscode-workspace-terminal-swticher).

## License

This extension is licensed under the [MIT License](https://github.com/juni93/vscode-workspace-terminal-swticher?tab=MIT-1-ov-file).

## Acknowledgments

Thanks to the Visual Studio Code team for providing an excellent platform for extension development.
