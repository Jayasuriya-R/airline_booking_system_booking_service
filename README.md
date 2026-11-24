# Node + Express 5 + Sequelize (MySQL) Template

Layered REST API boilerplate:
`route → middleware (validation) → controller → service → repository → model`

## Using this template for a new project

```bash
# 1. copy it (or push this folder to GitHub and tick "Template repository")
cp -r node-express-sequelize-template my-new-project
cd my-new-project
rm -rf .git && git init

# 2. rename the project in package.json ("name", "description")

# 3. configure environment
cp .env.example .env        # then edit DB_* values

# 4. install + create DB + run migration/seed
npm install
npm run db:create
npm run db:migrate
npm run db:seed

# 5. run
npm run dev                 # nodemon
# npm start                 # plain node (production)
```

Check it: `GET http://localhost:3000/api/v1/info` and `GET /api/v1/examples`.

## Folder structure

```
src/
├── app.js            express app (middleware + routes + error handlers)
├── index.js          DB check + app.listen
├── config/           server-config, logger-config, database (also used by sequelize-cli)
├── routes/v1/        one file per resource, mounted in routes/v1/index.js
├── middleware/       request validation + central error-handler / 404
├── controllers/      thin: read req, call service, send response
├── services/         business logic, converts errors with toAppError()
├── repositories/     DB access; extend CrudRepository
├── models/           Sequelize models (auto-loaded by models/index.js)
├── migrations/       sequelize-cli migrations
├── seeders/          sequelize-cli seeders
└── utils/            AppError, toAppError, Success/ErrorResponse, rate limiter, helpers
```

`sequelize-cli` finds everything through `.sequelizerc`, so run all commands
from the project root (no need to `cd src`).

## Adding a new resource (e.g. `Airplane`)

1. `npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer`
   (move/rename if needed; models live in `src/models`, migrations in `src/migrations`)
2. `src/repositories/airplane-repository.js` → `extends CrudRepository`, export in `repositories/index.js`
3. `src/services/airplane-services.js` → copy `example-services.js`, export in `services/index.js`
4. `src/controllers/airplane-controller.js` → copy `example-controller.js`, export in `controllers/index.js`
5. `src/middleware/airplane-middleware.js` → validation, export in `middleware/index.js`
6. `src/routes/v1/airplane-routes.js` → mount in `routes/v1/index.js`
7. Once your own resources work, delete the `Example*` files and the example migration/seeder.

## Useful commands

| Command | What it does |
|---|---|
| `npm run db:migrate` / `db:migrate:undo` / `db:migrate:undo:all` | run / revert migrations |
| `npm run db:seed` / `db:seed:undo` | run / revert all seeders |
| `npx sequelize seed:generate --name add-foo` | new seeder |
| `npx sequelize migration:generate --name add-foo` | new migration |

## Response format

```json
{ "success": true,  "message": "...", "data": { }, "error": { } }
{ "success": false, "message": "...", "data": { }, "error": { "explanation": ["..."], "statusCode": 400 } }
```

## Error handling

Services throw `AppError(message, statusCode)`. Controllers don't use try/catch:
Express 5 forwards rejected async handlers to `middleware/error-handler.js`,
which formats the response and hides internals of unexpected 500 errors.
