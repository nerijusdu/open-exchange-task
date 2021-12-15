# open-exchange-task

## Setup

### Database
This app uses MySQL database that can be installed locally (should contain `open-exchange` database),
or using docker - `docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=open-exchange -p 3306:3306 -d mysql`

### Variable
Required environment variables (can be added to `.env` file):
- APP_ID - [Open Exchange Rates API](https://openexchangerates.org/) App ID
- DB_USER - MySQL database user, default `root`
- DB_PASSWORD - MySQL database password, default `root`