# Overview of project

## How to run

The recommended node version to run this project is the latest LTS node version, it was configured insider .nvmrc.

Before start developing, copy `.env.example` file and paste as `.env` file in the root folder. Finally, run the following commands to start developing the project:

```bash
nvm use
npm i
npm run start:dev
```

## How to run tests

To run the unit tests, run the following command:

```bash
npm test
```

To run the e2e tests, run the following command:

```bash
npm run test:e2e
```

## Postman Docs

In the root folder there are two files for testing the API on Postman: `coins-app.postman_collection.json` and `coins-app.postman_environment.json`. Import them both on postman to easily test the API.

## Design Decisions and Thoughts

I decided to use [Nest JS](https://docs.nestjs.com/) with Express JS because it has many abstractions and dependency injection out of the box

One cool thing to add would be a cache for the MINERSTAT API, since it won't change for 5 to 10 minutes. It might be interesting to add a cache of 1 minute for example, so we won't either exceed the maximum calls limit or have latency problems of calling their API every single request. I won't add it because of the short time.

The files were separeted in three main types:

- controllers: deal with the HTTP protocol and their responde codes. Get all the data from the services, passing the necessary parameters.
- service: deal with the business logic, is agnostic to the protocol we are using to comunicate and to the database/API we are retriving the data
- repository: connect to the database/API and return the necessary data to the services
