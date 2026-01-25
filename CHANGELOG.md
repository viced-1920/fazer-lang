# Changelog

All notable changes to this project will be documented in this file.

## [3.2.1] - 2026-01-25

### Added
- **Cross-Platform**: Added `install_system.sh` for easy installation on Linux and macOS.
- **Build System**: Updated `fazer build` to support Linux/Mac targets (generates portable bash launcher).
- **Examples**: Added `VoidNet.fz`, a stylish TCP console application with ASCII art.

### Changed
- **Documentation**: Updated `README.md` and `docs/GUIDE.md` with cross-platform installation instructions.

## [3.2.0] - 2026-01-24

### Added
- **3D Game Engine (WebGL 2.0)**: Fully hardware-accelerated 3D rendering engine.
    - `gfx.init3d(title, w, h)`: Initialize 3D context.
    - `gfx.mesh_create(id, verts, cols, norms)`: Upload mesh data to GPU (VBO/VAO).
    - `gfx.draw(id, x,y,z, rx,ry,rz, sx,sy,sz)`: Draw 3D mesh entity with transformation.
    - `gfx.camera(x,y,z, tx,ty,tz)`: Set camera position and look-at target.
    - `gfx.light(x,y,z)`: Set point light position.
- **engine3d Library**: High-level 3D abstraction library (included in `lib/`).
    - `import("engine3d.fz")`: Import the standard 3D library.
    - `engine3d.Vec3`, `vec_add`, `vec_sub`, `vec_cross`: Vector math utilities.
    - `engine3d.create_cube_mesh`, `create_plane_mesh`: Built-in mesh generators.
    - `engine3d.Camera`: FPS Camera implementation.
    - `engine3d.Entity`: Base 3D entity class.
    - `engine3d.aabb_intersect`: 3D collision detection.
- **Overlay UI**: 2D text rendering on top of 3D scene (`gfx.text` works in 3D mode).

## [3.1.0] - 2026-01-24

### Added
- **Implant Module**: Tools for Red Team operations.
    - `implant.beacon(url, ms)`: Automatic HTTP beaconing (POST) with system info.
    - `implant.persist(method)`: Add persistence via "startup" (LNK) or "registry" (HKCU Run).
- **WiFi Module**: Native wireless reconnaissance.
    - `wifi.scan()`: List available networks (SSID, BSSID, Signal, Auth).
    - `wifi.saved()`: List saved profiles.
    - `wifi.dump(ssid)`: Retrieve cleartext password for a saved network (Admin required).
- **Steganography Module**: Hide data inside images.
    - `steg.hide(in, data, out)`: Universal append-based hiding (works on any file type).
    - `steg.reveal(in)`: Extract data hidden with `steg.hide`.
    - `steg.hide_bmp(in, data, out)`: **True LSB Steganography** for BMP files (modifies pixels invisibly).
    - `steg.reveal_bmp(in)`: Extract data from LSB-encoded BMPs.
- **Process Injection**:
    - `proc.inject(pid, b64_shellcode)`: Advanced process injection using `CreateRemoteThread` via dynamic PowerShell/C# compilation.

## [3.0.0] - 2026-01-24

### Added
- **Red Team & Security Suite**: A massive update for cybersecurity professionals.
    - **Crypto Module**: Native `crypto` object with `aes_encrypt`, `aes_decrypt`, `hash` (MD5/SHA1/SHA256), and `hmac`.
    - **Advanced HTTP**: `http.request` with support for custom headers, all verbs (POST/PUT/DELETE), and proxies.
    - **Process Management**: `proc` module to list processes (`proc.list`), kill them (`proc.kill`), and dump memory (`proc.mem_dump` via MiniDump).
- **UI Extensions**:
    - **`ui_table`**: Generate beautiful ASCII tables for reporting.
    - **New Fonts**: Integrated 11+ new ASCII fonts (Bloody, ANSI Shadow, etc.) directly into the core.
- **Method Context Fix**: Fixed a critical issue where object methods (like `list.push`) lost their `this` context when called.

### Changed
- **Fonts**: Updated "Bloody" font to a specific 10-line design.
- **Docs**: Comprehensive updates to `README.md` and syntax documentation.

## [2.7.0] - 2026-01-23

### Added
- **OSINT CLI Tools**: >30 native commands available directly from terminal (`fazer geo`, `scan`, `whois`, `sub`, etc.).
- **New Built-in Functions**: Added `abs`, `min`, `max`, `pow`, `sqrt`, `pad_start`, `pad_end`, `cp`, `mv`, `ls`, `mkdir`, `rm`, `download`, `env_set`.
- **Recursion**: Added support for recursive file operations (e.g., `rm` recursive).
- **HTTP Redirects**: `download` function now automatically follows redirects.
- **Cross-Platform**: CLI tools now use Node.js native modules (`net`, `dns`, `http`) for better Linux compatibility.

### Changed
- **Documentation**: Major update to `README.md` and new `CLI_TOOLS.md` guide.
- **Error Handling**: Improved stability and error reporting for CLI commands.

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
