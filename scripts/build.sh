#!/bin/bash
echo "Building csc-plugin-governance..."

rm -rf dist/*
./node_modules/.bin/babel --no-babelrc -d dist src
