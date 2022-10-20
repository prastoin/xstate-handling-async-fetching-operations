# Handling async operations with XState

This repo illustrates the following [article](http://paul.rastoin.dev/writing/posts/xstate-handling-async-operations).
It contains a working and tested `Vue3` + `XState` implementation of XState `promises invocations` and `parallel states` usage, in this case by fetching several content at the same time.
It's tested using `@xstate/test` and `Cypress` within e2e tests.

## Setup

### Install deps

Install dependencies with yarn by running

```bash
yarn
```

### Starting the app in local

```bash
yarn dev
```

## 🧞 Commands

| Command            | Action                              |
| :----------------- | :---------------------------------- |
| `yarn dev`         | Starts the app in local             |
| `yarn test:e2e`    | Run e2e tests using the cypress GUI |
| `yarn test:e2e:ci` | Run e2e tests in the terminal       |
