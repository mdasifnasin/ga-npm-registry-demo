#!/bin/bash

# Fail immediately if any command fails
set -e

echo "Starting MongoDB tests..."

# Install dependencies
npm install

# Run the database setup script (optional: seed data or create collections)
node setup-db.js

# Run your test suite
npm test

echo "MongoDB tests completed successfully!"
