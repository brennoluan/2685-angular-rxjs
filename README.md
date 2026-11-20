# Buscante

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

## Development server

Copy `.env.example` to `.env` and set `GOOGLE_BOOKS_API_KEY` to your Google Books API key. Start the development server with `npm start` and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Google Books API key

The `start`, `build`, `watch`, and `test` npm scripts read `.env` with `dotenv` and generate a local Angular module before running. Restart the command after changing `.env`. Running `ng serve` directly skips this setup.

The key is included in the browser application bundle and is visible to users. Restrict it in Google Cloud Console (for example, by HTTP referrer and API); `.env` keeps it out of source control, but does not make a browser key secret.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
