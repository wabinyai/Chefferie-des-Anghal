# Branching Policy

## Branch workflow

- `staging` is the integration branch for active development.
- `main` is the stable production branch.
- Developers should not work directly on `staging`.
- Create a feature or fix branch from `staging`, then merge that branch into `staging`.
- Only `staging` may merge into `main`.

## Pull requests

- Create PRs into `staging` from a branch created off `staging`.
- When `staging` is ready, create a PR from `staging` to `main`.
- Do not open PRs into `staging` from `staging` or `main` directly.
- Direct pushes to `main` or `staging` are not allowed.

## Enforcement

A GitHub Actions workflow is included under `.github/workflows/enforce-staging-to-main.yml` to ensure:

- PRs targeting `main` come from `staging`
- PRs targeting `staging` use a feature/fix branch, not `staging` or `main` directly
