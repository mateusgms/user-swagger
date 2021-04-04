### Swagger, Nest & Mysql project

### Installation

Install libs
`npm install`

Up Db container
`docker-compose up -d`

Generate migrations
`npm run typeorm:migration:generate`

Run migrations
`npm run typeorm:migration:run`

Run app
`npm run start:dev`

### Running

Once the application is running you can visit [http://localhost:3000/api](http://localhost:3000/api) to see the Swagger interface.
