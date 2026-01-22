
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

function log(msg) { console.log(`[Fazer Build] ${msg}`); }
function error(msg) { console.error(`[Error] ${msg}`); process.exit(1); }

module.exports = async function build(inputFile, args) {
    if (!inputFile) error("No input file specified. Usage: fazer build <app.fz>");
    
    const inputPath = path.resolve(inputFile);
    if (!fs.existsSync(inputPath)) error(`Input file not found: ${inputPath}`);
    
    const appName = path.basename(inputFile, '.fz');
    const distDir = path.resolve(process.cwd(), 'dist', appName);
    
    // Parse args
    let iconPath = null;
    for(let i=0; i<args.length; i++) {
        if (args[i] === '--icon' && args[i+1]) {
            iconPath = path.resolve(args[i+1]);
            i++;
        }
    }

    log(`Building '${appName}'...`);
    log(`Output Directory: ${distDir}`);

    // 1. Prepare Directory
    if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(distDir, { recursive: true });

    // 2. Copy Core Files
    const fazerRoot = path.dirname(__dirname); // tools/.. -> fazer-lang/
    const fazerJsPath = path.join(fazerRoot, 'fazer.js');
    
    fs.copyFileSync(fazerJsPath, path.join(distDir, 'fazer.js'));
    fs.copyFileSync(inputPath, path.join(distDir, 'app.fz'));

    // 3. Copy node_modules (Optimized: only copy chevrotain/ws if possible, but full copy is safer)
    const nodeModulesSrc = path.join(fazerRoot, 'node_modules');
    if (fs.existsSync(nodeModulesSrc)) {
        log("Copying dependencies...");
        // Use robocopy on Windows for speed, or recursive copy
        try {
            // Recursive copy
            fs.cpSync(nodeModulesSrc, path.join(distDir, 'node_modules'), { recursive: true });
        } catch(e) {
            log("Warning: Failed to copy node_modules. You may need to run 'npm install' in dist.");
        }
    } else {
        log("Warning: node_modules not found. The app might not run without dependencies.");
    }

    // 4. Generate Launcher (C#)
    log("Generating Native Launcher...");
    
    // We embed the logic to find 'node'
    // If we want to be truly portable, we should copy node.exe here too.
    // For now, we assume 'node' is in PATH or next to the exe.
    
    const launcherCs = `
using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

class Program {
    [STAThread]
    static void Main() {
        string appDir = AppDomain.CurrentDomain.BaseDirectory;
        string script = Path.Combine(appDir, "fazer.js");
        string app = Path.Combine(appDir, "app.fz");
        
        string nodeExe = "node";
        if (File.Exists(Path.Combine(appDir, "node.exe"))) {
            nodeExe = Path.Combine(appDir, "node.exe");
        }

        string extraArgs = "";
        string[] cmdArgs = Environment.GetCommandLineArgs();
        // Skip first arg which is the executable itself
        for (int i = 1; i < cmdArgs.Length; i++) {
            extraArgs += " \\\"" + cmdArgs[i] + "\\\"";
        }

        ProcessStartInfo psi = new ProcessStartInfo();
        psi.FileName = nodeExe;
        // Arguments: "path/to/fazer.js" "path/to/app.fz" extraArgs
        psi.Arguments = "\\\"" + script + "\\\" \\\"" + app + "\\\" " + extraArgs;
        
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true; 
        psi.WindowStyle = ProcessWindowStyle.Hidden;

        try {
            Process p = Process.Start(psi);
        } catch (Exception e) {
            MessageBox.Show("Failed to launch Fazer App:\\n" + e.Message + "\\n\\nEnsure Node.js is installed or node.exe is in the folder.", "Launch Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
    `;
    
    const csPath = path.join(distDir, 'Launcher.cs');
    fs.writeFileSync(csPath, launcherCs);

    // 5. Compile Launcher
    // We use C# compiler (csc.exe) which is available on most Windows
    // Or we use PowerShell Add-Type hack to compile to exe? 
    // Add-Type -OutputAssembly is easiest from PS.
    
    const exeName = `${appName}.exe`;
    const exePath = path.join(distDir, exeName);
    
    let iconArg = "";
    if (iconPath && fs.existsSync(iconPath)) {
        // Copy icon to dist
        const distIcon = path.join(distDir, 'app.ico');
        fs.copyFileSync(iconPath, distIcon);
        iconArg = `-Win32Icon "${distIcon}"`; // PowerShell param
        // For csc: /win32icon:app.ico
    }

    log("Compiling EXE...");
    
    // We use PowerShell to compile because locating csc.exe can be annoying
    // Add-Type -TypeDefinition $code -OutputAssembly $out -Target WinExe ...
    
    const psScript = `
    $code = Get-Content -Raw "${csPath}"
    $params = @{
        TypeDefinition = $code
        OutputAssembly = "${exePath}"
        Target = "WinExe"
        ReferencedAssemblies = "System.Windows.Forms"
    }
    ${iconArg ? `$compilerOptions = New-Object System.CodeDom.Compiler.CompilerParameters
    $compilerOptions.CompilerOptions = "/win32icon:${path.join(distDir, 'app.ico').replace(/\\/g, '\\\\')}"
    # Add-Type doesn't easily support CompilerOptions for icons in all versions.
    # Fallback to direct csc call if needed or use specific Add-Type overload.
    ` : ''}
    
    # Simple compilation without icon for now via Add-Type, 
    # but for Icon we usually need csc. Let's try to find csc.
    
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
        Write-Host "CSC not found, using CSharpCodeProvider..."
        $codeProvider = New-Object Microsoft.CSharp.CSharpCodeProvider
        $parameters = New-Object System.CodeDom.Compiler.CompilerParameters
        $parameters.GenerateExecutable = $true
        $parameters.OutputAssembly = "${exePath}"
        $parameters.CompilerOptions = "/target:winexe"
        $parameters.ReferencedAssemblies.Add("System.Windows.Forms.dll")
        $parameters.ReferencedAssemblies.Add("System.dll")
        $parameters.ReferencedAssemblies.Add("System.Drawing.dll")
        
        if ("${iconArg}") {
            $parameters.CompilerOptions += " /win32icon:${path.join(distDir, 'app.ico').replace(/\\/g, '\\\\')}"
        }

        $results = $codeProvider.CompileAssemblyFromSource($parameters, $code)
        
        if ($results.Errors.HasErrors) {
            foreach($e in $results.Errors) {
                Write-Error $e.ToString()
            }
            exit 1
        }
    }
    `;
    
    // Write PS build script
    const psBuildPath = path.join(distDir, 'build_exe.ps1');
    fs.writeFileSync(psBuildPath, psScript);
    
    try {
        execSync(`powershell -ExecutionPolicy Bypass -File "${psBuildPath}"`, { stdio: 'inherit' });
    } catch(e) {
        log("Compilation failed. See error above.");
        // Clean up temp files
        return;
    }
    
    // Clean up
    if (fs.existsSync(exePath)) {
        fs.unlinkSync(csPath);
        fs.unlinkSync(psBuildPath);
        log("Build Success!");
        log(`Created: ${exePath}`);
        log("You can now zip the folder '${distDir}' and share it.");
    } else {
        error("EXE file was not created.");
    }
};
