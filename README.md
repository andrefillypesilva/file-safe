# FileSafe

A simple File Uploader using Angular 18 and NodeJS.

## Development server (Frontend)

Run `npm run start` to initialize the Frontend application. Navigate to `http://localhost:4200/`.

![system ui](https://github.com/andrefillypesilva/file-safe/blob/main/src/assets/system-ui.png?raw=true)

## Development server (Backend)

Run `npm run start-server` to initialize the Backend server. It will run on `http://localhost:3000/`. In order to have a successfully upload experience, you should start the backend server (otherwise it will break on the upload action, what could be useful to test this case). The backend project is in `./server` directory for further conference.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/). The end-to-end project is in `./cypress` directory for further conference.
