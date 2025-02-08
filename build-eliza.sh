#!/bin/bash

# Function to handle errors and exit
handle_error() {
  echo "❌ Error: $1"
  exit 1
}

# 1. Change directory
cd ./src-eliza || handle_error "Could not change directory to ./src-eliza 📁"

# 2. Check Node.js version
node -v | grep "v23.3.0" || handle_error "Node.js version is not v23.3.0 after switching. Actual version: $(node -v) 🤨"

# 3. Check for pnpm
if ! command -v pnpm &> /dev/null; then
  handle_error "pnpm is not installed. Please install pnpm (https://pnpm.io/installation) 📦"
fi

# Check pnpm version
pnpm -v | grep "9.15.0" || handle_error "pnpm version is not 9.15.0. Actual version: $(pnpm -v) 😕.  Consider upgrading with 'pnpm install -g pnpm@9.15.0'"

# 4. Install dependencies
pnpm install --no-frozen-lockfile || handle_error "pnpm install failed 📥"

# 5. Build
pnpm build || handle_error "pnpm build failed 🛠️"

# Success message
echo "✅ Build successful! 🎉"

exit 0