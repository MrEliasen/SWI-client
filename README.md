# Street Wars Inc - Client

SWI is made as a spiritual successor to the original Street Wars Online 2, from 2000, and was created as a means to learn about GO and protobufs.

Also see the [SWI Server](https://github.com/MrEliasen/SWI-server) and the [SWI Protobufs](https://github.com/MrEliasen/SWI-proto)

## Overview

Server is written in Go, uses Protobufs and WebSockets for server/client communication, and SQLite as the DB (supports [Turso](https://turso.tech/)). The client is a very basic site written in Svelte/TS. This is an extremely simple site built in Svelte, the graphics are generated using Midjourney.

### Setup/Install

Copy the `.env-example` to `.env` and change the server url inside the env file to your server. If you running the server locally: `https://localhost:8081`

### Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Installed Adaptor

-   Vercel Adeptor

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
