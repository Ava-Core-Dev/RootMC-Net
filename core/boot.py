#!/usr/bin/env python3
"""Self-checking RootMC Net Vercel bootstrap."""
from __future__ import annotations

import hashlib
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / ".runtime"
LOG_FILE = RUNTIME / "logs" / "boot.log"


def log(message: str) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    line = f"[RootMC Net] {message}"
    print(line, flush=True)
    with LOG_FILE.open("a", encoding="utf-8") as handle:
        handle.write(line + "\n")


def fingerprint(*paths: Path) -> str:
    digest = hashlib.sha256()
    for path in paths:
        if path.is_file():
            digest.update(str(path.relative_to(ROOT)).encode())
            digest.update(path.read_bytes())
    return digest.hexdigest()


def main() -> int:
    log("BOOT_START")
    for directory in (RUNTIME, RUNTIME / "logs", RUNTIME / "config", ROOT / "media"):
        directory.mkdir(parents=True, exist_ok=True)
        log(f"READY {directory.relative_to(ROOT)}")
    package = ROOT / "package.json"
    lock = ROOT / "package-lock.json"
    if package.is_file():
        if not shutil.which("npm"):
            log("ERROR npm is required for this web project")
            return 1
        marker = RUNTIME / "node-dependencies.sha256"
        current = fingerprint(package, lock)
        if not marker.exists() or marker.read_text().strip() != current:
            command = ["npm", "ci" if lock.is_file() else "install"]
            log("RUN " + " ".join(command))
            subprocess.run(command, cwd=ROOT, check=True)
            marker.write_text(current, encoding="utf-8")
    log("BOOT_COMPLETE")
    log(f"Log file: {LOG_FILE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
