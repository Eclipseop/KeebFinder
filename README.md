# Keeb-Finder

Parses various keyboard websites to create an aggregated list of all available products.

## Supported Sites
* [Kinetic Labs](https://kineticlabs.store/)
* [KBDfans](https://kbdfans.com/)
* [NovelKeys](https://novelkeys.com/)
* [KeebsForAll](https://keebsforall.com/)

## Development
Requirements: [Postgres](https://hub.docker.com/_/postgres)
```
yarn install
yarn prisma migrate dev
yarn dev
```
Environment Variables:
* DATABASE_URL