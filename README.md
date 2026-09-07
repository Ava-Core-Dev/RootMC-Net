# RootMC Net

Vercel project for `rootmc.net`.

![RootMC banner](media/banner.jpg)

This repository owns the RootMC public web experience, landing pages, community discovery, and frontend integrations with documented RootMC APIs.

## Vercel

Import this repository as its own Vercel project. Keep secrets in Vercel environment variables. Vercel serves the web app; RootMC services and long-running processing remain in `RootRecord-RootMC` or the documented Processor integration.

Local developers can register `scripts/register-auto-push.ps1` for the
two-minute opt-in auto-push workflow.

## First Run

- Windows: `install.ps1`
- Ubuntu/Debian: `./install.sh`
- Direct boot check: `python core/boot.py`

Boot creates missing runtime/log directories, installs dependencies from the package lockfile, and writes full output to `.runtime/logs/` while also showing it in the terminal.

## Boundary

No license. Public for transparency and Vercel deployment. All RootMC development remains in `RootRecord-RootMC`.
