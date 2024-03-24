
# GameDB

Welcome to the GameDB Web Application GitHub repository! This is an ongoing project aimed at providing gamers with a powerful tool to track the games they play, own, and want. As an enthusiast of MongoDB, NestJS, and Angular, you'll find this repository a perfect fit for your development needs.


## Quality Badges

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Jaumoso_GameDB-server&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Jaumoso_GameDB-server)
## Authors

- [@Jaumoso](https://www.github.com/Jaumoso)
- [@TeviBR99](https://www.github.com/TeviBR99)


## Tech Stack

**Client:** Angular, Angular Material, SCSS

**Server:** NestJS

**Database:** MongoDB Atlas

## Acknowledgements

 - [Angular](https://angular.io/)
 - [Angular Material](https://material.angular.io/)
 - [SCSS](https://sass-lang.com/)
 - [NestJS](https://nestjs.com/)
 - [MongoDB Atlas](https://www.mongodb.com/atlas)
 - [Readme.so](https://readme.so/)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file on the GameDB-server side.

`JWT_SECRET` to secure the sessions.

#### MongoDB Atlas Authentication
`DB_USER` user of the MongoDB Atlas

`DB_PASSWORD` password of the MongoDB Atlas

#### IGDB Authentication

`IGDB_CLIENT_ID` Twitch developer API ID

`IGDB_SECRET` Twitch developer API Secret

`IGDB_BASE_URL` URL of the IGDB API https://api.igdb.com/v4
## Run Locally

Clone the project

```bash
  git clone https://github.com/Jaumoso/GameDB-client.git
```
or
```bash
  git clone https://github.com/Jaumoso/GameDB-server.git
```

Go to the project directory

```bash
  cd GameDB-client
```
or
```bash
  cd GameDB-server
```

Install dependencies

```bash
  npm install -g yarn
  yarn install
```

Start the client / server

```bash
  yarn start:dev
```


## Running Tests

To run tests, run the following command

```bash
  yarn test
```

