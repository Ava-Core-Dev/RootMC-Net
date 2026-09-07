#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$ROOT/.runtime/logs"
mkdir -p "$LOG_DIR"
exec > >(tee -a "$LOG_DIR/install.log") 2>&1
if command -v apt-get >/dev/null 2>&1; then
  [[ "$(id -u)" -eq 0 ]] || exec sudo -E bash "$0" "$@"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update
  apt-get install -y --no-install-recommends ca-certificates curl git nodejs npm python3
fi
python3 "$ROOT/core/boot.py"
printf '[%s] ROOTMC_NET_INSTALL_COMPLETE\n' "$(date -Is)"
