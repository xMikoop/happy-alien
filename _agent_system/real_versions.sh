#!/bin/bash
echo "--- REAL-TIME NPM DATA (CHECKED ON 2026-04-29) ---"
for pkg in next react three tailwindcss; do
  echo -n "$pkg latest: "
  npm view $pkg version 2>/dev/null || echo "Error checking $pkg"
done
echo "--------------------------------------------------"
