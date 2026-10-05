#!/bin/bash
# GoTRACE Field Integration Toolkit — E2E Test Suite Runner
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="/Users/mac/.nvm/versions/node/v22.22.0/bin:$PATH"

node --experimental-strip-types "$DIR/src/runner.ts"
