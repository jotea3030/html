#!/usr/bin/env bash
set -euo pipefail
OUT_DIR="$(cd "$(dirname "$0")" && pwd)/audio"
mkdir -p "$OUT_DIR"
urls=(
"https://xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC134898-LS100612%20Turdus%20migratorius.mp3"
"https://xeno-canto.org/sounds/uploaded/GYAUIPBVZF/XC413729-NOCA.mp3"
"https://xeno-canto.org/sounds/uploaded/OHGBMINRHW/XC51630-Blue%20Jay.mp3"
"https://xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC51188-Chickadee%2C%20Black-capped.mp3"
"https://xeno-canto.org/sounds/uploaded/JVQVMCUUNY/XC420595-SOSP.mp3"
"https://xeno-canto.org/sounds/uploaded/RFGUXPZORH/XC413686-WOTH.mp3"
"https://xeno-canto.org/sounds/uploaded/FQRXKOLNJB/XC83562-Meadowlark%2C%20Eastern.mp3"
"https://xeno-canto.org/sounds/uploaded/ZNSKRSHKBW/XC344942-baltimore_oriole_song.mp3"
"https://xeno-canto.org/sounds/uploaded/TFOGORUSOL/XC413697-HOWR.mp3"
"https://xeno-canto.org/sounds/uploaded/FWKBNDJBSP/XC420591-RWBL.mp3"
"https://xeno-canto.org/sounds/uploaded/JVQVMCUUNY/XC420585-WTSP.mp3"
"https://xeno-canto.org/sounds/uploaded/OTVUCVOMMQ/XC420588-COYE.mp3"
)
for url in "${urls[@]}"; do
  file="$(basename "${url%%\?*}")"
  safe="$(printf '%s' "$file" | sed 's/%20/_/g; s/,/_/g; s/%2C/_/g')"
  out="$OUT_DIR/$safe"
  if [ -f "$out" ]; then echo "Skipping $safe"; continue; fi
  echo "Downloading $url -> $safe"
  if ! curl -L --fail -o "$out" "$url"; then echo "Failed to download $url" >&2; rm -f "$out" || true; fi
done
echo "Downloads complete -> $OUT_DIR"
