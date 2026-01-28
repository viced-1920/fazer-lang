#!/bin/bash

# Fazer Installation Script (Linux/Mac)
# Links fazer.js to /usr/local/bin/fazer

INSTALL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BIN_PATH="/usr/local/bin/fazer"

echo "Installing Fazer from $INSTALL_DIR..."

# Create a wrapper script
echo "#!/bin/bash" > fazer_launcher
echo "node \"$INSTALL_DIR/fazer.js\" \"\$@\"" >> fazer_launcher
chmod +x fazer_launcher

# Link or Move
if [ -w "/usr/local/bin" ]; then
    cp fazer_launcher "$BIN_PATH"
    echo "Installed to $BIN_PATH"
else
    echo "Requesting sudo permissions to install to /usr/local/bin..."
    sudo cp fazer_launcher "$BIN_PATH"
fi

rm fazer_launcher

echo "Success! You can now run 'fazer' from anywhere."
