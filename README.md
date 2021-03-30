### Swagger sample

### Installation

Install libs
`npm install`

Up Db container
`docker-compose up -d`

Run migrations
`npm run typeorm:migrations:generate`

Run app
`npm run start:dev`

### Running

Once the application is running you can visit [http://localhost:3000/api](http://localhost:3000/api) to see the Swagger interface.

See [here](https://docs.nestjs.com/recipes/swagger#bootstrap) for more information.