const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(msg) { console.log(`[Fazer Build] ${msg}`); }
function error(msg) { console.error(`[Error] ${msg}`); process.exit(1); }

const build = async function(inputFile, args) {
    if (!inputFile) error("No input file specified. Usage: fazer build <app.fz>");
    
    const inputPath = path.resolve(inputFile);
    if (!fs.existsSync(inputPath)) error(`Input file not found: ${inputPath}`);
    
    const appName = path.basename(inputFile, '.fz');
    const distDir = path.resolve(process.cwd(), 'dist', appName);
    
    // Parse args
    let iconPath = null;
    let uiPath = null;
    let meta = {
        title: appName,
        desc: "Fazer Application",
        company: "Fazer",
        product: appName,
        copyright: `Copyright (c) ${new Date().getFullYear()}`,
        version: "1.0.0.0"
    };

    for(let i=0; i<args.length; i++) {
        if (args[i] === '--icon' && args[i+1]) { iconPath = path.resolve(args[i+1]); i++; }
        if (args[i] === '--ui' && args[i+1]) { uiPath = path.resolve(args[i+1]); i++; }
        if (args[i] === '--title' && args[i+1]) { meta.title = args[i+1]; i++; }
        if (args[i] === '--desc' && args[i+1]) { meta.desc = args[i+1]; i++; }
        if (args[i] === '--company' && args[i+1]) { meta.company = args[i+1]; i++; }
        if (args[i] === '--product' && args[i+1]) { meta.product = args[i+1]; i++; }
        if (args[i] === '--copyright' && args[i+1]) { meta.copyright = args[i+1]; i++; }
        if (args[i] === '--version' && args[i+1]) { meta.version = args[i+1]; i++; }
    }

    log(`Building '${appName}'...`);
    log(`Output Directory: ${distDir}`);

    // 1. Prepare Directory
    if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(distDir, { recursive: true });

    // 2. Copy Core Files
    const fazerRoot = path.dirname(__dirname); 
    const fazerJsPath = path.join(fazerRoot, 'fazer.js');
    
    fs.copyFileSync(fazerJsPath, path.join(distDir, 'fazer.js'));
    fs.copyFileSync(inputPath, path.join(distDir, 'app.fz'));

    // 3. Copy UI Folder if provided
    if (uiPath && fs.existsSync(uiPath)) {
        log(`Bundling UI assets from: ${uiPath}`);
        fs.cpSync(uiPath, path.join(distDir, 'ui'), { recursive: true });
    }

    // 4. Copy node_modules (Optimized)
    const nodeModulesSrc = path.join(fazerRoot, 'node_modules');
    if (fs.existsSync(nodeModulesSrc)) {
        log("Copying dependencies...");
        try {
            fs.cpSync(nodeModulesSrc, path.join(distDir, 'node_modules'), { recursive: true });
        } catch(e) {
            log("Warning: Failed to copy node_modules.");
        }
    }

    // 5. Generate Launcher (Platform Specific)
    const isWin = process.platform === "win32";
    log(`Generating Launcher for ${process.platform}...`);

    if (isWin) {
        // --- WINDOWS (C# / .EXE) ---
        const launcherCs = `
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;

// Metadata
[assembly: AssemblyTitle("${meta.title}")]
[assembly: AssemblyDescription("${meta.desc}")]
[assembly: AssemblyCompany("${meta.company}")]
[assembly: AssemblyProduct("${meta.product}")]
[assembly: AssemblyCopyright("${meta.copyright}")]
[assembly: AssemblyFileVersion("${meta.version}")]
[assembly: AssemblyVersion("${meta.version}")]

class Program {
    [STAThread]
    static void Main() {
        string appDir = AppDomain.CurrentDomain.BaseDirectory;
        string script = Path.Combine(appDir, "fazer.js");
        string app = Path.Combine(appDir, "app.fz");
        
        // Check if we have bundled node or rely on PATH
        string nodeExe = "node";
        if (File.Exists(Path.Combine(appDir, "node.exe"))) {
            nodeExe = Path.Combine(appDir, "node.exe");
        }

        string extraArgs = "";
        string[] cmdArgs = Environment.GetCommandLineArgs();
        for (int i = 1; i < cmdArgs.Length; i++) {
            extraArgs += " \\\"" + cmdArgs[i] + "\\\"";
        }

        ProcessStartInfo psi = new ProcessStartInfo();
        psi.FileName = nodeExe;
        psi.Arguments = "\\\"" + script + "\\\" \\\"" + app + "\\\" " + extraArgs;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true; // Hidden console
        psi.WindowStyle = ProcessWindowStyle.Hidden;

        try {
            Process.Start(psi);
        } catch (Exception e) {
            MessageBox.Show("Failed to launch Fazer App:\\n" + e.Message + "\\n\\nEnsure Node.js is installed.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
        `;
        
        const csPath = path.join(distDir, 'Launcher.cs');
        fs.writeFileSync(csPath, launcherCs);

        const exeName = `${appName}.exe`;
        const exePath = path.join(distDir, exeName);
        
        let iconArg = "";
        if (iconPath && fs.existsSync(iconPath)) {
            const distIcon = path.join(distDir, 'app.ico');
            fs.copyFileSync(iconPath, distIcon);
            iconArg = `-Win32Icon "${distIcon}"`; 
        }

        log("Compiling EXE...");
        
        const psScript = `
        $csc = (Get-ChildItem -Path "$env:windir\\Microsoft.NET\\Framework64\\v4*" -Filter csc.exe | Select-Object -Last 1).FullName
        if (-not $csc) {
            $csc = (Get-ChildItem -Path "$env:windir\\Microsoft.NET\\Framework\\v4*" -Filter csc.exe | Select-Object -Last 1).FullName
        }
        
        if ($csc) {
            Write-Host "Compiling with CSC: $csc"
            $args = @("/target:winexe", "/out:${exePath}", "${csPath}")
            if ("${iconArg}") { $args += "/win32icon:${path.join(distDir, 'app.ico')}" }
            & $csc $args
        } else {
            Write-Error "CSC.exe not found. Cannot compile."
            exit 1
        }
        `;
        
        const psBuildPath = path.join(distDir, 'build_exe.ps1');
        fs.writeFileSync(psBuildPath, psScript);
        
        try {
            execSync(`powershell -ExecutionPolicy Bypass -File "${psBuildPath}"`, { stdio: 'inherit' });
        } catch(e) {
            log("Compilation failed.");
            return;
        }
        
        if (fs.existsSync(exePath)) {
            fs.unlinkSync(csPath);
            fs.unlinkSync(psBuildPath);
            log("Build Success!");
            log(`Created: ${exePath}`);
        } else {
            error("EXE file was not created.");
        }

    } else {
        // --- LINUX / MAC (Bash Script) ---
        
        const launcherSh = `#!/bin/bash
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
# Use embedded node if available, else system node
if [ -f "$DIR/node" ]; then
    NODE="$DIR/node"
else
    NODE="node"
fi

"$NODE" "$DIR/fazer.js" "$DIR/app.fz" "$@"
`;
        
        const shPath = path.join(distDir, appName);
        fs.writeFileSync(shPath, launcherSh);
        fs.chmodSync(shPath, 0o755);
        
        log("Build Success!");
        log(`Created: ${shPath}`);
        log("You can now zip the folder '${distDir}' and share it.");
    }
};

module.exports = build;

// If run directly
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error("Usage: node builder.js <app.fz> [options]");
        process.exit(1);
    }
    const file = args[0];
    const rest = args.slice(1);
    build(file, rest);
}
