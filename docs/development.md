## Run tasks

To run the dev server for all apps, use:

```shell
nx run-many --parallel --target=serve --projects=client-app,server-app
```

To run the dev server for app, use:

```sh
npx nx serve
```

To create a production bundle:

```sh
npx nx build <app-name>

npx nx build api-gateway
```

To see all available targets to run for a project, run:

```sh
npx nx show project <app-name>

npx nx show project api-gateway
```

To generate a new application, use:

```sh
npx nx g @nx/nest:app apps/<app-name>
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib libs/<lib-name>
```
