# open-exchange-task

## Setup

### Database
This app uses MySQL database that can be installed locally (should contain `open-exchange` database), or using docker:
```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=open-exchange -p 3306:3306 -d mysql
```

To apply database migrations run `npm run db:migrate`

To revert database migrations run `npm run db:migrate:revert`

To add a new database migration run `npm run db:migration:add my_migration_name`

### Variable
Below are required environment variables (they can be added to `.env` file):
- APP_ID - [Open Exchange Rates API](https://openexchangerates.org/) App ID
- DB_USER - MySQL database user, default `root`
- DB_PASSWORD - MySQL database password, default `root`

## Run
- First run the database migration `npm run db:migrate` to create the initial tables
- Start the app by running `npm start` command
