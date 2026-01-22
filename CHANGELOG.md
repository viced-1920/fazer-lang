# Changelog

All notable changes to this project will be documented in this file.

## [2.6.0] - 2026-01-22

### Added
- **Native EXE Compilation**: Use `fazer build script.fz` to create standalone Windows executables.
- **Icon Support**: Add custom `.ico` files to your GUI applications via `window(..., "icon.ico")`.
- **TypeScript Support**: Added `index.d.ts` for type definitions.
- **Enhanced Stdlib**: Improvements to `exec` (better error handling) and `netsh` interaction support.
- **Security**: Added more robust error handling for system commands requiring administrative privileges.

### Fixed
- Fixed issues with `netsh` command execution in certain environments.
- Improved error messages for "immutable variable" violations in `catch` blocks.
- Stability improvements in the interpreter loop.

## [2.5.0] - 2025-12-15

### Added
- Initial support for Discord integration.
- `notify` module for system notifications.
- `clipboard` module.

### Changed
- Refactored `http_server` for better performance.
