# Findorra - nearby biz search platform

## How to run locally
- clone the repository
```sh 
git clone <repo_url>
```
- Run Postgres database using docker
```sh
docker run --name findorra-db -e POSTGRES_PASSWORD=mysupersecret -p 5432:5432 -d postgres
```
- Add DB URL in .env file in apps/ or packages/database/
```sh
DATABASE_URL="postgresql://postgres:mysupersecret@localhost:5432/postgress?schema=public"
```
- Sync your database
```sh
cd packages/database
npx prisma db push
```
- Run turborepo apps
```sh
turbo run dev
```