# Repository Guidance: RootMC Net

This repository owns the Vercel web project for `rootmc.net`.

## Scope

- Put RootMC public web pages, components, static assets, and frontend tests here.
- Keep the app independently deployable by Vercel.
- Use documented public RootMC API contracts.
- Keep credentials in Vercel environment variables, never in source control.

## Boundaries

- `RootRecord-RootMC`: all RootMC development, APIs, plugins, schemas, and services.
- `RootRecord-Core-Processor`: hosted RootRecord automation and approved integrations.
- `RootRecord-Core-Ops`: local operator desk and backups.
- `RootRecord-Core-Node`: MIT-licensed self-hostable node.

## License

No license. Public for transparency and Vercel deployment only.
