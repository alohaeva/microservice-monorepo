# Microservices Monorepo

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve microservices-monorepo
```

To create a production bundle:

```sh
npx nx build microservices-monorepo
```

To see all available targets to run for a project, run:

```sh
npx nx show project microservices-monorepo
```

To generate a new application, use:

```sh
npx nx g @nx/nest:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

