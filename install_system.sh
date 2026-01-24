#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SHELL_CONFIG=""

# Detect Shell Configuration File
if [ -f "$HOME/.bashrc" ]; then
    SHELL_CONFIG="$HOME/.bashrc"
elif [ -f "$HOME/.zshrc" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
elif [ -f "$HOME/.profile" ]; then
    SHELL_CONFIG="$HOME/.profile"
fi

echo "Installing Fazer..."
echo "Detected Directory: $DIR"

# Ensure fazer.js is executable
chmod +x "$DIR/fazer.js"

if [ -z "$SHELL_CONFIG" ]; then
    echo "Could not detect shell config file automatically."
    echo "Please add the following line to your shell config manually:"
    echo "export PATH=\"\$PATH:$DIR\""
    echo "alias fazer=\"$DIR/fazer.js\""
    exit 1
fi

if grep -q "$DIR" "$SHELL_CONFIG"; then
    echo "Fazer is already in your PATH ($SHELL_CONFIG)."
else
    echo "" >> "$SHELL_CONFIG"
    echo "# Fazer Language" >> "$SHELL_CONFIG"
    echo "export PATH=\"\$PATH:$DIR\"" >> "$SHELL_CONFIG"
    echo "alias fazer=\"$DIR/fazer.js\"" >> "$SHELL_CONFIG"
    echo "Success: Added Fazer to $SHELL_CONFIG"
    echo "Please restart your terminal or run: source $SHELL_CONFIG"
fi

echo "Installation Complete!"
