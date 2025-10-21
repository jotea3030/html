#!/usr/bin/env bash
set -euo pipefail
# Download bird audio files into bird_song_game/audio/
# Usage: ./download_audio.sh
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$DIR/audio"
mkdir -p "$OUT_DIR"

declare -a urls=(
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

# Download each URL, following redirects. Use a deterministic filename based on last URL segment (strip query).
for url in "${urls[@]}"; do
  # extract last path segment, URL-decode percent-escapes for readability
  file="$(basename "${url%%\?*}")"
  # sanitize filename (replace %20 with underscore, etc.)
  safe="$(printf '%s' "$file" | sed 's/%20/ /g; s/ /_/g; s/,/_/g; s/%2C/_/g; s/%2F/_/g')"
  out="$OUT_DIR/$safe"
  if [ -f "$out" ]; then
    echo "Skipping existing: $safe"
    continue
  fi
  echo "Downloading: $url -> $safe"
  # -L follow redirects, -C - continue, --fail cause non-2xx to error
  if ! curl -L -C - --fail -o "$out" "$url"; then
    echo "Failed to download $url (skipping)"
    # remove partial file if present
    [ -f "$out" ] && rm -f "$out"
  fi
done

echo "Downloaded files (or attempted) into $OUT_DIR"
