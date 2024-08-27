# Changelog

All notable changes to the "workspace-terminal-switcher" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Initial release of Workspace Terminal Switcher.

## [1.0.0] - 2024-08-27

### Added
- Automatically close all existing terminals when VSCode opens.
- Create and open a new terminal for each workspace folder.
- Automatically switch the active terminal based on the active editor's directory.
- Configuration option to toggle automatic terminal switching.
- Command to manually open terminals for all workspace folders.
- Handle terminal creation and cleanup when workspace folders are added or removed.
- Support for monitoring and managing terminals created by the extension.

---

### Notes

- **[Unreleased]**: This section tracks changes that are staged for the next release but not yet published.
- **[1.0.0]**: Version numbers follow Semantic Versioning, where major changes increment the first number, minor changes the second, and patches the third.

### Changelog Management

- After the initial release, document subsequent changes in a similar manner.
- Move changes from **[Unreleased]** to a specific version section once they are published.

---

This file helps users and contributors track changes over time, ensuring transparency and clarity regarding what has been added, changed, or removed in each release.
